import React from "react";
import Button from "../components/Button.js"
import Link from "../components/Link.js"
import "../sass/card.component.sass"

export default class Card extends React.Component {
    static Header = ({ children }) => <div className="card-header">{children}</div>
    static Body = ({ children }) => <div className="card-body">{children}</div>
    static Tags = ({ children }) => <p className="card-subtitle-p" style={{marginBottom: "0.75em"}}>{children}</p>
    static Title = ({ children }) => <p className="card-title">{children}</p>
    static Subtitle = ({ children }) => <p className="card-subtitle-p" style={{marginBottom: "0.75em"}}>{children}</p>
    static Subtitle2 = ({ children }) => <p className="card-subtitle-p-2" style={{marginBottom: "0.75em"}}>{children}</p>
    static Author = props => <Link color="#aaa" highlightColorNoHover={50} highlightColorHover={75} href={props.href}>{props.children}</Link>
    static Text = ({ children }) => <p className="card-text">{children}</p>
    static Subtext = props =><a className="card-text-a" rel="noreferrer" target="_blank" href={props.href}>{props.children}</a>
    static Link = props => <span className="card-button" ><Button href={props.href} text={props.text} emoji={props.emoji} emoji_name={props.emoji_name}/></span>
  
    render() {
        return (
            <div className="card">
                <div className="card-bg">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
  