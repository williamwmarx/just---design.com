import React from "react";
import ResourcesData from "../../content/resources.json"
import "../sass/main.sass";
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: Object.keys(ResourcesData).sort()[0]
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
            {Object.keys(ResourcesData).sort().map((key, idx) => {
              return (
                <option key={`option_${idx}`} value={key}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>

        <CardStack ref={this.cardstackRef}>
          {ResourcesData[this.state.value].sort().map((data, index) => {
            return (
              <Card key={`card_${index}`}>
                <Card.Header>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Subtitle>
                    {data.authors.map((author, a_idx) => {                  
                      return <span key={`author_${a_idx}`}>{(a_idx > 0) && <span>&nbsp;and&nbsp;</span>}<Card.Author href={author.link}>{author.name}</Card.Author></span>
                    })}
                  </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                  {
                    data.summary &&
                    <Card.Text>
                      {data.summary}
                      {data.summary_source && <Card.Subtext href={data.summary_source_link}><br/>Summary c/o {data.summary_source}</Card.Subtext>}
                    </Card.Text>
                  }
                  {this.state.value === "Grants/Funding" && <Card.Link href={data.source_link} text="Get more information" emoji_name="money with wings" emoji="💸"/>}
                  {this.state.value === "Entourage" && <Card.Link href={data.source_link} text="Go to entourage" emoji_name="smiling face with sunglasses" emoji="😎"/>}
                  {this.state.value === "Syllabi" && <Card.Link href={data.source_link} text="See the syllabus" emoji_name="card index dividers" emoji="🗂"/>}
                  {this.state.value === "Bookstores" && data.source_link && <Card.Link href={data.source_link} text="Go to site" emoji_name="globe with meridians" emoji="🌐"/>}
                </Card.Body>
              </Card>
            );
          })}
        </CardStack>
      </CardContent>
    )
  }
}
