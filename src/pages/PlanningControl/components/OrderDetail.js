import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { Card, CardBody, Col, Modal, Row } from 'reactstrap'
import logo from "../../../assets/images/logo-dark.png"
import { useReactToPrint } from "react-to-print";

const OrderDetail = (props) => {

    const { order, user, store } = props
    const componentRef = useRef()
    const [modal_standard, setmodal_standard] = useState(false)

    function tog_standard() {
        setmodal_standard(!modal_standard)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ marginLeft: "-0.8rem", height: "2rem", marginBottom: "1rem" }}
                onClick={() => { tog_standard() }}
            >
                Order
            </button>
            <Modal
                isOpen={modal_standard}
                size="xl"
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Order form
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
                <div className="modal-body" ref={componentRef}>
                    <Card>
                        <CardBody>
                            <div className="invoice-title">
                                <h4 className="float-end font-size-16">
                                    Order # {order.code}
                                </h4>
                                <div className="mb-4">
                                    <img src={logo} alt="logo" height="20" />
                                </div>
                            </div>
                            <hr />
                            <Row>
                                <Col xs="6" className="mt-3">
                                    <address>
                                        <strong>Ordered by : </strong>
                                        {user.first_name + " " + user.last_name}
                                        <br />
                                        <br />
                                        <strong>Order Date : </strong>
                                        {new Date(order.createdAt).toUTCString().slice(0, 16)}
                                    </address>
                                </Col>
                                <Col xs="6" className="mt-3 text-end">
                                    <address>
                                        <strong>Store : </strong>
                                        {store.name + ", " + store.address + ", " + store.postal_code + " - " + store.governorate}
                                        <br />
                                        <br />
                                        <strong>Delivery Date : </strong>
                                        {new Date(order.date).toUTCString().slice(0, 16)}
                                    </address>
                                </Col>
                            </Row>
                            <div className="py-2 mt-3">
                                <h3 className="font-size-15 fw-bold">
                                    Order summary
                                </h3>
                            </div>
                            <div className="table-responsive">
                                <Table className="table-nowrap">
                                    <Thead>
                                        <Tr>
                                            <Th style={{ width: "70px" }}>No.</Th>
                                            <Th>Label</Th>
                                            <Th className="text-end">Quantity</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {order?.orderDetails?.map((product, index) => (
                                            <Tr key={index}>
                                                <Td>
                                                    {index + 1}
                                                </Td>
                                                <Td>
                                                    {product.product.label}
                                                </Td>
                                                <Td className="text-end">
                                                    {product.quantity}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </div>
                            <Row style={{ marginTop: "2rem" }}>
                                <Col className="mt-3" />
                                <Col xs="12" className="mt-3 text-end">
                                    <address>
                                        <strong style={{ marginRight: "2rem" }}>Products ordered : </strong>
                                        {order?.orderDetails?.length}
                                        <br />
                                        <br />
                                        <strong style={{ marginRight: "2rem" }}>Total amount : </strong>
                                        {order.amount}
                                    </address>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "2rem" }}>
                                {order.orderPictures.map((image, index) => (
                                    <Col key={index} xl="6" lg="6" xs="12" style={{ marginBottom: "1rem" }}>
                                        <img src={image.path} style={{ maxWidth: "100%" }} />
                                    </Col>
                                ))}

                            </Row>
                            <div className="d-print-none" style={{ marginTop: "2rem" }}>
                                <div className="float-end">
                                    <Link
                                        to="#"
                                        onClick={handlePrint}
                                        className="btn btn-success waves-effect waves-light me-2 print__button"
                                    >
                                        <i className="fa fa-print" />
                                    </Link>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </>
    )
}
export default OrderDetail