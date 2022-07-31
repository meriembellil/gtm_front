import React, { useState } from 'react'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, CardImg, Col, Modal, Row } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'
import MutipleImagesUpload from 'shared/MutipleImagesUpload'
import Form from './Form'
import Maps from '../../../shared/Maps'
import { upsertStore } from 'store/pos/services'
import ErrorAlert from 'shared/ErrorAlert'

export default function CreateModal(props) {

    const { getList, storeGroups } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const [store, setStore] = useState({})
    const [selectedFile, setselectedFile] = useState([])
    const [selectedFiles, setselectedFiles] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    const [customValues, setCustomValues] = useState([])

    const createStore = () => {
        upsertStore(store, selectedFile, selectedFiles, customValues).then(() => {
            getList()
            tog_fullscreen()
        }).catch((err) => {
            setErrorMessage(err.response.data.message)
            setTimeout(() => { setErrorMessage(false) }, 3000);
        })
    }

    function success(pos) {
        var crd = pos.coords;
        setStore({
            ...store,
            lat: crd.latitude,
            lng: crd.longitude
        })
    }

    function tog_fullscreen() {
        setStore({})
        setmodal_fullscreen(!modal_fullscreen)
        document.body.classList.add("no_padding")
    }

    return (
        <>
            <Link to="#">
                <i
                    className="bx bx-list-plus"
                    style={{ fontSize: "25px", float: "right", marginTop: "-2rem", cursor: "pointer", color: '#556EE6' }}
                    data-toggle="modal"
                    onClick={() => { tog_fullscreen() }}
                ></i>
            </Link>
            <Modal
                size="xl"
                isOpen={modal_fullscreen}
                toggle={() => { tog_fullscreen() }}
                className="modal-fullscreen"
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="exampleModalFullscreenLabel"
                    >
                        Create store
                    </h5>
                    <button
                        onClick={() => { setmodal_fullscreen(false) }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <AvForm
                                        onValidSubmit={() => { createStore() }}
                                    >
                                        <Form
                                            store={store}
                                            setStore={setStore}
                                            storeGroups={storeGroups}
                                        />
                                        <Row style={{ marginTop: "1rem" }}>
                                            <Button
                                                className="waves-effect waves-effect waves-light btn-outline"
                                                color="primary"
                                                outline
                                                style={{ width: "98%", height: "3rem", fontSize: "1.3rem", margin: "auto", marginTop: "1rem", marginBottom: "1rem" }}
                                                type="button"
                                                onClick={() => { navigator.geolocation.getCurrentPosition(success) }}
                                            >
                                                <i className="bx bxs-map" data-toggle="modal"></i>
                                                {" "} get current location
                                            </Button>
                                        </Row>
                                        {store.lat && store.lng &&
                                            <Row style={{ height: "15rem", width: "100%" }}>
                                                <Maps lat={store.lat} lng={store.lng} />
                                            </Row>
                                        }
                                        <Row style={{ marginTop: "2rem" }}>
                                            <Col sm={6}>
                                                <h5>Store picture :</h5>
                                                <ImageUpload setselectedFile={setselectedFile} />
                                            </Col>
                                            {selectedFile &&
                                                <Col>
                                                    <img
                                                        style={{ width: 'auto', height: '14rem', marginTop: "2.3rem" }}
                                                        data-dz-thumbnail=""
                                                        className="avatar-sm rounded bg-light"
                                                        alt={selectedFile.name}
                                                        src={selectedFile.preview}
                                                    />
                                                </Col>
                                            }
                                        </Row>
                                        <h5 className="mb-3" style={{ marginTop: "2rem" }}>images :</h5>
                                        <Row >
                                            {selectedFiles.map((picture, index) => (
                                                <Col key={index} xl="1" lg="1">
                                                    <Card>
                                                        <CardImg
                                                            src={picture.preview}
                                                            alt="Skote"
                                                            style={{ cursor: "pointer", marginLeft: "1rem", marginBottom: "1rem" }}
                                                            className="rounded avatar-xl"
                                                        />
                                                        <CardFooter>
                                                            <button
                                                                type="button"
                                                                style={{ marginTop: "-1.5rem", width: "7.6rem", marginLeft: "-0.3rem" }}
                                                                className="btn btn-danger waves-effect waves-light"
                                                                onClick={() => { setselectedFiles(selectedFiles.filter((q, i) => i !== index)); }}
                                                            >
                                                                <i className="bx bx-block font-size-16 align-middle me-2"></i>{" "}
                                                                Delete
                                                            </button>
                                                        </CardFooter>
                                                    </Card>
                                                </Col>
                                            ))}
                                            <MutipleImagesUpload selectedFiles={selectedFiles} setselectedFiles={setselectedFiles} />
                                        </Row>
                                        {errorMessage &&
                                            <ErrorAlert errorMessage={errorMessage} />
                                        }
                                        <div className="d-flex flex-wrap gap-2" style={{ float: "right", marginTop: "2rem" }}>
                                            <Button
                                                type="submit"
                                                color="primary"
                                                className="btn waves-effect waves-light"
                                            >
                                                Create store
                                            </Button>
                                        </div>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    )
}
