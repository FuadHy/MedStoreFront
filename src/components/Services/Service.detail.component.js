import React from 'react'
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
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	FormGroup,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Badge,
} from 'reactstrap'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'
import SerializeForm from 'form-serialize'

class ServiceDetail extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			services: [
				{
					title_long: 'Buy and Sell Medical Equipment',
					title: 'Buy and Sell',
					description: 'Buy and sell new/used medical equipments\n\nAt medstore.et you find eFDA registrerdmedical equipments for sale in Ethipia both in stock and order.',
						bullets: [
						'Buy with luxury :- wide range by type, category ,and Brand ',
						'Save your time and energy :- search, refine, compare and contrast ,select ,then decide',
					],

					img_src: 'assets/img/theme/CT2.jpg',
					button: 'Buy & Sell',
				},
				{
					title_long: 'Technical Suppport',
					title: 'Technical Suppport',
					description:
						'MedStore.et is home to experience and licensed biomedical engineers where you can get technical support for your medical Equipment\n\n Engineers take care of:',
					bullets: [
						'New Installation of Medical Equipment',
						'Relocation of Medical Equipment',
						'Performance and verification of Medical Equipment',
						'Calibration of Medical Equipment',
						'Preventive and Curative  Maintenance',
					],
					img_src: 'assets/img/ill/Technical Suppot.png',
					button: 'Get Support',
				},
				{
					title_long: 'Consultancy',
					title: 'Consultancy',
					description:
						'At MedStore.et you get consultation on different aspect of Medical Equipment Industry Depending on customer type medstore provides two catagory of consultancy.\n\nCategory 1: Consultancy on health institution\nMedstore consultso on:',
					bullets: [
						'Prepare need assessment',
						'Advise on  Procurement process',
						'Preparing specification  of Medical Equipment for bid document',
						'Advise on proper utilization or management of Medical Equipment',
					],
					description2:
						'Catgery 2: Consultancy of buisness owner on the Industry\nMedstore consults on:',
					bullets2: [
						'Registering products at eFDA',
						'Assist/advice on Bid preparation',
						'Connect with potential manufacturers',
					],
					img_src: 'assets/img/ill/Consultancy.png',
					button: 'Make Appointment',
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
					button: 'Coming Soon',
				},
			],
			activeService: {},
		}
		this.state.isRequestModalOpen = false
		this.state.initializingRequest = false
		this.state.requestCreated = false
		this.state.title = ''
	}

	componentDidMount() {
		this.setState({
			...this.state,
		})
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
		const { initializingRequest, requestCreated, title } = this.state
		const activeService = this.state.services.filter(ser => ser.title === this.props.match.url.split('/')[2])[0]
		console.log(activeService, this.props.match.url.split('/')[2])
		return (
			<>
			<Modal size="md" isOpen={this.state.isRequestModalOpen} toggle={() => this.toggleRequestModal('')}>
						<Form
							onSubmit={e => {
								this.handleRequestSubmit(e)
							}}>
							<ModalBody className="p-0">
								<Col lg="" className="p-0">
									<Card className="bg-gradient-secondary shadow">
										<CardBody className="p-lg-5">
											<h4 className="mb-1">Need help on {title}?</h4>
											<p className="mt-0">Let us know your questions ...</p>
											<FormGroup>
												<InputGroup className="input-group-alternative">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-user-run" />
														</InputGroupText>
													</InputGroupAddon>
													<Input required placeholder="Enter Your name" type="text" name="name" />
												</InputGroup>
											</FormGroup>
											
											<FormGroup>
												<InputGroup className="input-group-alternative">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-email-83" />
														</InputGroupText>
													</InputGroupAddon>
													<Input placeholder="Enter your email" name="email" type="email" />
												</InputGroup>
											</FormGroup>
												

											<FormGroup className="mb-4">
												<Input
													className="form-control-alternative"
													cols="80"
													name="message"
													placeholder="Do you have specific requirements (tell us more about your needs)..."
													rows="4"
													type="textarea"
												/>
											</FormGroup>
											
											<div>
												<Button block className="btn-round" color="default" size="lg" type="submit">
													Send Message
												</Button>
											</div>
											{initializingRequest && !requestCreated && (
												<Badge color="danger">Requesting...</Badge>
											)}
											{!initializingRequest && requestCreated && (
												<Badge color="primary">Request Sent</Badge>
											)}
											{initializingRequest && requestCreated && (
												<Badge color="danger">Sending request failed try again</Badge>
											)}
										</CardBody>
									</Card>
								</Col>
							</ModalBody>
						</Form>
					</Modal>
				<main>
					<section className="mb-3 pb-7 position-relative bg-gradient-lighter">
						<Container>
							<Row className="pt-8 row-grid align-items-center">
								<Container className="pl-2" lg="" style={{marginTop:'-10%'}}>
									<h7 className="display-2">{activeService.title_long}</h7>
									<p style={{whiteSpace:'pre-wrap'}}>{activeService.description}</p>
									{activeService.bullets && activeService.bullets.length !== 0 && (
										<ul>
											{activeService.bullets.map(bullet => (
												<li>{bullet}</li>
											))}
										</ul>
									)}
									{activeService.description2 && [
										<p style={{whiteSpace:'pre-wrap'}}>{activeService.description2}</p>,
										<ul>
											{activeService.bullets2.map(bullet => (
												<li>{bullet}</li>
											))}
										</ul>
									]}
									<Button 
									onClick={ () => 
										activeService.title === 'Tender' ? void(0) : activeService.title === 'Buy and Sell' ? window.location.pathname = '/product' : this.toggleRequestModal(activeService.title)
									}
									style={{marginLeft:'30%', marginTop:'10px'}}>{activeService.button}</Button>
									
									
								</Container>
							</Row>
						</Container>
					</section>
				</main>
			</>
		)
	}
}
export default ServiceDetail
