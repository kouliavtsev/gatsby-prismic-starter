import React from "react"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"

export default function Home({ data }) {
  const doc = data?.prismic?.allHomes.edges.slice(0, 1).pop()
  const posts = data?.prismic?.allPosts.edges
  const slices = doc.node.body

  if (!doc) return <div>no data</div>

  return (
    <>
      <h1>{RichText.asText(doc.node.title)}</h1>
      <RichText render={doc.node.description} />

      <hr />

      <h1>Posts</h1>

      <ul>
        {posts.map(item => {
          return (
            <li key={item.node._meta.id}>
              <Link to={linkResolver(item.node._meta)}>
                {RichText.asText(item.node.title)}
              </Link>
            </li>
          )
        })}
      </ul>

      <hr />

      <Slices slices={slices} />

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}

const Slices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch (slice.__typename) {
        case "PRISMIC_HomeBodyTeam":
          return (
            <section key={slice + index}>
              <h1>{RichText.asText(slice.primary.team_section)}</h1>

              {slice.fields.map(item => {
                return (
                  <div>
                    <h2>{RichText.asText(item?.first_and_lastname)}</h2>
                    <p>{RichText.asText(item?.position)}</p>

                    {/* TODO: Preprocessing External Images */}
                    <img
                      src={item?.portrait?.url}
                      alt={RichText.asText(item?.first_and_lastname)}
                      width="160"
                    />

                    {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                  </div>
                )
              })}
              <hr />
            </section>
          )
        case "PRISMIC_HomeBodyQuote":
          return (
            <section key={slice + index}>
              <h1>Quote of the day</h1>

              {/* TODO: Preprocessing External Images */}
              <img
                src={slice?.primary?.portrait_author?.url}
                alt={RichText.asText(slice?.primary?.name_of_the_author)}
                width="160"
              />
              <blockquote>
                <p>{RichText.asText(slice?.primary?.quote)}</p>
                <cite>
                  {RichText.asText(slice?.primary?.name_of_the_author)}
                </cite>
              </blockquote>
              <hr />
            </section>
          )

        default:
          return
      }
    })()
    return res
  })
}

// Todo: re-write fragment ... on PRISMIC_Post
export const query = graphql`
  query GET_HOME_PAGE {
    prismic {
      allHomes {
        edges {
          node {
            title
            description
            body {
              __typename
              ... on PRISMIC_HomeBodyQuote {
                primary {
                  quote
                  name_of_the_author
                  portrait_author
                }
              }
              ... on PRISMIC_HomeBodyTeam {
                primary {
                  team_section
                }
                fields {
                  first_and_lastname
                  position
                  portrait
                }
              }
            }
          }
        }
      }
      allPosts {
        edges {
          node {
            title
            _meta {
              id
              uid
              lang
              type
            }
          }
        }
      }
    }
  }
`
