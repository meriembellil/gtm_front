import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Modal, Row, UncontrolledTooltip } from 'reactstrap'

export default function ProductDetail(props) {

    const { product } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)


    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        document.body.classList.add("no_padding")
    }

    return (
        <>
            <Link to="#">
                <i
                    id="detailtooltip"
                    className="mdi mdi-eye-minus-outline"
                    style={{ fontSize: "1.3rem", cursor: "pointer", marginRight: "1rem", float: "left", marginTop: "1.2rem" }}
                    onClick={() => { tog_fullscreen() }}
                />
                <UncontrolledTooltip placement="top" target="detailtooltip">
                    Detail
                </UncontrolledTooltip>
            </Link>
            <Modal
                size="xl"
                isOpen={modal_fullscreen}
                toggle={() => { tog_fullscreen() }}
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="exampleModalFullscreenLabel"
                    >
                        Product detail
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
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xl="6" xs="12">
                                    <img
                                        style={{ width: "100%", height: "22rem" }}
                                        src={product?.productPictures[0]?.path}
                                        alt="product image"
                                    />
                                </Col>
                                <Col xl="6" xs="12">
                                    <div className="mt-4 mt-xl-3">
                                        <h4 className="mt-1 mb-3">{product.label}</h4>
                                        <Row className="mb-3">
                                            <Col md="6">
                                                <h5>Category : </h5>
                                            </Col>
                                            <Col md="6">
                                                <h5> {product.category?.name} </h5>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col md="6">
                                                <h5>Brand : </h5>
                                            </Col>
                                            <Col md="6">
                                                <h5> {product.brand?.name} </h5>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col md="6">
                                                <h5>Typology : </h5>
                                            </Col>
                                            <Col md="6">
                                                <h5> {product.typology} </h5>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col md="6">
                                                <h5>Barcode : </h5>
                                            </Col>
                                            <Col md="6">
                                                <h5> {product.barcode} </h5>
                                            </Col>
                                        </Row>
                                        {product.internalCodes?.map((internalCode, index) => {
                                            return (
                                                <Row key={index} className="mb-3">
                                                    <Col md="6">
                                                        <h5>Internal code {internalCode.storeGroup.name} : </h5>
                                                    </Col>
                                                    <Col md="6">
                                                        <h5> {internalCode.code} </h5>
                                                    </Col>
                                                </Row>
                                            )
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </>
    )
}
