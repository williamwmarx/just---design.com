/* Import React */
import React from "react";
/* Import Components */
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
import Emoji from "../components/Emoji.js";
import Link from "../components/Link.js";
/* Import Styles */
import "../sass/main.sass";
import "../sass/menu.component.sass";
/* Import Spare Data */
import RacialJusticeReadingsSparse from "../../static/json/RacialJusticeReadingsSparse.json"

export default class RacialJusticeReadings extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      tag: "All",
      search_query: "",
      glossary: [],
      readings: RacialJusticeReadingsSparse["readings"]
    };
  }
  
  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({[event.target.name]: event.target.value});
    if (event.target.name === "search_query") this.setState({category: "All"})
  }

  componentDidMount() {
    const that = this;
    fetch("https://spreadsheets.google.com/feeds/cells/10xoMrSOqSeUDrYtNgT8tIdsvQK1Qp1x7copA3kPu_cs/1/public/full?alt=json")
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
      for (var i = 0; i < entries.length; i += 10) {
        let title = entries[i]["content"]["$t"]
        let source_link = entries[i+1]["content"]["$t"]
        let writers = []
        let writer_names = entries[i+2]["content"]["$t"].split("`")
        let writer_links = entries[i+3]["content"]["$t"].split("`")
        for (let i = 0; i < writer_names.length; i++) writers.push([writer_names[i], writer_links[i]])
        let summary = entries[i+4]["content"]["$t"]
        let summary_source = entries[i+5]["content"]["$t"]
        let summary_source_link = entries[i+6]["content"]["$t"]
        let taken_from = entries[i+7]["content"]["$t"]
        let taken_from_link = entries[i+8]["content"]["$t"]
        let tag = entries[i+9]["content"]["$t"]
        content.push([title, source_link, writers, summary, summary_source, summary_source_link, taken_from, taken_from_link, tag])
      }
      that.setState({readings: content})
      fetch("https://spreadsheets.google.com/feeds/cells/10xoMrSOqSeUDrYtNgT8tIdsvQK1Qp1x7copA3kPu_cs/5/public/full?alt=json")
      .then(function(response) {
          if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: '+response.status);
              return;
          } else {
            return response.json();
          }
        }
      ).then(function(data) {
        let glossary_content = []
        let entries = data["feed"]["entry"]
        for (var i = 0; i < entries.length; i += 4) {
          let target_page = entries[i]["content"]["$t"]
          let term = entries[i+1]["content"]["$t"]
          let definition = entries[i+2]["content"]["$t"]
          let link = entries[i+3]["content"]["$t"]
          if (target_page === "Racial Justice Readings") glossary_content.push([term, definition, link])
        }
        that.setState({glossary: glossary_content})
      }).catch(function(err) {
          console.log('Fetch Error: ', err);
      });
    }).catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  render() {
    let reading_tags = ["All"];
    for (let i = 0; i < this.state.readings.length; i++) {
      let tag = this.state.readings[i][8]
      if (!reading_tags.includes(tag)) reading_tags.push(tag)
    } 

    return (
      <CardContent title="Racial Justice Readings.">
        <CardContent.Header>Glossary</CardContent.Header>
            {this.state.glossary.map((data, idx) => {
              return (
                <div key={`entry_${idx}`}>
                  <CardContent.Text>
                    <strong><Link href={data[2]}>{data[0]}</Link></strong>
                  </CardContent.Text>
                  <p className="glossary-definition">
                    {data[1]}
                  </p>
                </div>
              );
            })}
        <br/>
        <CardContent.Header>Submissions</CardContent.Header>
          <CardContent.Text>
            <Link href="https://forms.gle/a3LyuVnYSUyRUJ5a9">Submit a term for the glossary→</Link>  <Emoji emoji="📝" emoji_name="memo"/> <Emoji emoji="➕" emoji_name="plus sign"/><br/>
          </CardContent.Text>
          <CardContent.Text>
            <Link href="https://forms.gle/a3LyuVnYSUyRUJ5a9">Submit a reading on racial justice→</Link>  <Emoji emoji="📖" emoji_name="open book"/><Emoji emoji="➕" emoji_name="plus sign"/>
          </CardContent.Text>
        <CardContent.Header></CardContent.Header>
        <br/>
        <CardContent.Header>Select Topic</CardContent.Header>
        <div className="menu">
          <select name="tag" value={this.state.tag} onChange={this.handleSortChange}>
            {reading_tags.sort().map((tag, source_index) => {
              return <option key={`content_item_${source_index}`} value={tag}>{tag}</option> 
            })}
          </select>
        </div>
        <input name="search_query" onChange={this.handleSortChange} className="search" type="text" placeholder="Search..."/>


        <CardStack ref={this.cardstackRef}>
          {this.state.readings.map((data, index) => {
            let title = data[0] 
            let source_link = data[1]
            let writers = data[2]
            let summary = data[3]
            let summary_source = data[4]
            let summary_source_link = data[5] 
            let taken_from = data[6] 
            let taken_from_link = data[7] 
            let tag = data[8]

            let source = null;
            if (summary_source_link !== "N/A") source = <Card.Subtext href={summary_source_link}>Summary c/o {summary_source}</Card.Subtext>

            // Search Query String
            let search_string = [title, writers.flat(), summary, summary_source].join().toLowerCase()

            if (
                (this.state.search_query === "" || search_string.includes(this.state.search_query.toLowerCase()))
                && (this.state.tag === "All" || this.state.tag === tag)
              ) {
              return (
                <Card key={`card_${index}`}>
                  <Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>
                      {writers.map((writers, c_index) => {
                        let creator = ""
                        if (c_index === 0) creator = <Card.Author key={`creator_${c_index}`} href={writers[1]}>{writers[0]}</Card.Author>                        
                        else if (c_index > 0) creator = <span key={`creator_${c_index}`} style={{lineHeight: "170%"}}>&nbsp;and&nbsp;<Card.Author key={`creator_${c_index}`} href={writers[1]}>{writers[0]}</Card.Author></span>                  
                        return creator;
                      })}
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{summary}</Card.Text>
                    {
                      source && <Card.Text>{source}</Card.Text>
                    }
                    <Card.Link href={source_link} text="Read this text" emoji="📖" emoji_name="open book"/>
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
