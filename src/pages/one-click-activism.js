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
    let arch_emoji = <Emoji emoji="🏘" name="group of houses"/>
    let awareness_emoji = <Emoji emoji="👁" name="eye"/>
    return (
      <CardContent title="ONE CLICK ACTIVISM.">
        <CardContent.Header>Select Activism Type</CardContent.Header>
        <div className="menu">
          <select value={this.state.value} onChange={this.handleChange}>
            {Object.keys(OneClickActivismData).sort().map((key, idx) => {
              return (
                <option key={`option_${idx}`} value={OneClickActivismData[idx]}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>

        {
          this.state.value === "Petitions" && 
          <div>
            <CardContent.Header>Key</CardContent.Header>
            <CardContent.Text>{arch_emoji}&nbsp;&nbsp;Architecture/Design</CardContent.Text>
            <CardContent.Text>{awareness_emoji}&nbsp;&nbsp;Awareness</CardContent.Text>
            <CardContent.Text>{justice_emoji}&nbsp;&nbsp;Justice</CardContent.Text>
            <CardContent.Text>{legislation_emoji}&nbsp;&nbsp;Legislation</CardContent.Text>
            <br/>
            <CardContent.Header>Note</CardContent.Header>
            <CardContent.Text>Please do NOT donate to <Link href="https://www.change.org/">Change.org</Link>– the money does not go to any causes, but rather the corporation itself.</CardContent.Text>
            <br/>
          </div>
        }

        <CardStack ref={this.cardstackRef}>
          {OneClickActivismData[this.state.value].sort(function () {return .5 - Math.random();}).map((data, index) => {
            return (
              <Card key={`card_${index}`}>
                <Card.Header>
                  <Card.Tags>
                    {(data.tag === "Justice") && justice_emoji}
                    {(data.tag === "Legislation") && legislation_emoji}
                    {(data.tag === "Architecture/Design") && arch_emoji}
                    {(data.tag === "Awareness") && awareness_emoji}
                    {(data.tag.startsWith("Text")) && data.tag}
                  </Card.Tags>
                  <Card.Title>{data.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{data.summary}</Card.Text>
                  {
                    this.state.value === "Petitions" && 
                    <Card.Link href={data.source_link} text="Sign this petition" emoji="✍️" emoji_name="writing hand"/>
                  }
                  {
                    this.state.value === "Emails" && 
                    <Card.Link href={data.source_link} text="Send this email" emoji="📧" emoji_name="email"/>
                  }
                  {
                    this.state.value === "More than One Click" && 
                    <Card.Link href={data.source_link} text="Put in the work" emoji="🔩" emoji_name="nut and bolt"/>
                  }
                  {
                    this.state.value === "Texts" && 
                    <Card.Link href={data.source_link} text="Send the text" emoji="📲" emoji_name="phone with arrow"/>
                  }
                </Card.Body>
              </Card>
            );
          })}
        </CardStack>
      </CardContent>
    )
  }
}
