import React, { useEffect, useState } from 'react'
import { Col, Row, TabPane, FormGroup, Button, UncontrolledAlert } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation"
import { upsertUser } from 'store/user/services';
import { useDispatch } from 'react-redux';
import jwtDecode from "jwt-decode"
import ErrorAlert from 'shared/ErrorAlert';
import SuccessAlert from 'shared/SuccessAlert';
import ImageUpload from 'shared/ImageUpload';
import { getUserProfile } from 'store/user/actions';

export default function UpdateInformations(props) {

    const { user } = props // consts
    const { setUser } = props // functions
    const token = localStorage.getItem('authUser')
    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState({})
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedFile, setselectedFile] = useState(null);

    const updateProfil = async () => {
        upsertUser(newUser, selectedFile).then(async (data) => {
            const res = dispatch(await getUserProfile(jwtDecode(token).payload.username))
            setUser(res.payload.user)
            setSuccessMessage("Profile updated successfully")
            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000);
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        })
    }

    useEffect(() => {
        setNewUser(user)
    }, [user])

    return (
        <TabPane tabId={1}>
            <AvForm
                onValidSubmit={() => { updateProfil() }}
            >
                <Row>
                    <Col>
                        <AvField
                            className="mb-3"
                            name="First name"
                            label="First name"
                            placeholder="Type Something"
                            type="text"
                            errorMessage="First name is required."
                            validate={{ required: { value: true } }}
                            value={newUser?.first_name}
                            onChange={(e) => { setNewUser({ ...newUser, first_name: e.target.value }); }}
                        />
                    </Col>
                    <Col>
                        <AvField
                            className="mb-3"
                            name="Last name"
                            label="Last name"
                            placeholder="Type Something"
                            type="text"
                            errorMessage="Last name is required."
                            validate={{ required: { value: true } }}
                            value={newUser?.last_name}
                            onChange={(e) => { setNewUser({ ...newUser, last_name: e.target.value }); }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AvField
                            className="mb-3"
                            name="Email"
                            label="Email"
                            placeholder="Email"
                            type="text"
                            errorMessage="Invalid Email!"
                            validate={{
                                required: { value: true },
                                email: { value: true },
                            }}
                            value={newUser?.email}
                            onChange={(e) => { setNewUser({ ...newUser, email: e.target.value }); }}
                        />
                    </Col>
                    <Col>
                        <AvField
                            className="mb-3"
                            name="Phone number"
                            label="Phone number"
                            placeholder="Type Something"
                            type="text"
                            errorMessage="Phone number is required"
                            validate={{
                                required: { value: true },
                                pattern: {
                                    value: "^[0-9]{8}$",
                                    errorMessage: "the number must be composed of 8 digits",
                                },
                            }}
                            value={newUser?.phone_number}
                            onChange={(e) => { setNewUser({ ...newUser, phone_number: e.target.value }); }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col>
                        <ImageUpload selectedFile={selectedFile} setselectedFile={setselectedFile} />
                    </Col>
                    <Col>
                        {selectedFile &&
                            <>
                                <img
                                    style={{ width: '12rem', height: '14rem' }}
                                    data-dz-thumbnail=""
                                    className="avatar-sm rounded bg-light"
                                    alt={selectedFile.name}
                                    src={selectedFile.preview}
                                />
                            </>
                        }
                    </Col>
                </Row>
                {errorMessage &&
                    <ErrorAlert errorMessage={errorMessage} />
                }
                {successMessage &&
                    <SuccessAlert successMessage={successMessage} />
                }
                <FormGroup className="mb-0" style={{ float: 'right' }}>
                    <Button
                        type="submit"
                        color="primary"
                        className="ms-1"
                    >
                        Update informations
                    </Button>
                </FormGroup>
            </AvForm>
        </TabPane>
    )
}
