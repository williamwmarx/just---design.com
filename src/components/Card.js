import React from "react";
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
import "../sass/main.scss"

export default class Card extends React.Component {
  static Header = ({ children }) => <div className="header">{children}</div>
  static Body = ({ children }) => <div className="body">{children}</div>
  static Author = props => <Link newtab={true} href={props.href}>{props.children}</Link>
  static Button = props => (
    <Link typename="button" href={props.href} newtab={!props.internal}>
      {props.children} <Emoji>{props.emoji}</Emoji>
    </Link>
  )

  render() {
    return (
      <div className="card">
        {this.props.children}
      </div>
    )
  }
}
 
