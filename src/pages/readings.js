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
  }
  
  render() {
    return (
      <CardContent title="READINGS.">
        <CardStack>
          {ReadingsData.readings.map((data, index) => {
            let summary = null;

            if (data.summary != null) {
              if (data.summary_source != null) {
                summary = <Card.Text>{data.summary}<Card.Subtext href={data.summary_source_link}><br/>Summary c/o {data.summary_source}</Card.Subtext></Card.Text>
              } else {
                summary = <p className="card-text">{data.summary}</p>
              }
            }

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
                  {summary}
                  <a className="gradient-button card-text" rel="noreferrer" target="_blank" href={data.source_link}>Read this text <Emoji name="books" emoji="📚"/> <span className="OCP">→</span></a><br />
                </Card.Body>
              </Card>
            );
          })}
        </CardStack>
      </CardContent>
    )
  }
}
