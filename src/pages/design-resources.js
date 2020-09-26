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
/* Import Sparse Data */
import DesignResourcesSparse from "../../static/json/DesignResourcesSparse.json"

export default class DesignResources extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      typename: "All",
      search_query: "",
      resources: DesignResourcesSparse["resources"]
    };
  }
  
  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims();
    this.setState({[event.target.name]: event.target.value});
    if (event.target.name === "search_query") this.setState({typename: "All"})
  }

  componentDidMount() {
    const that = this;
    fetch("https://spreadsheets.google.com/feeds/cells/10xoMrSOqSeUDrYtNgT8tIdsvQK1Qp1x7copA3kPu_cs/3/public/full?alt=json")
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
        content.push([title, typename, source_link, creators, summary, summary_source, summary_source_link, taken_from, taken_from_link])
      }
      that.setState({resources: content})
    })
    .catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  render() {
    let resource_typenames = ["All"];
    for (let i = 0; i < this.state.resources.length; i++) {
      let typename = this.state.resources[i][1]
      if (!resource_typenames.includes(typename)) resource_typenames.push(typename)
    } 

    return (
      <CardContent title="Design Resources.">
        {/* Submissions */}
        <CardContent.Header>Submissions</CardContent.Header>
          <p className="submission">
            <Link href="https://forms.gle/crnaPirDDpYLWHY48">Submit a design resource →</Link>&nbsp;&nbsp;<Emoji emoji="🔨" emoji_name="hammer"/><Emoji emoji="➕" emoji_name="plus sign"/>
          </p>
        <br/>

        <CardContent.Header>Filter Results</CardContent.Header>
        <div className="menu">
          <select name="typename" value={this.state.typename} onChange={this.handleSortChange}>
            {resource_typenames.sort().map((typename, source_index) => {
              return <option key={`content_item_${source_index}`} value={typename}>{typename}</option> 
            })}
          </select>
        </div>
        <input name="search_query" onChange={this.handleSortChange} className="search" type="text" placeholder="Search..."/>

        <CardStack ref={this.cardstackRef}>
          {this.state.resources.map((data, index) => {
            let title = data[0] 
            let typename = data[1] 
            let source_link = data[2]
            let creators = data[3]
            let summary = data[4]
            if (summary === "N/A") summary = null
            let summary_source = data[5]
            let summary_source_link = data[6] 
            let taken_from = data[7] 
            let taken_from_link = data[8] 

            let source = null;
            if (summary_source_link !== "N/A") source = <a href={summary_source_link}>Summary c/o {summary_source}</a>

            // Search Query String
            let creators_string = ""
            for (let i = 0; i < creators.length; i++) creators_string += creators[i][0]
            let search_string = [title, creators_string, summary].join().toLowerCase()

            if (
              (this.state.search_query === "" || search_string.includes(this.state.search_query.toLowerCase())) 
              && (this.state.typename === "All" || this.state.typename === typename)
            ) {
              return (
                <Card key={`card_${index}`}>
                  <Card.Header>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>
                      {creators.map((creators, c_index) => {
                        let creator = null;
                        if (creators[0] !== "N/A") {
                          if (c_index === 0) creator = <Card.Author key={`creator_${c_index}`} href={creators[1]}>{creators[0]}</Card.Author>                        
                          else if (c_index > 0) creator = <span key={`creator_${c_index}`} style={{lineHeight: "170%"}}>&nbsp;and&nbsp;<Card.Author key={`creator_${c_index}`} href={creators[1]}>{creators[0]}</Card.Author></span>                  
                        }
                      return creator;
                      })}
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{summary}</Card.Text>
                    {source && <Card.Text>{source}</Card.Text>}
                    {(source_link !== null) && <Card.Link href={source_link} text="View this resource" emoji="⚒️" emoji_name="hammer and pick"/>}
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
