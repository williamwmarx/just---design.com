import React from "react";

export default function Link(props) {
    let init_styles = {
        color: "#fff", 
        textDecoration: "underline #63b1df"
    }
    function hoverUnderlineColor(e) {e.target.style.textDecorationColor = "#9497c7";}
    function unhoverUnderlineColor(e) {e.target.style.textDecorationColor = "#63b1df";}

    let link = null;
    if (props.new_tab) link = <a rel="noreferrer" target="_blank" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={props.href}>{props.children}</a>;
    else link = <a rel="noreferrer" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={props.href}>{props.children}</a>;
    return link;
}
