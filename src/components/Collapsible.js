/* Import React */
import React from "react"

/* Import Styles */
import "../sass/main.scss"
import { getCookie } from "../components/CookieUtils.js"

export default class Collapsible extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      theme: getCookie("theme"),
    }
    this.divRef = React.createRef()
  }

  getStyle() {
    return this.state.active ? { maxHeight: this.divRef.current.scrollHeight } : { maxHeight: 0 }
  }

  toggle() {
    this.setState({
      active: !this.state.active,
      theme: getCookie("theme"),
    })
  }

  componentDidMount() {
    this.setState({ active: (this.props.init === "open")})
  }

  render() {
    return (
      <div className="collapsible">
        <h3>{this.props.name}</h3>
        <button
          className={this.state.active ? "active" : ""}
          type="button"
          onClick={() => this.toggle()}
        >
          <img
            src={`icons/arrow_${this.state.theme === "dark" ? "light" : "dark"}.svg`}
            alt="arrow"
          />
        </button>
        <div
          ref={this.divRef}
          style={this.getStyle()}
          className={this.state.active ? "active" : ""}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}
