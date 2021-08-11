import React, { Component, useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardLink } from 'reactstrap'
import axios from 'axios'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'
import { useParams, Link } from 'react-router-dom'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useSelector, useDispatch} from 'react-redux';
import { delFav } from './../../views/examples/Profile'

const ProductsView = (props, match) => {
	const [products, setProducts] = useState([])
	const [fetched, setFetched] = useState(false)
	let isUsedProduct = props.match.path.includes('usedProducts') // used to check if all product is required
	let isAccesories = props.match.path.includes('accessories') // used to check if all product is required
	const categoryIdKey = Object.keys(props.match.params)[0]
	const categoryIdValue = Object.values(props.match.params)[0]
	const dispatch = useDispatch()
	const compares = useSelector(state => state.compares)
	const faved = useSelector(state => state.faved)

	if (faved) {
		setTimeout(() => dispatch({type:'SHOW_FAVED', payload:false}), 2000)
	}

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
		let ignore = false
		async function fetchData() {
			let token = localStorage.getItem('token')
			axios({
				method:'get',
				url:`${LOCAL_BASE_URL}${API_URL}/${categoryIdKey}/${categoryIdValue}/product`,
				headers: {
					Authorization: token ? `Bearer ${token}` : undefined
				}
			}).then(prod => {
				var products = prod.data
				dispatch({type:'ADD_PATH', payload:products.path})
				products.data.forEach(product => (product.photo_urls = product.photo_urls.split(';')))
				if (!ignore) setProducts(products.data)
				setFetched(true)
			});
		}
		async function fetchUsedProducts() {
			const result = await axios(`${LOCAL_BASE_URL}${API_URL}/product?condition=used`)
			if (!ignore) setProducts(result.data.data)
		}
		async function fetchaccessories() {
			// getting accessories category id
			const accesoryCategory = (
				await axios(
					`${LOCAL_BASE_URL}${API_URL}/category?name=accessory&name=Accessory&name=accessories&name=Accessories`
				)
			).data.data

			if (accesoryCategory.length !== 0) {
				const accesoryCategoryID = accesoryCategory[0]._id
				const result = await axios(
					`${LOCAL_BASE_URL}${API_URL}/category/${accesoryCategoryID}/product`
				)
				if (!ignore) setProducts(result.data.data)
			}
		}

		if (isUsedProduct) fetchUsedProducts()
		else if (isAccesories) fetchaccessories()
		else fetchData()

		return () => {
			ignore = true
		}
	}, [categoryIdValue, categoryIdKey])

	const { onProductSelect, onAddToCompare } = props

	return (
		<section style={{backgroundColor:'#ddd', paddingTop:'10px', paddingLeft:'5%', marginTop:'15px'}}>
		{ !fetched ? <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
					<div class="lds-roller">
                      <div></div><div></div>
                      <div></div><div></div>
                      <div></div><div></div>
                      <div></div><div></div></div>
                      <p>Loading products...</p>
				</div>
		: products.length ? 
			( <>
				<Row id="mob-row">{renderProducts(products, onProductSelect, onAddToCompare, props.match.url, dispatch, compares, setProducts, faved, addFav)}</Row>
			</>)
			: <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', height:'40px'}}>
							<p>No products found in this subcategory!</p>
						</div>
			}
		</section>
	)
}
const renderProducts = (products, onProductSelect, onAddToCompare, url, dispatch, compares, setProducts, faved, addFav) => {
	let productRender = products.map(product => (
		<>
			<div className={`product-card ${product.loaded ? 'loaded' : 'load'}`}
				onMouseEnter={() => {
					products[products.findIndex(pr => pr._id === product._id)].hovered = true
					setProducts([...products])}
				}
				onMouseLeave={() => {
					products[products.findIndex(pr => pr._id === product._id)].hovered = false
					setProducts([...products])}
				}>
				<span className={`pr-cond ${product.condition === 'used' ? 'used' : ''}`}>{product.condition === 'brand_new' ? 'new' : 'used'}</span>
					<div className="image">
					<Link className="h-75" to={`${url}/detail/${product._id}`}>
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
			{/*
			<Card className="card-lift shadow border-3">
				<Link className="h-75" to={`${url}/detail/${product._id}`}>
					<CardBody onClick={() => onProductSelect(product)} className="py-1 px-3">
						<CardImg
							width="300px"
							height="300px"
							className="p-1"
							style = {{"object-fit": "contain"}}
							alt="Image not found"
							src={`${LOCAL_BASE_URL}/${product.photo_urls[0]}`}
							onClick={() => onProductSelect(product)}
						/>
						<CardTitle tag="h4" className="ml-1 my-0 mt-2 bg-grey">
							{product.name}
						</CardTitle>
						<p className="font-weight-lighter text-dark">{product.description}</p>
						<p>{product.brand}.</p>
					</CardBody>
				</Link>
				<CardBody className="content-center">
					<CardLink
						style={{ cursor: 'pointer' }}
						onClick={() => {
							onAddToCompare(product)
						}}>
						<span className="material-icons">compare_arrows</span>
					</CardLink>
				</CardBody>
				<CardLink href="">
                            <span className="material-icons text-red">favorite_outline</span>
                        </CardLink> 
			</Card> */}
		</>
	))
	return productRender
}
export default ProductsView
