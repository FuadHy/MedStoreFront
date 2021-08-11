import React, { Component, useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';

import { delFav } from './../../views/examples/Profile'

import {
	Button,
	Row,
	Col,
	Input,
	CardImg,
	Card,
	Form,
	Container,
	CardBody,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	FormGroup,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	UncontrolledCarousel,
	Badge,
} from 'reactstrap'
import classnames from 'classnames'

import axios from 'axios'
import Rating from '@material-ui/lab/Rating'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'
import SerializeForm from 'form-serialize'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Document, Page } from 'react-pdf';
const pdfjs = require("pdfjs-dist");
pdfjs.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");

const addFav = (id, dispatch) => {
		let token = localStorage.getItem('token')
		if(!token) {
			window.location.pathname = '/log-in'
			return;
		}
		return axios({
			method:'post',
			url:`${LOCAL_BASE_URL}${API_URL}/favorite`,
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: {
				product: id
			}

		}).then(resp => {
			if (resp.data.status === "success") {
				dispatch({type:'SHOW_FAVED', payload:{show:true, msg:true}})
				return resp.data.data._id
			}
		})
	}

const ProductDetail = props => {
	let [product, setProduct] = useState()
	let [slideItems, setSlideItems] = useState([])
	let [initializingRequest, setInitializingRequest] = useState(false)
	let [requestCreated, setRequestCreated] = useState(false)

	let [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

	let productId = props.match.params.productId
	const dispatch = useDispatch()
	const compares = useSelector(state => state.compares)
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfOpened, setPdfOpened] = useState(false)

	const onDocumentLoadSuccess = ({ numPages })=> {
	    setNumPages(numPages);
	  }

	useEffect(() => {
		async function fetchData() {
			dispatch({type:'COMPARE_LIST', payload:false})
			document.body.scrollTop = 0
		    document.documentElement.scrollTop = 0
		    document.body.style.overflow = 'auto'
		    let token = localStorage.getItem('token')
			let product = (await axios.get(`${LOCAL_BASE_URL}${API_URL}/product/${productId}`, {
				headers: {
					Authorization: token ? `Bearer ${token}` : undefined
				}
			})).data.data
			
			product.photo_urls = product.photo_urls.split(';')
			slideItems = product.photo_urls.map(photo => {
				return {
					src: `${LOCAL_BASE_URL}${API_URL}/uploads/${photo}`,
				}
			})
			setProduct(product)
			setSlideItems(slideItems)
		}
		fetchData()
	}, [productId])

	const toggleRequestModal = () => {
		setIsRequestModalOpen(!isRequestModalOpen)
	}

	const handleRequestSubmit = e => {
		e.preventDefault()
		setInitializingRequest(true)
		setRequestCreated(false)
		let formValues = SerializeForm(e.target, { hash: true })
		let request = {
			product: product._id,
			name: formValues.name,
			phone: formValues.phone,
			email: formValues.email,
			quantity: formValues.quantity,
			message: formValues.message,
			address: formValues.address,
		}
		let token = localStorage.getItem('token')

		axios({
			url:`${LOCAL_BASE_URL}${API_URL}/request`,
			method: 'post',
			data:request,
			headers:{
				Authorization: `Bearer ${token}`
			}})
			.then(res => {
				setRequestCreated(true)
				setInitializingRequest(false)
				setTimeout(() => {
					toggleRequestModal()
				}, 1500)
			})
			.catch(() => {
				setRequestCreated(true)
				setInitializingRequest(true)
			})
	}

	return (
		<>
			{' '}
			{product ? (
				<div>
					

					{ pdfOpened && (
						<div style={{position:'fixed', top: '0', left: '0', right: '0', bottom: '0', zIndex: '99999', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,.8)', overflow:'auto'}}>
							<button className="compare-close"
								onClick={() => setPdfOpened(false)
								}>&#10006;</button>
							<Document
							        file={`${LOCAL_BASE_URL}${API_URL}/uploads/${product.catalogue_url}`}
							        onLoadError={console.error}
							>
								 <Page pageNumber={pageNumber} />
							</Document>
						</div>
					)}
					<section>
						<Row className="product-detail pl-lg-9 p-4 pt-5 mt-5 mb-3 bg-grey" >
							<Col lg="4" className="mb-lg-auto" style={{display:'flex', flexDirection:'column', height:'100%'}}>
								<div className="rounded shadow-lg overflow-hidden ">
									{/* <UncontrolledCarousel autoPlay={false} controls={true} indicators={true} items={this.state.product ? this.state.product.photo_urls : ""} /> */}
									<UncontrolledCarousel items={slideItems} />
								</div>
								<div className="card-profile-actions py-4 mt-lg-0" style={{display:'flex', marginTop:'45px', alignSelf:'flex-end'}}>
			                        <Button
			                          className="mr-4"
			                          color="info"
			                          style={{whiteSpace:'nowrap'}}
			                          //onClick={}
			                          size="sm"
			                          onClick={() => {
			                          	!product.faved ? addFav(product._id, dispatch).then(id => {
										 		product.faved = id
										 		setProduct(product)
									 		})
			                          	: delFav(product.faved, dispatch)
										 		product.faved = !product.faved
										 		setProduct(product)
										 	}}
			                        	>
			                          	{ !product.faved ? [<FavoriteBorderIcon 
										 	>Filled</FavoriteBorderIcon>, 'Add to Favorite'] : 
											 	[<FavoriteIcon 
											>Filled</FavoriteIcon>, 'Remove from Favorite'] }
			                        </Button>
			                        <Button
			                          className="float-right"
			                          color="default"
			                          style={{whiteSpace:'nowrap'}}
			                          onClick={() => compares.some(pr => pr._id === product._id) ? dispatch({type:'REMOVE_COMPARE', payload:product}) : dispatch({type:'ADD_COMPARE', payload:product})}
			                          size="sm"
			                        >
			                          <CompareArrowsIcon>Filled</CompareArrowsIcon> { compares.some(pr => pr._id === product._id) ? 'Remove from comparision tool' : 'Compare This Product'}
			                        </Button>
			                      </div>
							</Col>
							<Col className="ml-4" lg="6">
								<Row>
									<h1>{product ? product.name : ''}</h1>
								</Row>
								<Row>
									<span className="material-icons mt-1">local_offer</span>
									{product ? <span className="pl-1">{product.tags} </span> : ''}
								</Row>
								<Col>
									<Rating name="read-only" value={product ? product.rating : ''} readOnly />
								</Col>

								<hr className="mt-0" />
								<Row className="mt-3">
									<Col>
										<h5 className="text-gray">Brand: </h5>
										<h4>
											{product ? product.brand : ''}
											<span className="material-icons ml-5">location_on</span>
											<span className=" ml-2 font-weight-lighter">
												{product ? product.country : ''}
											</span>
										</h4>
									</Col>
								</Row>
								<br />
								<Row>
									<Col lg="7">
										<Button
											className="btn-icon btn-1 ml-1 "
											color="info"
											type="button"
											outline
											onClick={toggleRequestModal}>
											<span className="btn-inner--text">Request Information</span>
											<span className="btn-inner--icon mr-1">
												<i className="ni ni-bag-17" />
											</span>
										</Button>
										<br />
										<br />
									</Col>
									<Col lg="5">
										<h6>Need Help in choosing? Contact our equipment experts.</h6>
										<p>
											<span className="material-icons">phone</span> +251-919-38-1997
										</p>
										<p>
											<span className="material-icons">phone</span> +251-911-89-1367
										</p>
									</Col>
								</Row>
								
							</Col>
						</Row>
						<hr className="mt-0 mb-0" />
						<Row className="product-info pl-lg-9 p-4" style={{flexDirection:'column'}}>
						<div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'30px'}}>
							<Col className="order-2 product-characterstics bg-grey p-2 rounded shadow mr-5">
								<h4 className="">Characterstics</h4>
								<hr className="mt-0" />
								<p className="ml-3" style={{whiteSpace: 'pre-wrap'}}>{product ? product.characteristics : ''}</p>
							</Col>
							<Col className="order-1 product-description bg-grey p-2 rounded shadow mr-5">
								<h4>Description</h4>
								<hr className="mt-0" />
								<p className="ml-3" style={{whiteSpace: 'pre-wrap'}}>{product ? product.description : ''}</p>
							</Col>
						</div>
						<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
							<a className="pr-catalogue" onClick={
								e => {
									e.preventDefault()
									setPdfOpened(true)
								}
							}>
								<PictureAsPdfIcon style={{color:'#0B222CFF', marginRight:'10px', transform:'scale(1.1)'}}>Filled</PictureAsPdfIcon> View Catalogue
							</a>
							<Col className="order-3 product-catalogue bg-grey p-2 rounded shadow mr-5">
								<h4>Video</h4>
								<hr className="mt-0" />
							</Col>
						</div>
						</Row>
					
					</section>
					{/* <this.renderRequestForm /> */}
					<Modal size="md" isOpen={isRequestModalOpen} toggle={toggleRequestModal}>
						<Form
							onSubmit={e => {
								handleRequestSubmit(e)
							}}>
							<ModalBody className="p-0">
								<Col lg="" className="p-0">
									<Card className="bg-gradient-secondary shadow">
										<CardBody className="p-lg-5">
											<h4 className="mb-1">Want to know more about the {product.name}</h4>
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
															<i className="ni ni-pin-3" />
														</InputGroupText>
													</InputGroupAddon>
													<Input required placeholder="Enter your address" name="address" />
												</InputGroup>
											</FormGroup>
											<Row>
												<Col>
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
												</Col>
												<Col>
													<FormGroup>
														<InputGroup className="input-group-alternative">
															<InputGroupAddon addonType="prepend">
																<InputGroupText>
																	<i className="ni ni-mobile-button" />
																</InputGroupText>
															</InputGroupAddon>
															<Input
																placeholder="Enter your phone"
																required
																name="phone"
																type="phone"
															/>
														</InputGroup>
													</FormGroup>
												</Col>
											</Row>

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
											<FormGroup className="mb-4">
												<h6>Quality</h6>
												<Input type="number" name="quantity" id="exampleSelect" placeholder="1" />
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
				</div>
			) : (
				 <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
					<div class="lds-roller">
                      <div></div><div></div>
                      <div></div><div></div>
                      <div></div><div></div>
                      <div></div><div></div></div>
                      <p>Loading product...</p>
				</div>
			)}
		</>
	)
}

export default ProductDetail
