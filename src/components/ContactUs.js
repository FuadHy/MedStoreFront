import React from 'react'
import classnames from 'classnames'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import {
	Button,
	Container,
	Row,
	Col,
	Form,
	Card,
	CardBody,
	FormGroup,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Badge,
} from 'reactstrap'
import SerializeForm from 'form-serialize'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'

class ContactUs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultProps: {
				center: {
					lat: 9.010005,
					lng: 38.7879,
				},
				zoom: 15,
			},
			initializingRequest: false,
			requestCreated: false,
		}
	}
	handleRequestSubmit = e => {
		e.preventDefault()
		this.setState({
			initializingRequest: true,
			requestCreated: false,
		})
		let formValues = SerializeForm(e.target, { hash: true })
		axios
			.post(`${LOCAL_BASE_URL}${API_URL}/message`, formValues)
			.then(res => {
				this.setState({
					initializingRequest: false,
					requestCreated: true,
				})
			})
			.catch(e => {
				this.setState({
					initializingRequest: true,
					requestCreated: true,
				})
			})
	}

	render() {
		return (
			<>
				<div>
					<section className="product-content section-contact-us">
						<Container style={{paddingTop: '5%'}}>
							<h1 style={{textAlign:'center'}}>Contact Us</h1>
							<hr className="mt-0" />
							<Row>
								<Col>
									<h5>
										Email: <a href="mailto: info@medstore.et">info@medstore.et</a>
									</h5>{' '}
									{/* <h6>
										{' '}
										<a href="mailto: info@medstore.et">info@medstore.et</a>
									</h6> */}
									<h5>Phone:</h5>
									<h6 className="mb-100  font-weight-lighter">+251-919-38-1997</h6>
									<h6 className="mb-100  font-weight-lighter">+251-911-89-1367</h6>
									<h5>Address:</h5>{' '}
									<h6>
										{' '}
										Hayahulet , Djibuti Street, MidreKebd BLDG 2nd Floor #201 Bld,{' '}
										<div>Addis Ababa, Ethiopia</div>
									</h6>
								</Col>
								<Col>
									<div style={{ height: '40vh', width: '100%' }}>
										<GoogleMapReact
											bootstrapURLKeys={{ key: `AIzaSyAHx7rvLxXuW1jEZXIno6g4OpmH7A-MzRU` }}
											defaultCenter={this.state.defaultProps.center}
											defaultZoom={this.state.defaultProps.zoom}>
											<div lat={9.00890273145198} lng={38.78835542855193}>
												<span className="material-icons text-warning ml-lg-auto">location_on</span>
											</div>
										</GoogleMapReact>
									</div>
								</Col>
							</Row>
							<Row className="justify-content-center mt-6 ">
								<Col lg="8">
									<Form
										onSubmit={e => {
											this.handleRequestSubmit(e)
										}}>
										<Card className="bg-gradient-secondary shadow">
											<CardBody className="p-lg-5">
												<h4 className="mb-1">Want to know more about us?</h4>
												<p className="mt-0">Write something for us ...</p>

												<FormGroup
													className={classnames('mt-5', {
														focused: this.state.nameFocused,
													})}>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-user-run" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Your name"
															name="name"
															type="text"
															onFocus={e => this.setState({ nameFocused: true })}
															onBlur={e => this.setState({ nameFocused: false })}
														/>
													</InputGroup>
												</FormGroup>
												<FormGroup
													className={classnames({
														focused: this.state.emailFocused,
													})}>
													<InputGroup className="input-group-alternative">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-email-83" />
															</InputGroupText>
														</InputGroupAddon>
														<Input
															placeholder="Email address"
															name="email"
															type="email"
															onFocus={e => this.setState({ emailFocused: true })}
															onBlur={e => this.setState({ emailFocused: false })}
														/>
													</InputGroup>
												</FormGroup>
												<FormGroup className="mb-4">
													<Input
														className="form-control-alternative"
														cols="80"
														name="message"
														placeholder="Type a message..."
														rows="4"
														type="textarea"
													/>
												</FormGroup>
												<div>
													<Button
														block
														className="btn-round"
														color="default"
														size="lg"
														type="submit">
														Send Message
													</Button>
												</div>
												{this.state.initializingRequest && !this.state.requestCreated && (
													<Badge color="danger">Contacting...</Badge>
												)}
												{!this.state.initializingRequest && this.state.requestCreated && (
													<Badge color="primary">Message Sent</Badge>
												)}
												{this.state.initializingRequest && this.state.requestCreated && (
													<Badge color="danger">Sending message failed try again</Badge>
												)}
											</CardBody>
										</Card>
									</Form>
								</Col>
							</Row>
						</Container>
					</section>
				</div>
			</>
		)
	}
}

export default ContactUs
