import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Product from 'components/Products/Product.component'
import Service from 'components/Services/Service.component'
import ServiceDetail from 'components/Services/Service.detail.component'
import AboutUs from 'views/Aboutus.view'
import ContactUs from './components/ContactUs'
import NavBar from 'components/Navbars/Navbar.component'
import Footer from 'components/Footers/SimpleFooter.component'
import Home from 'views/Home.view'
import LogIn from 'views/examples/Login'
import Profile from 'views/examples/Profile'
import Register from 'views/examples/Register'
import './App.css'
import history from 'history-master'

function App() {
	useEffect(() => {
		let loader = document.getElementById('loader');
		if (loader) loader.remove()
	})
	return (
		<>
			<Router history={history}>
				<NavBar />
				<Switch>
					<Route path="/contact-us" component={ContactUs} />
					<Route path="/product" component={Product} />
					<Route path="/service" exact={true} component={Service} />
					<Route path="/service/:type" component={Service} />
					<Route path="/about-us" component={AboutUs} />
					<Route path="/log-in" component={LogIn} />
					<Route path="/register" component={Register} />
					<Route path="/profile" component={Profile} />
					<Route path="/" component={Home} />
					<Redirect to="/" />
				</Switch>
				<Footer />
			</Router>
		</>
	)
}

export default App
