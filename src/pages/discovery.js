import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import DiscoveryComponent from '../components/discovery'

export default () => (
  <StaticQuery
    query={graphql`
      query DiscoveryQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <div>
        <DiscoveryComponent searchIndex={data.siteSearchIndex.index} />
      </div>
    )}
  />
)