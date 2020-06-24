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
        let nohover_transparency = 1;
        let hover_transparency = 0.9;
        let color1 = [51, 51, 51];
        let color2 = [115, 115, 115];
        let color3 = [75, 75, 75]
    
        let nohover = `linear-gradient(90deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${nohover_transparency}), rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${nohover_transparency})`;
        let hover = `linear-gradient(90deg, rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${hover_transparency}), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${hover_transparency})`;
        
        let authorhover = `linear-gradient(90deg, rgba(${color3[0]}, ${color3[1]}, ${color3[2]}, ${hover_transparency}), rgba(${color3[0]}, ${color3[1]}, ${color3[2]}, ${hover_transparency})`;

        let init_styles = {
            color: "#fff", 
            textDecoration: "none",
            backgroundImage: nohover,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 35%",
            backgroundPosition:"0 95%"
            
        }
        let author_styles = {
            color: "#aaaaaa",
            textDecoration: "none",
            backgroundImage: nohover,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 35%",
            backgroundPosition:"0 95%"
            
        }

        function hoverUnderlineColor(e) {e.target.style.backgroundImage = hover;}
        function unhoverUnderlineColor(e) {e.target.style.backgroundImage = nohover;}

        function authorHoverUnderlineColor(e) {e.target.style.backgroundImage = authorhover;}
        function authorUnhoverUnderlineColor(e) {e.target.style.backgroundImage = nohover;}
 

        let link = null;
        if (this.props.new_tab !== false) {
            if (this.props.author === true) {
                link = <a rel="noreferrer" target="_blank" style={author_styles} onMouseEnter={authorHoverUnderlineColor} onMouseLeave={authorUnhoverUnderlineColor} href={this.state.href}>{this.props.children}</a>;
            } else {
                link = (
                    <a rel="noreferrer" target="_blank" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={this.state.href}>
                        {this.props.children}
                    </a>
                );
            }
        } else {
            link = <a rel="noreferrer" style={init_styles} onMouseEnter={hoverUnderlineColor} onMouseLeave={unhoverUnderlineColor} href={this.state.href}>{this.props.children}</a>;
        }
        return link;
    }
}