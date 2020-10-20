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

/* Import Styles */
import "../sass/main.scss"

/* Import Spare Data */
import GlossarySparse from "../../static/json/GlossarySparse.json"
import RacialJusticeMediaSparse from "../../static/json/RacialJusticeMediaSparse.json"

export default class RacialJusticeReadings extends React.Component {
  constructor(props) {
    super(props)
    this.cardstackRef = React.createRef()
    this.handleSortChange = this.handleSortChange.bind(this)
    this.state = {
      typename: "All Types",
      category: "All Categories",
      search_query: "",
      glossary: GlossarySparse,
      media: RacialJusticeMediaSparse,
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

    // Racial Justice Media
    Sheets.getData(googleSheetsID, 2, 11).then(sheet_data => {
      this.setState({
        media: sheet_data,
      })
    })

    // Glossary
    Sheets.getData(googleSheetsID, 5, 4).then(sheet_data => {
      this.setState({
        glossary: sheet_data.filter(n => n[0].includes("Racial Justice")),
      })
    })
  }

  render() {
    // Dropdown categories/typenames
    let categories = [...new Set(["All Categories", ...this.state.media.map(m => m[10])])]
    let typenames = [...new Set(["All Types", ...this.state.media.map(m => m[1])])]
    let typestring = {
      Audiobook: {
        phrase: "Listen to this audiobook",
        emoji: "🔊",
      },
      Film: {
        phrase: "Watch this film",
        emoji: "🎞️",
      },
      Podcast: {
        phrase: "Listen to this podcast",
        emoji: "🎙",
      },
      Video: {
        phrase: "Watch this video",
        emoji: "📹",
      },
    }

    return (
      <Root typename="card" page="Racial Justice Media.">
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
        <Collapsible name="Submit Media">
          <Link href="https://forms.gle/RxnTpgK7v4PXTEHR8">
            Submit media relating to racial justice <span className="arrow">→</span>
          </Link>{" "}
          <Emoji emoji="📖" />
          <Emoji emoji="➕" />
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
          <div className="menu">
            <select name="typename" value={this.state.typename} onChange={this.handleSortChange}>
              {typenames.sort().map((typename, idx) => {
                return (
                  <option key={`typename_${idx}`} value={typename}>
                    {typename}
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
          {this.state.media.map((media_data, card_num) => {
            // Organized media data
            let media = {
              title: media_data[0],
              typename: media_data[1],
              source_url: media_data[2],
              creators: media_data[3]?.split("`").map((k, i) => [k, media_data[4]?.split("`")[i]]),
              summary: media_data[5],
              summary_source: media_data[6],
              summary_source_url: media_data[7],
              taken_from: media_data[8],
              taken_from_url: media_data[9],
              category: media_data[10],
            }

            // Search query string
            let search_string = []
              .concat(...Object.values(media))
              .filter(String)
              .join(" ")
              .toLowerCase()

            //Filtering
            let card = null
            if (
              (this.state.search_query === "" ||
                search_string.includes(this.state.search_query.toLowerCase())) &&
              (this.state.typename === "All Types" || this.state.typename === media["typename"]) &&
              (this.state.category === "All Categories" ||
                this.state.category === media["category"])
            ) {
              card = (
                <Card key={`card_${card_num}`}>
                  <Card.Header>
                    <h4>{media["title"]}</h4>
                    <h5>
                      {media["creators"].map((creator, idx) => {
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
                    <p>{media["summary"]}</p>
                    {media["summary_source_url"] && (
                      <p>
                        <Link newtab={true} href={media["summary_source_url"]}>
                          Summary c/o {media["summary_source"]}
                        </Link>
                      </p>
                    )}
                    <Card.Button href={media["source_url"]}>
                      {typestring[media["typename"]]["phrase"]}{" "}
                      <Emoji emoji={typestring[media["typename"]]["emoji"]} />
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
