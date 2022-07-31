import React, { useState } from 'react'
import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import { Button, Card, CardBody, CardFooter, CardImg, Col, Modal, Row, UncontrolledTooltip } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'
import MutipleImagesUpload from 'shared/MutipleImagesUpload'
import { upsertProduct } from 'store/product/services'
import Form from './Form'
import { Link } from 'react-router-dom'

export default function UpdateProduct(props) {

    const { prod, getProducts } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const [product, setProduct] = useState(prod)
    const [selectedFile, setselectedFile] = useState(null)
    const [selectedFiles, setselectedFiles] = useState([])

    const updateProduct = async () => {
        await upsertProduct(product, product.internalCodes, selectedFile, selectedFiles)
            .then(async () => {
                await getProducts()
                tog_fullscreen()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        setselectedFile(null)
        setselectedFiles([])
        document.body.classList.add("no_padding")
    }

    return (
        <>
            <Link to="#">
                <i
                    onClick={() => { tog_fullscreen() }}
                    className="bx bx-edit-alt"
                    style={{ fontSize: "1.3rem", cursor: "pointer", float: "left", marginTop: "1.5rem" }}
                    id="edittooltip"
                />
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
                        Update product
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
                                            updateProduct()
                                        }}
                                    >
                                        <Row>
                                            <Form product={product} setProduct={setProduct} />
                                            {product?.internalCodes?.map((group, index) => {
                                                return (
                                                    <Col key={index} sm="6">
                                                        <AvField
                                                            className="mb-3"
                                                            name={"internal code " + group?.storeGroup?.name}
                                                            label={"Internal code " + group?.storeGroup?.name}
                                                            placeholder={"Internal code " + group?.storeGroup?.name}
                                                            type="text"
                                                            errorMessage="Internal code is required."
                                                            value={group.code}
                                                            onChange={(e) => { group.code = e.target.value }}
                                                        />
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                        <Row style={{ marginBottom: "1rem" }}>
                                            <Col xs="12" md="6">
                                                <h5>Product picture :</h5>
                                                <ImageUpload selectedFile={selectedFile} setselectedFile={setselectedFile} />
                                            </Col>
                                            {(product.path || selectedFile?.preview) &&
                                                <Col>
                                                    <img
                                                        style={{ width: 'auto', height: '14rem', marginTop: "2.3rem" }}
                                                        data-dz-thumbnail=""
                                                        className="avatar-sm rounded bg-light"
                                                        alt={selectedFile ? (selectedFile.name) : (product.path)}
                                                        src={(product.path && !selectedFile?.preview) ? (product.path) : (selectedFile?.preview)}
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
                                        <div className="d-flex flex-wrap gap-2" style={{ float: "right", marginTop: "2rem", marginBottom: "-2.5rem" }}>
                                            <Button
                                                type="submit"
                                                color="primary"
                                                className="btn waves-effect waves-light"
                                            >
                                                Save
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
