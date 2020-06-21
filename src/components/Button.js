import React from "react";
import Emoji from "./Emoji.js";

export default function Button(props) {
    return (
        <span>
            <a className="gradient-button card-text" href={props.href}>
                {props.text} <Emoji name={props.emoji_name} emoji={props.emoji}/>&nbsp;
                <span style={{fontFamily: "OfficeCodeProDMedium"}}>→</span>
            </a>
            <br/>
        </span>
    );
}
