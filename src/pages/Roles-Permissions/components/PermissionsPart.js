import React, { useEffect, useState } from 'react'
import { Col, Table } from 'reactstrap';
import { getPermissionsByRole, upsertPermission } from 'store/roles-permissions/services';
import PermissionModal from './PermissionModal';

export default function PermissionsPart(props) {

    const { selectedRole } = props;
    const [permissions, setPermissions] = useState([]);
    const [filtredPermissions, setFiltredPermissions] = useState([]);
    const [keyword, setKeyword] = useState("");

    const updatePermission = async (permission, roleId) => {
        await upsertPermission(permission, roleId).then(async (res) => {
            getPermissionsByRole(selectedRole).then((data) => {
                 setPermissions(data)
            })
        })
    }

    const createPermission = async (permission) => {
        await upsertPermission(permission).then(async (res) => {
            getPermissionsByRole(selectedRole).then( (data) => {
                 setPermissions(data)
            })
            setFiltredPermissions(res.role.permissions);
        }).catch((err) => { })
    }

    useEffect(() => {
        setFiltredPermissions(permissions)
    }, [permissions])

    useEffect(async () => {
        setFiltredPermissions(permissions?.filter(permission => {
            return permission.module.toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1;
        }))
    }, [keyword])

    useEffect(() => {
        getPermissionsByRole(selectedRole).then((data) => {
            setPermissions(data)
        })
    }, [selectedRole])

    return (
        <>
            {selectedRole ? (
                <Col>
                    <h5>Permissions</h5>
                    <PermissionModal createPermission={createPermission} selectedRole={selectedRole} />
                    {(filtredPermissions?.length !== 0 || keyword) &&
                        <div className="app-search">
                            <div style={{ margin: "auto" }} >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Entity..."
                                    value={keyword}
                                    onChange={(e) => { setKeyword(e.target.value) }}
                                />
                            </div>
                        </div>
                    }
                    {filtredPermissions?.length !== 0 ? (
                        <div className="table-responsive">
                            <Table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th>Module</th>
                                        <th>Create</th>
                                        <th>Read</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtredPermissions?.map((permission, index) => (
                                        <tr key={index}>
                                            <td>{permission.module}</td>
                                            <td>
                                                <div className="form-check form-switch form-switch-md mb-3">
                                                    <input
                                                        type="checkbox"
                                                        style={{ cursor: "pointer" }}
                                                        className="form-check-input"
                                                        id="customSwitchsizemd"
                                                        checked={permission.can_create}
                                                        onChange={() => { updatePermission({ ...permission, can_create: !permission.can_create }, selectedRole) }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check form-switch form-switch-md mb-3">
                                                    <input
                                                        type="checkbox"
                                                        style={{ cursor: "pointer" }}
                                                        className="form-check-input"
                                                        id="customSwitchsizemd"
                                                        checked={permission.can_read}
                                                        onChange={() => { updatePermission({ ...permission, can_read: !permission.can_read }, selectedRole) }}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-check form-switch form-switch-md mb-3">
                                                    <input
                                                        type="checkbox"
                                                        style={{ cursor: "pointer" }}
                                                        className="form-check-input"
                                                        id="customSwitchsizemd"
                                                        checked={permission.can_update}
                                                        onChange={() => { updatePermission({ ...permission, can_update: !permission.can_update }, selectedRole) }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <>
                            {keyword ? (
                                <h3 style={{ margin: "auto", width: "50%", marginTop: "8rem" }}>Entity not available</h3>

                            ) : (
                                <h3 style={{ margin: "auto", width: "50%", marginTop: "8rem" }}>Add permissions to the selected role</h3>
                            )}
                        </>
                    )
                    }
                </Col>
            ) : (
                <Col style={{ margin: "auto" }}>
                    <h3 style={{ margin: "auto", width: "50%" }}>Choose role to manage permissions</h3>
                </Col>
            )}
        </>
    )
}
