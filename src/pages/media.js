/* Import React */
import React from "react";
/* Import Components */
import Button from "../components/Button"
// import Emoji from "../components/Emoji"
import Head from "../components/Head";
import Title from "../components/Title";
/* Import Styles */
import "../sass/main.sass";
/* Import Data */
import MediaData from "../../content/media.json"

let subheading = {margin: "0 0 0.5em 0", padding: "0px", fontFamily: "PoppinsMedium", fontSize: "150%", color: "#aaa"}

export default class Media extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      height: 500000,
      value: "All"
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

  handleChange(event) {
    this.setState({
      height: this.get_cards_height(),
      value: event.target.value
    });
  }

  componentDidMount() {
    this.setState({
      height: this.get_cards_height(),
      value: "All"
    })
  }

  render() {
    let media_typenames = ["All"];
    for (let i = 0; i < MediaData.media.length; i++) {
      let typename = MediaData.media[i]["typename"]
      if (!media_typenames.includes(typename))
      media_typenames.push(typename)
    } 

    return (
      <div className="root">
        <Head title="JUST DESIGN. MEDIA."/>

        <Title name="MEDIA."/>

        <div className="card-content">
          <p style={subheading}>Select Media Type</p>
            <div className="menu">
              <select value={this.state.value} onChange={this.handleChange}>
                {media_typenames.map((typename, source_index) => {
                  return (
                    <option key={`content_item_${source_index}`} value={typename}>
                      {typename.charAt(0).toUpperCase() + typename.substr(1).toLowerCase()}
                    </option>
                  );
                })}
              </select>
            </div>

          <div className="cards" style={{height: this.state.height, value: this.state.value}}>
            {MediaData.media.map((data, index) => {
              let source = null;
              if (data.summary_source != null) {
                source = <span className="card-text"><a className="card-text-a" rel="noreferrer" target="_blank" href={data.summary_source_link}><br/>Summary c/o {data.summary_source}</a></span>
              }
              let emoji_name = null;
              let emoji = null;
              if (data.typename === "film") {
                emoji_name = "film frames"
                emoji="🎞️"
              } else if (data.typename === "interview") {
                emoji_name = "studio microphone"
                emoji="🎙"
              } else if (data.typename === "video") {
                emoji_name = "video camera"
                emoji="📹"
              }
              let card = null;
              if (this.state.value === "All" || this.state.value === data.typename) {
                card = (
                  <div key={`content_item_${index}`} className="card">
                    <div className="card-bg">
                      <div className="card-header">
                        <p className="card-title">{data.title}</p>
                        <p className="card-subtitle-p">
                          {data.creators.map((creators, c_index) => {
                            let creator = ""
                            if (c_index === 0) {
                                creator = <a key={`creator_item_${c_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={creators.link} style={{color: "#6c757d !important"}}>{creators.name}</a>                        
                            } else if (c_index > 0) {
                                creator = <span style={{lineHeight: "170%"}}>&nbsp;and&nbsp;<a key={`creator_item_${c_index}`} className="card-subtitle-a" rel="noreferrer" target="_blank" href={creators.link}>{creators.name}</a></span>                  
                            }
                            return creator;
                          })}
                        </p>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{data.summary}{source}</p>
                        <Button className="card-text" href={data.source_link} text={`View this ${data.typename}`} emoji={emoji} emoji_name={emoji_name}/>
                      </div>
                    </div>
                  </div>
                )
              }
              return card;
            })}
          </div>
        </div>
      </div>
    )
  }
}