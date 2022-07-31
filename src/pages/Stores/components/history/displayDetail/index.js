import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Modal, Card, CardHeader } from "reactstrap"
import DisplayBody from './DisplayBody'

const DisplayDetail = (props) => {

    const { displays, store, user } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        document.body.classList.add("no_padding")
    }

    return (
        <>
            <Card
                outline
                color="primary"
                className="border"
                style={{ cursor: 'pointer' }}
                onClick={() => { tog_fullscreen() }}
            >
                <CardHeader className="bg-transparent">
                    <h5 className="my-0 text-primary">Display</h5>
                </CardHeader>
            </Card>
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
                        {"Display detail"}
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
                    </button>
                </div>
                <div className="modal-body">
                    {displays.map((display, index) => {
                        if (display.storeId === store.id) {
                            return (
                                <div key={index} className="row justify-content-center" style={{ marginBottom: "5rem" }}>
                                    <div className="col-xl-9">
                                        <div className="text-center">
                                            <div className="mb-4">
                                                <Link
                                                    to="#"
                                                    className="badge bg-light font-size-12"
                                                >
                                                    <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                                    {display.displayType.name}
                                                </Link>
                                            </div>
                                            <h4>{"Merchandiser : " + user.first_name + " " + user.last_name}</h4>
                                            <h4>{"Store : " + store.name + ", " + store.address + " - " + store.governorate}</h4>
                                            <p className="text-muted mb-4">
                                                <i className="mdi mdi-calendar me-1"></i> {new Date(display.createdAt).toUTCString().slice(0, 22)}
                                            </p>
                                        </div>
                                        {(display.category?.name || display.brand?.name) &&
                                            <>
                                                <hr />
                                                <div className="text-center">
                                                    <Row>
                                                        {display.category?.name &&
                                                            <Col>
                                                                <div>
                                                                    <p className="text-muted mb-2">Category</p>
                                                                    <h5 className="font-size-15">{display.category?.name}</h5>
                                                                </div>
                                                            </Col>
                                                        }
                                                        {display.brand?.name &&
                                                            <Col>
                                                                <div className="mt-4 mt-sm-0">
                                                                    <p className="text-muted mb-2">Brand</p>
                                                                    <h5 className="font-size-15">{display.brand?.name}</h5>
                                                                </div>
                                                            </Col>
                                                        }
                                                    </Row>
                                                </div>
                                                <hr />
                                            </>
                                        }
                                        <DisplayBody
                                            sections={display.displayType.displaySections}
                                            displayData={display.displayData}
                                            customValues={display.displayCustomFieldValues}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    })}

                </div>
            </Modal>
        </>
    )
}

export default DisplayDetail
