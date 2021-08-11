import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

class HowItWorks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			content: [
				{
					title: '1. Search',
					icon: 'search',
					description: 'Search the medical equipment you need using key words.',
				},
				{
					title: '2. Refine',
					icon: 'filter_alt',
					description:
						'Take a look at the detail specifications, product catalogue and feature of listed equipment and filter out your equipment upon your requirement.',
				},
				{
					title: '3. Select a Product',
					icon: 'offline_pin',
					description: 'Compare and Select a product of your desiered choice.',
				},
				{
					title: '4. Connect',
					icon: 'link',
					description: 'After you get what you were looking for, contact or make an appointment.',
				},
				{
					title: '5. Buy',
					icon: 'shopping_cart',
					description: 'Acquire the medical equipment.',
				},
			],
			title: 'Search,  compare,  select,  connect, and  Buy',
		}
	}
	render() {
		return (
			<div className="position-relative">
				<section className="section bg-gradient-teal section-shaped">
					{/* <div className="shape shape-style-1 ">
                                <span className="span-150" />
                                <span className="span-50" />
                                <span className="span-50" />
                                <span className="span-75" />
                                <span className="span-100" />
                                <span className="span-75" />
                                <span className="span-50" />
                                <span className="span-100" />
                                <span className="span-50" />
                                <span className="span-100" />
                            </div> */}

					<div className="content-center pt-2 text-white">
						<Container>
							
						</Container>
					</div>
					<div className="separator separator-bottom separator-skew">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none"
							version="1.1"
							viewBox="0 0 2560 75"
							x="0"
							y="0">
							<polygon
								className="fill-white"
								points="0 0 0 75 2560 75"
								style={{ fill: '#f4f5f7' }}
							/>
						</svg>
					</div>
				</section>
				{' '}
			</div>
		)
	}
}

export default HowItWorks
