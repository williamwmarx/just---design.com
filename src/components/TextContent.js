import React from "react";
import Head from "./Head.js";
import Link from "./Link.js";
import Title from "./Title.js";
import "../sass/main.sass";
import "../sass/textcontent.component.sass";

export default class TextContent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static Section = ({ children }) =>  <h3 className="section">{children}</h3>
    static Subsection = ({ children }) => <p className="subsection">{children}</p>
    static Credit = props => (
        <span className="credit-text">
            <Link href={props.content_source}>{props.content}</Link>
            &nbsp;c/o&nbsp;
            <Link href={props.creator_source}>{props.creator}</Link>
        </span>
    )
    static Text = ({ children }) => <p className="indent-text">{children}</p>
    static TextIndent = ({ children }) => <p className="indent-text-2">{children}</p>
  
    render() {
        return (
            <div className="root">
                <Head title={`JUST DESIGN. ${this.props.title}`}/>
                <Title name={this.props.title}/>
                <div className="text-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
  