/* Import React */
import React from "react";
/* Import Components */
import Button from "../components/Button"
import Emoji from "../components/Emoji"
import Head from "../components/Head";
import Title from "../components/Title";
/* Import Styles */
import "../sass/main.sass";
/* Import Data */
import BIPOCPraxesData from "../../content/bipoc_praxes.json"
/* Import Content */
import BlackOwned from "../../static/images/black_owned.png"
import IndigenousOwned from "../../static/images/indigenous_owned.png"
import NonBinaryOwned from "../../static/images/non_binary_owned.png"
import WomenOwned from "../../static/images/women_owned.png"

// let black_bandcamp_artists_json = "https://spreadsheets.google.com/feeds/cells/1OIUBp4kFxmpWJihhq6WLwJQR1Am4DsD59bEYlJZxeGY/1/public/full?alt=json";

// Define images for use in bipoc_studios_header and bipoc_studios_cards
let BlackOwnedImage = <img src={BlackOwned} alt="Black Owned" height="16em"/>
let IndigenousOwnedImage = <img src={IndigenousOwned} alt="Indigenous Owned" height="16em"/>
let NonBinaryOwnedImage = <img src={NonBinaryOwned} alt="Non-Binary Owned" height="16em"/>
let WomenOwnedImage = <img src={WomenOwned} alt="Women Owned" height="16em"/>

let subheading = {margin: "0 0 0.5em 0", padding: "0px", fontFamily: "PoppinsMedium", fontSize: "150%", color: "#aaa"}

function BIPOCStudiosHeader() {
  return (
    <div>
      <p style={subheading}>Key</p>
      <p className="indentText">{BlackOwnedImage}&nbsp;&nbsp;Black Owned</p>
      <p className="indentText">{IndigenousOwnedImage}&nbsp;&nbsp;Indigenous Owned</p>
      <p className="indentText">{NonBinaryOwnedImage}&nbsp;&nbsp;Non-Binary Owned</p>
      <p className="indentText">{WomenOwnedImage}&nbsp;&nbsp;Women Owned</p>
      <p className="indentText"><Emoji emoji="🛠" name="hammer and wrench"/>&nbsp;&nbsp;Hiring</p>
      <p className="indentText"><Emoji emoji="🔎" name="magnifying glass tilted right"/>&nbsp;&nbsp;Looking for Collaborators</p>
      <p className="indentText"><Emoji emoji="📓" name="notebook"/>&nbsp;&nbsp;Taken from <a rel="noreferrer" target="_blank" href="https://docs.google.com/spreadsheets/u/0/d/1ZiWjlfqc02OeWL4hTNZymVT_kyNnO42xG-hucO3rC0E/htmlview">BIPOC Studios Google Doc</a></p>
      <br/>
      <p style={subheading}>Credit</p>
      <p className="indentText">
        All credit for this page goes to <a rel="noreferrer" target="_blank" href="https://www.instagram.com/dongpingwong/">Dong-Ping Wong</a> &amp; <a rel="noreferrer" target="_blank" href="https://www.instagram.com/p/CBEpwOgJcaM/">Associates</a> for the creation of this database on the aforementioned <a rel="noreferrer" target="_blank" href="https://docs.google.com/spreadsheets/u/0/d/1ZiWjlfqc02OeWL4hTNZymVT_kyNnO42xG-hucO3rC0E/htmlview">BIPOC Studios Google Doc</a>.
        This page is merely intended to make 
      </p>
    </div>
  )
}

class BIPOCStudiosCards extends React.Component {
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
      <div className="cards" style={{height: this.state.height}}>
        {BIPOCPraxesData["bipoc_studios"].content.map((data, index) => {
          let emoji_html = (
            <span>
              {data.black_owned && <span>{BlackOwnedImage}&nbsp;&nbsp;</span>}
              {data.indigenous_owned && <span>{IndigenousOwnedImage}&nbsp;&nbsp;</span>}
              {data.non_binary_owned && <span>{NonBinaryOwnedImage}&nbsp;&nbsp;</span>}
              {data.women_owned && <span>{WomenOwnedImage}&nbsp;&nbsp;</span>}
              {data.hiring && <span><Emoji emoji="🛠" name="hammer and wrench"/>&nbsp;</span>}
              {data.looking_for_collaborators && <span><Emoji emoji="🔎" name="magnifying glass tilted right"/>&nbsp;</span>}
              {<span><Emoji emoji="📓" name="notebook"/>&nbsp;</span>}
            </span>
          );

          let link = <br/>
          if (data.contact[0]["email"] != null) {
            let contact_name = null;
            if (data.contact[0]["name"] != null) {
              contact_name = data.contact[0]["name"]
            } else {
              contact_name = data["studio_name"]
            }
            let url = data.contact[0]["email"]
            if (url.includes("@")) {
              link = <Button className="card-text" href={`mailto:${url}?body=${contact_name},`} text={contact_name} emoji_name="incoming envelope" emoji="📨"/>
            } else {
              link = <Button className="card-text" href={url} text={contact_name} emoji_name="globe with meridians" emoji="🌐"/>
            }
          }

          let hiring_positions = null;
          if ((data.hiring || data.looking_for_collaborators) && data.hiring_positions) {
            hiring_positions = (
              <p className="card-text">
                {data.hiring && <span><Emoji emoji="🛠" name="hammer and wrench"/>&nbsp;</span>}
                {data.looking_for_collaborators && <span><Emoji emoji="🔎" name="magnifying glass tilted right"/>&nbsp;</span>}
                {data.hiring_positions}
            </p>
            )
          }

          return (
            <div key={`content_item_${index}`} className="card">
              <div className="card-bg">
                <div className="card-header">
                  <p className="card-subtitle-p" style={{marginBottom: "0.5em"}}>{emoji_html}</p>
                  <p className="card-title">{data.studio_name}</p>
                  <p className="card-subtitle-p">
                    {data.type.map((type, type_index) => {
                      let t = type;
                      if (type_index > 0) {
                        t = ", " + type
                      }
                      return(
                        <span>{t}</span>
                      );
                    })}
                  </p>
                  <p className="card-subtitle-p-2">
                    {data.location.map((location, location_index) => {
                      let loc = location;
                      if (location_index > 0) {
                        loc = ", " + location
                      }
                      return(
                        <span key={`content_item_${location_index}`}>{loc}</span>
                      );
                    })}
                  </p>
                </div>
                <div className="card-body">
                  {hiring_positions}
                  <span>
                    {data.instagram.map((ig, ig_index) => {       
                      return (
                        <span key={`ig_item_${ig_index}`} className="card-text-p">
                          <Button className="card-text" style={{marginBottom: "0.5em"}} 
                            href={`https://instagram.com/${ig}`} text={`@${ig}`} emoji_name="camera with flash" emoji="📸"/>
                        </span>
                      );
                    })}
                  </span>
                  {link}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}

export default class BIPOCPraxes extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "BIPOC Studios"
    };
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    let content = null;
    if (this.state.value === "BIPOC Studios") {
      content = (
        <div>
          <BIPOCStudiosHeader/><br/>
          <BIPOCStudiosCards/>
        </div>
      )
    }

    return (
      <div className="root" style={{paddingBottom: "0px"}}>
        <Head title="JUST DESIGN. BIPOC PRAXES."/>
        <Title name="BIPOC PRAXES."/>

        <div className="card-content">
          <p style={subheading}>Select</p>
          <div className="menu">
            <select value={this.state.value} onChange={this.handleChange}>
              {Object.keys(BIPOCPraxesData).map((key, source_index) => {
                return (
                  <option key={`content_item_${source_index}`} value={BIPOCPraxesData[key]["source"]}>
                    {BIPOCPraxesData[key]["source"]}
                  </option>
                );
              })}
            </select>
          </div>
          {content}
        </div>
      </div>
    );
  }
}
