import React, { Component } from "react"
import { Index } from "elasticlunr"

export default class Discovery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: props.initial || [],
      query: ``
    }
  }

  componentDidMount() {
    console.log('Mounted.');
    this.index = this.getOrCreateIndex()
    this.setState({
      results: this.index.search('**********').map(({ref}) => this.index.documentStore.getDoc(ref))
    })

    window.y = this.index
  }

  getOrCreateIndex = () => this.index
    ? this.index
    : // Create an elastic lunr index and hydrate with graphql query results
      Index.load(this.props.searchIndex)

  select = item => {
    // window.postMessage(item)
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
      <div>
        <p>Please refine your search for content.</p>
      </div>
    ) : this.renderResults()

    return (
      <div>
        <div>
          <label>Keywords</label>
          <input type="text" placeholder="search" onChange={this.search} />
        </div>
        { Results }
      </div>
    )
  }
}