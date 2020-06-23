import React from "react";
import Emoji from "../components/Emoji.js"
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
      value: Object.keys(ReadingsData)[0]
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
            {Object.keys(ReadingsData).map((obj, idx) => {
              return (
                <option key={`option_${idx}`} value={Object.keys(ReadingsData)[idx]}>
                  {Object.keys(ReadingsData)[idx]}
                </option>
              );
            })}
          </select>
        </div>

        <CardStack ref={this.cardstackRef}>
          {ReadingsData[this.state.value].map((data, index) => {
            return (
              <Card key={`card_${index}`}>
                <Card.Header>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Subtitle>
                    {data.authors.map((author, a_index) => {
                      let author_name = "";
                      if (a_index === 0) author_name = <Card.Author key={`author_${a_index}`} href={author.link}>{author.name}</Card.Author>                        
                      else if (a_index > 0) author_name = <span>&nbsp;and&nbsp;<Card.Author key={`author_${a_index}`} href={author.link}>{author.name}</Card.Author></span>
                      return author_name;
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
                  {this.state.value === "Statements" && <Card.Link href={data.source_link} text="Read this statement" emoji_name="memo" emoji="📝"/>}
                  {this.state.value === "Essays" && <Card.Link href={data.source_link} text="Read this essay" emoji_name="page facing up" emoji="📄"/>}
                  {this.state.value === "Book" && <Card.Link href={data.source_link} text="Read this book" emoji_name="stack of books" emoji="📚"/>}
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
