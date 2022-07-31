import React, { useState } from 'react'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, CardImg, Col, Modal, Row, UncontrolledAlert } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'
import MutipleImagesUpload from 'shared/MutipleImagesUpload'
import { upsertProduct } from 'store/product/services'
import CreateForm from '../internalCodeComponents/CreateForm'
import Form from './Form'

export default function CreateProduct(props) {

    const { getProducts } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const [internalCodes, setInternalCodes] = useState([])
    const [product, setProduct] = useState({})
    const [selectedFile, setselectedFile] = useState(null)
    const [selectedFiles, setselectedFiles] = useState([])
    const [errorMessage, setErrorMessage] = useState(null);

    const createProduct = async () => {
        upsertProduct(product, internalCodes, selectedFile, selectedFiles)
            .then(async () => {
                await getProducts()
                tog_fullscreen()
            })
            .catch((err) => {
                if (err.response.data.message === "ER_DUP_ENTRY") {
                    setErrorMessage("Product label and barcode must be unique")
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000);
                }
            })
    }

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        setselectedFile(null)
        setselectedFiles([])
        setProduct({})
        setInternalCodes([])
        document.body.classList.add("no_padding")
    }

    return (
        <>
            <Link to="#">
                <i
                    className="bx bx-list-plus"
                    style={{ fontSize: "25px", float: "right", marginTop: "-2rem", cursor: "pointer" }}
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
                        Create product
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
                                        onValidSubmit={() => {
                                            createProduct()
                                        }}
                                    >
                                        <Row>
                                            <Form product={product} setProduct={setProduct} />
                                            <CreateForm internalCodes={internalCodes} />
                                        </Row>
                                        <Row style={{ marginBottom: "1rem" }}>
                                            <Col xs="12" md="6">
                                                <h5>Product picture :</h5>
                                                <ImageUpload selectedFile={selectedFile} setselectedFile={setselectedFile} />
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
                                        <Row>
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
                                            <UncontrolledAlert
                                                color="danger"
                                                className="alert-dismissible fade show"
                                                role="alert"
                                            >
                                                <i className="mdi mdi-block-helper me-2"></i> {errorMessage}
                                            </UncontrolledAlert>
                                        }
                                        <div className="d-flex flex-wrap gap-2" style={{ float: "right", marginTop: "2rem", marginBottom: "-2.5rem" }}>
                                            <Button
                                                type="submit"
                                                color="primary"
                                                className="btn waves-effect waves-light"
                                            >
                                                Create product
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
