import React from "react";
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
import "../sass/main.sass"

export default class Card extends React.Component {
  static Header = ({ children }) => <div className="header">{children}</div>
  static Body = ({ children }) => <div className="body">{children}</div>
  static Tags = ({ children }) => <p className="subtitle">{children}</p>
  static Title = ({ children }) => <p className="title">{children}</p>
  static Subtitle = ({ children }) => <p className="subtitle">{children}</p>
  static Subtitle2 = ({ children }) => <p className="subtitle-two">{children}</p>
  static Author = props => <Link newtab={true} href={props.href}>{props.children}</Link>
  static Text = ({ children }) => <p className="text">{children}</p>
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
 
