/* Import React */
import React from "react";
import { graphql }  from "gatsby";

/* Import Components */
import Root from "../components/Root.js"
import Collapsible from "../components/Collapsible.js"
import Emoji from "../components/Emoji.js"
import Sheets from "../components/Sheets.js"
import Link from "../components/Link.js"

/* Import Styles */
import "../sass/main.scss";

/* Import Sparse Data */
import GlossarySparse from "../../static/json/GlossarySparse.json";

export default class Glossary extends React.Component {
  constructor(props) {
    super(props);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      search_query: "",
      category: "All",
      glossary: GlossarySparse["glossary"]
    };
  }
  
  handleSortChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    let googleSheetsID = this.props.data.site.siteMetadata.googleSheetsID
    Sheets.getData(googleSheetsID, 5, 4).then(sheet_data => {
      this.setState({
        glossary: sheet_data,
      });
    });
  }

  render() {
    let categories = [...new Set(["All", ...this.state.glossary.map((term) => term[0])])]

    return (
      <Root page="Site Glossary.">
        {/* Submissions */}
        <Collapsible name="Submit a Term">
          <p className="indent-1">
            <Link href="https://forms.gle/a3LyuVnYSUyRUJ5a9">
              Submit a term for the glossary <span className="arrow">→</span>
            </Link> <Emoji emoji="📝"/><Emoji emoji="➕"/>
          </p>
        </Collapsible>
        <br/>

        <h3>Filter Results</h3>
        <div className="menu">
          <select name="category" value={this.state.category} onChange={this.handleSortChange}>
            {categories.sort().map((category, idx) => {
              return <option key={`category_${idx}`} value={category}>{category}</option> 
            })}
          </select>
        </div>
        <input name="search_query" onChange={this.handleSortChange} className="search" type="text" placeholder="Search..."/>

        <div>
          {this.state.glossary.map((term, idx) => {
            let search_string = [].concat(...Object.values(term)).filter(String).join(" ").toLowerCase()

            if (
              (this.state.search_query === "" || search_string.includes(this.state.search_query.toLowerCase()))
              && (this.state.category === "All" || this.state.category === term[0])
            ) {
              return (
                <section className="indent-1 glossary" key={`term_${idx}`}>
                  <p><Link newtab={true} href={term[3]}>{term[1]}</Link></p>
                  <p>{term[2]}</p>
                </section>
              );
            }
          })}
        </div>
      </Root> 
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        googleSheetsID
      }
    }
  }
`
