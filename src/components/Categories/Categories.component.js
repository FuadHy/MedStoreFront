import React, { Component, useState, useEffect } from 'react'
import { Col, Container, Collapse, Row, UncontrolledCollapse } from 'reactstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import { delFav } from './../../views/examples/Profile'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import { LOCAL_BASE_URL, API_URL } from './../../constants'

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const renderCategories = (categories, onCategorySelect, path, collapseCategoriesView) => {

	return (
		<ul className="list-group" style={{cursor:'pointer'}}>
			{categories.map((category, indx) => (
				<li key={indx} className="list-group-item">
					<p className="m-0 p-0" id={`Category_${category.name.split(' ')[0]}${indx}`}
					style={{
						position:'relative'
					}}>
						<span
							onClick={() => {
								onCategorySelect(category)
							}}>
							{category.name}
						</span>
						<span className="material-icons rigth-align">expand_more</span>
					</p>
					{category.subCategories.length !== 0 && (
						<UncontrolledCollapse toggler={`#Category_${category.name.split(' ')[0]}${indx}`}>
							<ul className="list-group">
								{category.subCategories.map(sub_cat => (
									<Link to={`${path}/subCategory/${sub_cat._id}`}>
										<li
											onClick={() => {
												onCategorySelect(sub_cat)
												collapseCategoriesView()
											}}
											key={sub_cat.name}
											className="list-group-item">
											<span className="text-decoration-none">{sub_cat.name}</span>
										</li>
									</Link>
								))}
							</ul>
						</UncontrolledCollapse>
					)}
				</li>
			))}
		</ul>
	)
}

const renderProducts = (products, setProducts, compares, dispatch, addFav, url) => {
	let productRender = products.map(product => (
		<React.Fragment>
			<div className={`product-card ${product.loaded ? 'loaded' : 'load'}`}
				onMouseEnter={() => {
					products[products.findIndex(pr => pr._id === product._id)].hovered = true
					setProducts([...products])}
				}
				onMouseLeave={() => {
					products[products.findIndex(pr => pr._id === product._id)].hovered = false
					setProducts([...products])}
				}>
				<span className={`pr-cond ${product.condition === 'used' ? 'used' : ''}`}>{product.condition === 'used' ? 'Used' : 'New'}</span>
					<div className="image">
					<Link className="h-75" to={`product/subCategory/${product.subCategory}/detail/${product._id}`}>
						<img src={`${LOCAL_BASE_URL}${API_URL}/uploads/${product.photo_urls[0].replace(/\\/g, '/')}`} alt="" 
						onLoad={() => {
							products[products.findIndex(pr => pr._id === product._id)].loaded = true
							setProducts([...products])
						}} />
					</Link>
					</div>
				
				  <div className="content">
				    <p className="product-p" style={{fontWeight: 'bold', opacity:'0.6'}}>{product.loaded && product.name}</p>
				    <p className="product-p" style={{opacity:'0.5'}}>{product.loaded && product.year}</p>
				    <p className="product-p" style={{opacity:'0.5', marginTop:'5px'}}>{product.loaded &&  product.brand}</p>
				    {product.loaded && <p className="product-p" style={{opacity:'0.5', marginTop:'7px'}}><LocalOfferIcon style={{transform:'scale(.6)'}}>Filled</LocalOfferIcon>{product.tags}</p>}
				 </div>
				 <div className={`pr-links ${product.hovered ? 'active' : ''}`}>
				 	{ !product.faved ? <FavoriteBorderIcon 
				 	onClick={() => {
				 		addFav(product._id).then(id => {
					 		products[products.findIndex(pr => pr._id === product._id)].faved = id
					 		setProducts([...products])
				 		})
				 	}}
				 	className="pr-fav">Filled</FavoriteBorderIcon> : 
					 	<FavoriteIcon 
					 	onClick={() => {
					 		delFav(product.faved, dispatch)
					 		products[products.findIndex(pr => pr._id === product._id)].faved = !product.faved
					 		setProducts([...products])
					 	}}
					 	className="pr-fav">Filled</FavoriteIcon> }
				 	<button onClick={() => compares.some(pr => pr._id === product._id) ? dispatch({type:'REMOVE_COMPARE', payload:product}) : dispatch({type:'ADD_COMPARE', payload:product})}
				 	className="pr-compare">{ compares.some(pr => pr._id === product._id) ? 'Remove from comparision tool' : 'Compare This Product'}</button>
				 </div>
			</div>
		</React.Fragment>
	))
	return productRender
}

const Categories = (props, match) => {
	const [isOpen, setIsOpen] = useState(true)
	const [categories, setcategories] = useState([])
	const [products, setProducts] = useState([])
	const dispatch = useDispatch()
	const compares = useSelector(state => state.compares)

	const responsive = {
	  desktop: {
	    breakpoint: { max: 3000, min: 1024 },
	    items: 5,
	    slidesToSlide: 1 // optional, default to 1.
	  },
	  tablet: {
	    breakpoint: { max: 1024, min: 464 },
	    items: 2,
	    slidesToSlide: 2 // optional, default to 1.
	  },
	  mobile: {
	    breakpoint: { max: 464, min: 0 },
	    items: 1,
	    slidesToSlide: 1 // optional, default to 1.
	  }
	};

	const addFav = (id) => {
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

	useEffect(() => {
		async function fetchData() {
			axios.get(`${LOCAL_BASE_URL}${API_URL}/category`).then(categ => {
				var categories = categ.data.data
				axios.get(`${LOCAL_BASE_URL}${API_URL}/subCategory`).then(sub => {
					var subCategories = sub.data.data
					// adding new an array of subcategories for each categories
					categories.forEach(category => {
						category.subCategories = subCategories.filter(
							subCategory => subCategory.category == category._id
						)
					})
					setcategories(categories)
				})
			})
			axios({
				method:'get',
				url:`${LOCAL_BASE_URL}${API_URL}/product/recent`
			}).then(prod => {
				console.log(prod)
				var products = prod.data
				if (products){
					products.data.forEach(product => (product.photo_urls = product.photo_urls.split(';')))
					setProducts(products.data)
				}
			});
		}
		fetchData()
		// saving the new fetched categories to the state of the componenet
	}, [])

	let { path, url } = useRouteMatch()

	const collapseCategoriesView = () => {
		setIsOpen(!isOpen)
	}

	const { onCategorySelect } = props

	let col_1, col_2
	if (categories.length !== 0) {
		let center = Math.ceil(categories.length / 2)
		col_1 = categories.slice(0, center)
		col_2 = categories.slice(center)
	}

	return (
		<>
			<div>
				<h3
					onClick={() => collapseCategoriesView()}
					style={{ cursor: 'pointer' }}
					className="display-4 d-inline text-dark p-3">
					Categories {this}
					<span
						onClick={() => collapseCategoriesView()}
						style={{ display: 'initial' }}
						className="material-icons">
						{' '}
						{isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
					</span>
				</h3>
				{categories.length ? 
				(<Collapse isOpen={isOpen} toggler="collapseCategories">
					<Row className="bg-grey shadow mt-4 pb-2">
						{col_1 && (
							<Col lg="6" md="6" sm="6" className="pl-0">
								{renderCategories(col_1, onCategorySelect, url, collapseCategoriesView)}
							</Col>
						)}
						{col_2 && (
							<Col lg="6" md="6" sm="6" className="pr-0">
								{renderCategories(col_2, onCategorySelect, url, collapseCategoriesView)}
							</Col>
						)}
					</Row>
				</Collapse>) : 
				<div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
					<div class="lds-roller">
                      <div></div><div></div>
                      <div></div><div></div>
                      <div></div><div></div>
                      <div></div><div></div></div>
                      <p>Loading categories...</p>
				</div> }
				{ !!products.length && 
					<section style={{backgroundColor:'#ddd', paddingTop:'10px', paddingLeft:'1%', marginTop:'15px'}}>
						<h3 className="pl-4">Recent Products</h3>

						<Carousel
						  swipeable={true}
						  draggable={true}
						  showDots={false}
						  responsive={responsive} // means to render carousel on server-side.
						  infinite={true}
						  autoPlay={true}
						  autoPlaySpeed={3000}
						  keyBoardControl={true}
						  transitionDuration={500}
						  removeArrowOnDeviceType={["tablet", "mobile"]}
						  
						>
						  {renderProducts(products, setProducts, compares, dispatch, addFav, match.url)}
						</Carousel> 
					</section>
				}
			</div>
		</>
	)
}

export default Categories
