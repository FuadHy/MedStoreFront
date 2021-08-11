import React, { Component } from 'react'
import {
	ListGroup,
	ListGroupItem,
	Table,
	Button,
	ListGroupItemHeading,
	ListGroupItemText,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'

class CompareProduct extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [
				{
					name: 'Blood Pressure Scanner',
					sold_by: {
						name: 'WAGGA',
						location: 'Germany',
					},
					rating: 5,
					img_urls: [
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
					],
					tags: ['eye', 'oct', 'ophtalmology'],
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					characterstics: [
						{
							name: 'battery life',
							value: '5 hrs',
						},
						{
							name: 'battery life',
							value: '5 hrs',
						},
					],
				},
				{
					name: 'Blood Pressure Scanner',
					sold_by: {
						name: 'WAGGA',
						location: 'Germany',
					},
					rating: 5,
					img_urls: [
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
					],
					tags: ['eye', 'oct', 'ophtalmology'],
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					caracterstics: [
						{
							name: 'battery life',
							value: '5 hrs',
						},
						{
							name: 'battery life',
							value: '5 hrs',
						},
					],
				},
				{
					name: 'Blood Pressure Scanner',
					sold_by: {
						name: 'WAGGA',
						location: 'Germany',
					},
					rating: 5,
					img_urls: [
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
					],
					tags: ['eye', 'oct', 'ophtalmology'],
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					characterstics: [
						{
							name: 'battery life',
							value: '5 hrs',
						},
						{
							name: 'battery life',
							value: '5 hrs',
						},
					],
				},
				{
					name: 'Blood Pressure Scanner',
					sold_by: {
						name: 'WAGGA',
						location: 'Germany',
					},
					rating: 5,
					img_urls: [
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
					],
					tags: ['eye', 'oct', 'ophtalmology'],
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					caracterstics: [
						{
							name: 'battery life',
							value: '5 hrs',
						},
						{
							name: 'battery life',
							value: '5 hrs',
						},
					],
				},
				{
					name: 'Blood Pressure Scanner',
					sold_by: {
						name: 'WAGGA',
						location: 'Germany',
					},
					rating: 5,
					img_urls: [
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
					],
					tags: ['eye', 'oct', 'ophtalmology'],
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					characterstics: [
						{
							name: 'battery life',
							value: '5 hrs',
						},
						{
							name: 'battery life',
							value: '5 hrs',
						},
					],
				},
				{
					name: 'Blood Pressure Scanner',
					sold_by: {
						name: 'WAGGA',
						location: 'Germany',
					},
					rating: 5,
					img_urls: [
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-1-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
						{
							src: require('assets/img/theme/img-2-1200x1000.jpg'),
							altText: '',
							caption: '',
							header: '',
						},
					],
					tags: ['eye', 'oct', 'ophtalmology'],
					description:
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					caracterstics: [
						{
							name: 'battery life',
							value: '5 hrs',
						},
						{
							name: 'battery life',
							value: '5 hrs',
						},
					],
				},
			],
		}
	}

	renderCharacterstics(charactersitcs) {
		return Array.from(charactersitcs).map(char => {
			return (
				<td>
					<ul>
						<li>
							<span>{char.name}</span>
							<span>{char.name}</span>
						</li>
					</ul>
				</td>
			)
		})
	}
	render() {
		const { products } = this.props
		return (
			<>
				<div className=" mt-5 mr-lg-5 ml-lg-5">
					{products.length !== 0 && (
						<Table responsive bordered>
							<thead>
								<tr>
									<th className="text-lg-center align-content-center">Product</th>
									{products.map(c => (
										<td>
											<img
												alt={`${c.name} Product`}
												src={`${LOCAL_BASE_URL}/${c.photo_urls[0]}`}
												height="120vh"
											/>
											<h6>{c.name}</h6>
										</td>
									))}
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">Charactersitcs</th>
									{this.state.products.map(c => {
										// this.renderCharacterstics(c.characterstics);
									})}
								</tr>
								<tr>
									<th scope="row">Description</th>
									{products.map(c => (
										<td>{c.description}</td>
									))}
								</tr>
								<tr>
									<th scope="row">Brand</th>
									{products.map(c => (
										<td>{c.brand}</td>
									))}
								</tr>
								<tr>
									<th scope="row">Rating</th>
									{products.map(c => (
										<td>
											<Rating name="read-only" value={c.rating} readOnly />
										</td>
									))}
								</tr>
								<tr>
									<th scope="row"></th>
									{products.map(c => (
										<td>
											<Link to={`${this.props.match.url}/detail/${c._id}`}>
												<Button className="font-weight-lighter" color="info" type="button" outline>
													{' '}
													View Product
												</Button>
											</Link>
										</td>
									))}
								</tr>
							</tbody>
						</Table>
					)}
				</div>
			</>
		)
	}
}

export default CompareProduct
