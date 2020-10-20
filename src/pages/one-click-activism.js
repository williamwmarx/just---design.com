/* Import React */
import React from "react"
import { graphql } from "gatsby"

/* Import Components */
import { CardStack, Card } from "../components/Card.js"
import Root from "../components/Root.js"
import Collapsible from "../components/Collapsible.js"
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
import Sheets from "../components/Sheets.js"

/* Import Styles */
import "../sass/main.scss"

/* Import Spare Data */
import OneClickActivismSparse from "../../static/json/OneClickActivismSparse.json"

export default class RacialJusticeReadings extends React.Component {
  constructor(props) {
    super(props)
    this.cardstackRef = React.createRef()
    this.handleSortChange = this.handleSortChange.bind(this)
    this.state = {
      category: "All",
      search_query: "",
      sources: OneClickActivismSparse,
    }
  }

  // Handle changes to category and/or search
  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims()
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.name === "search_query") this.setState({ category: "All" })
  }

  componentDidMount() {
    let googleSheetsID = this.props.data.site.siteMetadata.googleSheetsID
    Sheets.getData(googleSheetsID, 4, 6).then(sheet_data => {
      this.setState({
        sources: sheet_data,
      })
    })
  }

  render() {
    // All categories
    let categories = [...new Set(["All", ...this.state.sources.map(source => source[1])])]

    return (
      <Root typename="card" page="One Click Activism.">
        {/* Submissions */}
        <Collapsible name="Submit a Resource">
          <Link href="https://forms.gle/Rf7V3d69KN9D8GEFA">
            Submit an activism source <span className="arrow">→</span>
          </Link>{" "}
          <Emoji emoji="✊" />
          <Emoji emoji="➕" />
        </Collapsible>
        <br />

        {/* Filter Results */}
        <Collapsible name="Filter Results" init="open">
          <div className="menu">
            <select name="category" value={this.state.category} onChange={this.handleSortChange}>
              {categories.sort().map((category, idx) => {
                return (
                  <option key={`category_${idx}`} value={category}>
                    {category}
                  </option>
                )
              })}
            </select>
          </div>
          <input
            name="search_query"
            onChange={this.handleSortChange}
            className="search"
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
        </Collapsible>

        <CardStack ref={this.cardstackRef}>
          {this.state.sources.map((source_data, card_num) => {
            // Organized resource data
            let source = {
              title: source_data[0],
              category: source_data[1],
              source_url: source_data[2],
              summary: source_data[3],
              creators: source_data[4]
                ?.split("`")
                .map((k, i) => [k, source_data[5]?.split("`")[i]]),
            }

            // Search query string
            let search_string = []
              .concat(...Object.values(source))
              .filter(String)
              .join(" ")
              .toLowerCase()

            //Filtering
            let card = null
            if (
              (this.state.search_query === "" ||
                search_string.includes(this.state.search_query.toLowerCase())) &&
              (this.state.category === "All" || this.state.category === source["category"])
            ) {
              card = (
                <Card key={`card_${card_num}`}>
                  <Card.Header>
                    <h4>{source["title"]}</h4>
                    <h5>
                      {source["creators"] &&
                        source["creators"].map((creator, idx) => {
                          return (
                            <span key={`creator_${idx}`}>
                              {idx > 0 && " and "}{" "}
                              <Card.Author href={creator[1]}>{creator[0]}</Card.Author>
                            </span>
                          )
                        })}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <p>{source["summary"]}</p>
                    <Card.Button href={source["source_url"]}>
                      View this resource <Emoji emoji="⚒️" />
                    </Card.Button>
                  </Card.Body>
                </Card>
              )
            }
            return card
          })}
        </CardStack>
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
