import React, { useState } from 'react'
import { Button, FormGroup, Modal, UncontrolledTooltip } from 'reactstrap'
import { Link } from 'react-router-dom'
import { getReferencedProductsByStore } from 'store/referencedProduct/services'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { findStockSetting, upsertStock } from 'store/stock/services'
import { useSelector } from 'react-redux'

const UpdateStock = (props) => {

    const { store } = props
    const userId = useSelector(state => state.User?.user?.id)
    const [modal_standard, setmodal_standard] = useState(false)
    const [rfp, setRfp] = useState([])
    const [stockSetting, setStockSetting] = useState({})

    const getRfp = (storeId) => {
        getReferencedProductsByStore(storeId).then((data) => {
            data.forEach(element => {
                setRfp(rfp => [...rfp, { product: element.product, storeId: storeId, productId: element.product.id, userId: userId, quantity: null, stockOut: false }])
            });
        })
    }

    const handleUpdate = (id, e) => {
        if (stockSetting.stockManagement === "StockOut") {
            setRfp((rfp) =>
                rfp.map((element) => {
                    return element.productId === id ? { ...element, stockOut: !element.stockOut } : element;
                })
            );
        } else if (stockSetting.stockManagement === "Quantity") {
            setRfp((rfp) =>
                rfp.map((element) => {
                    return element.productId === id ? { ...element, quantity: e.target.value, stockOut: null } : element;
                })
            );
        }

    };

    function tog_standard() {
        setmodal_standard(!modal_standard)
        if (!modal_standard) {
            findStockSetting().then((data) => {
                setStockSetting(data[0]);
            })
            setRfp([])
            getRfp(store.id)
            setTimeout(() => {
                $('#datatable').DataTable({
                    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]  
                })
            }, 200);
        }
    }

    const updateStock = () => {
        upsertStock(rfp).then(() => {
            tog_standard()
        })
    }

    return (
        <>
            <Link
                to="#"
                onClick={() => { tog_standard() }}
                style={{ fontSize: "1.3rem", marginRight: "1rem" }}
            >
                <i className="bx bx-edit-alt" id="addstockout" />
                <UncontrolledTooltip placement="top" target="addstockout"> 
                    Update stock
                </UncontrolledTooltip>
            </Link>
            <Modal
                isOpen={modal_standard}
                size="xl"
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Update stock ({store.name})
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
                                id={"datatable"}
                                className="table table-bordered"
                            >
                                <Thead>
                                    <Tr>
                                        <Th>Image</Th>
                                        <Th>Label</Th>
                                        <Th>Brand</Th>
                                        <Th>Category</Th>
                                        <Th>{(stockSetting.stockManagement === "StockOut") ? ("StockOut") : ("Quantity")}</Th>
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
                                                    {(stockSetting.stockManagement === "StockOut") ? (
                                                        <div style={{ width: "1%", margin: "auto" }}>
                                                            <input
                                                                type="checkbox"
                                                                style={{ cursor: "pointer", marginTop: "1.5rem" }}
                                                                className="form-check-input"
                                                                checked={product.stockOut}
                                                                onChange={(e) => { handleUpdate(product.product.id, e) }}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <input
                                                            style={{ marginTop: "1.3rem" }}
                                                            type="number"
                                                            onChange={(e) => { handleUpdate(product.product.id, e) }}
                                                        />
                                                    )}
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                    <FormGroup className="mb-0" style={{ float: 'right', marginTop: "2rem" }}>
                        <Button
                            type="button"
                            color="primary"
                            className="ms-1"
                            onClick={() => { updateStock() }}
                        >
                            Confirm
                        </Button>
                    </FormGroup>
                </div>
            </Modal>
        </>
    )
}
export default UpdateStock