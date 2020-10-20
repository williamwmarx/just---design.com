import React from "react"
import { graphql } from "gatsby"
import "../sass/main.scss"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div id="root">
      <div className="featured-designer">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div className="footer">
          <p>Originally posted {frontmatter.date}.</p>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
