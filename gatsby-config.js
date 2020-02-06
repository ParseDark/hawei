/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `大可的技术屋`,
    author: {
      name: 'Hawei/大可',
      twitter: 'https://twitter.com/DarkParse',
      github: 'https://github.com/ParseDark',
      juejin: 'https://juejin.im/user/5a4c68c2f265da43052f036f',
      email: '13597213421@163.com'
    }
  },
  pathPrefix: `/hawei`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
