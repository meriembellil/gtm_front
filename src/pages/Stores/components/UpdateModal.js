import React, { useState } from 'react'
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import { Button, Card, CardFooter, CardImg, Col, Modal, Row, UncontrolledTooltip } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload';
import MutipleImagesUpload from 'shared/MutipleImagesUpload';
import Form from './Form';
import Maps from '../../../shared/Maps';
import { upsertStore } from "store/pos/services";
import { Link } from 'react-router-dom';

export default function UpdateModal(props) {

    const { currentStore, getList, storeGroups } = props;
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const [selectedFile, setselectedFile] = useState(null)
    const [selectedFiles, setselectedFiles] = useState([])
    const [store, setStore] = useState(currentStore)
    const [errorMessage, setErrorMessage] = useState(false)
    const [customValues, setCustomValues] = useState([])

    const updateStore = () => {
        upsertStore(store, selectedFile, selectedFiles, customValues).then(() => {
            getList()
            tog_fullscreen()
        }).catch((err) => {
            setErrorMessage(err.response.data.message)
            setTimeout(() => { setErrorMessage(false) }, 3000);
        })
    }

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        document.body.classList.add("no_padding")
    }

    function success(pos) {
        let crd = pos.coords;
        setStore({
            ...store,
            lat: crd.latitude,
            lng: crd.longitude
        })
    }

    return (
        <>
            <Link to="#" onClick={() => { tog_fullscreen() }} style={{ fontSize: "1.3rem" }}>
                <i className="bx bx-edit-alt" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                </UncontrolledTooltip>
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
                        Update Store
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
                            <AvForm
                                onValidSubmit={() => { updateStore() }}
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
                                        {" "} update location
                                    </Button>
                                </Row>
                                {store.lat && store.lng &&
                                    <Row style={{ height: "15rem", width: "100%" }}>
                                        <Maps lat={store.lat} lng={store.lng} />
                                    </Row>
                                }
                                <Row style={{ marginTop: "2rem" }}>
                                    <h5 className="mb-3">Store picture :</h5>
                                    <Col sm={6}>
                                        <ImageUpload setselectedFile={setselectedFile} />
                                    </Col>
                                    <Col>
                                        {(store.path || selectedFile?.preview) &&
                                            <img
                                                style={{ width: "auto", height: "14rem" }}
                                                data-dz-thumbnail=""
                                                className="avatar-sm rounded bg-light"
                                                alt={selectedFile ? (selectedFile.name) : (store.id)}
                                                src={(store.path && !selectedFile?.preview) ? (store.path) : (selectedFile?.preview)}
                                            />
                                        }
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "2rem" }}>
                                    <h5 className="mb-3">images :</h5>
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
                                <div className="d-flex flex-wrap gap-2" style={{ float: "right", marginTop: "1rem" }}>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        className="btn waves-effect waves-light"
                                    >
                                        Update store
                                    </Button>
                                </div>
                            </AvForm>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    )
}
