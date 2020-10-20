/* Import React, GraphQL, Gatsby Image */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/* Import Components */
import { CardStack } from "../components/Card.js"
import Emoji from "../components/Emoji.js"
import Root from "../components/Root.js"

/* Import Styles */
import "../sass/main.scss"

export default function Home() {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        sort: { order: ASC, fields: absolutePath }
        filter: {
          extension: { regex: "/(jpg)|(png)|(jpeg)/" }
          relativeDirectory: { eq: "Social Media" }
          sourceInstanceName: { eq: "images" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Root typename="card" page="Social Media.">
      <h3>Graphics for stories &amp; posts below.</h3>
      <p>
        Do it for the gram. <Emoji emoji="✨" />
      </p>
      <br />

      <CardStack>
        {data.allFile.edges.map(image => (
          <Img
            className="card"
            fluid={image.node.childImageSharp.fluid}
            alt={image.node.base.split(".")[0]}
          />
        ))}
      </CardStack>
    </Root>
  )
}
