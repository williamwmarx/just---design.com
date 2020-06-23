import React from "react";
import Emoji from "./Emoji.js";
import "../sass/button.component.sass"

export default function Button(props) {
    return (
        <span>
            <a className="gradient-button" rel="noreferrer" target="_blank" href={props.href}>
                {props.text} <Emoji name={props.emoji_name} emoji={props.emoji}/>&nbsp;
                <span style={{fontFamily: "OfficeCodeProDMedium"}}>→</span>
            </a>
            <br/>
        </span>
    );
}
