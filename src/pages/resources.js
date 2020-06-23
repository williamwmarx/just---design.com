import React from "react";
import Emoji from "../components/Emoji.js"
import ResourcesData from "../../content/resources.json"
import "../sass/main.sass";
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
import Link from "../components/Link.js";

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: Object.keys(ResourcesData)[0]
    };
  }

  handleChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <CardContent title="RESOURCES.">
        <CardContent.Header>Select Resource Type</CardContent.Header>
        <div className="menu">
          <select value={this.state.value} onChange={this.handleChange}>
            {Object.keys(ResourcesData).map((key, source_index) => {
              return (
                <option key={`content_item_${source_index}`} value={ResourcesData[key]["name"]}>
                  {ResourcesData[key]["name"]}
                </option>
              );
            })}
          </select>
        </div>

        {
          this.state.value === "Architecture" && 
          <div>
            <CardContent.Header>Key</CardContent.Header>
            <CardContent.Text>Something</CardContent.Text>
            <br/>
          </div>
        }

        <CardStack ref={this.cardstackRef}>
          {ResourcesData[this.state.value].data.map((data, index) => {
              return (
                <Card key={`card_${index}`}>
                  {/* <Card.Header>
                    <Card.Tags>{emoji_tag}</Card.Tags>
                    <Card.Title>{data.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{data.summary}</Card.Text>
                    <Card.Link href={data.source_link} text="Sign this petition" emoji="✍️" emoji_name="writing hand"/>
                  </Card.Body> */}
                </Card>
              );
            })
          }
        </CardStack>
      </CardContent>
    )
  }
}
