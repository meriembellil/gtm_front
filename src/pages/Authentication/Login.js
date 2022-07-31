import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Link, useHistory } from "react-router-dom"
import { Col, Container, FormGroup, Label, Row, Input, UncontrolledAlert } from "reactstrap"
import { AvForm } from "availity-reactstrap-validation"
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import CarouselPage from "./CarouselPage"
import { login } from "store/auth/actions";
import { useDispatch } from "react-redux";

export default function Login() {

  const history = useHistory();
  const dispatch = useDispatch();
  const token = localStorage.getItem('authUser')
  const [user, setUser] = useState({ username: '', password: '' })
  const [errorLog, setErrorLog] = useState(false)
  const [wait, setWait] = useState(false)

  const logUser = async (user) => {
    return dispatch(await login(user)).payload
  }

  const authUser = () => {
    logUser(user)
      .then(() => {
       history.push('/dashboard');
       window.location.reload();
      }).catch((error) => {
        setErrorLog(error?.response?.data?.message);
        setTimeout(() => {
          setErrorLog(false)
        }, 3000);
        setWait(false)
      })
  }

  useEffect(() => {
    if (token) {
      history.push("/dashboard")
    }
  }, [])

  return (
    <div>
      <MetaTags>
        <title>Login</title>
      </MetaTags>
      <Container fluid className="p-0">
        <Row className="g-0">
          <CarouselPage />
          <Col xl={3}>
            <div className="auth-full-page-content p-md-5 p-4">
              <div className="w-100">
                <div className="d-flex flex-column h-100">
                  <div className="mb-4 mb-md-5">
                    <Link to="dashboard" className="d-block auth-logo">
                      <img
                        src={logodark}
                        alt=""
                        height="18"
                        className="auth-logo-dark"
                      />
                      <img
                        src={logolight}
                        alt=""
                        height="18"
                        className="auth-logo-light"
                      />
                    </Link>
                  </div>
                  <div className="my-auto">
                    <div>
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to GTM.
                      </p>
                    </div>
                    <div className="mt-4">
                      {errorLog &&
                        <UncontrolledAlert
                          color="danger"
                          className="alert-dismissible fade show"
                          role="alert"
                        >
                          <i className="mdi mdi-block-helper me-2"></i> {errorLog}
                        </UncontrolledAlert>
                      }
                      <div>
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={(e, v) => {
                            setWait(true)
                            authUser()
                          }}
                        >
                          <FormGroup className="mb-3">
                            <Label htmlFor="username" className="form-label">Username</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="username"
                              value={user.username}
                              onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
                              placeholder="Enter username"
                            />
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <Label htmlFor="userpassword" className="form-label">Password</Label>
                            <Input
                              type="password"
                              className="form-control"
                              id="userpassword"
                              onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                              placeholder="Enter password"
                              value={user.password}
                            />
                          </FormGroup>
                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light"
                              type="submit"
                            >
                              {!wait ? (
                                <>{"Log In"}</>
                              ) : (
                                <>
                                  <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                                  Loading
                                </>
                              )}
                            </button>
                          </div>
                        </AvForm>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 mt-md-5 text-center">
                    <p className="mb-0">
                      © {new Date().getFullYear()} GTM. Created with{" "}
                      <i className="mdi mdi-heart text-danger"></i> by
                      Brainy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
