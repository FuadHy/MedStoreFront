import React from 'react'

import { Container, Row, Col, Card, CardBody, Badge, CardImg } from 'reactstrap'
import { Route, Switch } from 'react-router-dom'


class Services extends React.Component {

	render() {
		return (
			<>
				<main ref="main">
					<div className="position-relative">

					<section className="section" style={{backgroundColor:'#ffffff'}}>
							<Container>
								<Row className="row-grid align-items-center">
									<Col className=" order-2 pr-md-5" md="6" lg="6" style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
										<Card className="bg-default shadow border-0" style={{display:'flex', flexDirection:'column'}}>
											<CardImg
												alt="..."
												className="img-fluid"
												src={require('assets/img/theme/buy.png')}
												top
											/>
										</Card>
										<h3 style={{marginTop:'15px'}}>How medstore.et works?</h3>
										<div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', flexWrap:'wrap', marginTop:'25px'}}>

											<div className="d-flex align-items-center" style={{marginRight:'15px', marginBottom:'10px'}}>
													<div>
														<Badge className="badge-circle mr-3" color="success">
															1
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Search</h6>
													</div>
												</div>
												<div className="d-flex align-items-center" style={{marginRight:'15px', marginBottom:'10px'}}>
													<div>
														<Badge className="badge-circle mr-3" color="success">
															2
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Refine</h6>
													</div>
												</div>
												<div className="d-flex align-items-center" style={{marginRight:'15px', marginBottom:'10px'}}>
													<div>
														<Badge className="badge-circle mr-3" color="success">
															3
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Select a Product</h6>
													</div>
												</div>
												<div className="d-flex align-items-center" style={{marginRight:'15px', marginBottom:'10px'}}>
													<div>
														<Badge className="badge-circle mr-3" color="success">
															4
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Connect</h6>
													</div>
												</div>
												<div className="d-flex align-items-center" style={{marginRight:'15px', marginBottom:'10px'}}>
													<div>
														<Badge className="badge-circle mr-3" color="success">
															5
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Buy</h6>
													</div>
												</div>
										</div>
									</Col>
									<Col md="6">
										<h2>Buy and Sell Medical Equipment in Ethiopia</h2>
										
										<ul className="list-unstyled mt-5">
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-bold-right" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0"> Buy and Sell New as well as Used Medical Equipments from stock and order.</h6>
													</div>
												</div>
											</li>
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-bold-right" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0"> Each Equipment at Medstore.et is fully authorized, registered, and certified at eFDA-Ethiopian Food and Drug Administration.</h6>
													</div>
												</div>
											</li>
											{ /*
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-check-bold" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Select</h6>
													</div>
												</div>
											</li>
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-check-bold" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Connect</h6>
													</div>
												</div>
											</li>
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-check-bold" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Buy</h6>
													</div>
												</div>
											</li> */}
										</ul>
									</Col>
								</Row>
							</Container>
						</section>
						
						<section className="section bg-secondary">
							<Container>
								<Row className="row-grid align-items-center">
									<Col className="pr-md-5" md="6" lg="6">
										<Card className="bg-default shadow border-0">
											<CardImg
												alt="..."
												className="img-fluid floating"
												src={require('assets/img/theme/Maintenance.jpg')}
												top
											/>
										</Card>
									</Col>
									<Col md="6">
										<h3>Technical Support</h3>
										<p>
											<span className="font-weight-bold">MedStore.et</span> is home to experienced
											biomedical engineers where you can get technical support for your medical
											equipment. The service includes new installation, relocation, performance and
											verification, Maintenance and more of medical equipment.
										</p>
										<ul className="list-unstyled mt-5">
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-settings-gear-65" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Carefully crafted effort</h6>
													</div>
												</div>
											</li>
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-html5" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Top industry experts</h6>
													</div>
												</div>
											</li>
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-satisfied" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Super friendly support team</h6>
													</div>
												</div>
											</li>
										</ul>
									</Col>
								</Row>
							</Container>
						</section>
						<section className="section" style={{backgroundColor:'#ffffff'}}>
							<Container>
								<Row className="row-grid align-items-center">
									<Col className=" order-2 pr-md-5" md="6" lg="6">
										<Card className="bg-default shadow border-0">
											<CardImg
												alt="..."
												className="img-fluid"
												src={require('assets/img/theme/Consultancy.jpg')}
												top
											/>
										</Card>
									</Col>
									<Col md="6">
										<h3>Consultancy</h3>
										<p>
											<span className="font-weight-bold">MedStore.et</span> supports and advises you
											while you make a medical equipment purchase, floating tender, bidding tenders,
											and advice on managing medical equipment on health facilities
										</p>
										<ul className="list-unstyled mt-5">
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-settings-gear-65" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Customer focused</h6>
													</div>
												</div>
											</li>
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-html5" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Towards Goal</h6>
													</div>
												</div>
											</li>
											<li className="py-2">
												<div className="d-flex align-items-center">
													<div>
														<Badge className="badge-circle mr-3" color="success">
															<i className="ni ni-satisfied" />
														</Badge>
													</div>
													<div>
														<h6 className="mb-0">Quality oriented</h6>
													</div>
												</div>
											</li>
										</ul>
									</Col>
								</Row>
							</Container>
						</section>

						<section className="section bg-secondary" style={{backgroundColor:'#fff'}}>
							<Container>
								<Row className="row-grid align-items-center">
									<Col className="pr-md-5"  md="6" lg="6">
										<img
											alt="..."
											className="img-fluid floating"
											src={require('assets/img/theme/promo-1.png')}
										/>
									</Col>
									<Col md="6">
										<div className="pr-md-5">
											<div className="icon icon-xg icon-shape-black icon-shape shadow rounded-circle mb-5">
												<i className="ni ni-notification-70 icon-c" />
											</div>
											<h3 className="text-black">Tenders notification</h3>
											<p className="text-black">
												MedStore.et is again a place where you can get early notification on any
												Medical Tender in Ethiopia through subscription.You get detailed information
												about the tender.
											</p>
											<ul className="list-unstyled mt-5 te">
												<li className="py-2 te">
													<div className="d-flex align-items-center">
														<div>
															<Badge className="badge-circle mr-3" color="success">
																<i className="ni ni-bullet-list-67" />
															</Badge>
														</div>
														<div>
															<h6 className="mb-0 text-black">Carefully curated content</h6>
														</div>
													</div>
												</li>
												<li className="py-2">
													<div className="d-flex align-items-center">
														<div>
															<Badge className="badge-circle mr-3" color="success">
																<i className="ni ni-notification-70" />
															</Badge>
														</div>
														<div>
															<h6 className="mb-0 text-black">Timely notification</h6>
														</div>
													</div>
												</li>
												<li className="py-2">
													<div className="d-flex align-items-center">
														<div>
															<Badge className="badge-circle mr-3" color="success">
																<i className="ni ni-satisfied" />
															</Badge>
														</div>
														<div>
															<h6 className="mb-0 text-black">Super friendly support team</h6>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</Col>
								</Row>
							</Container>
					
							{/* <div className="separator separator-top zindex-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                    version="1.1"
                                    viewBox="0 0 2560 75"
                                    x="0"
                                    y="0"
                                >
                                    <polygon
                                        style={{ fill: '#FFFFFF' }}
                                        points="0 0 0 75 2560 75"
                                    />
                                </svg>
                            </div> */}
						</section>
					</div>
				</main>
			</>
		)
	}
}

export default Services
