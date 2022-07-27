// @flow

// Thanks to https://gist.github.com/DelvarWorld/3784055
// for the inspiration for the shift-selection

import * as React from 'react'
import cx from 'classnames'
import includes from 'lodash/includes'
import range from 'lodash/range'
import reject from 'lodash/reject'
import uniq from 'lodash/uniq'
import {KEYS, KEY} from './keys'
import {ListItem} from './list-item'


export default class List extends React.Component{

	static defaultProps = {
		items: [],
		selected: [],
		disabled: [],
		multiple: false,
		onChange: () => {},
		keyboardEvents: true,
		itemClassName:""
	}

	state = {
		items: this.props.items,
		selectedItems: this.props.selected,
		disabledItems: this.props.disabled,
		focusedIndex: null,
		lastSelected: null,
	}

	componentDidUpdate = (prevProps, prevState, snapshot)=>{
		if(JSON.stringify(prevProps.selected) !== JSON.stringify(this.props.selected)){
			this.setState(() => ({
				selectedItems: this.props.selected
			}))
		};
	}
	
	clear = () => {
		this.setState(() => ({
			selectedItems: [],
			disabledItems: [],
			focusedIndex: null,
			lastSelected: null,
		}))
	}

	select = ({index, contiguous = false}) => {
		if (index === null) {
			return
		}

		if (includes(this.state.disabledItems, index)) {
			return
		}

		this.setState(
			state => {
				console.log("calling setState:: ")
				console.log(state)
				let {multiple} = this.props
				let {lastSelected} = state
				let selectedItems = multiple
					? [...state.selectedItems, index]
					: [index]

				if (
					contiguous &&
					multiple &&
					typeof lastSelected === 'number'
				) {
					let start = Math.min(lastSelected, index)
					let end = Math.max(lastSelected, index)

					selectedItems = uniq([
						...selectedItems,
						...range(start, end + 1),
					])
				}

				return {selectedItems, lastSelected: index}
			},
			() => {
				this.props.onChange(
					this.props.multiple
						? this.state.selectedItems
						: this.state.lastSelected,
				)
			},
		)
	}

	deselect = ({index, contiguous = false}) => {
		if (index === null) {
			return
		}

		this.setState(
			state => {
				let {multiple} = this.props
				let {selectedItems, lastSelected} = state

				if (
					contiguous &&
					multiple &&
					typeof lastSelected === 'number'
				) {
					let start = Math.min(lastSelected, index)
					let end = Math.max(lastSelected, index)

					let toDeselect = range(start, end + 1)
					selectedItems = reject(selectedItems, idx =>
						includes(toDeselect, idx),
					)
				} else {
					selectedItems = reject(selectedItems, idx => idx === index)
				}

				return {selectedItems, lastSelected: index}
			},
			() => {
				this.props.onChange(
					this.props.multiple ? this.state.selectedItems : null,
				)
			},
		)
	}

	disable = (index) => {
		this.setState(({disabledItems}) => {
			let indexOf = disabledItems.indexOf(index)
			return {
				disabledItems: [...disabledItems].splice(indexOf, 1),
			}
		})
	}

	disable = (index) => {
		this.setState(state => ({
			disabledItems: [...state.disabledItems, index],
		}))
	}

	focusIndex = (index) => {
		this.setState(state => {
			if (index === null) {
				return {}
			}

			let {focusedIndex, disabledItems} = state

			if (!includes(disabledItems, index) && typeof index === 'number') {
				focusedIndex = index
			}

			return {focusedIndex}
		})
	}

	focusPrevious = () => {
		this.setState(state => {
			let {focusedIndex, disabledItems} = state
			let lastItem = state.items.length - 1

			if (focusedIndex === null) {
				focusedIndex = lastItem
			} else {
				// focus last item if reached the top of the list
				focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex =
						focusedIndex <= 0 ? lastItem : focusedIndex - 1
				}
			}

			return {focusedIndex}
		})
	}

	focusNext = () => {
		this.setState(state => {
			let {focusedIndex, disabledItems} = state
			let lastItem = state.items.length - 1

			if (focusedIndex === null) {
				focusedIndex = 0
			} else {
				// focus first item if reached last item in the list
				focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex =
						focusedIndex >= lastItem ? 0 : focusedIndex + 1
				}
			}

			return {focusedIndex}
		})
	}

	onKeyDown = (event) => {
		let key = event.keyCode

		if (key === KEY.UP || key === KEY.K) {
			this.focusPrevious()
		} else if (key === KEY.DOWN || key === KEY.J) {
			this.focusNext()
		} else if (key === KEY.SPACE || key === KEY.ENTER) {
			this.toggleKeyboardSelect({
				event,
				index: this.state.focusedIndex,
			})
		}

		// prevent default behavior where in some situations pressing the
		// key up / down would scroll the browser window
		if (includes(KEYS, key)) {
			event.preventDefault()
		}
	}

	toggleSelect = (args) => {
		let {contiguous, index} = args
		if (index === null) {
			return
		}

		if (!includes(this.state.selectedItems, index)) {
			this.select({index, contiguous})
		} else if (this.props.multiple) {
			this.deselect({index, contiguous})
		}
	}

	toggleKeyboardSelect = (args) => {
		let {event, index} = args
		event.preventDefault()
		let shift = event.shiftKey
		this.toggleSelect({contiguous: shift, index})
	}

	toggleMouseSelect = (args) => {
		let {event, index} = args
		event.preventDefault()
		let shift = event.shiftKey
		this.toggleSelect({contiguous: shift, index})
	}

	render() {
		console.log('selectedItems', this.state.selectedItems)

		let items = this.props.items.map((itemContent, index) => {
			let disabled = includes(this.state.disabledItems, index)
			let selected = includes(this.state.selectedItems, index)
			let focused = this.state.focusedIndex === index

			return (
				<ListItem
					key={index}
					index={index}
					disabled={disabled}
					selected={selected}
					focused={focused}
					onMouseOver={this.focusIndex}
					onChange={this.toggleMouseSelect}
					className={this.props.itemClassName}
					focusedClassName={this.props.focusedClassName}
					selectedClassName={this.props.selectedClassName}
					disabledClassName={this.props.selectedClassName}
				>
					{itemContent}
				</ListItem>
			)
		})

		return (
			<ul
				className={cx('react-list-select', this.props.className)}
				tabIndex={0}
				onKeyDown={this.props.keyboardEvents ? this.onKeyDown : undefined}
			>
				{items}
			</ul>
		)
	}
}