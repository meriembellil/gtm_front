import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row } from "reactstrap"
import SimpleBar from "simplebar-react"
import { withTranslation } from "react-i18next"
import { getNotificationList, updateNotificationsStatus } from "store/notification/services"
import { useSelector } from "react-redux"
import { socket } from "helpers/consts"

const NotificationDropdown = (props) => {

  const [menu, setMenu] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notConsultedNotifications, setNotConsultedNotifications] = useState([])
  const connectedUser = useSelector(state => state.User.user)
  const [notConsulted, setNotConsulted] = useState(0)
  const [timeOffset, setTimeOffset] = useState(0)
  const [limit, setLimit] = useState(4)
  const [offset, setOffset] = useState(0)


  useEffect(() => {
    if (connectedUser) {
      getNotificationList(connectedUser.id, limit, offset)   
        .then((data) => {
          setNotConsulted(data.notConsulted)
          data.notifications.forEach(notification => {
            notification.createdAt = new Date(notification.createdAt).setHours(new Date(notification.createdAt).getHours())
            setNotifications(notifications => [...notifications, notification])
            if (!notification.consulted) {
              setNotConsultedNotifications(notConsultedNotifications => [...notConsultedNotifications, notification])
            }
          })
        }) 
      socket.on('notificationsCron', () => {
        getNotificationList(connectedUser?.id, notifications.length, 0)
          .then((data) => {
            setNotConsulted(data.notConsulted)
            data.notifications.forEach(notification => {
              notification.createdAt = new Date(notification.createdAt).setHours(new Date(notification.createdAt).getHours())
              setNotifications(data.notifications)
              if (!notification.consulted) {
                setNotConsultedNotifications(notConsultedNotifications => [...notConsultedNotifications, notification])
              }
            })
          })
      });
    }
  }, [connectedUser, offset, limit])

  useEffect(() => {
    if (!menu) {
      setNotConsultedNotifications([])
      updateNotificationsStatus(notConsultedNotifications)
        .then(() => {
          getNotificationList(connectedUser?.id, limit, 0)
            .then((data) => {
              setNotConsulted(data.notConsulted)
              data.notifications.forEach(notification => {
                notification.createdAt = new Date(notification.createdAt).setHours(new Date(notification.createdAt).getHours())
              })
              setNotifications(data.notifications)
            })
        })
    } else {
      getNotificationList(connectedUser?.id, notifications.length, 0)
        .then((data) => {
          setNotConsulted(data.notConsulted)
          data.notifications.forEach(notification => {
            notification.createdAt = new Date(notification.createdAt).setHours(new Date(notification.createdAt).getHours())
            setNotifications(data.notifications)
            if (!notification.consulted) {
              setNotConsultedNotifications(notConsultedNotifications => [...notConsultedNotifications, notification])
            }
          })
        })
    }
  }, [menu])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          {notConsulted > 0 &&
            <span className="badge bg-danger rounded-pill">{notConsulted}</span>
          }
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <h6 className="m-0"> {props.t("Notifications")} </h6>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {notifications.map((notification, index) => {
              return (
                <Link key={index} to="#" className="text-reset notification-item">
                  <div className="media" style={{ backgroundColor: !notification.consulted && '#bcdefb' }}>
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <i className="bx bx-cart" />
                      </span>
                    </div>
                    <div className="media-body">
                      <h6 className="mt-0 mb-1">
                        {notification.title}
                      </h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          {notification.text}
                        </p>

                        
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />{" "}
                          {new Date(notification.createdAt).getDate()}
                          {"/" + parseInt(new Date(notification.createdAt).getMonth() + 1)}
                          {"/" + new Date(notification.createdAt).getFullYear()}
                          {" - " + parseInt(new Date(notification.createdAt).getHours())}
                          {+ new Date(notification.createdAt).getMinutes() < 10 ? (<>{":0" + new Date(notification.createdAt).getMinutes()}</>) : (<>{new Date(notification.createdAt).getMinutes()}</>)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>  
              )
            })}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
              onClick={() => { setOffset(offset + 4) }}
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              {props.t("voir plus")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}