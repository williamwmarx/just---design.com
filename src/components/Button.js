import React from "react";
import Emoji from "./Emoji.js";
import "../sass/button.component.sass"

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            href: null
        }
    }

    async instagram(link) {
        if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
            if (link.includes("instagram.com/p/")) {
                let response = await fetch("https://api.instagram.com/oembed/?url=" + link);
                if (response.status === 200) {
                    let result = await response.json();
                    return "instagram://media?id=" + result["media_id"]
                } else {
                    return link
                }
            } else if (link.includes("instagram.com/")) {
                let pathname = new URL(link).pathname.split("/")[1];
                return "instagram://user?username=" + pathname;
            }
        } else return link;
    }

    componentDidMount() {
        this.setState({ href: this.props.href })
        if (this.props.href) {
            if (this.props.href.toLowerCase().includes("instagram")) {
                this.instagram(this.props.href).then((result) => this.setState({ href: result }))
            }
        }
    }

    render() {
        return (
            <span>
                <a className="gradient-button" rel="noreferrer" target="_blank" href={this.state.href}>
                    {this.props.text} <Emoji name={this.props.emoji_name} emoji={this.props.emoji}/>&nbsp;
                    <span style={{fontFamily: "OfficeCodeProDMedium"}}>→</span>
                </a>
                <br/>
            </span>
        );
    }
}
