import React, { useEffect, useState } from 'react'
import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import { Button, FormGroup, Modal, Row } from 'reactstrap'

export default function PermissionModal(props) {

    const { createPermission, selectedRole } = props;
    const [modal_standard, setmodal_standard] = useState(false)
    const [permission, setPermission] = useState({})


    const removeBodyCss = () => {
        document.body.classList.add("no_padding")
    }

    const tog_standard = () => {
        setmodal_standard(!modal_standard)
        removeBodyCss()
    }

    useEffect(() => {
        setPermission({
            ...permission,
            module: "",
            can_create: false,
            can_read: true,
            can_update: false,
            roleId: selectedRole
        })
    }, [selectedRole])

    return (
        <>
            <i
                className="bx bx-list-plus"
                style={{ fontSize: "25px", float: "right", cursor: "pointer", color: "#556EE6", marginTop: "-1.7rem" }}
                onClick={() => { tog_standard() }}
            ></i>
            <Modal
                isOpen={modal_standard}
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Create permission
                    </h5>
                    <button
                        type="button"
                        onClick={() => { setmodal_standard(false) }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <AvForm
                        onValidSubmit={() => {
                            createPermission(permission)
                            tog_standard()
                        }}
                    >
                        <AvField
                            className="mb-3"
                            name="module"
                            label="Module"
                            placeholder="Module"
                            type="text"
                            errorMessage="Entity is required."
                            validate={{ required: { value: true } }}
                            value={permission.module}
                            onChange={(e) => { setPermission({ ...permission, module: e.target.value }) }}
                        />
                        <Row>
                            <div style={{ marginLeft: "1rem" }} className="form-check form-switch form-switch-md mb-3">
                                <label className="form-check-label"> Create </label>
                                <input
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    className="form-check-input"
                                    value={permission.can_create}
                                    onChange={() => { setPermission({ ...permission, can_create: !permission.can_create }) }}
                                />
                            </div>
                            <div style={{ marginLeft: '8rem', marginTop: '-2.6rem' }} className="form-check form-switch form-switch-md mb-3">
                                <label className="form-check-label"> Read </label>
                                <input
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    className="form-check-input"
                                    checked={permission.can_read}
                                    value={permission.can_read}
                                    onChange={() => { setPermission({ ...permission, can_read: !permission.can_read }) }}
                                />
                            </div>
                            <div style={{ marginLeft: '15rem', marginTop: '-2.6rem' }} className="form-check form-switch form-switch-md mb-3">
                                <label className="form-check-label"> Update </label>
                                <input
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    className="form-check-input"
                                    value={permission.can_update}
                                    onChange={() => { setPermission({ ...permission, can_update: !permission.can_update }) }}
                                />
                            </div>
                        </Row>
                        <FormGroup className="mb-0" style={{ float: 'right' }}>
                            <Button
                                type="reset"
                                color="danger"
                                onClick={() => { tog_standard() }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                className="ms-1"
                            >
                                Create permission
                            </Button>
                        </FormGroup>
                    </AvForm>
                </div>

            </Modal>
        </>
    )
}
