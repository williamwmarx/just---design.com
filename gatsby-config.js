/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins : [
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
