/* Import  React */
import React from "react"

/* Components */
import Head from "./Head.js"
import Link from "./Link.js"
import { getCookie, setCookie } from "./CookieUtils.js"

/* Style Sheet */
import "../sass/main.scss"

export default class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "light",
    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  static Credit = props => (
    <span className="credit">
      <Link href={props.content_source}>{props.content}</Link> c/o{" "}
      <Link href={props.creator_source}>{props.creator}</Link>
    </span>
  )

  toggleTheme() {
    setCookie("theme", getCookie("theme") === "light" ? "dark" : "light")
    this.setState({ theme: getCookie("theme") })
  }

  componentDidMount() {
    const prefersDarkMode =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    if (getCookie("theme") === "" && prefersDarkMode) this.setState({ theme: "dark" })
  }

  render() {
    document.body.style.backgroundColor = this.state.theme === "dark" ? "#25282a" : "#efedf1"
    return (
      <div className={this.state.theme}>
        <div id="root">
          <Head title={`Just Design. ${this.props.page}`} />
          <h1>
            <a href="/">JUST DESIGN.</a>
          </h1>
          <h2 onClick={this.toggleTheme}>{this.props.page.toUpperCase()}</h2>
          <div className={this.props.typename === "card" ? "card-page" : "text-page"}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
