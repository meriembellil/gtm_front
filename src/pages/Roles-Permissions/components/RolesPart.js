import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Table } from 'reactstrap';
import { getRolesList } from 'store/roles-permissions/actions';
import RoleModal from './RoleModal';

export default function RolesPart(props) {

    const { selectedRole, setSelectedRole } = props;
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");

    const [roles, setRoles] = useState(null);
    const [filtredRoles, setFiltredRoles] = useState(null);
    const getRoles = async () => {
        setRoles(dispatch(await getRolesList()).payload.roles);
        setFiltredRoles(dispatch(await getRolesList()).payload.roles);
    }

    useEffect(async () => {
        await getRoles()
    }, []) 

    useEffect(async () => {
        setFiltredRoles(roles?.filter(role => {
            return role.name.toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1;
        }))
    }, [keyword])

    return (
        <Col md={5}>
            <h5>Roles</h5>
            <RoleModal getRoles={getRoles} />
            <div className="app-search">
                <div style={{ margin: "auto" }} >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Role..."
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                    />
                </div>
            </div>
            {filtredRoles?.length !== 0 ? (
                <div className="table-responsive" style={{ marginBottom: "3rem" }}>
                    <Table className="table mb-0">
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtredRoles?.map((role, index) => (
                                <tr key={index}>
                                    <td>
                                        {role.name}
                                    </td>
                                    <td>
                                        {selectedRole !== role.id &&
                                            <Link
                                                to="#"
                                                onClick={() => {
                                                    setSelectedRole(role.id);
                                                }}
                                            >
                                                select...
                                            </Link>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <h3 style={{ margin: "auto", width: "50%", marginTop: "2rem", marginBottom: "3rem" }}>Role not available</h3>
            )}
        </Col>
    )
}
