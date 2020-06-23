import React from "react";

// async function instagram(link) {
//     if (link.includes("instagram.com/p/")) {
//         let response = await fetch("https://api.instagram.com/oembed/?url=" + link);
//         if (response.status == 200) {
//             let result = await response.json();
//             return "instagram://media?id=" + result["media_id"]
//         } else {
//             return link
//         }
//     } else if (link.includes("instagram.com/")) {
//         pathname = new URL(link).pathname.split("/")[1];
//         return "instagram://user?username="+pathname;
//     }
// }
// instagram("https://www.instagram.com/p/CA-WwKFJwcE/").then((link) => console.log(link))


export default function Link(props) {
    let nohover_transparency = 1;
    let hover_transparency = 0.9;
    let color1 = [51, 51, 51];
    let color2 = [115, 115, 115];
    // let color2 = [99, 177, 223];
    // let color3 = [148, 151, 199];
    // let color4 = [239, 81, 157];
    let nohover = null;
    let hover = null;
    if (props.highlightColorHover) {
        nohover = `linear-gradient(90deg, rgba(${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${nohover_transparency}), rgba(${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${nohover_transparency})`;
        hover = `linear-gradient(90deg, rgba(${props.highlightColorHover}, ${props.highlightColorHover}, ${props.highlightColorHover}, ${nohover_transparency}), rgba(${props.highlightColorHover}, ${props.highlightColorHover}, ${props.highlightColorHover}, ${nohover_transparency})`;
    } else {
        nohover = `linear-gradient(90deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${nohover_transparency}), rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${nohover_transparency})`;
        hover = `linear-gradient(90deg, rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${hover_transparency}), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${hover_transparency})`;
    }
    
    let init_styles = {
        color: "#fff", 
        textDecoration: "none",
        backgroundImage: nohover,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 35%",
        backgroundPosition:"0 95%"
        
    }
    let author_styles = {
        color: props.color,
        textDecoration: "none",
        backgroundImage: `linear-gradient(90deg, rgba(${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${nohover_transparency}), rgba(${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${props.highlightColorNoHover}, ${nohover_transparency})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 35%",
        backgroundPosition:"0 95%"
        
    }


    function hoverUnderlineColor(e) {e.target.style.backgroundImage = hover;}
    function unhoverUnderlineColor(e) {e.target.style.backgroundImage = nohover;}

    let link = null;
    if (props.new_tab !== false) {
        if (props.color) {
            link = <a rel="noreferrer" target="_blank" style={author_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={props.href}>{props.children}</a>;
        } else {
            link = <a rel="noreferrer" target="_blank" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={props.href}>{props.children}</a>;
        }
    } else {
        link = <a rel="noreferrer" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={props.href}>{props.children}</a>;
    }
    return link;
}
