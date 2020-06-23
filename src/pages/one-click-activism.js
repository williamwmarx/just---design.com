import React from "react";
import Emoji from "../components/Emoji.js"
import OneClickActivismData from "../../content/one-click-activism.json"
import "../sass/main.sass";
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
import Link from "../components/Link.js";

export default class OneClickActivism extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "Petitions"
    };
  }

  handleChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({value: event.target.value});
  }

  render() {
    let justice_emoji = <Emoji emoji="⚖️" name="balance scale"/>
    let legislation_emoji = <Emoji emoji="🖋" name="fountain pen"/>

    return (
      <CardContent title="ONE CLICK ACTIVISM.">
        <CardContent.Header>Select Activism Type</CardContent.Header>
        <div className="menu">
          <select value={this.state.value} onChange={this.handleChange}>
            {Object.keys(OneClickActivismData).map((key, source_index) => {
              return (
                <option key={`content_item_${source_index}`} value={OneClickActivismData[key]["name"]}>
                  {OneClickActivismData[key]["name"]}
                </option>
              );
            })}
          </select>
        </div>

        {
          this.state.value === "Petitions" && 
          <div>
            <CardContent.Header>Key</CardContent.Header>
            <CardContent.Text>{justice_emoji}&nbsp;&nbsp;Justice</CardContent.Text>
            <CardContent.Text>{legislation_emoji}&nbsp;&nbsp;Legislation</CardContent.Text>
            <br/>
            <CardContent.Header>Note</CardContent.Header>
            <CardContent.Text>Please do NOT donate to <Link href="https://www.change.org/">Change.org</Link>– the money does not go to any causes, but rather the corporation itself.</CardContent.Text>
            <br/>
          </div>
        }

        <CardStack ref={this.cardstackRef}>
          {
            this.state.value === "Petitions" && 
            OneClickActivismData.petitions.data.map((data, index) => {
              let emoji_tag = null;
              if (data.tag === "Justice") emoji_tag = <a>{justice_emoji}</a>
              if (data.tag === "Legislation") emoji_tag = <a>{legislation_emoji}</a>

              return (
                <Card key={`card_${index}`}>
                  <Card.Header>
                    <Card.Tags>{emoji_tag}</Card.Tags>
                    <Card.Title>{data.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{data.summary}</Card.Text>
                    <Card.Link href={data.source_link} text="Sign this petition" emoji="✍️" emoji_name="writing hand"/>
                  </Card.Body>
                </Card>
              );
            })
          }
          {
            this.state.value === "Emails" && 
            OneClickActivismData.emails.data.map((data, index) => {
              return (
                <Card key={`card_${index}`}>
                  <Card.Header>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Subtitle>{data.location}</Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Link href={data.source_link} text="Send this email" emoji="📧" emoji_name="email"/>
                  </Card.Body>
                </Card>
              );
            })
          }
        </CardStack>
      </CardContent>
    )
  }
}
