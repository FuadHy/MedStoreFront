import React, { Component } from 'react'
import {
	Col,
	Card,
	CardBody,
	Button,
	Row,
	Modal,
	CardGroup,
	Input,
	Form,
	Container,
	// CardImg
} from 'reactstrap'
import { Switch, Link, Route } from 'react-router-dom'

import ServiceDetail from './Service.detail.component'

import axios from 'axios'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'
import SerializeForm from 'form-serialize'

class Service extends Component {
	constructor(props) {
		super(props)
		this.state = {
			services: [
				{
					title_long: 'Buy and Sell Medical Equipment',
					title: 'Buy and Sell',
					description:
						'Medstore.et is a place where you can find eFDA Registered medical equipment in Ethiopia both in stock and order. Also a place where you can find used medical equipment.',
					bullets: [
						'Buy with luxury :- wide range by type, category ,and Brand ',
						'Save your time and energy :- search, refine, compare and contrast ,select ,then decide',
					],

					img_src: 'assets/img/theme/CT2.jpg',
					link: '',
				},
				{
					title_long: 'Technical Suppport',
					title: 'Technical Suppport',
					description:
						'MedStore.et is home to experience and licensed biomedical engineers where you can get technical support for your medical Equipment',
					bullets: [
						'New Installation of Medical Equipment',
						'Relocation of Medical Equipment',
						'Performance and verification of Medical Equipment',
						'Calibration of Medical Equipment',
						'Preventive and Curative  Maintenance',
					],
					img_src: 'assets/img/ill/Technical Suppot.png',
					link: '',
				},
				{
					title_long: 'Consultancy',
					title: 'Consultancy',
					description:
						'At MedStore.et you get consultation on different aspect of Medical Equipment Industry Depending on customer type medstore provides two catagory of consultancy.',
					bullets: [
						'Prepare need assessment',
						'Advise on  Procurement process',
						'Preparing specification  of Medical Equipment for bid document',
						'Advise on proper utilization or management of Medical Equipment',
						'Registering products at eFDA',
						'Assist/advice on Bid preparation',
						'Connect with potential manufacturers',
					],
					img_src: 'assets/img/ill/Consultancy.png',
					link: '',
				},
				{
					title_long: 'Tender',
					title: 'Tender',
					description:
						'At MedStore.et subscribers get breaking Notification of Medical Equipment Tenders. Tenders floated by public as well as private institutions around the whole country. So that subscribers could act upon it swiftly.',
					bullets: [
						'Early Notification',
						'Detailed content',
						'Medical equipment only',
						'Email,SMS',
					],
					img_src: 'assets/img/ill/Tender.png',
					link: '',
				},
			],
			activeService: {},
		}
		this.state.activeService = this.state.services[0]
		this.state.isRequestModalOpen = false
		this.state.initializingRequest = false
		this.state.requestCreated = false
		this.state.title = ''
	}

	toggleRequestModal = (title) => {
		this.setState({
			...this.state,
			isRequestModalOpen: !this.state.isRequestModalOpen,
			title
		})
	}

	handleRequestSubmit = e => {
		e.preventDefault()
		this.setState({...this.state,
			requestCreated: false,
			initializingRequest: true
		})
		let formValues = SerializeForm(e.target, { hash: true })
		let request = {
			name: formValues.name,
			email: formValues.email,
			message: formValues.message,
		}

		axios
			.post(`${LOCAL_BASE_URL}${API_URL}/message`, request)
			.then(res => {
				this.setState({...this.state,
					requestCreated: true,
					initializingRequest: false
				})
				setTimeout(() => {
					this.toggleRequestModal()
				}, 1500)
			})
			.catch(() => {
				this.setState({...this.state,
					requestCreated: true,
					initializingRequest: true
				})
			})
	}

	render() {
		const { match } = this.props
		const { initializingRequest, requestCreated, title } = this.state
		return (
			<>
				<div className="product-content" style={{padding:'0 2rem'}}>
					<h1> Services</h1>
					<hr className="mt-0" />
					<CardGroup>
						<Row style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
							{this.state.services.map(service => (
								<Col lg={12 / this.state.services.length}>
									<Card className="card-lift--hover shadow border-0">
										<CardBody className="pb-3">
											{/* <CardImg className=" mb-4" src={require("assets/img/ill/Tender.png")} alt="Smartphone icon" /> */}
											<h4 className="text-uppercase text-center bold">{service.title}</h4>
											<p className="description mt-3"> {service.description} </p>
											<Link to={`/service/${service.title}`}>
												<Button
													className="mt-4"
													color="primary"
													href=""
													//onClick={ () => 
														//this.toggleRequestModal(service.title)
													>
													{service.title !== 'Tender' ? 'Learn More' : 'Comming Soon'}
												</Button>
											</Link>
										</CardBody>
									</Card>
								</Col>
							))}
						</Row>
					</CardGroup>
					<hr />
					<Switch>
						<Route path={`/service/Buy and Sell`} exact={true} render={props => <ServiceDetail {...this.props} />} />
						<Route path={`/service/Technical Suppport`} exact={true} render={props => <ServiceDetail {...this.props} />} />
						<Route path={`/service/Consultancy`} exact={true} render={props => <ServiceDetail {...this.props} />} />
						<Route path={`/service/Tender`} exact={true} render={props => <ServiceDetail {...this.props} />} />
					</Switch>
				</div>
			</>
		)
	}
}

export default Service
