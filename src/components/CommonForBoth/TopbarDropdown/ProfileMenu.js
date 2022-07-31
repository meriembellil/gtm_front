import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"
import { logout } from "store/auth/actions"
import { getUserProfile } from "store/user/actions"
import avatarMale from "../../../assets/images/users/male-profile-pic.jpg"
import avatarFemale from "../../../assets/images/users/female-profile-pic.jpg"
import jwtDecode from "jwt-decode"

const ProfileMenu = props => {

  const history = useHistory();
  const token = localStorage.getItem('authUser')
  const dispatch = useDispatch()
  const state = useSelector(state => state.User)
  const [user, setUser] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [menu, setMenu] = useState(false)

  const getProfile = async () => {
    return dispatch(await getUserProfile(jwtDecode(token).payload.username))
  }

  useEffect(async () => {
    if (token) {
      await getProfile()
        .catch(() => {
          setTimeout(async () => {
            alert('your session has expired please log in again')
            dispatch(await logout());
            history.push('/login')
          }, 200);
        })
    }
  }, [token])

  useEffect(() => {
    setUser(state.user)
    if (user?.gender === 'M' && !user?.profile_picture) {
      setAvatar(avatarMale);
    } else if (state?.user?.gender === 'F' && !state?.user?.profile_picture) {
      setAvatar(avatarFemale);
    }
    else {
      setAvatar(state?.user?.profile_picture)
    }
  }, [state])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        {user &&
          <DropdownToggle
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
            tag="button"
          >
            <img
              className="rounded-circle header-profile-user"
              src={avatar}
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ms-2 me-1">{user?.first_name + " " + user?.last_name}</span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          </DropdownToggle>
        }
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/profile" className="dropdown-item">
            <i className="bx bx-user font-size-16 align-middle me-1" />
            <span>Profile</span>
          </Link>
          <div className="dropdown-divider" />
          <Link to="#" onClick={async () => { dispatch(await logout()) }} className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ProfileMenu