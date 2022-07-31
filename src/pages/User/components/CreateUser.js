import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, FormGroup, Modal, UncontrolledAlert } from 'reactstrap'
import { getRolesList } from 'store/roles-permissions/actions'
import { upsertUser } from 'store/user/services'
import bcrypt from "bcryptjs"
import generator from "generate-password";
import Form from './Form'

export default function CreateUser(props) {

    const { getList } = props
    const dispatch = useDispatch();
    const [modal_standard, setmodal_standard] = useState(false)
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const createUser = () => {
        upsertUser(
            {
                ...user,
                enabled: 1,
                password: bcrypt.hashSync(
                    generator.generate({
                        length: 10,
                        numbers: true,
                        strict: true,
                        symbols: true
                    }),
                    12
                )
            },
        )
            .then(async () => {
                await getList()
                setmodal_standard(false)
                setUser({})
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000);
            })
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        setUser({})
        document.body.classList.add("no_padding")
    }

    useEffect(async () => {
        setRoles(dispatch(await getRolesList()).payload.roles);
    }, [])

    return (
        <>
            <i
                className="bx bx-list-plus"
                style={{ fontSize: "25px", float: "right", cursor: "pointer", color: '#556EE6', marginTop: "-2rem" }}
                onClick={() => { tog_standard(); }}
                data-toggle="modal"
            ></i>
            <Modal
                isOpen={modal_standard}
                toggle={() => {
                    tog_standard()
                }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0">
                        Create new user
                    </h5>
                    <button
                        type="button"
                        onClick={() => setmodal_standard(false)}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                    </button>
                </div>
                <div className="modal-body">
                    <AvForm
                        onValidSubmit={() => {
                            createUser()
                        }}
                    >
                        <Form user={user} setUser={setUser} roles={roles} />
                        {errorMessage &&
                            <UncontrolledAlert
                                color="danger"
                                className="alert-dismissible fade show"
                                role="alert"
                            >
                                <i className="mdi mdi-block-helper me-2"></i> {errorMessage}
                            </UncontrolledAlert>
                        }
                        <FormGroup className="mb-0" style={{ float: 'right' }}>
                            <Button
                                type="submit"
                                color="primary"
                                className="ms-1"
                            >
                                Create User
                            </Button>
                        </FormGroup>
                    </AvForm>
                </div>
            </Modal>
        </>
    )
}
