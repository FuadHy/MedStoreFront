import React from 'react'

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
	Badge
} from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import formSerializer from 'form-serialize'
import history from 'history-master'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.handleRegister = this.handleRegister.bind(this)
		this.initial = {
		  signing: false,
	      pass: false,
	      email: false,
	      success: false,
	      fill: false,
	      agree: true
		}
		this.state = {
	      ...this.initial
	    }
	}

	componentDidMount() {
		document.documentElement.scrollTop = 0
		document.scrollingElement.scrollTop = 0
		this.refs.main.scrollTop = 0
	}

	handleRegister(e) {
		e.preventDefault()
		this.setState({
	      ...this.initial,
	      signing: true,
	      initialized: true
	    })
		let formValues = formSerializer(e.target, { hash: true })
		if (formValues.password !== formValues.passwordConfirm){
			console.log(this.state)
			return this.setState({
				...this.initial,
				pass:true,
				signing:false
			})
		}
		let requestBody = {
			name: formValues.name,
			phone: formValues.phone,
			email: formValues.email,
			password: formValues.password,
			passwordConfirm: formValues.passwordConfirm
		}
		console.log([...Object.values(requestBody)])
		if([...Object.values(requestBody)].includes(undefined)){
			return this.setState({
				...this.initial,
				fill:true
			})
		}
		if (!e.target.agree.checked){
			return this.setState({
				...this.initial,
				agree: false,
			})
		}
		axios
			.post(`${LOCAL_BASE_URL}${API_URL}/user/signup`, requestBody)
			.then(res => {
				console.log(res.data)
				if (res.data.status == 'success') {
					localStorage.setItem('token', res.data.token)
					this.setState({
						...this.initial,
						success:true
					})
					window.location.pathname = '/profile'
				} else {
					return this.setState({
							...this.initial,
							email:true
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		return (
			<>
				<main ref="main">
					<section className="section section-shaped section-lg">
						<div className="shape shape-style-1 bg-gradient-default">
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
							<span />
						</div>
						<Container className="pt-lg-7">
							<Row className="justify-content-center">
								<Col lg="6">
									<Card className="bg-secondary shadow border-0">
									{ this.state.signing && <div className="loader-login" data-auth="Creating an account..."></div>}
										<CardHeader className="bg-white py-5">
											<div className="text-muted text-center mb-0">
												<medium>Welcome To MedStore.et</medium>
											</div>
										</CardHeader>
										<CardBody className="px-lg-5 py-lg-5">
											<div className="text-center text-muted mb-4">
												{!this.state.initialized && <small>Sign up with credentials</small>}
                         						{this.state.success && (<br />, <Badge color="success">Account succefully created. Redirecting...</Badge>)}
                         						{this.state.pass && (<br />, <Badge color="danger">Password don't match!...</Badge>)}
                         						{this.state.email && (<br />, <Badge color="danger">This email is already taken, Please try again!</Badge>)}
                         						{this.state.fill && (<br />, <Badge color="danger">Please fill all the required fields!</Badge>)}
                         						{!this.state.agree && (<br />, <Badge color="danger">To continue You must agree to the terms!</Badge>)}
											</div>
											<Form onSubmit={e => this.handleRegister(e)} role="form">
												<Row>
													<Col>
														<FormGroup>
															<InputGroup className="input-group-alternative mb-3">
																<InputGroupAddon addonType="prepend">
																	<InputGroupText>
																		<i className="ni ni-hat-3" />
																	</InputGroupText>
																</InputGroupAddon>
																<Input placeholder="Name" type="text" name="name" />
															</InputGroup>
														</FormGroup>
													</Col>
													<Col>
														<FormGroup>
															<InputGroup className="input-group-alternative mb-3">
																<InputGroupAddon addonType="prepend">
																	<InputGroupText>
																		<i className="ni ni-mobile-button" />
																	</InputGroupText>
																</InputGroupAddon>
																<Input placeholder="Phone" type="text" name="phone" />
															</InputGroup>
														</FormGroup>
													</Col>
												</Row>

												<FormGroup>
													<InputGroup className="input-group-alternative mb-3">
														<InputGroupAddon addonType="prepend">
															<InputGroupText>
																<i className="ni ni-email-83" />
															</InputGroupText>
														</InputGroupAddon>
														<Input placeholder="Email" type="email" name="email" />
													</InputGroup>
												</FormGroup>
												<Row>
													<Col>
														<InputGroup className="input-group-alternative mb-3">
															<Input placeholder="City" type="text" name="city" />
														</InputGroup>
													</Col>
													<Col>
														<InputGroup className="input-group-alternative mb-3">
															<Input placeholder="Region" type="text" name="region" />
														</InputGroup>
													</Col>
													<Col>
														<InputGroup className="input-group-alternative mb-3">
															<Input placeholder="Country" type="text" name="country" />
														</InputGroup>
													</Col>
												</Row>
												<Row>
													<Col>
														<FormGroup>
															<InputGroup className="input-group-alternative">
																<InputGroupAddon addonType="prepend">
																	<InputGroupText>
																		<i className="ni ni-lock-circle-open" />
																	</InputGroupText>
																</InputGroupAddon>
																<Input
																	placeholder="Password"
																	type="password"
																	autoComplete="off"
																	name="password"
																/>
															</InputGroup>
														</FormGroup>
													</Col>
													<Col>
														<FormGroup>
															<InputGroup className="input-group-alternative">
																<InputGroupAddon addonType="prepend">
																	<InputGroupText>
																		<i className="ni ni-lock-circle-open" />
																	</InputGroupText>
																</InputGroupAddon>
																<Input
																	placeholder="Confirm Passowrd"
																	type="password"
																	autoComplete="off"
																	name="passwordConfirm"
																/>
															</InputGroup>
														</FormGroup>
													</Col>
												</Row>

												<Row className="my-4">
													<Col xs="12">
														<div className="custom-control custom-control-alternative custom-checkbox">
															<input
																className="custom-control-input"
																id="customCheckRegister"
																type="checkbox"
																name="agree"
															/>
															<label className="custom-control-label" htmlFor="customCheckRegister">
																<span>
																	I agree with the{' '}
																	<a href="#pablo" onClick={e => e.preventDefault()}>
																		Privacy Policy
																	</a>
																</span>
															</label>
														</div>
													</Col>
												</Row>
												<div className="text-center">
													<Button className="mt-4" color="primary" type="submit">
														Create account
													</Button>
												</div>
											</Form>
										</CardBody>
									</Card>
								</Col>
							</Row>
							<Row>
								<Col className="text-right" xs="9">
									<Link className="text-light" to="/log-in">
										<small>Already have an account login</small>
									</Link>
								</Col>
							</Row>
						</Container>
					</section>
				</main>
			</>
		)
	}
}

export default Register
