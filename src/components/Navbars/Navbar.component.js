import React from 'react'
import { Link } from 'react-router-dom'
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js'
import { connect } from 'react-redux'
// reactstrap components
import {
	UncontrolledCollapse,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
	Media,
	NavbarBrand,
	Navbar,
	Nav,
	Row,
	Col,
} from 'reactstrap'

function mapStateToProps(state) {
	return { state }
}

class DemoNavbar extends React.Component {
	componentDidMount() {
		let headroom = new Headroom(document.getElementById('navbar-main'))
		// initialise
		headroom.init()
	}

	state = {
		collapseClasses: '',
		collapseOpen: false,
	}

	onExiting = () => {
		this.setState({
			collapseClasses: 'collapsing-out',
		})
	}

	onExited = () => {
		this.setState({
			collapseClasses: '',
		})
	}

	render() {
		const {state: {logged}} = this.props
		return (
			<>
				<header>
					<Navbar
						className="navbar-main shadow navbar-transparent pr-5 pl-5 "
						expand="lg"
						id="navbar-main"
						style={{"padding": "1px 0 1px 0"}}>
						<Col lg="6" md="6">
							<NavbarBrand className="mr-lg-5 d-flex flex-row" to="/" tag={Link} style={{"padding": "1px 0 1px 0", "height":"100%"}}>
								<img alt="..." src={require('../../assets/img/brand/Logo-w-moto-white.png')}  style={{"width":"220px", "height":"100px", "object-fit":"contain"}}/>
							</NavbarBrand>
						</Col>

						<Col lg="6" md="6">
						<Row className="justify-content-end">
								<UncontrolledDropdown style={{marginTop:'10px'}}>
									<DropdownToggle nav>
										<Link className="nav-link-inner--text nav-hover" data-user={logged ? (localStorage.getItem('username') || '') : ''} to={logged ? "/profile" : "/log-in"} id="acc-icon" style={{display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
											{logged ? <span className="material-icons text-white">account_circle</span> : <p style={{color:'#fff', height:'5px', fontSize:'15px', letterSpacing:'2px'}}> Login/Signup</p>}
											
										</Link>
									</DropdownToggle>
								</UncontrolledDropdown>
							</Row>

							<Row className="justify-content-end">
								<button className="navbar-toggler" id="navbar_global">
									<span className="navbar-toggler-icon" />
								</button>
								<UncontrolledCollapse
									toggler="#navbar_global"
									navbar
									className={'justify-content-end'}
									onExiting={this.onExiting}
									onExited={this.onExited}>
									<div className="navbar-collapse-header">
										<Row>
											<Col className="collapse-brand" xs="6">
												<Link to="/">
													<img alt="..." src={require('../../assets/img/brand/Logo-w-moto.png')} />
												</Link>
											</Col>
											<Col className="collapse-close" xs="6">
												<button className="navbar-toggler" id="navbar_global">
													<span />
													<span />
												</button>
											</Col>
										</Row>
									</div>
									<Nav className="navbar-nav-hover" navbar>
										
										<UncontrolledDropdown nav>
											<DropdownToggle nav>
												<i className="ni ni-ui-04 d-lg-none" />
												<Link className="nav-link-inner--text nav-hover" to="/">
													<span className="h6 font-weight-normal text-white">Home</span>
												</Link>
											</DropdownToggle>
										</UncontrolledDropdown>
										<UncontrolledDropdown nav>
											<DropdownToggle nav>
												<i className="ni ni-cart d-lg-none" />
												<Link to="/product" className="nav-link-inner--text nav-hover">
													<span className="h6 font-weight-normal  text-white">Products</span>
												</Link>
											</DropdownToggle>
										</UncontrolledDropdown>
										<UncontrolledDropdown nav>
											<DropdownToggle nav>
												<i className="ni ni-app d-lg-none" />
												<Link to="/service" className="nav-link-inner--text nav-hover">
													<span className="h6 font-weight-normal text-white">Services</span>
												</Link>
											</DropdownToggle>
										</UncontrolledDropdown>
										<UncontrolledDropdown nav>
											<DropdownToggle nav>
												<i className="ni ni-circle-08 d-lg-none" />
												<Link className="nav-link-inner--text nav-hover" to="/about-us" style={{"white-space": "nowrap"}}>
													<span className="h6 font-weight-normal text-white">About Us</span>
												</Link>
											</DropdownToggle>
										</UncontrolledDropdown>
										<UncontrolledDropdown>
											<DropdownToggle nav>
												<i className="ni ni-email-83 d-lg-none" />
												<Link className="nav-link-inner--text nav-hover" to="/contact-us" style={{"white-space": "nowrap"}}>
													<span className="h6 font-weight-normal text-white">Contact Us</span>
												</Link>
											</DropdownToggle>
										</UncontrolledDropdown>
										
									</Nav>
								</UncontrolledCollapse>
							</Row>
						</Col>
					</Navbar>
				</header>
			</>
		)
	}
}

export default connect(mapStateToProps)(DemoNavbar)
