import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import React, { useState } from 'react'
import { FormGroup, Modal, Button } from 'reactstrap'
import ErrorAlert from 'shared/ErrorAlert'
import { upsertRole } from 'store/roles-permissions/services'

export default function RoleModal(props) {

    const { getRoles } = props;
    const [modal_standard, setmodal_standard] = useState(false)
    const [role, setRole] = useState({})
    const [errorMessage, setErrorMessage] = useState(null);

    const createRole = (role) => {
        upsertRole(role).then(async () => {
            await getRoles();
            tog_standard()
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        })
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding")
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        removeBodyCss()
        setRole({ ...role, name: "" })
    }

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
                        Create role
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
                            createRole(role)
                        }}
                    >
                        <AvField
                            className="mb-3"
                            name="role"
                            label="Role"
                            placeholder="Name"
                            type="text"
                            errorMessage="Role is required."
                            validate={{ required: { value: true } }}
                            value={role.name}
                            onChange={(e) => { setRole({ ...role, name: e.target.value }) }}
                        />
                        {errorMessage &&
                            <ErrorAlert errorMessage={errorMessage} />
                        }
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
                                Create role
                            </Button>
                        </FormGroup>
                    </AvForm>
                </div>
            </Modal>
        </>
    )
}
