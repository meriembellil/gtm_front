import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Modal, Row, UncontrolledTooltip } from 'reactstrap'
import Maps from 'shared/Maps'

export default function DetailModal(props) {

    const { store } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        document.body.classList.add("no_padding")
    }

    return (
        <>
            <Link
                to="#"
                onClick={() => { tog_fullscreen() }}
                style={{ fontSize: "1.3rem" }}
            >
                <i className="mdi mdi-eye-minus-outline" id="detailtooltip" />
                <UncontrolledTooltip placement="top" target="detailtooltip">
                    View Detail
                </UncontrolledTooltip>
            </Link>
            <Modal
                size="xl"
                isOpen={modal_fullscreen}
                toggle={() => {
                    tog_fullscreen()
                }}
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="exampleModalFullscreenLabel"
                    >
                        Store Detail
                    </h5>
                    <button
                        onClick={() => {
                            setmodal_fullscreen(false)
                        }}
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
                            <div className="pt-3">
                                <div className="row justify-content-center">
                                    <div className="col-xl-8">
                                        <div>
                                            <div className="text-center">
                                                <div className="mb-4">
                                                    <h6>{store?.name}</h6>
                                                </div>
                                                <h4>{"adresse : " + store?.address + ", " + store?.postal_code + " - " + store?.governorate}</h4>
                                                <Link
                                                    to="#"
                                                    className="badge bg-light font-size-12"
                                                >
                                                    <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                                    {store?.type}
                                                </Link>
                                            </div>

                                            <hr />
                                            <div className="text-center">
                                                <Row>
                                                    <Col sm={6}>
                                                        <div>
                                                            <p className="text-muted mb-2">E-mail</p>
                                                            <h5 className="font-size-15">{store?.email}</h5>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6}>
                                                        <div className="mt-4 mt-sm-0">
                                                            <p className="text-muted mb-2">Numéro de téléphone</p>
                                                            <h5 className="font-size-15">{store?.phone_number}</h5>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <hr />
                                            <div className="mt-4">
                                                <Row style={{ height: "30rem", width: "100%" }}>
                                                    <Maps lat={store?.lat} lng={store?.lng} />
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </>
    )
}
