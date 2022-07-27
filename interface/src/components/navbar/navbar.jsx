import { useState } from 'react';

const SidebarToggle = ()=>{
    return (
        <label htmlFor="sidebar-toggle" className="btn btn-link btn-primary pl-0">
            <svg className="w-6 h-6 stroke-primary fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
        </label>
    )
}

function Navbar() {
  return (
        <div className="navbar bg-base-100 max-h-16">

            <div className="flex mx-3 w-full justify-between">
                
                <SidebarToggle/>
                <div class="form-control w-full">
                    <div class="input-group">
                        <input type="text" placeholder="Search…" class="input input-bordered border-r-0 text-lg
                        peer
                        outline-0	
                        focus:outline-0
                        focus:border-primary
                        w-2/5
                        " />
                        <button class="btn btn-square btn-outline btn-primary border-base-300 border-l-0
                        peer-focus:border-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>

                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                {/*<ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div> */}
            </div>
        </div>
  );
}

export default Navbar;