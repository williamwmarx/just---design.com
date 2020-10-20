/* Import React and GraphQL */
import React from "react"
import { graphql } from "gatsby"

/* Import Components */
import Emoji from "../components/Emoji.js"
import Collapsible from "../components/Collapsible.js"
import Link from "../components/Link.js"
import Root from "../components/Root.js"
import Sheets from "../components/Sheets.js"

/* Import Styles */
import "../sass/main.scss"

/* Import Data */
import AcknowledgmentsData from "../../static/json/acknowledgments.json"
import SourcesSparse from "../../static/json/SourcesSparse.json"

function hexToRGB(h) {
  let rgb = ""
  h.match(/.{1,2}/g).forEach(c => (rgb += parseInt(c, 16) + ", "))
  return "(" + rgb.slice(0, -2) + ")"
}

export default class Acknowledgments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sources: SourcesSparse,
    }
  }

  componentDidMount() {
    let googleSheetsID = this.props.data.site.siteMetadata.googleSheetsID
    Sheets.getData(googleSheetsID, 6, 3).then(sheet_data => {
      this.setState({
        sources: sheet_data,
      })
    })
  }

  render() {
    return (
      <Root page="Acknowledgments.">
        {/* GENERAL CREDITS */}
        <p>
          This site is intended to be as transparent as possible.&nbsp; As such, all sources used to
          build it are listed below.&nbsp; The source code for this site can be found on&nbsp;
          <Link newtab={true} href="https://github.com/concurrent-studio/just---design.com">
            GitHub
          </Link>
          .
        </p>

        {/* TYPEFACES */}
        <Collapsible name="Typefaces" init="open">
          <section style={{ lineHeight: "50%" }}>
            {AcknowledgmentsData["typefaces"].map((t, i) => (
              <p style={{ fontFamily: t["fontFamily"], fontSize: t["fontSize"] }}>
                <Link newtab={true} href={t["fontURL"]}>
                  {t["fontName"]}
                </Link>
                &nbsp;c/o&nbsp;
                <Link newtab={true} href={t["foundryURL"]}>
                  {t["foundryName"]}
                </Link>
              </p>
            ))}
          </section>
        </Collapsible>

        {/* COLORS */}
        <Collapsible name="Color Palette" init="open">
          {Object.keys(AcknowledgmentsData["colors"]).map((k, i) => (
            <section className="colors">
              <h5>{k}</h5>
              <div>
                <p>
                  Hex:&nbsp;
                  <span
                    style={{
                      backgroundColor: AcknowledgmentsData["colors"][k]["hex"],
                      color: AcknowledgmentsData["colors"][k]["textColor"],
                    }}
                  >
                    {AcknowledgmentsData["colors"][k]["hex"]}
                  </span>
                </p>
                <p>
                  RGB:&nbsp;
                  <span
                    style={{
                      backgroundColor: AcknowledgmentsData["colors"][k]["hex"],
                      color: AcknowledgmentsData["colors"][k]["textColor"],
                    }}
                  >
                    {hexToRGB(AcknowledgmentsData["colors"][k]["hex"].slice(1))}
                  </span>
                </p>
                <p>
                  Source:&nbsp;
                  <Link newtab={true} href={AcknowledgmentsData["colors"][k]["url"]}>
                    {AcknowledgmentsData["colors"][k]["source"]}
                  </Link>
                </p>
              </div>
            </section>
          ))}
        </Collapsible>

        {/* SUBMIT A SOURCE */}
        <Collapsible name="Submit a New Source" init="open">
          <Link href="https://forms.gle/1xyjG8HHBNKtAC8d8">Submit a source to catalogue →</Link>
        </Collapsible>

        {/* SOURCES KEY */}
        <Collapsible name="Key" init="open">
          <p>
            <Emoji emoji="✅" /> Source catalogued
            <br />
            <Emoji emoji="🚧" /> Under construction
            <br />
            <Emoji emoji="⏳" /> To be done
          </p>
        </Collapsible>

        {/* SOURCES */}
        <Collapsible name="Sources" init="open">
          {this.state.sources.map((data, index) => {
            return (
              <p key={`source_${index}`}>
                {data[0] === "Catalogued" && <Emoji emoji="✅" />}
                {data[0] === "Pending" && <Emoji emoji="🚧" />}
                {data[0] === "To-do" && <Emoji emoji="⏳" />}
                &nbsp;<Link href={data[2]}>{data[1]}</Link>
              </p>
            )
          })}
        </Collapsible>
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
