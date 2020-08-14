/* Import React */
import React from "react";
/* Import Components */
import Head from "../components/Head.js"
import Title from "../components/Title.js"
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
/* Import Styles */
import "../sass/main.sass";
/* Import Sparse Data */
import GlossarySparse from "../../static/json/GlossarySparse.json";

export default class Glossary extends React.Component {
  constructor(props) {
    super(props);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      search_query: "",
      glossary: GlossarySparse["glossary"]
    };
  }
  
  handleSortChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    const that = this;
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
        let term = entries[i+1]["content"]["$t"]
        let definition = entries[i+2]["content"]["$t"]
        let link = entries[i+3]["content"]["$t"]
        glossary_content.push([term, definition, link])
      }
      that.setState({glossary: glossary_content})
    })
    .catch(function(err) {
        console.log('Fetch Error: ', err);
    });
  }

  render() {
    console.log(this.state.glossary)
    return (
      <div className="root">
        <Head title="JUST DESIGN. Glossary."/>
        <Title name="Site Glossary." hide_bar={false}/>
        <div style={{position: "relative", width: "80vw", left: "10vw", paddingTop: "4em"}}>
          <p className="card-content-header">Submissions</p>
          <p className="submission">
            <Link href="https://forms.gle/a3LyuVnYSUyRUJ5a9">Submit a term for the glossary→</Link>&nbsp;&nbsp;<Emoji emoji="📝" emoji_name="memo"/> <Emoji emoji="➕" emoji_name="plus sign"/><br/>
          </p>
          <br/>

          <p className="card-content-header">Filter</p>
          <input name="search_query" onChange={this.handleSortChange} className="search" type="text" placeholder="Search..."/>

          <div>
            {this.state.glossary.map((data, index) => {
              let term = data[0]
              let definition = data[1]
              let link = data[2]

              // Search Query String
              let search_string = [term].join().toLowerCase()

              if (this.state.search_query === "" || search_string.includes(this.state.search_query.toLowerCase())) {
                return (
                  <div key={`term_${index}`}>
                    <p className="card-content-text"><Link href={link}>{term}</Link></p>
                    <p className="glossary-definition">{definition}</p>
                  </div>
                )
              }
            })}
          </div>
        </div> 
      </div> 
    )
  }
}
