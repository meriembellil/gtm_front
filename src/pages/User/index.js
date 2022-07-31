import React, { useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags';
import { Badge, Card, CardBody, CardTitle, Col, Row, UncontrolledTooltip } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { getUsersList } from 'store/user/actions';
import avatarMale from "../../assets/images/users/male-profile-pic.jpg"
import avatarFemale from "../../assets/images/users/female-profile-pic.jpg"
import CreateUser from './components/CreateUser';
import { Link } from 'react-router-dom';
import { resetPwd, switchStateUser } from 'store/user/services';
import Swal from 'sweetalert2'

export default function UsersList() {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([])

    const changeStatus = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: !user.enabled ? ("Do you want to disable this account?") : ("Do you want to enable this account?"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: !user.enabled ? ('Yes, disable it!') : ('Yes, enable it!')
        }).then((result) => {
            if (result.isConfirmed) {
                switchStateUser(user)
                    .then(() => {
                        Swal.fire(
                            'Updated!',
                            !user.enabled ? ('the account has been disabled.') : ('the account has been enabled.'),
                            'success'
                        )
                    })
                    .then(() => {
                        getList()
                    })
            }
        })
    }

    const resetPassword = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset password!'
        }).then((result) => {
            if (result.isConfirmed) {
                resetPwd(user).then(() => {
                    Swal.fire(
                        'Updated!',
                        'Password updated & a new password has been sent.',
                        'success'
                    )
                })
            }
        })
    }

    const getUsers = async () => {
        return dispatch(await getUsersList()).payload
    }

    const getList = async () => {
        await getUsers().then((res) => {
            setUsers(res.usersList);

        })
    }

    useEffect(async () => {
        await getList()
        $('#mydatatable').DataTable()
    }, [])

    return (
        <div className="page-content">
            <MetaTags>
                <title>User list</title>
            </MetaTags>
            <div className="container-fluid">
                <Breadcrumbs title="Users" breadcrumbItem="User List" />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle>Display List</CardTitle>
                                <CreateUser getList={getList} />
                                {users.length > 0 ? (
                                    <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
                                        <div
                                            className="table-responsive mb-0"
                                            data-pattern="priority-columns"
                                        >
                                            <Table
                                                id="mydatatable"
                                                className="table table-striped table-bordered"
                                            >
                                                <Thead>
                                                    <Tr>
                                                        <Th>Picture</Th>
                                                        <Th>First Name</Th>
                                                        <Th>Last Name</Th>
                                                        <Th>Phone number</Th>
                                                        <Th>Status</Th>
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {users.map((user, index) => {
                                                        return (
                                                            <Tr key={index}>
                                                                <Td>
                                                                    {user.gender === "M" && !user.profile_picture &&
                                                                        <img
                                                                            src={avatarMale}
                                                                            alt=""
                                                                            className="avatar-sm rounded-circle img-thumbnail"
                                                                        />
                                                                    }
                                                                    {user.gender === "F" && !user.profile_picture &&
                                                                        <img
                                                                            src={avatarFemale}
                                                                            alt=""
                                                                            className="avatar-sm rounded-circle img-thumbnail"
                                                                        />
                                                                    }
                                                                    {user.profile_picture &&
                                                                        <img
                                                                            src={user.profile_picture}
                                                                            alt=""
                                                                            className="avatar-sm rounded-circle img-thumbnail"
                                                                        />
                                                                    }
                                                                </Td>
                                                                <Td>
                                                                    <p style={{ marginTop: '1rem' }}>{user.first_name}</p>
                                                                </Td>
                                                                <Td>
                                                                    <p style={{ marginTop: '1rem' }}>{user.last_name}</p>
                                                                </Td>
                                                                <Td>
                                                                    <p style={{ marginTop: '1rem' }}>{user.phone_number}</p>
                                                                </Td>
                                                                <Td>

                                                                    <Badge
                                                                        className={user.enabled ? ("font-size-11 badge-soft-success") : ("font-size-11 badge-soft-danger")}
                                                                        color={user.enabled ? ("success") : ("danger")}
                                                                        pill
                                                                        style={{ marginTop: '1rem' }}
                                                                    >
                                                                        {user.enabled ? ("enabled") : ("disabled")}
                                                                    </Badge>
                                                                </Td>
                                                                <Td>
                                                                    <div className="form-check form-switch form-switch-md mb-3" >
                                                                        <input
                                                                            type="checkbox"
                                                                            style={{ cursor: "pointer", marginTop: "1rem" }}
                                                                            className="form-check-input"
                                                                            id="enabletooltip"
                                                                            checked={user.enabled}
                                                                            onChange={() => { changeStatus({ ...user, enabled: !user.enabled }) }}
                                                                        />
                                                                        <UncontrolledTooltip placement="top" target="enabletooltip">
                                                                            change status
                                                                        </UncontrolledTooltip>
                                                                        <Link to="#" onClick={() => {
                                                                            resetPassword({ ...user, id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email })
                                                                        }}>
                                                                            <i
                                                                                className="bx bx-key"
                                                                                style={{ fontSize: "1.5rem", cursor: "pointer", marginTop: "1rem", marginLeft: "1rem" }}
                                                                                id="edittooltip"
                                                                            />
                                                                            <UncontrolledTooltip placement="top" target="edittooltip">
                                                                                reset password
                                                                            </UncontrolledTooltip>
                                                                        </Link>
                                                                    </div>
                                                                </Td>
                                                            </Tr>

                                                        )
                                                    })}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                ) : (
                                    <h1 style={{ width: "30%", margin: "auto", marginTop: "10rem", marginBottom: "10rem" }}>No users available</h1>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
