import React from "react";
import Head from "./Head.js";
import Title from "./Title.js";
import "../sass/main.sass";

let header_style = {
    margin: "0 0 0.5em 0", 
    padding: "0px", 
    fontFamily: "PoppinsMedium", 
    fontSize: "150%",
    color: "#aaa"
}

let text_style = {
    margin: "0 0 0.4em 2vw"
}

export default class CardContent extends React.Component {
    constructor(props) {
        super(props);
    }

    static Header = ({ children }) => <p style={header_style}>{children}</p>
    static Text = ({ children }) => <p style={text_style}>{children}</p>
  
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
  