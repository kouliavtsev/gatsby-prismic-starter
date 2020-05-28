require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "stoked-prismic-starter",
        accessToken: `${process.env.API_KEY}`,
        previews: true,
        path: "/preview",
        pages: [
          {
            type: "Post",
            match: "/post/:uid",
            component: require.resolve("./src/templates/post.js"),
          },
        ],
      },
    },
  ],
}
