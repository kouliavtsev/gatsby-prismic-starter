import React from "react"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"

export default function Home({ data }) {
  const doc = data?.prismic.allHomes.edges.slice(0, 1).pop()
  const posts = data.prismic.allPosts.edges

  if (!doc) return <div>no data</div>

  return (
    <>
      <h1>{RichText.asText(doc.node.title)}</h1>
      <RichText render={doc.node.description} />
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
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
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
