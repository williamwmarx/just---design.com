/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Just Design.`,
    siteUrl: `https://www.just---design.com`,
    description: `An evolving, community-run, open access resource for the democratization of knowledge surrounding architecture, design and any tangential fields.`,
    googleSheetsID: `10xoMrSOqSeUDrYtNgT8tIdsvQK1Qp1x7copA3kPu_cs`,
  },
  plugins : [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/featured-designers`,
        name: `featured-designers`,
      },
    },
    { 
      resolve: `gatsby-transformer-remark`
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `JUST DESIGN.`,
        short_name: `JUST DESIGN.`,
        start_url: `/`,
        background_color: `#111111`,
        display: `standalone`,
        icon: `static/images/favicon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-169387993-1"
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["VTCCarrie, OfficeCodeProDMedium, OfficeCodeProDMediumItalic, Poppins, PoppinsMedium, PoppinsBold"],
          urls: ["/fonts/fonts.css"]
        }
      }
    },
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`
  ]
}
