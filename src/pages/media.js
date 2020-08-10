/* Import React */
import React from "react";
/* Import Components */
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
/* Import Styles */
import "../sass/main.sass";
import "../sass/menu.component.sass";

export default class Media extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      typename: "All",
      tag: "All",
      media: []
    };
  }
  
  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    const that = this;
    fetch("https://spreadsheets.google.com/feeds/cells/1x-cYJY_dprfwvWXKUkwDn2Eiwzk0pIjZWLm0ZHLUk6w/1/public/full?alt=json")
    .then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: '+response.status);
            return;
        } else {
          return response.json();
        }
      }
    ).then(function(data) {
      let content = []
      let entries = data["feed"]["entry"]
      for (var i = 13; i < entries.length; i += 12) {
        let title = entries[i]["content"]["$t"]
        let typename = entries[i+1]["content"]["$t"]
        let source_link = entries[i+2]["content"]["$t"]
        let creators = []
        let creator_names = entries[i+3]["content"]["$t"].split("`")
        let creator_links = entries[i+4]["content"]["$t"].split("`")
        for (let i = 0; i < creator_names.length; i++) creators.push([creator_names[i], creator_links[i]])
        let summary = entries[i+5]["content"]["$t"]
        let summary_source = entries[i+6]["content"]["$t"]
        let summary_source_link = entries[i+7]["content"]["$t"]
        let taken_from = entries[i+8]["content"]["$t"]
        let taken_from_link = entries[i+9]["content"]["$t"]
        let tag = entries[i+10]["content"]["$t"]
        content.push([title, typename, source_link, creators, summary, summary_source, summary_source_link, taken_from, taken_from_link, tag])
      }
      that.setState({media: content})
    })
    .catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  render() {
    let media_typenames = ["All"];
    let media_tags = ["All"];
    for (let i = 0; i < this.state.media.length; i++) {
      let typename = this.state.media[i][1]
      let tag = this.state.media[i][9]
      if (!media_typenames.includes(typename)) media_typenames.push(typename)
      if (!media_tags.includes(tag)) media_tags.push(tag)
    } 

    return (
      <CardContent title="MEDIA.">
        <CardContent.Header>Select Media Type</CardContent.Header>
        <div className="menu">
          <select name="typename" value={this.state.typename} onChange={this.handleSortChange}>
            {media_typenames.sort().map((typename, source_index) => {
              return <option key={`content_item_${source_index}`} value={typename}>{typename}</option> 
            })}
          </select>
        </div>
        <div className="menu">
          <select name="tag" value={this.state.tag} onChange={this.handleSortChange}>
            {media_tags.sort().map((tag, source_index) => {
              return <option key={`content_item_${source_index}`} value={tag}>{tag}</option> 
            })}
          </select>
        </div>

        <CardStack ref={this.cardstackRef}>
          {this.state.media.map((data, index) => {
            let title = data[0] 
            let typename = data[1] 
            let source_link = data[2]
            let creators = data[3]
            let summary = data[4]
            let summary_source = data[5]
            let summary_source_link = data[6] 
            let taken_from = data[7] 
            let taken_from_link = data[8] 
            let tag = data[9]

            let source = null;
            if (summary_source_link !== "N/A") source = <Card.Subtext href={summary_source_link}>Summary c/o {summary_source}</Card.Subtext>

            let emoji_name = null;
            let emoji = null;
            let verb = "View";
            if (typename === "Film") {
              emoji_name = "film frames"
              emoji="🎞️"
            } else if (typename === "Interview") {
              emoji_name = "studio microphone"
              emoji="🎙"
            } else if (typename === "Video") {
              emoji_name = "video camera"
              emoji="📹"
            } else if (typename === "Audiobook") {
              emoji_name = "speaker with high volume"
              emoji="🔊"
              verb="Listen to"
            }

            if ((this.state.typename === "All" || this.state.typename === typename) && (this.state.tag === "All" || this.state.tag === tag)) {
              return (
                <Card key={`card_${index}`}>
                  <Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>
                      {creators.map((creators, c_index) => {
                        let creator = ""
                        if (c_index === 0) creator = <Card.Author key={`creator_${c_index}`} href={creators[1]}>{creators[0]}</Card.Author>                        
                        else if (c_index > 0) creator = <span key={`creator_${c_index}`} style={{lineHeight: "170%"}}>&nbsp;and&nbsp;<Card.Author key={`creator_${c_index}`} href={creators[1]}>{creators[0]}</Card.Author></span>                  
                        return creator;
                      })}
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{summary}</Card.Text>
                    {source && <Card.Text>{source}</Card.Text>}
                    <Card.Link href={source_link} text={`${verb} this ${typename}`} emoji={emoji} emoji_name={emoji_name}/>
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
