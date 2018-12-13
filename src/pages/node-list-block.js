import React from 'react'
import { Link, graphql } from 'gatsby'

const IndexPage = ({data}) => (
  <div className="block block--blog-posts" style={{
    background: 'black',
    color: 'white'
  }}>
    { data.allNodeBlog.edges.map(({node}) => {
      const body = node.body.processed.replace(/<\/?[^>]+(>|$)/g, "");
      return (
        <div className="blog-post card">
          <h3 className="blog-post--title">{ node.title }</h3>
          <div dangerouslySetInnerHTML={{__html: `${body.substr(0, 150)}...` }}></div>
        </div>
      )
    })}
  </div>
)

export default IndexPage

export const query = graphql`
  {
    allNodeBlog {
      totalCount
      edges {
        node {
          title
          nid
          body {
            processed
          }
        }
      }
    }
  }
`