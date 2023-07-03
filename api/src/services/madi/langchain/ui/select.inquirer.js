import {
  createPrompt,
  useState,
  useKeypress,
  useRef,
  usePrefix,
  isEnterKey,
  isUpKey,
  isDownKey,
  isNumberKey,
  Paginator,
  Separator,
} from '@inquirer/core';
import chalk from 'chalk';
import figures from 'figures';
import ansiEscapes from 'ansi-escapes';

function isSelectableChoice(choice) {
  return choice != null && !Separator.isSeparator(choice) && !choice.disabled;
}


/**
 * @typedef PromptConfig
 * @type {Object.<string, any>}
 * @property {object} [default] -
 * @property {function} [transformer] -
 * @property {string} [prefix] -
 */

/** 
 * @callback PromptFunc
 * @param {PromptConfig} config
 * @param {function} done
 * @returns {(string | [string,string])}
 */

/** @type {any} */
export default createPrompt(
  /**@type {PromptFunc} */
  (config, done) => {
    const { choices } = config;

    const paginator = useRef(new Paginator()).current;
    const firstRender = useRef(true);

    const prefix = "" //usePrefix();
    const [status, setStatus] = useState('pending');
    const [cursorPosition, setCursorPos] = useState(() => {
      const startIndex = choices.findIndex(isSelectableChoice);
      if (startIndex < 0) {
        throw new Error(
          '[select prompt] No selectable choices. All choices are disabled.'
        );
      }

      return startIndex;
    });

    // Safe to assume the cursor position always point to a Choice.
    const choice = choices[cursorPosition];

    useKeypress((key) => {
      if (isEnterKey(key)) {
        setStatus('done');
        done(choice.value);
      } else if (isUpKey(key) || isDownKey(key)) {
        let newCursorPosition = cursorPosition;
        const offset = isUpKey(key) ? -1 : 1;
        let selectedOption;

        while (!isSelectableChoice(selectedOption)) {
          newCursorPosition =
            (newCursorPosition + offset + choices.length) % choices.length;
          selectedOption = choices[newCursorPosition];
        }

        setCursorPos(newCursorPosition);
      } else if (isNumberKey(key)) {
        // Adjust index to start at 1
        const newCursorPosition = Number(key.name) - 1;

        // Abort if the choice doesn't exists or if disabled
        if (!isSelectableChoice(choices[newCursorPosition])) {
          return;
        }

        setCursorPos(newCursorPosition);
      }
    });

    let message = chalk.bold(config.message);
    if (firstRender.current) {
      // message += chalk.dim(' (Use arrow keys)');
      firstRender.current = false;
    }

    if (status === 'done') {
      return `${prefix} ${message} ${chalk.cyan(choice.name || choice.value)}`;
    }

    const allChoices = choices
      .map((choice, index) => {
        if (Separator.isSeparator(choice)) {
          return ` ${choice.separator}`;
        }

        const line = choice.name || choice.value;
        if (choice.disabled) {
          const disabledLabel =
            typeof choice.disabled === 'string' ? choice.disabled : '(disabled)';
          return chalk.dim(`- ${line} ${disabledLabel}`);
        }

        if (index === cursorPosition) {
          return chalk.cyan(`${figures.pointer} ${line}`);
        }

        return `  ${line}`;
      })
      .join('\n');

    const windowedChoices = paginator.paginate(
      allChoices,
      cursorPosition,
      config.pageSize
    );
    const choiceDescription = choice.description ? `\n${choice.description}` : ``;

    return `${prefix} ${message}\n${windowedChoices}${choiceDescription}${ansiEscapes.cursorHide}`;
  }
);

export { Separator };