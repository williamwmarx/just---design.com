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

/* Import Forms */
import GlossaryForm from "../forms/GlossaryForm.js"
import RacialJusticeReadingsForm from "../forms/RacialJusticeReadingsForm.js"

/* Import Styles */
import "../sass/main.scss"

/* Import Spare Data */
import GlossarySparse from "../../static/json/GlossarySparse.json"
import RacialJusticeReadingsSparse from "../../static/json/RacialJusticeReadingsSparse.json"

export default class RacialJusticeReadings extends React.Component {
  constructor(props) {
    super(props)
    this.cardstackRef = React.createRef()
    this.handleSortChange = this.handleSortChange.bind(this)
    this.state = {
      category: "All",
      search_query: "",
      glossary: GlossarySparse,
      readings: RacialJusticeReadingsSparse,
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

    // GLOSSARY
    Sheets.getData(googleSheetsID, 5, 4).then(sheet_data => {
      this.setState({
        glossary: sheet_data.filter(n => n[0].includes("Racial Justice")),
      })
    })

    // RACIAL JUSTICE READINGS
    Sheets.getData(googleSheetsID, 1, 10).then(sheet_data => {
      this.setState({
        readings: sheet_data,
      })
    })
  }

  render() {
    // All categories
    let categories = [...new Set(["All", ...this.state.readings.map(reading => reading[9])])]

    return (
      <Root typename="card" page="Racial Justice Readings.">
        {/* Glossary */}
        <Collapsible name="Glossary">
          {this.state.glossary.map((term, idx) => {
            return (
              <section className="glossary" key={`term_${idx}`}>
                <p>
                  <Link newtab={true} href={term[3]}>
                    {term[1]}
                  </Link>
                </p>
                <p>{term[2]}</p>
              </section>
            )
          })}
        </Collapsible>

        {/* Submissions */}
        <Collapsible name="Submit a Reading">
          <RacialJusticeReadingsForm/>
        </Collapsible>

        <Collapsible name="Submit a Term">
          <GlossaryForm/>
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
          {this.state.readings.map((reading_data, card_num) => {
            // Organized reading data
            let reading = {
              title: reading_data[0],
              source_url: reading_data[1],
              writers: reading_data[2]
                ?.split("`")
                .map((k, i) => [k, reading_data[3]?.split("`")[i]]),
              summary: reading_data[4],
              summary_source: reading_data[5],
              summary_source_url: reading_data[6],
              taken_from: reading_data[7],
              taken_from_url: reading_data[8],
              category: reading_data[9],
            }

            // Search query string
            let search_string = []
              .concat(...Object.values(reading))
              .filter(String)
              .join(" ")
              .toLowerCase()

            //Filtering
            let card = null
            if (
              (this.state.search_query === "" ||
                search_string.includes(this.state.search_query.toLowerCase())) &&
              (this.state.category === "All" || this.state.category === reading["category"])
            ) {
              card = (
                <Card key={`card_${card_num}`}>
                  <Card.Header>
                    <h4>{reading["title"]}</h4>
                    <h5>
                      {reading["writers"].map((writer, idx) => {
                        return (
                          <span key={`writer_${idx}`}>
                            {idx > 0 && " and "}{" "}
                            <Card.Author href={writer[1]}>{writer[0]}</Card.Author>
                          </span>
                        )
                      })}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <p>{reading["summary"]}</p>
                    {reading["summary_source_url"] && (
                      <p>
                        <Link newtab={true} href={reading["summary_source_url"]}>
                          Summary c/o {reading["summary_source"]}
                        </Link>
                      </p>
                    )}
                    <Card.Button href={reading["source_url"]}>
                      Read this text <Emoji emoji="📖" />
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
