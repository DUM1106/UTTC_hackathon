import React from 'react'
import Icon from "../images/dog.png"
import "../SidebarIcon.css"

function SidebarIcon() {
  return (
    <div className="SidebarIcon">
        <img src={Icon}/>
        <p>Assist</p>
    </div>
  )
}

export default SidebarIcon