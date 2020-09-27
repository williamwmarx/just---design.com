import React from "react";

export default class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      href: null
    }
  }

  // Open Instagram link in app if on iPhone 
  async instagram(link) {
    if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
      if (link.includes("instagram.com/p/")) {
        let response = await fetch("https://api.instagram.com/oembed/?url=" + link)
        if (response.status === 200) {
          let result = await response.json()
          return "instagram://media?id=" + result["media_id"]
        } else return link
      } else if (link.includes("instagram.com/")) {
        return "instagram://user?username=" + new URL(link).pathname.split("/")[1];
      }
    } else return link;
  }

  componentDidMount() {
    this.setState({ href: this.props.href })
    if (this.props.href?.toLowerCase().includes("instagram")) {
      this.instagram(this.props.href).then((result) => this.setState({ href: result }))
    }
  }

  render() {
    let link = null;
    return (
      <a 
        {...(this.props.newtab && {rel: "noreferrer", target: "_blank"})} 
        className={(this.props.typename === "button") ? "button" :"link"}
        href={this.state.href}
      >
          {this.props.children} 
          {(this.props.typename === "button") && <span className="arrow">→</span>}
      </a>
    );
  }
}

