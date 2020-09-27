/* Import React */
import React from "react";
/* Import Components */
import Card from "../components/Card.js";
import Page from "../components/Page.js";
import CardStack from "../components/CardStack.js";
import Emoji from "../components/Emoji.js";
import Link from "../components/Link.js";
/* Import Styles */
import "../sass/main.sass";
/* Import Spare Data */
import RacialJusticeMediaSparse from "../../static/json/RacialJusticeMediaSparse.json"

export default class RacialJusticeMedia extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      typename: "All",
      tag: "All",
      search_query: "",
      glossary: [],
      media: RacialJusticeMediaSparse["media"]
    };
  }
  
  /* Handle changes to media type, category and/or search */
  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({[event.target.name]: event.target.value});
    if (event.target.name === "search_query") this.setState({typename: "All", tag: "All"})
  }

  componentDidMount() {
    const that = this;
    /* Get media data from published Google Sheets */
    fetch("https://spreadsheets.google.com/feeds/cells/10xoMrSOqSeUDrYtNgT8tIdsvQK1Qp1x7copA3kPu_cs/2/public/full?alt=json")
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
      for (var i = 0; i < entries.length; i += 11) {
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
      /* Get glossary data from published Google Sheets */
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
        /* Parse glossary JSON and set state */
        let glossary_content = []
        let entries = data["feed"]["entry"]
        for (var i = 0; i < entries.length; i += 4) {
          let target_page = entries[i]["content"]["$t"]
          let term = entries[i+1]["content"]["$t"]
          let definition = entries[i+2]["content"]["$t"]
          let link = entries[i+3]["content"]["$t"]
          if (target_page === "Racial Justice Media") glossary_content.push([term, definition, link])
        }
        that.setState({glossary: glossary_content})
      })
      .catch(function(err) {
          console.log('Fetch Error: ', err);
      });
    })
    .catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  render() {
    /* Gather all tags (categories) */
    let media_typenames = ["All"];
    let media_tags = ["All"];
    for (let i = 0; i < this.state.media.length; i++) {
      let typename = this.state.media[i][1]
      let tag = this.state.media[i][9]
      if (!media_typenames.includes(typename)) media_typenames.push(typename)
      if (!media_tags.includes(tag)) media_tags.push(tag)
    } 

    let glossary = null;
    if (this.state.glossary.length > 0) {
      glossary = (
        <div>
          <Page.Heading>Glossary</Page.Heading>
              {this.state.glossary.map((data, idx) => {
                return (
                  <div key={`entry_${idx}`}>
                    <Page.Text>
                      <strong><Link href={data[2]}>{data[0]}</Link></strong>
                    </Page.Text>
                    <p className="glossary-definition">
                      {data[1]}
                    </p>
                  </div>
                );
              })}
          <br/>
        </div>
      )
    }

    return (
      <Page typename="card" title="Racial Justice Media.">
        {glossary}
        
        {/* Submissions */}
        <Page.Heading>Submissions</Page.Heading>
          <p className="submission">
            <Link href="https://forms.gle/a3LyuVnYSUyRUJ5a9">Submit a term for the glossary→</Link>&nbsp;&nbsp;<Emoji emoji="📝"/> <Emoji emoji="➕"/><br/>
          </p>
          <p className="submission">
            <Link href="https://forms.gle/RxnTpgK7v4PXTEHR8">Submit media relating to racial justice→</Link>&nbsp;&nbsp;<Emoji emoji="📺"/><Emoji emoji="➕"/>
          </p>
        <br/>

        <Page.Heading>Filter Results</Page.Heading>
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
        <input name="search_query" onChange={this.handleSortChange} className="search" type="text" placeholder="Search..."/>

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
            if (summary_source_link !== "N/A") source = <a href={summary_source_link}>Summary c/o {summary_source}</a>

            // Search Query String
            let creators_string = ""
            for (let i = 0; i < creators.length; i++) creators_string += creators[i][0]
            let search_string = [title, creators_string, summary, summary_source].join().toLowerCase()

            let emoji = null;
            let verb = "View";
            if (typename === "Film") {
              emoji="🎞️"
            } else if (typename === "Podcast") {
              emoji="🎙"
            } else if (typename === "Video") {
              emoji="📹"
            } else if (typename === "Audiobook") {
              emoji="🔊"
              verb="Listen to"
            }

            if (
              (this.state.search_query === "" || search_string.includes(this.state.search_query.toLowerCase()))
              && ((this.state.typename === "All" || this.state.typename === typename) && (this.state.tag === "All" || this.state.tag === tag))
            ) {
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
                    <Card.Link href={source_link} text={`${verb} this ${typename}`} emoji={emoji}/>
                  </Card.Body>
                </Card>
              )
            }
          })}
        </CardStack>
      </Page>
    )
  }
}
