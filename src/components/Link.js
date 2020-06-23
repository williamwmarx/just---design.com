import React from "react";

export default function Link(props) {
    let nohover_transparency = 1;
    let hover_transparency = 0.9;
    let color1 = [51, 51, 51];
    let color2 = [115, 115, 115];
    // let color2 = [99, 177, 223];
    // let color3 = [148, 151, 199];
    // let color4 = [239, 81, 157];
    let nohover = `linear-gradient(90deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${nohover_transparency}), rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${nohover_transparency})`;
    let hover = `linear-gradient(90deg, rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${hover_transparency}), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${hover_transparency})`;
    let init_styles = {
        color: "#fff", 
        textDecoration: "none",
        backgroundImage: nohover,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 35%",
        backgroundPosition:"0 95%"
        
    }
    function hoverUnderlineColor(e) {e.target.style.backgroundImage = hover;}
    function unhoverUnderlineColor(e) {e.target.style.backgroundImage = nohover;}

    let link = null;
    if (props.new_tab !== false) link = <a rel="noreferrer" target="_blank" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={props.href}>{props.children}</a>;
    else link = <a rel="noreferrer" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={props.href}>{props.children}</a>;
    return link;
}
