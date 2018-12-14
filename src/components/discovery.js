import React, { Component } from "react"
import { Index } from "elasticlunr"

import styles from './discovery.module.css'

export default class Discovery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: props.initial || [],
      query: ``
    }
  }

  componentDidMount() {
    this.index = this.getOrCreateIndex()
  }

  getOrCreateIndex = () => this.index
    ? this.index
    : // Create an elastic lunr index and hydrate with graphql query results
      Index.load(this.props.searchIndex)

  select = item => {
    // This should render a react component.
    const embed = "<div class='content-embed'><h1>" + item.title + "</h1></div>";
    if (window.parent) {
      window.parent.postMessage({ embed }, '*')
    }
    alert(`Choose to embed ${item.title}`)
  }

  search = evt => {
    const query = evt.target.value
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }

  renderResults() {
    return (
      <ul>
        { this.state.results.map(item => (
          <li key={item.id} onClick={() => this.select(item)}>
            <img src="https://picsum.photos/200/?random" />
            <h3>{item.title}</h3>
          </li>
        ))}
      </ul>
    )
  }

  render() {

    const Results = this.state.results.length === 0 ? (
      <p>Please refine your search for content.</p>
    ) : this.renderResults()

    return (
      <div className={styles.discoveryContainer}>
        <div className={styles.discoveryTitle}>
          Select content to embed
        </div>
        <div className={styles.discoveryForm}>
          <label>Keywords</label>
          <input type="text" placeholder="search" onChange={this.search} />
        </div>
        <div className={styles.discoveryContent}>
          { Results }
        </div>
      </div>
    )
  }
}