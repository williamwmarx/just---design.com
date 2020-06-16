/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins : [
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
      resolve: "gatsby-plugin-web-font-loader",
          options: {
            custom: {
              families: ["OfficeCodeProD, OfficeCodeProDItalic, OfficeCodeProDThin, OfficeCodeProDThinItalic, OfficeCodeProDMedium, OfficeCodeProDMediumItalic, OfficeCodeProDBold, OfficeCodeProDBoldItalic, TheNeueBlack"],
              urls: ["/fonts/fonts.css"],
            },
          },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
  ]
}
