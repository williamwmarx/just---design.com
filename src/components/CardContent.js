import React from "react";
import Head from "./Head.js";
import Title from "./Title.js";
import "../sass/main.sass";

export default class CardContent extends React.Component {
    constructor(props) {
        super(props);
    }

    static Header = ({ children }) => <p className="card-content-header">{children}</p>
    static Text = ({ children }) => <p className="card-content-text">{children}</p>
  
    render() {
        return (
            <div className="root">
                <Head title={`JUST DESIGN. ${this.props.title}`}/>
                <Title name={this.props.title}/>
                <div style={{position: "relative", width: "80vw", left: "10vw", paddingTop: "4em"}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
  
