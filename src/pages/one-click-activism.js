import React from "react";
import Helmet from "react-helmet";
import Emoji from "../components/Emoji.js"
import Title from "../components/Title.js"
import OneClickActivismData from "../../content/one-click-activism.json"
import "../sass/main.sass";

export default class OneClickActivism extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 500000
    };
  }
  
  get_cards_height() {
    let total_height = 0; 
    let average_height = 0; 
    let max_height = 0;
    let cards = document.getElementsByClassName("card")
    for (let i = 0; i < cards.length; i++) {
      let card_height = cards[i].offsetHeight+parseInt(20)
      total_height += card_height;
      if (card_height > max_height) {
        max_height = card_height;
      }
    }
    if (window.innerWidth < 1100) {
      average_height = total_height/2;
    } else {
      average_height = total_height/3;
    }
    return Math.ceil(average_height + max_height);
  }

  componentDidMount() {
    this.setState({
      height: this.get_cards_height()
    })
  }

  render() {
    return (
      <div className="root">
        <Helmet title="JUST DESIGN. ONE CLICK ACTIVISM." defer={false} />
  
        <Title name="ONE CLICK ACTIVISM."/>
  
        <div className="card-content">
          <p style={{margin: "0 0 0.5em 0", padding: "0px", fontFamily: "PoppinsMedium", fontSize: "150%", color: "#aaa"}}>Key</p>
          <p className="indentText"><Emoji emoji="⚖️" name="balance scale"/>&nbsp;&nbsp;Justice</p>
          <p className="indentText"><Emoji emoji="🖋" name="fountain pen"/>&nbsp;&nbsp;Legislation</p>
          <br/>
          <p style={{margin: "0 0 0.5em 0", padding: "0px", fontFamily: "PoppinsMedium", fontSize: "150%", color: "#aaa"}}>Note</p>
          <p className="indentText">
            Please do NOT donate to change.org– the money does not go to any causes, but rather the corporation itself.
          </p>
          <br/>
          <div className="cards" style={{height: this.state.height}}>
            {OneClickActivismData.petitions.map((data, index) => {
              let emoji_html = null;
              if (data.tag === "Justice") {
                emoji_html = <a><Emoji name="balance scale" emoji="⚖️"/></a>
              }
              if (data.tag === "Legislation") {
                emoji_html = <a><Emoji name="fountain pen" emoji="🖋"/></a>
              }
              return (
                <div key={`content_item_${index}`} className="card">
                    <div className="card-bg">
                      <div className="card-header">
                        <p className="card-subtitle-p" style={{marginBottom: "0.75em"}}>{emoji_html}</p>
                        <p className="card-title">{data.title}</p>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{data.summary}</p>
                        <a className="gradient-button card-text" rel="noreferrer" target="_blank" href={data.source_link}>Sign this petition <Emoji name="writing hand" emoji="✍️"/> <span className="OCP">→</span></a><br />
                      </div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}
