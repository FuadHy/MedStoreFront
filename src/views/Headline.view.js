import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class Headline extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<Container>
				<header style={{"z-index":"99"}}>
					<Row>
						<Col lg="8">
							<span>
								<h1 className="display-3">Ethiopian Medical Equipment Marketplace &amp; More</h1>
							</span>
						</Col>
					</Row>
					<Row>
						<Col className="header-description" xl="10">
							<span>
								<p className=" lead " style={{color:"#ffffff"}}>
									<span className="font-weight-bold">MedStore.et</span> is an Ethiopian medical
									equipment multi-service platform where you find multiple choice of Products and
									Services for your Medical Equipment need.
								</p>
							</span>
						</Col>
						<Col>
							<span></span>
						</Col>
					</Row>
				</header>
			</Container>
		)
	}
}

export default Headline
