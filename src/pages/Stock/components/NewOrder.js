import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, FormGroup, Modal, Row, UncontrolledTooltip } from 'reactstrap'
import { getReferencedProductsByStore } from 'store/referencedProduct/services'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import ErrorAlert from 'shared/ErrorAlert';
import { upsertOrder } from 'store/order/services'
import MutipleImagesUpload from 'shared/MutipleImagesUpload'
import { useSelector } from 'react-redux'

const NewOrder = (props) => {

    const { store } = props
    const userId = useSelector(state => state.User?.user?.id)
    const [modal_standard, setmodal_standard] = useState(false)
    const [selectedFiles, setselectedFiles] = useState(null)
    const [rfp, setRfp] = useState([])
    const [order, setOrder] = useState({})
    const [orderDetail, setOrderDetail] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)

    const getRfp = () => {
        getReferencedProductsByStore(store.id).then((data) => {
            data.forEach(element => {
                setRfp(rfp => [...rfp, { product: element.product, storeId: store.id, productId: element.product.id, quantity: null }])
            });
        })
    }

    const handleUpdate = (id, e) => {
        setRfp((rfp) =>
            rfp.map((element) => {
                return element.productId === id ? { ...element, quantity: parseInt(e.target.value) } : element;
            })
        );
    };

    const createOrderDetail = () => {
        rfp.forEach((element) => {
            if (element.quantity) {
                setOrderDetail(orderDetail => [...orderDetail, element])
            }
        });
    }

    const createOrder = () => {
        if (!order.date || !order.amount || !selectedFiles) {
            setErrorMessage("order fields are required!")
            setTimeout(() => {
                setErrorMessage(false)
            }, 3000);
        } else {
            upsertOrder({ ...order, userId: userId, storeId: store.id }, orderDetail, selectedFiles).then(() => {
                tog_standard()
            })
        }
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        if (!modal_standard) {
            setselectedFiles(null)
            setOrder({})
            setOrderDetail([])
            setRfp([])
            getRfp()
            setTimeout(() => {
                $('#datatables').DataTable({
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
                })
            }, 200);
        }
    }

    return (
        <>
            <Link
                to="#"
                onClick={() => { tog_standard() }}
                style={{ fontSize: "1.3rem", marginRight: "1rem" }}
            >
                <i className="bx bx-cart" id="neworder" />
                <UncontrolledTooltip placement="top" target="neworder">
                    New order
                </UncontrolledTooltip>
            </Link>
            <Modal
                isOpen={modal_standard}
                size="xl"
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        New order for {store.name}
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
                <div className="modal-body">
                    <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
                        <div
                            className="table-responsive mb-0"
                            data-pattern="priority-columns"
                        >
                            <Table
                                id={"datatables"}
                                className="table table-bordered"
                            >
                                <Thead>
                                    <Tr>
                                        <Th>Image</Th>
                                        <Th>Label</Th>
                                        <Th>Brand</Th>
                                        <Th>Category</Th>
                                        <Th>Quantity</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {rfp?.map((product, index) => {
                                        return (
                                            <Tr key={index} style={{ backgroundColor: product.stockOut ? ("#DE5555") : (""), color: product.stockOut ? ("white") : ("") }}>
                                                <Td>
                                                    <img
                                                        src={product.product.path}
                                                        style={{ width: "4rem", height: "4rem" }}
                                                    />
                                                </Td>
                                                <Td>
                                                    <p style={{ marginTop: "1.5rem" }}> {product.product.label} </p>
                                                </Td>
                                                <Td>
                                                    <p style={{ marginTop: "1.5rem" }}> {product.product.brand?.name} </p>
                                                </Td>
                                                <Td>
                                                    <p style={{ marginTop: "1.5rem" }}> {product.product.category?.name} </p>
                                                </Td>
                                                <Td>
                                                    <input
                                                        style={{ marginTop: "1.3rem" }}
                                                        type="number"
                                                        onChange={(e) => { handleUpdate(product.product.id, e) }}
                                                    />
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                    <Row style={{ marginTop: "2rem" }}>
                        <Col>
                            <label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                            >
                                delivery date
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="date"
                                    onChange={(e) => { setOrder({ ...order, date: e.target.value }) }}
                                />
                            </div>
                        </Col>
                        <Col>
                            <label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                            >
                                total amount
                            </label>
                            <div className="col-md-10">
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="total amount"
                                    onChange={(e) => { setOrder({ ...order, amount: parseFloat(e.target.value) }) }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <div style={{ width: "50%", margin: "auto", marginTop: "2rem" }}>
                        <MutipleImagesUpload selectedFiles={selectedFiles} setselectedFiles={setselectedFiles} />
                    </div>
                    {errorMessage &&
                        <div style={{ marginTop: "2rem" }}>
                            <ErrorAlert errorMessage={errorMessage} />
                        </div>
                    }
                    <FormGroup className="mb-0" style={{ float: 'right', marginTop: "2rem" }}>
                        <Button
                            type="button"
                            color="primary"
                            className="ms-1"
                            onMouseEnter={() => { createOrderDetail() }}
                            onClick={() => { createOrder() }}
                        >
                            Confirm
                        </Button>
                    </FormGroup>
                </div>
            </Modal>
        </>
    )
}

export default NewOrder
