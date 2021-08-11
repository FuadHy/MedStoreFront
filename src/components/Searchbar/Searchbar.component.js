import React, { Component } from 'react'
import { Container, InputGroup, Input } from 'reactstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL, LOCAL_BASE_URL } from '../../constants'

class SearchBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			query: '',
			result: [],
			dropdownOpen: false,
		}
		this.updateQuery = this.updateQuery.bind(this)
		this.handelClick = this.handelClick.bind(this)
	}

	toggleDropDown() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen,
		}))
	}

	updateQuery(term) {
		// this.setState(prevState => ({
		// 	query: term,
		// 	result: prevState.result.concat([term]),
		// }))
		if (this.state.query.trim() === '') {
			this.setState({
				result: [],
			})
		}
		let query = { keys: [term] }
		axios.post(`${LOCAL_BASE_URL}${API_URL}/search`, query).then(res => {
			let matches = res.data.data
			this.setState({
				result: res.data.data,
			})
		})
	}

	handelClick() {
		this.setState({
			result: [],
		})
	}

	render() {
		return (
			<Container className="search-bar px-0">
				<div className="search-bar-body">
					<InputGroup className=" mb-0">
						<Input
							className="border-teal"
							placeholder="Brand, Model, Keywords..."
							type="text"
							// value={this.state.query}
							onChange={e => this.updateQuery(e.target.value)}
							onFocus={e => this.setState({ searchFocused: true })}
							onBlur={e => this.setState({ searchFocused: false })}
						/>
					</InputGroup>
					<ul className="search-bar-result border-0 list-group mt-0">
						{this.state.result.length !== 0 &&
							this.state.result.map(res => (
								<Link to={`${this.props.match.url}/search/detail/${res._id}`}>
									<li
										onClick={this.handelClick}
										className="search-result-item list-group-item py-0">
										{res.name}
									</li>
								</Link>
							))}
					</ul>
				</div>
			</Container>
		)
	}
}

export default SearchBar
