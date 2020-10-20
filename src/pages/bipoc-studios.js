/* Import React and GraphQL*/
import React from "react"
import { graphql } from "gatsby"

/* Import Components */
import { CardStack, Card } from "../components/Card.js"
import Root from "../components/Root.js"
import Collapsible from "../components/Collapsible.js"
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
import Sheets from "../components/Sheets.js"
import { getCookie } from "../components/CookieUtils.js"

/* Import Styles */
import "../sass/main.scss"
/* Import Data */
import BIPOCStudiosSparse from "../../static/json/BIPOCStudiosSparse.json"

/* Import Images */
export default class BIPOCStudios extends React.Component {
  constructor(props) {
    super(props)
    this.cardstackRef = React.createRef()
    this.handleSortChange = this.handleSortChange.bind(this)
    this.state = {
      category: "All",
      search_query: "",
      studios: BIPOCStudiosSparse,
      theme: getCookie("theme"),
      active: true,
    }
  }

  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims()
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.name === "search_query") this.setState({ category: "All" })
  }

  componentDidMount() {
    let googleSheetsID = this.props.data.site.siteMetadata.googleSheetsID
    Sheets.getData(googleSheetsID, 7, 11).then(sheet_data => {
      this.setState({
        studios: sheet_data,
      })
    })
  }

  render() {
    let categories = [
      "All",
      "Black Owned",
      "Indigenous Owned",
      "Non-Binary Owned",
      "Women Owned",
      "Hiring",
      "Looking for Collaborators",
    ]
    let people = [
      ["Virgil Abloh", "virgilabloh"],
      ["Hassan Rahim", "hassanrahim"],
      ["Mahfuz Sultan", "mahfuzsultan"],
      ["Naïla Opiangah", "bouenguidi"],
      ["Dom Leong", "leong_dominic"],
      ["Esther Choi", "estherchoi"],
      ["Preeti Sriratana", "theofficialpreeti"],
      ["Aimee Chang", "_aimeechang_"],
      ["Tei Carpenter", "teicarpenter"],
      ["Joey Swerdlin", "swerdlin"],
      ["Oana Stănescu", "oooooana"],
      ["Dong-Ping Wong", "dongpingwong"],
    ]
    return (
      <Root typename="card" page="BIPOC Studios.">
        <Collapsible name="Mission" init="open">
          <p>
            This is an ongoing list of BIPOC architecture, engineering, landscape, graphic design,
            industrial design and planning studios worldwide, some which are hiring, many many of
            which are Black owned. This resource was created by{" "}
            {people.map((person, i) => {
              return (
                <span key={`person_${i}`}>
                  <Link newtab={true} href={`https://instagram.com/${person[1]}/`}>
                    {person[0]}
                  </Link>
                  {i === people.length - 1 ? "." : ", "}
                </span>
              )
            })}
          </p>
        </Collapsible>

        <Collapsible name="Submit">
          <Link href="https://forms.gle/NtkbkJQTGLwfAMHE8">
            Add a Studio <Emoji emoji="📐" /> <span className="arrow">→</span>
          </Link>
        </Collapsible>

        <Collapsible name="Additional Links">
          <Link href="https://docs.google.com/document/d/1UWSyLpd_c6-eLUh_QCpyC8kFz0sKxOmco-AzuiUtQXk/edit">
            PPP Loan Info <Emoji emoji="💸" /> <span className="arrow">→</span>
          </Link>
        </Collapsible>

        <Collapsible name="Key">
          {categories.slice(1).map((c, i) => {
            return (
              <p key={`category_${i}`}>
                <img
                  className="icon"
                  src={`icons/${c}${this.state.theme === "dark" ? " Dark" : ""}.png`}
                  alt={c}
                />
                &nbsp;{c}
              </p>
            )
          })}
        </Collapsible>

        <Collapsible name="Filter Results" init="open">
          <div className="menu">
            <select name="category" value={this.state.category} onChange={this.handleSortChange}>
              {categories.sort().map((category, idx) => {
                return (
                  <option key={`option_${idx}`} value={category}>
                    {category}
                  </option>
                )
              })}
            </select>
          </div>
          <input
            name="search_query"
            onChange={this.handleSortChange}
            className="search indent-1"
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
        </Collapsible>

        <CardStack ref={this.cardstackRef}>
          {this.state.studios.map((studio_data, card_num) => {
            let studio = {
              name: studio_data[0],
              location: studio_data[3],
              typename: studio_data[4],
              instagram: studio_data[5]?.toLowerCase().slice(1),
              website: studio_data[6],
              hiring_positions: studio_data[8],
              contact_name: !studio_data[9] ? studio_data[10] : studio_data[9],
              contact_email: studio_data[10],
              categories: [
                studio_data[1] === "B" ? "Black Owned" : null,
                studio_data[1] === "I" ? "Indigenous Owned" : null,
                studio_data[2] === "W" ? "Women Owned" : null,
                studio_data[2] === "NB" ? "Non-Binary Owned" : null,
                studio_data[7] === "Yes" ? "Hiring" : null,
                studio_data[8]?.toLowerCase().includes("collab")
                  ? "Looking for Collaborators"
                  : null,
              ].filter(n => n),
            }
            // Handle edge cases where given email is actually a link to a webpage
            let contact_link = null
            if (studio["contact_email"]?.includes("@")) {
              contact_link = (
                <Card.Button
                  href={`mailto:${studio["contact_email"]}?body=${studio["contact_name"]} —`}
                >
                  {studio["contact_name"]} <Emoji emoji="📨" />
                </Card.Button>
              )
            } else if (studio["contact_email"]) {
              contact_link = (
                <Card.Button href={studio["contact_email"]}>
                  {studio["contact_name"]} <Emoji emoji="🌐" />
                </Card.Button>
              )
            }

            let card = null
            let search_string = Object.values(studio).filter(String).join(" ").toLowerCase()
            if (
              (this.state.search_query === "" ||
                search_string.includes(this.state.search_query.toLowerCase())) &&
              (this.state.category === "All" || studio["categories"].includes(this.state.category))
            ) {
              card = (
                <Card key={`card_${card_num}`}>
                  <Card.Header>
                    <div>
                      {studio["categories"].map((c, i) => {
                        return (
                          <img
                            key={`c_${i}`}
                            className="icon"
                            src={`icons/${c}${this.state.theme === "dark" ? " Dark" : ""}.png`}
                            alt={c}
                          />
                        )
                      })}
                    </div>
                    <h4>{studio["name"]}</h4>
                    {studio["typename"] && <h5>{studio["typename"]}</h5>}
                    {studio["location"] && <h6>{studio["location"]}</h6>}
                  </Card.Header>
                  <Card.Body>
                    {((studio["hiring"] && studio["hiring_positions"]) ||
                      studio["categories"].includes("Looking for Collaborators")) && (
                      <p>
                        {studio["hiring"] && (
                          <span>
                            <img
                              className="icon"
                              src={`icons/Hiring${this.state.theme === "dark" ? " Dark" : ""}.png`}
                              alt="Hiring"
                            />
                          </span>
                        )}
                        {studio["categories"].includes("Looking for Collaborators") && (
                          <span>
                            <img
                              className="icon"
                              src={`icons/Looking for Collaborators${
                                this.state.theme === "dark" ? " Dark" : ""
                              }.png`}
                              alt="Looking for Collaborators"
                            />
                          </span>
                        )}
                        {studio["hiring_positions"]}
                      </p>
                    )}
                    {studio["instagram"] && (
                      <Card.Button href={`https://instagram.com/${studio["instagram"]}`}>
                        @{studio["instagram"]} <Emoji emoji="📸" />
                      </Card.Button>
                    )}
                    {contact_link}
                    {studio["website"] && (
                      <Card.Button href={studio["website"]}>
                        Go to website <Emoji emoji="🌐" />
                      </Card.Button>
                    )}
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
