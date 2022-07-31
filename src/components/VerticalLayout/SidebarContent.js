import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const SidebarContent = props => {

  const ref = useRef()
  const user = useSelector(state => state.User.user)

  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Apps")}</li>
            {/* dashboard */}
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            {/* users */}
            <li>
              <Link to="/users" className="waves-effect">
                <i className="bx bx-user-circle"></i>
                <span>{props.t("Users")}</span>
              </Link>
            </li>
            {/* stores */}
            <li>
              <Link to="/stores" className="waves-effect">
                <i className="bx bx-store-alt"></i>
                <span>{props.t("Stores")}</span>
              </Link>
            </li>
            {/* products */}
            <li>
              <Link to="/products" className="waves-effect">
                <i className="bx bxs-gift"></i>
                <span>{props.t("Products")}</span>
              </Link>
            </li>
            {/* settings */}
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-slider-alt"></i>
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/notifications">{props.t("Notifications")}</Link>
                </li>
                <li>
                  <Link to="/permissions">{props.t("Roles & Permissions")}</Link>
                </li>
                <li>
                  <Link to="/brands">{props.t("Brands")}</Link>
                </li>
                <li>
                  <Link to="/categories">
                    {props.t("Families & Categories")}
                  </Link>
                </li>
                <li>
                  <Link to="/storeGroup">
                    {props.t("Store Group")}
                  </Link>
                </li>
                <li>
                  <Link to="/displayTypes">
                    {props.t("Display Types")}
                  </Link>
                </li>
              </ul>
            </li>
            {/* planning */}
            <li>
              <Link to="/planning" className="waves-effect">
                <i className="bx bx-calendar"></i>
                <span>{props.t("Planning")}</span>
              </Link>
            </li>
            {/* monitoring planning */}
            <li>
              <Link to="/planningControl" className="waves-effect">
                <i className="bx bx-calendar"></i>
                <span>{props.t("Planning control")}</span>
              </Link>
            </li>

            <li>
              <Link to="/planningControlDaily" className="waves-effect">
                <i className="bx bx-calendar"></i>
                <span>{props.t("Planning control Daily")}</span>
              </Link>
            </li>
          


            {/* display */}
            <li>
              <Link to="/display" className="waves-effect">
                <i className="bx bx-laptop"></i>
                <span>{props.t("Display")}</span>
              </Link>
            </li>
            {/* referenced products */}
            <li>
              <Link to="/referencedProducts" className="waves-effect">
                <i className="bx bx-share-alt"></i>
                <span>{props.t("Referenced products")}</span>
              </Link>
            </li>
            {/* stock*/}
            <li>
              <Link to="/stock" className="waves-effect">
                <i className="bx bx-shield-quarter"></i>
                <span>{props.t("Stock")}</span>
              </Link>
            </li>
            {/* orders*/}
            <li>
              <Link to="/orders" className="waves-effect">
                <i className="bx bx-cart-alt"></i>
                <span>{props.t("Orders")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))