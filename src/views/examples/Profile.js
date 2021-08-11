import React from "react";
import { connect } from 'react-redux'
import axios from 'axios'
// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";
import { Switch, Link, Route } from 'react-router-dom'

import { LOCAL_BASE_URL, API_URL } from 'constants.js'
import history from 'history-master'
// core components
// this.props.setData(res.data.data.user)

export function delFav(id, dispatch=false) {
    let token = localStorage.getItem('token')
    if(!token) {
      return window.location.pathname = '/log-in'
    }
    axios({
      method:'delete',
      url:`${LOCAL_BASE_URL}${API_URL}/favorite/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      if(res.status ===204){
        if(!dispatch){
          this.state.favs = this.state.favs.filter((pr => pr.id !== id))
          this.setState({
            ...this.state,
          })
        } else {
          dispatch({type:'SHOW_FAVED', payload:{show:true, msg:false}})
        }
      } else {
        return window.location.pathname = '/log-in'
      }
    
    })
}

function mapStateToProps(state){
  return {
    state
  }
}

function mapDispatchToProps(dispatch){
  return {
    setData: (payload) => dispatch({type:'SET_DATA', payload}),
    log: (payload) => dispatch({type:'LOG_USER', payload}),
  }
}


class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fav_listed: false,
      favs: false
    }
    console.log(this.state.favs)
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    let token = localStorage.getItem('token')
    if(token){
      axios
          .post(`${LOCAL_BASE_URL}${API_URL}/user/profile`, {token})
          .then(res => {
            if (res.data.success){
              this.props.log(true)
              this.props.setData(res.data.user)
            } else {
              localStorage.setItem('token', '')
              window.location.pathname = '/log-in'
            }
          })
          .catch(e => {
            localStorage.setItem('token', '')
            window.location.pathname = '/log-in'
          })
    } else {
      window.location.pathname = '/log-in'
    }
  }

  logout() {
    localStorage.setItem('token', '')
    this.props.log(false)
    window.location.pathname = '/log-in'
  }

  getFavs() {
    let token = localStorage.getItem('token')
    if(!token) {
      return window.location.pathname = '/log-in'
    }
    axios({
      method:'get',
      url:`${LOCAL_BASE_URL}${API_URL}/favorite`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      if(res.data.status === 'success'){
        this.setState({
          ...this.state,
          favs: res.data.data
        })
      }
    })
  }

  render() {

    const {state:{user}} = this.props
    return (
      <>
        <main className="profile-page" ref="main">
        <div className="favorite-cont" style={{display: this.state.fav_listed ? 'flex' : 'none'}}
        onClick={(e) => {
          if(e.target !== e.currentTarget){
            return;
          }
          document.body.style.overflow = 'auto'
          this.setState({
            ...this.state,
            favs: [],
            fav_listed: false
          })
        }}>
          <div className="favorite-slider">
            {!this.state.favs ? <div class="lds-roller">
                                  <div></div><div></div>
                                  <div></div><div></div>
                                  <div></div><div></div>
                                  <div></div><div></div></div>
            : this.state.favs.length ? this.state.favs.map(pr => (
                <div className="favorite-product">
                <Link className="pr-compare list" style={{width:'100%', display:'flex', alignItems:'center'}} to={`/product/subCategory/${pr.product.subCategory}/detail/${pr.product._id}`}>
                  <img className="favorite-img" src={pr.product && `${LOCAL_BASE_URL}${API_URL}/uploads/${pr.product.photo_urls.replace(/\\/g, '/')}`}/>
                  <h3 className="favorite-name">{pr.product && pr.product.name}</h3>
                </Link>
                <button className="favorite-rmv"
                  onClick={() => delFav.bind(this)(pr.id)}>&#10005;</button>
                </div>
            )) : <p>You have no favorites yet.</p> }
          </div>
        </div>
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            style={{backgroundColor:'#fff'}}
                            src={user.avatar_url && `${LOCAL_BASE_URL}/images/uploads${user.avatar_url}`}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-4 mt-lg-0">
                        <Button
                          className="mr-4"
                          color="info"
                          onClick={e => {
                            document.body.style.overflow = 'hidden'
                            this.getFavs.bind(this)();
                            this.setState({
                              ...this.state,
                              favs: false,
                              fav_listed:true
                            })
                          }}
                          size="sm"
                        >
                          My Favorites
                        </Button>
                        <Button
                          className="float-right"
                          color="default"
                          onClick={this.logout.bind(this)}
                          size="sm"
                        >
                          Logout
                        </Button>
                      </div>
                    </Col>
                    
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {user.name && user.name}
                
                    </h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {user.email && user.email}
                    </div>
                    
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
