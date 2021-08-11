import React from "react";
import axios from 'axios'
import { connect } from 'react-redux'
import history from 'history-master'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";
import { Link } from 'react-router-dom';

import SerializeForm from 'form-serialize'
import { LOCAL_BASE_URL, API_URL } from 'constants.js'

// core components
import DemoNavbar from "components/Navbars/Navbar.component.js";
import SimpleFooter from "components/Footers/SimpleFooter.component.js";

function mapDispatchToProps(dispatch){
  return {
    log: () => dispatch({type:'LOG_USER', payload:true}),
    setData: (payload) => dispatch({type:'SET_DATA', payload})
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      logging: false,
      success: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({
      ...this.state,
      logging: true,
    })
    let formValues = SerializeForm(e.target, { hash: true })
    axios
      .post(`${LOCAL_BASE_URL}${API_URL}/user/login`, formValues)
      .then(res => {
        if(res.data.status === 'success'){
          this.props.log()
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('username', res.data.data.user.name.split(' ')[0])
          this.setState({
            logging: false,
            success: true,
            initialized: true
          })
          window.location.pathname = '/profile'
        }
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
        this.setState({
          logging: false,
          success: false,
          initialized: true
        })
      })
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">

          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default ">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0" style={{position:'relative'}}>
                  { this.state.logging && <div className="loader-login" data-auth="Logging in..."></div>}
                    <CardHeader className="bg-white py-5">
                      <div className="text-muted text-center mb-0"></div>
                        <medium>Welcome To MedStore.et</medium>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-1">
                      <div className="text-center text-muted mb-4" style={{display:'flex', 'flex-direction': 'column'}}>
                        {!this.state.initialized && <small>Sign in with credentials</small>}
                         {this.state.initialized && (this.state.success ? (<br />, <Badge color="success">Logging success. Redirecting...</Badge>) : (<br /> , <Badge color="danger">Incorrect email or password!</Badge>))}
                      </div>
                      <Form role="form" onSubmit={this.handleSubmit}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" name="email"/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              name="password"
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <Link
                        className="text-light"
                        to="/register"
                      >
                        <small>Create new account</small>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
