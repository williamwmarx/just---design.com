/* Import React */
import React from "react";
/* Import Components */
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
/* Import Styles */
import "../sass/main.sass";
/* Import Data */
import MediaData from "../../content/media.json"

export default class Media extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "All"
    };
  }
  
  handleChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({value: event.target.value});
  }

  render() {
    let media_typenames = ["All"];
    for (let i = 0; i < MediaData.media.length; i++) {
      let typename = MediaData.media[i]["typename"]
      if (!media_typenames.includes(typename))
      media_typenames.push(typename)
    } 

    return (
      <CardContent title="MEDIA.">
        <CardContent.Header>Select Media Type</CardContent.Header>

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

        <CardStack ref={this.cardstackRef}>
          {MediaData.media.map((data, index) => {
            let source = null;
            if (data.summary_source != null) source = <Card.Subtext href={data.summary_source_link}>Summary c/o {data.summary_source}</Card.Subtext>
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
            if (this.state.value === "All" || this.state.value === data.typename) {
              return (
                <Card key={`card_${index}`}>
                  <Card.Header>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Subtitle>
                      {data.creators.map((creators, c_index) => {
                        let creator = ""
                        if (c_index === 0) creator = <Card.Author key={`author_${c_index}`} href={creators.link}>{creators.name}</Card.Author>                        
                        else if (c_index > 0) creator = <span style={{lineHeight: "170%"}}>&nbsp;and&nbsp;<Card.Author key={`author_${c_index}`} href={creators.link}>{creators.name}</Card.Author></span>                  
                        return creator;
                      })}
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{data.summary}</Card.Text>
                    {
                      source && <Card.Text>{source}</Card.Text>
                    }
                    <Card.Link href={data.source_link} text={`View this ${data.typename}`} emoji={emoji} emoji_name={emoji_name}/>
                  </Card.Body>
                </Card>
              )
            }
          })}
        </CardStack>
      </CardContent>
    )
  }
}