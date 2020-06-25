/* Import React */
import React from "react";
/* Import Components */
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
/* Import Styles */
import "../sass/main.sass";
import "../sass/menu.component.sass";
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
let HiringEmoji = <Emoji emoji="🛠" name="hammer and wrench"/>
let CollabEmoji = <Emoji emoji="🔎" name="magnifying glass tilted right"/>
let BIPOCStudiosEmoji = <Emoji emoji="📓" name="notebook"/>

function BIPOCStudios() {
  return (
    <div>
      <CardContent.Header>Key</CardContent.Header>
        <CardContent.Text>{BlackOwnedImage}&nbsp;&nbsp;Black Owned</CardContent.Text>
        <CardContent.Text>{IndigenousOwnedImage}&nbsp;&nbsp;Indigenous Owned</CardContent.Text>
        <CardContent.Text>{NonBinaryOwnedImage}&nbsp;&nbsp;Non-Binary Owned</CardContent.Text>
        <CardContent.Text>{WomenOwnedImage}&nbsp;&nbsp;Women Owned</CardContent.Text>
        <CardContent.Text>{HiringEmoji}&nbsp;&nbsp;Hiring</CardContent.Text>
        <CardContent.Text>{CollabEmoji}&nbsp;&nbsp;Looking for Collaborators</CardContent.Text>
        <CardContent.Text>{BIPOCStudiosEmoji}&nbsp;&nbsp;Taken from <Link href="https://docs.google.com/spreadsheets/u/0/d/1ZiWjlfqc02OeWL4hTNZymVT_kyNnO42xG-hucO3rC0E/htmlview">BIPOC Studios Google Doc</Link></CardContent.Text>
      <br/>
      <CardContent.Header>Credit</CardContent.Header>
        <CardContent.Text>
          All credit for this page goes to <Link href={`https://instagram.com/dongpingwong/`}>Dong-Ping Wong</Link> &amp; <Link href="https://instagram.com/p/CBEpwOgJcaM">Associates</Link> for the creation of this database on the aforementioned <Link href="https://docs.google.com/spreadsheets/u/0/d/1ZiWjlfqc02OeWL4hTNZymVT_kyNnO42xG-hucO3rC0E/htmlview">BIPOC Studios Google Doc</Link>.
          This page is merely intended to make 
        </CardContent.Text>
      <br/>
      <CardStack>
        {BIPOCPraxesData["bipoc_studios"].data.map((data, index) => {
          let emoji_html = (
            <span>
              {data.black_owned && <span>{BlackOwnedImage}&nbsp;&nbsp;</span>}
              {data.indigenous_owned && <span>{IndigenousOwnedImage}&nbsp;&nbsp;</span>}
              {data.non_binary_owned && <span>{NonBinaryOwnedImage}&nbsp;&nbsp;</span>}
              {data.women_owned && <span>{WomenOwnedImage}&nbsp;&nbsp;</span>}
              {data.hiring && <span><Emoji emoji="🛠" name="hammer and wrench"/>&nbsp;</span>}
              {data.looking_for_collaborators && <span>{CollabEmoji}&nbsp;</span>}
              {<span>{BIPOCStudiosEmoji}&nbsp;</span>}
            </span>
          );

          let link = null
          if (data.contact[0]["email"] != null) {
            let contact_name = null;
            if (data.contact[0]["name"] != null)  contact_name = data.contact[0]["name"]
            else contact_name = data["studio_name"]
            let url = data.contact[0]["email"]
            if (url.includes("@")) link = <Card.Link href={`mailto:${url}?body=${contact_name}—`} text={contact_name} emoji_name="incoming envelope" emoji="📨"/>
            else link = <Card.Link href={url} text={contact_name} emoji_name="globe with meridians" emoji="🌐"/>
          }

          let hiring_positions = null;
          if ((data.hiring || data.looking_for_collaborators) && data.hiring_positions) {
            hiring_positions = (
              <Card.Text>
                {data.hiring && <span>{HiringEmoji}&nbsp;</span>}
                {data.looking_for_collaborators && <span>{CollabEmoji}&nbsp;</span>}
                {data.hiring_positions}
              </Card.Text>
            )
          }

          return (
            <Card key={`card_${index}`}>
              <Card.Header>
                <Card.Tags>{emoji_html}</Card.Tags>
                <Card.Title>{data.studio_name}</Card.Title>
                {data.type !== [] && <Card.Subtitle>{data.type}</Card.Subtitle>}
                {data.location !== [] && <Card.Subtitle2>{data.location}</Card.Subtitle2>}
              </Card.Header>
              <Card.Body>
                {hiring_positions}
                {data.instagram && data.instagram.map((ig, ig_index) => {
                  return <Card.Link key={`instagram_${ig_index}`} href={`https://instagram.com/${ig}`} text={`@${ig}`} emoji="📸" emoji_name="camera with flash"/>
                })}
                {link}
                {data.website && <Card.Link href={data.website} text="Go to website" emoji="🌐" emoji_name="globe with meridians"/>}
              </Card.Body>
            </Card>
          );
        })}
      </CardStack>
    </div>
  )
}

function Canty200BlackCreators() {
  return (
    <div>
      <CardContent.Header>Credit</CardContent.Header>
        <CardContent.Text>
          All credit for this page goes to <Link href="http://www.seancanty.net/">Sean Canty</Link> for the creation of this database through <Link href={`https://instagram.com/sean_canty_/`}>Instagram stories </Link> and his <Link href="https://airtable.com/universe/expJajWdokNAa6zqN/200-black-creators?explore=true">Airtable page</Link>.
        </CardContent.Text>
      <br/>
      <CardStack>
        {BIPOCPraxesData["canty_200"].data.map((data, index) => {
          return (
            <Card key={`card_${index}`}>
              <Card.Header>
                <Card.Title>{data.studio_name}</Card.Title>
                {
                  data.type !== [] &&
                  <Card.Subtitle>
                    {data.type.map((type, type_index) => {
                      let t = type;
                      if (type_index > 0) t = ", " + type
                      return <span>{t}</span>
                    })}
                  </Card.Subtitle>
                }
              </Card.Header>
              <Card.Body>
                <Card.Link href={`https://instagram.com/${data.instagram}`} text={`@${data.instagram}`} emoji="📸" emoji_name="camera with flash"/>
                <Card.Link href={data.website_url} text={data.website_name} emoji_name="globe with meridians" emoji="🌐"/>
              </Card.Body>
            </Card>
          );
        })}
      </CardStack>
    </div>
  )
}

// MAIN RENDER
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
    return (
      <CardContent title="BIPOC PRAXES.">
        <CardContent.Header>Select</CardContent.Header>
        
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
        {this.state.value === "BIPOC Studios" && <BIPOCStudios/>}
        {this.state.value === "200 Black Creators" && <Canty200BlackCreators/>}
      </CardContent>
    );
  }
}
