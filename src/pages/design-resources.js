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
import DesignResourcesSparse from "../../static/json/DesignResourcesSparse.json"

export default class DesignResources extends React.Component {
  constructor(props) {
    super(props)
    this.cardstackRef = React.createRef()
    this.handleSortChange = this.handleSortChange.bind(this)
    this.state = {
      category: "All",
      search_query: "",
      resources: DesignResourcesSparse,
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
    Sheets.getData(googleSheetsID, 3, 10).then(sheet_data => {
      this.setState({
        resources: sheet_data,
      })
    })
  }

  render() {
    // All categories
    let categories = [...new Set(["All", ...this.state.resources.map(resource => resource[1])])]

    return (
      <Root typename="card" page="Design Resources.">
        {/* Submissions */}
        <Collapsible name="Submit a Resource">
          <Link href="https://forms.gle/soSFHXc9Nm5AMRuE9">
            Submit a design resource <Emoji emoji="🔨" /> <span className="arrow">→</span>
          </Link>
        </Collapsible>

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
          {this.state.resources.map((resource_data, card_num) => {
            // Organized resource data
            let resource = {
              title: resource_data[0],
              category: resource_data[1],
              source_url: resource_data[2],
              creators: resource_data[3]
                ?.split("`")
                .map((k, i) => [k, resource_data[4]?.split("`")[i]]),
              summary: resource_data[5],
              summary_source: resource_data[6],
              summary_source_url: resource_data[7],
              taken_from: resource_data[8],
              taken_from_url: resource_data[9],
            }

            // Search query string
            let search_string = []
              .concat(...Object.values(resource))
              .filter(String)
              .join(" ")
              .toLowerCase()

            //Filtering
            let card = null
            if (
              (this.state.search_query === "" ||
                search_string.includes(this.state.search_query.toLowerCase())) &&
              (this.state.category === "All" || this.state.category === resource["category"])
            ) {
              card = (
                <Card key={`card_${card_num}`}>
                  <Card.Header>
                    <h4>{resource["title"]}</h4>
                    <h5>
                      {resource["creators"] &&
                        resource["creators"].map((creator, idx) => {
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
                    <p>{resource["summary"]}</p>
                    {resource["summary_source_url"] && (
                      <p>
                        <Link newtab={true} href={resource["summary_source_url"]}>
                          Summary c/o {resource["summary_source"]}
                        </Link>
                      </p>
                    )}
                    <Card.Button href={resource["source_url"]}>
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
