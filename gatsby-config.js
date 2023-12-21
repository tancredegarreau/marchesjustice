require("dotenv").config({
  path: ".env",
});

module.exports = {
  siteMetadata: {
    title: `Loi Climat`,
    description: `Loi Climat`,
    author: `Matthieu Hocquart`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["SEND_IN_BLUE_FORM", "AIRTABLE_API_KEY"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN,
      },
    },
    'gatsby-plugin-image',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-leaflet",
    "vraieloiclimat-standalone-page",
    "gatsby-plugin-postcss",
    "gatsby-plugin-styled-components",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
