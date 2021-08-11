import React, { Component, useEffect, useState } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import { Alert, Button, Table } from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'

import ProductsView from 'components/Products/Products.view.component'
import ProductCompare from 'components/Products/Products.compare.component'
import ProductDetail from 'components/Products/Product.detail.component'
import SearchBar from 'components/Searchbar/Searchbar.component'
import Categories from 'components/Categories/Categories.component'

import DeleteIcon from '@material-ui/icons/Delete';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


function mapStateToProps(state){
	return {
		state
	}
}

function mapDispatchToProps(dispatch){
	return {
		removeAll: () => dispatch({type:'REMOVE_ALL'}),
		list: (bol) => dispatch({type:'COMPARE_LIST', payload:bol}),
		upCompares: (comp) => dispatch({type:'UP_COMPARES', payload:comp})
	}
}

class Product extends Component {
	constructor(props) {
		super(props)
		this.state = {
			searchTerm: '',
			selectedCategory: {},
			productsToCompare: [],
			selectedProduct: {},
		}
		this.selectCategory = this.selectCategory.bind(this)
		this.selectProduct = this.selectProduct.bind(this)
		this.addProductToCompare = this.addProductToCompare.bind(this)
		this.CompareProductFooter = this.CompareProductFooter.bind(this)
		console.log(this.props.state.compares)
	}

	selectCategory(category) {
		this.setState({ selectedCategory: category })
	}

	selectProduct(product) {
		this.setState({ selectedProduct: product })
	}

	addProductToCompare(product) {
		if (
			this.state.productsToCompare.length >= 10 ||
			this.state.productsToCompare.filter(prod => prod._id == product._id).length != 0
		) {
			return 1
		}
		this.setState(previousState => ({
			productsToCompare: previousState.productsToCompare.concat([product]),
		}))
	}

	productAddedForCompareAlert() {
		const [visible, setVisible] = useState(true)

		const onDismiss = () => setVisible(false)

		return (
			<Alert color="info" isOpen={this.state.visible} toggle={onDismiss}>
				I am an alert and I can be dismissed!
			</Alert>
		)
	}

	CompareProductFooter() {
		return (
			<div className="content-center pt-4" style={{ display: 'absolute', top: 0, right: 0 }}>
				{this.state.productsToCompare.length >= 10 && this.productAddedForCompareAlert()}
				<p>Compare {this.state.productsToCompare.length} / 10 products.</p>
				<Link to={`${this.props.match.path}/compare`}>
					<Button outline className="btn-outline-info">
						Compare
					</Button>
				</Link>
			</div>
		)
	}

	render() {
		const {compares, path, list, faved} = this.props.state
		return (
			<>
				<div className="product-content">
					<div className={`compare-cont ${compares.length !== 0 ? 'active' : 'deactive'}`}>
						<p className="compare-p">{`compare ${compares.length} products (minimum 2)`}</p>
						<div className="mob">
							<button className={`compare-comp ${compares.length > 1 ? 'enabled' : 'disabled'}`}
							onClick={
								() => this.props.list(true)
							}  disabled={compares.length > 1 ? false : true}>Compare <CompareArrowsIcon>Filled</CompareArrowsIcon></button>
							<button className="compare-remv" onClick={() => this.props.removeAll()}>Remove All <DeleteIcon>Filled</DeleteIcon></button>
						</div>
					</div>
					<div className={`compare-list ${list ? 'show' : 'hide'}`}>
					<button className="compare-close"
					onClick={() => this.props.list(false)
					}>&#10006;</button>
					<Table dark>
				      <thead>
				        <tr>
				          <th></th>
				          <th>Name</th>
				          <th>Characterstics</th>
				          <th>Description</th>
				          <th>Model</th>
				          <th>Year</th>
				        </tr>
				      </thead>
				      <tbody>
				      { compares.map(product => (
				        <tr onClick={() => window.location.pathname=`/product/subCategory/${product.SubCategory ? product.SubCategory._id : product.subCategory}/detail/${product._id}`} style={{cursor:'pointer', [product.hover ? 'backgroundColor' : undefined]:'#1398D1FF'}}
				        onMouseEnter={() => {
				        	compares[compares.findIndex(pr => pr._id === product._id)].hover = true
							this.props.upCompares([...compares])
				        }}
				        onMouseLeave={() => {
				        	compares[compares.findIndex(pr => pr._id === product._id)].hover = false
							this.props.upCompares([...compares])
				        }}>
				          <th style={{width:'16.6%'}} scope="row"><img src={`${LOCAL_BASE_URL}/${product.photo_urls[0].replace(/\\/g, '/')}`} style={{ width:'150px', height:'150px', objectFit:'contain' }} alt="" /></th>
				          <td style={{width:'16.6%'}}>{product.name}</td>
				          <td style={{width:'16.6%'}}>{product.characteristics}</td>
				          <td style={{width:'16.6%'}}>{product.description}</td>
				          <td style={{width:'16.6%'}}>{product.model}</td>
				          <td style={{width:'16.6%'}}>{product.year}</td>
				        </tr>
				       ))}
				      </tbody>
				    </Table>
						{ /* compares.map(product => (
							
							<div className="product-card loaded list">
								<div className="image">
									<img src={`${LOCAL_BASE_URL}/${product.photo_urls[0].replace(/\\/g, '/')}`} alt=""
									/>
								</div>
							
							  <div className="content compare">
							    <p className="product-p" style={{fontWeight: 'bold', opacity:'0.6'}}>{product.name}</p>
							    <p className="product-p" style={{opacity:'0.5'}}>123</p>
							    <p className="product-p" style={{opacity:'0.5', marginTop:'5px'}}>{product.year}</p>
							    <p className="product-description">
							    	{product.description}
							    </p>
							    <Link className="pr-compare list" to={`/product/subCategory/${product.SubCategory._id}/detail/${product._id}`}>
							    Contact</Link>
							 </div>
							 </div>
							
							 
							)
						) */}
					</div>

					<div className={`fav-alert ${faved.show ? 'active' : 'deactive'}`}>
							{faved.msg ? 'Added to Favorites!' : 'Removed from Favorites!'}	
					</div>
					{/*
					<Carousel>
		                <div>
		                    <img src={`${LOCAL_BASE_URL}/img/uploads/ad1.jpg`} />
		                    <p className="legend">Advertisement</p>
		                </div>
		                <div>
		                    <img src={`${LOCAL_BASE_URL}/img/uploads/ad2.jpg`} />
		                    <p className="legend">Advertisement</p>
		                </div>
		                <div>
		                    <img src={`${LOCAL_BASE_URL}/img/uploads/ad3.jpg`} />
		                    <p className="legend">Advertisement</p>
		                </div>
		            </Carousel> */}
		            <CarouselProvider
				        naturalSlideWidth={100}
				        naturalSlideHeight={15}
				        totalSlides={3}
				        isPlaying={true}
				        interval={3000}
				    >
				        <Slider style={{width:'100%'}}>
				          <Slide index={0}><img style={{height:'100%', width:'100%', objectFit:'cover'}} src={`${LOCAL_BASE_URL}${API_URL}/uploads/img/uploads/ad1.jpg`} /></Slide>
				          <Slide index={1}><img style={{height:'100%',  width:'100%', objectFit:'cover'}} src={`${LOCAL_BASE_URL}${API_URL}/uploads/img/uploads/ad2.jpg`} /></Slide>
				          <Slide index={2}><img style={{height:'100%',  width:'100%', objectFit:'cover'}} src={`${LOCAL_BASE_URL}${API_URL}/uploads/img/uploads/ad3.jpg`} /></Slide>
				        </Slider>
				    </CarouselProvider>
				    <p
				    style={{
				    	width:'100%',
				    	textAlign:'center',
				    	fontWeight:'bold',
				    	fontSize:'25px',
				    	opacity:'.6',
				    	marginTop:'10px'
				    }}>Search among our wide range of products</p>
				    <div style={{margin: '0 2rem'}}>
						<SearchBar {...this.props} />
						{ /^\/product$/.test(this.props.history.location.pathname) ? <Categories
							onCategorySelect={category => {
								this.selectCategory(category)
							}}
							//     history.push(`${this.props.match.path}/view`);
							// }} {...props}
						/> : path[0] !== undefined ? <div className="cat-path">{[path[0], <NavigateNextIcon style={{transform:'scale(1.2)'}}>Filled</NavigateNextIcon>, path[1]]}</div> : '' }
						<Switch>
							<Route
								path={[
									`${this.props.match.url}/usedProducts`,
									`${this.props.match.url}/accessories`,
									`${this.props.match.url}/subCategory/:subCategory`,
									`${this.props.match.url}/category/:category`,
								]}
								exact={true}
								render={props => (
									<ProductsView
										onAddToCompare={this.addProductToCompare}
										onProductSelect={this.selectProduct}
										{...props}
									/>
								)}
							/>
							<Route
								path={[
									`${this.props.match.url}/subCategory/:subCategory/detail/:productId`,
									`${this.props.match.url}/category/:category/detail/:productId`,
									`${this.props.match.url}/search/detail/:productId`,
									`${this.props.match.url}/compare/detail/:productId`,
								]}
								render={props => (
									<ProductDetail onAddToCompare={this.addProductToCompare} {...props} />
								)}
							/>
							<Route
								path={`${this.props.match.url}/compare`}
								render={props => (
									<ProductCompare products={this.state.productsToCompare} {...props} />
								)}
							/>
						</Switch>
					</div>
					<br />
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)