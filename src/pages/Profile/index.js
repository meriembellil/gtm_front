import MetaTags from 'react-meta-tags';
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Media,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb"
import avatarMale from "../../assets/images/users/male-profile-pic.jpg"
import avatarFemale from "../../assets/images/users/female-profile-pic.jpg"
import { useSelector } from 'react-redux';
import UpdateInformations from './components/UpdateInformations';
import UpdatePassword from './components/UpdatePassword';
import classnames from "classnames"

export default function UserProfile() {

  let state = useSelector(state => state.User.user);
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState(null)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
      }
    }
  }

  useEffect(() => {
    setUser(state); // set user from store      
    if (user?.gender === 'M' && !user?.profile_picture) {
      setAvatar(avatarMale);
    } else if (user?.gender === 'F' && !user?.profile_picture) {
      setAvatar(avatarFemale);
    }
    else {
      setAvatar(user?.profile_picture)
    }
  }, [state, user])

  return (
    <>
      <div className="page-content">
        <MetaTags>
          <title>Profile</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumb title="GTM" breadcrumbItem="Profile" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>

                  <Media>
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    {user &&
                      <Media body className="align-self-center">
                        <div className="text-muted">
                          <h5>{user?.first_name + " " + user?.last_name}</h5>
                          <p className="mb-1">Email : {user?.email}</p>
                          <p className="mb-0">Username : {user?.username}</p>
                        </div>
                      </Media>
                    }
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <h4 className="card-title mb-4">Update informations</h4>
          <Card>
            <CardBody>
              <div className="wizard clearfix">
                <div className="steps clearfix">
                  <ul>
                    <NavItem
                      className={classnames({
                        current: activeTabVartical === 1,
                      })}>
                      <NavLink
                        className={classnames({
                          active: activeTabVartical === 1,
                        })}
                        onClick={() => {
                          toggleTabVertical(1)
                        }}
                      >
                        <span className="number">1</span>{" "}
                        informations
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        current: activeTabVartical === 2,
                      })}>
                      <NavLink
                        className={classnames({
                          active: activeTabVartical === 2,
                        })}
                        onClick={() => {
                          toggleTabVertical(2)
                        }}
                      >
                        <span className="number ms-2">2</span>{" "}
                        Update password
                      </NavLink>
                    </NavItem>
                  </ul>
                  <div className="content clearfix">
                    <TabContent
                      activeTab={activeTabVartical}
                      className="body"
                    >
                      <UpdateInformations user={user} setUser={setUser}/>
                      <UpdatePassword user={user} setUser={setUser}/>
                    </TabContent>
                  </div>

                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  )
}