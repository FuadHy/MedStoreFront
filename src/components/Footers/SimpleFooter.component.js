import React from 'react'
import { Link } from 'react-router-dom'
// reactstrap components
import { Button, NavItem, NavLink, Nav, Container, Row, Col, UncontrolledTooltip } from 'reactstrap'
import { API_URL, LOCAL_BASE_URL } from '../../constants'

class SimpleFooter extends React.Component {
	render() {
		return (
			<>
				<footer className="footer" style={{ 'background-color': '#172b4d' }}>
					<Container className="">
						<Row className=" row-grid  ">
							<Col lg="">
								<h5 className="text-white">MedStore.et</h5>
								<Nav className=" nav-footer flex-column justify-content-center">
									<NavItem>
										<NavLink href="/" className="py-1">
											<span className="text-white">Home </span>
										</NavLink>
									</NavItem>
									<NavItem>
										<Link to="/product">
											<NavLink className="py-1">
												<span className="text-white">Products </span>
											</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="/service">
											<NavLink className="py-1">
												<span className="text-white">Services </span>
											</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="/about-us">
											<NavLink className="py-1">
												<span className="text-white">AboutUs </span>
											</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="/contact-us">
											<NavLink href="/contact-us" className="py-1">
												<span className="text-white">Contact Us </span>
											</NavLink>
										</Link>
									</NavItem>
									{/* <NavItem>
                    <NavLink
                      href="/contact-us" className="py-1"><span className="text-white" >LogIn </span></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/contact-us" className="py-1"><span className="text-white" >Signup </span></NavLink>
                  </NavItem> */}
								</Nav>
							</Col>
							<Col className="mt-0" lg="">
								<h5 className="text-white">Quick Links</h5>
								<Nav className=" nav-footer flex-column ">
									<NavItem>
										<Link to="/product/category/a3824cca-1b04-4f57-9892-1ffff5a5b233">
											<NavLink className="py-1">
												<span className="text-white">Used Products </span>
											</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="/product/category/ca0fa3f9-e966-4ce4-8ebc-abf0033bcce5">
											<NavLink className="py-1">
												<span className="text-white">Accessories</span>
											</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="service/Consultancy">
											<NavLink className="py-1">
												<span className="text-white">Consultancy</span>
											</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="service/Technical%20Support">
											<NavLink className="py-1">
												<span className="text-white">Technical Support</span>
											</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="service/Tender">
											<NavLink className="py-1">
												<span className="text-white">Tender</span>
											</NavLink>
										</Link>
									</NavItem>
								</Nav>
							</Col>
							<Col className="text-center mt-0" lg="">
								<h5 className="text-white">Contact us</h5>
								<h6 className="mb-100 text-white font-weight-lighter">+251-919-38-1997</h6>
								<h6 className="mb-100 text-white font-weight-lighter">+251-911-89-1367</h6>
								<h6 className="mb-100 text-white font-weight-lighter">
									<a href="mailto: info@medstore.et">info@medstore.et</a>
								</h6>
								<Button
									className="btn-icon-only rounded-circle"
									color="twitter"
									href="https://twitter.com/"
									id="tooltip475038074"
									target="_blank">
									<span className="btn-inner--icon">
										<i className="fa fa-twitter" />
									</span>
								</Button>
								<UncontrolledTooltip delay={0} target="tooltip475038074">
									Follow us
								</UncontrolledTooltip>
								<Button
									className="btn-icon-only rounded-circle ml-1"
									color="facebook"
									href="https://www.facebook.com/MedStoreet-103342841662384"
									id="tooltip837440414"
									target="_blank">
									<span className="btn-inner--icon">
										<i className="fa fa-facebook-square" />
									</span>
								</Button>
								<UncontrolledTooltip delay={0} target="tooltip837440414">
									Like us
								</UncontrolledTooltip>
								<Button
									className="btn-icon-only rounded-circle ml-1"
									color="linkedin"
									href="https://www.linkedin.com/company/medstore-et/"
									id="tooltip829810202"
									target="_blank">
									<span className="btn-inner--icon">
										<i className="fa fa-linkedin" />
									</span>
								</Button>
								<UncontrolledTooltip delay={0} target="tooltip829810202">
									Connect with us
								</UncontrolledTooltip>
								<Button
									className="btn-icon-only rounded-circle ml-1"
									color="telegram"
									href="https://t.me/medstoreet"
									id="tooltip495507257"
									target="_blank">
									<span className="btn-inner--icon">
										<i className="fa fa-telegram" />
									</span>
								</Button>
								<UncontrolledTooltip delay={0} target="tooltip495507257">
									Join us
								</UncontrolledTooltip>
							</Col>
						</Row>
						<hr className="mb-0 mt-1" />
						<Row>
							<Col md="6">
								<div className=" copyright">
									<a href="/" target="_blank">
										MedStore.et
									</a>{' '}
									© {new Date().getFullYear()}{' '}
								</div>
							</Col>
							<Col md="6">
								<Nav className=" nav-footer justify-content-end">
									<NavItem
									// to="/"
									>
										<Link to="/">
											<NavLink>MedStore.et</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="/about-us">
											<NavLink>About Us</NavLink>
										</Link>
									</NavItem>
									<NavItem>
										<Link to="/contact-us">
											<NavLink>
												Contact Us
											</NavLink>
										</Link>
									</NavItem>
								</Nav>
							</Col>
						</Row>
					</Container>
				</footer>
			</>
		)
	}
}

export default SimpleFooter
