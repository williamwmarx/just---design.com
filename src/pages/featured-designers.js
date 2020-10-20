/* Import React */
import React from "react"

/* Import Gatsby */
import { StaticQuery, graphql } from "gatsby"

/* Import Components */
import { CardStack, Card } from "../components/Card.js"
import Collapsible from "../components/Collapsible.js"
import Emoji from "../components/Emoji.js"
import Link from "../components/Link.js"
import Root from "../components/Root.js"

/* Import Styles */
import "../sass/main.scss"

export default class FeaturedDesigners extends React.Component {
  constructor(props) {
    super(props)
    this.cardstackRef = React.createRef()
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims()
  }

  render() {
    return (
      <Root typename="card" page="Featured Designers.">
        {/* Summary */}
        <h3>Mission</h3>
        <p className="indent-1">
          Below are a list of designers, artists, architects and post-disciplinary designers who are
          working, or have worked, on design justice. Extra emphasis is placed on BIPOC, Womxn and
          Non-Binary creatives.
        </p>
        <br />

        {/* Submissions */}
        <Collapsible name="Submit a Designer">
          <Link href="https://forms.gle/71Tsgg8jEAxLnakz8">
            Submit a designer to be featured <Emoji emoji="🎨" /> <span className="arrow">→</span>
          </Link>
          <Link href="mailto:wearejustdesign@gmail.com?subject=Featured%20Designer%20✍️✨">
            Submit your writing about a designer <Emoji emoji="✍️" />{" "}
            <span className="arrow">→</span>
          </Link>
        </Collapsible>
        <br />

        <h3>Designers</h3>
        <StaticQuery
          query={graphql`
            query {
              allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
                edges {
                  node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                      date(formatString: "MMMM DD, YYYY")
                      slug
                      title
                      tags
                      description
                    }
                  }
                }
              }
            }
          `}
          render={data => (
            <CardStack ref={this.cardstackRef}>
              {data.allMarkdownRemark.edges
                .filter(edge => !!edge.node.frontmatter.date)
                .map(edge => (
                  <Card key={edge.node.id}>
                    <Card.Header>
                      <h4>{edge.node.frontmatter.title}</h4>
                      <h5>{edge.node.frontmatter.tags}</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>{edge.node.frontmatter.description}</p>
                      <Card.Button internal={true} href={edge.node.frontmatter.slug}>
                        Go to post <Emoji emoji="📜" />
                      </Card.Button>
                    </Card.Body>
                  </Card>
                ))}
            </CardStack>
          )}
        />
      </Root>
    )
  }
}
