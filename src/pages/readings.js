import React from "react";
/* Import Components */
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
import "../sass/main.sass";
import ReadingsData from "../../content/readings.json"

export default class Readings extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: Object.keys(ReadingsData).sort()[0]
    };
  }

  handleChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({value: event.target.value});
  }
  
  render() {
    return (
      <CardContent title="READINGS.">
        <CardContent.Header>Select Text Type</CardContent.Header>
        <div className="menu">
          <select value={this.state.value} onChange={this.handleChange}>
            {Object.keys(ReadingsData).sort().map((key, idx) => {
              return (
                <option key={`option_${idx}`} value={key}>
                  {key}
                </option>
              );
            })}
          </select>
        </div>

        <CardStack ref={this.cardstackRef}>
          {ReadingsData[this.state.value].sort(function () {return .5 - Math.random();}).map((data, index) => {
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
                  {this.state.value === "Statements" && <Card.Link href={data.source_link} text="View this statement" emoji_name="memo" emoji="📝"/>}
                  {this.state.value === "Papers" && <Card.Link href={data.source_link} text="Read this paper" emoji_name="page facing up" emoji="📄"/>}
                  {this.state.value === "Books" && data.free === true && <Card.Link href={data.source_link} text="Read this book" emoji_name="stack of books" emoji="📚"/>}
                  {this.state.value === "Books" && data.free !== true && <Card.Link href={data.source_link} text="Buy this book" emoji_name="stack of books" emoji="💰"/>}
                  {this.state.value === "Manifestos" && <Card.Link href={data.source_link} text="Read this manifesto" emoji_name="red textbook" emoji="📕"/>}
                </Card.Body>
              </Card>
            );
          })}
        </CardStack>
      </CardContent>
    )
  }
}
