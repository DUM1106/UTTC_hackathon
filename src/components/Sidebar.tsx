import React from 'react';
import {SidebarData} from "./SidebarData";
import "../Sidebar.css"
import SidebarIcon from "./SidebarIcon";
function Sidebar() {
  return (
    <div className='Sidebar'>
        <SidebarIcon/>
        <ul className='SidebarList'>
            {SidebarData.map((value, key) => {
                return (
                    <li 
                        key={key}
                        id={window.location.pathname == value.link ? "active" : ""}
                        className="row"
                        onClick={() => {
                            window.location.pathname = value.link;
                            console.log(value.link);
                        }}
                        >
                        <div id="icon">{value.icon}</div>
                        <div id="title">{value.title}</div>
                    </li>
                )
            })}

        </ul>
    </div>
  )
}

export default Sidebar
