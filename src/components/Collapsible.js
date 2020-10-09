/* Import React */
import React from "react"

/* Import Styles */
import "../sass/main.scss";
import { getCookie } from "../components/CookieUtils.js"

/* Icons */
import LightArrow from "../../static/images/arrow_light.svg";
import DarkArrow from "../../static/images/arrow_dark.svg";

export default class Collapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      theme: getCookie("theme")
    }
    this.divRef = React.createRef()
  }

  getStyle() {
    return this.state.active ? { maxHeight: this.divRef.current.scrollHeight } : { maxHeight: 0 }
  }

  toggle() {
    this.setState({
      active: !this.state.active,
      theme: getCookie("theme")
    })
  }

  render() {
    return (
      <div className="collapsible">
        <h3>{this.props.name}</h3>
        <button className={(this.state.active) ? "active" : ""} type="button" onClick={() => this.toggle()}>
          <img src={(this.state.theme === "dark") ? LightArrow : DarkArrow} alt="arrow"/>
        </button>
        <div ref={this.divRef} style={this.getStyle()} className={this.state.active ? "active" : ""}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

