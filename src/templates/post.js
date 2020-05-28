import React from "react"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

const Post = ({ data }) => {
  const doc = data?.prismic.allPosts.edges.slice(0, 1).pop()

  if (!doc) return <div>no data 2</div>

  return (
    <>
      <h1>{RichText.asText(doc.node.title)}</h1>
      <RichText render={doc.node.content} />
      <Link to="/">Back home</Link>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}

export default Post

// Todo: fix query (use post instead allPosts)
export const query = graphql`
  query GET_POST_PAGE($uid: String!) {
    prismic {
      allPosts(uid: $uid) {
        edges {
          node {
            title
            content
          }
        }
      }
    }
  }
`
