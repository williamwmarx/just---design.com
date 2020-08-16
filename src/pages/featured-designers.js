/* Import React */
import React from "react";
/* Import Gatsby */
import { StaticQuery, graphql } from "gatsby"
/* Import Components */
import Card from "../components/Card.js";
import CardContent from "../components/CardContent.js";
import CardStack from "../components/CardStack.js";
import Emoji from "../components/Emoji.js";
import Link from "../components/Link.js";
/* Import Styles */
import "../sass/main.sass";

export default class FeaturedDesigners extends React.Component {
  constructor(props) {
    super(props);
    this.cardstackRef = React.createRef();
    this.handleSortChange = this.handleSortChange.bind(this);
  }
  
  handleSortChange(event) {
    this.cardstackRef.current.update_cards_dims();
  }

  render() {
    return (
      <CardContent title="Featured Designers.">
          {/* Summary */}
          <CardContent.Header>Summary</CardContent.Header>
          <p className="submission">
            Below are a list of designers, artists, architects and post-disciplinary designers who are working, or have worked, on design justice.
            Extra emphasis is placed on BIPOC, Womxn and Non-Binary creatives.
          </p>
        <br/>

        {/* Submissions */}
        <CardContent.Header>Submissions</CardContent.Header>
          <p className="submission">
            <Link href="https://forms.gle/71Tsgg8jEAxLnakz8">Submit a designer to be featured →</Link>&nbsp;&nbsp;<Emoji emoji="🎨" emoji_name="artist palette"/><Emoji emoji="➕" emoji_name="plus sign"/>
          </p>
          <p className="submission">
            <Link href="mailto:wearejustdesign@gmail.com?subject=Featured%20Designer%20✍️✨">Submit your writing about a designer →</Link>&nbsp;&nbsp;<Emoji emoji="✍️" emoji_name="writing hand"/><Emoji emoji="➕" emoji_name="plus sign"/>
          </p>
        <br/>

        <CardContent.Header>Designers</CardContent.Header>
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
                      path 
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
              {
                data.allMarkdownRemark.edges
                .filter(edge => !!edge.node.frontmatter.date)
                .map(edge => (
                  <Card key={edge.node.id}>
                    <Card.Header>
                      <Card.Title>{edge.node.frontmatter.title}</Card.Title>
                      <Card.Subtitle>{edge.node.frontmatter.tags}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{edge.node.frontmatter.description}</Card.Text>
                      <Card.PostLink href={edge.node.frontmatter.path} text="Go to post" emoji="📜" emoji_name="scroll"/>
                    </Card.Body>
                  </Card>
                ))
              }
            </CardStack>
          )}
        />
      </CardContent>
    )
  }
}
