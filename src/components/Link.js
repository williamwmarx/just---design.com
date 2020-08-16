import React from "react";

export default class Link extends React.Component {
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
        } else {
            return link
        }
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
        let link = null;
        if (this.props.nolink !== false) {
            if (this.props.author === true) {
                if (this.state.href !== "N/A") {
                    link = <a rel="noreferrer" target="_blank" className="link author" href={this.state.href}>{this.props.children}</a>;
                } else {
                    link = <a style={{color: "#aaaaaa"}}>{this.props.children}</a>;
                }
            } else {
                link = (
                    <a rel="noreferrer" target="_blank" className="link" href={this.state.href}>
                        {this.props.children}
                    </a>
                );
            }
        } else {
            link = <a rel="noreferrer" href={this.state.href}>{this.props.children}</a>;
        }
        return link;
    }
}
