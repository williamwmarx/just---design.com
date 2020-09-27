import React from "react";
import Head from "./Head.js";
import Link from "./Link.js";
import Title from "./Title.js";
import "../sass/main.sass";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  static Heading = ({ children }) => <h3 className="heading">{children}</h3>
  static SubHeading = ({ children }) => <h4 className="subheading">{children}</h4>
  static Credit = props => (
    <span className="credit">
      <Link href={props.content_source}>{props.content}</Link> c/o <Link href={props.creator_source}>{props.creator}</Link>
    </span>
  )

  render() {
    return (
      <div className="root">
        <Head title={`JUST DESIGN. ${this.props.title}`}/>
        <Title name={this.props.title}/>
        <div className={(this.props.typename === "card") ? "card-page" : "text-page"}>
          {this.props.children}
        </div>
      </div>
    )
  }
}


