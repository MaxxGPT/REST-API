import React from "react";

export const Sidebar = ({ width, height children}) => {


    return(
        <div className="sidebar" style={{width: width, minHeight: height}}>
            <React.Fragment>{children}</React.Fragment>
        </div>
    )
}