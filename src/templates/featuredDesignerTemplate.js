import React from "react"
import { graphql } from "gatsby"
import Head from "../components/Head"
import Title from "../components/Title"
import "../sass/main.sass"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="root">
      <Head title={`JUST DESIGN. ${frontmatter.title}.`}/>
      <Title name={`${frontmatter.title}.`}/>
      <div className="featured-designer">
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="footer">
          <p>Originally posted {frontmatter.date}.</p>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path} }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path 
        title
      }
    }
  }
`
