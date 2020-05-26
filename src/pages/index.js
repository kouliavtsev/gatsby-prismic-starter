import React from "react"
import { Link, graphql } from "gatsby"

export default function Home({ data }) {
  return (
    <>
      <h1>
        Posts{" "}
        <span role="img" aria-label="icon">
          🥳
        </span>
      </h1>
      <ul>
        {data.allPrismicPost.edges.map(item => {
          return (
            <li key={item.node.id}>
              <Link to={item.node.url}>{item.node.data.title.text}</Link>
            </li>
          )
        })}
      </ul>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}

export const query = graphql`
  query HomePageQuery {
    allPrismicPost {
      edges {
        node {
          id
          url
          data {
            title {
              text
            }
          }
        }
      }
    }
  }
`
