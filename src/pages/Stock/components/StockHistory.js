import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { Modal, UncontrolledTooltip } from 'reactstrap'
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { getReferencedProductsByStore } from 'store/referencedProduct/services'
import { findStockByStore, findStockDays, findStockSetting } from 'store/stock/services'

const StockHistory = (props) => {

    const { store } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [rfp, setRfp] = useState([])
    const [stockHistory, setStockHistory] = useState([])
    const [stockSetting, setStockSetting] = useState({})
    const [tableDays, setTableDays] = useState([])

    const getRfp = () => {
        getReferencedProductsByStore(store.id).then((data) => {
            data.forEach(element => {
                setRfp(rfp => [...rfp, element])
            });
        })
    }

    const getStockHistory = () => {
        findStockSetting().then((data) => {
            setStockSetting(data[0]);
            findStockDays(store.id, data[0].days).then((data) => {
                setTableDays(data)
            })
            findStockByStore(store.id, data[0].date).then((data) => {
                setStockHistory(data)
            })
        })
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        if (!modal_standard) {
            getStockHistory()
            setRfp([])
            getRfp()
            setTimeout(() => {
                $('#datatable').DataTable({
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
                <i className="bx bx-list-ul" id="stockouthistory" />
                <UncontrolledTooltip placement="top" target="stockouthistory">
                    Stock history
                </UncontrolledTooltip>
            </Link>
            <Modal
                isOpen={modal_standard}
                size="xl"
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        StockOut history ({store.name})
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
                                        <Th>Internal code</Th>
                                        <Th>Barcode</Th>
                                        <Th style={{ width: "25%" }}>Label</Th>
                                        {tableDays.map((day, index) => {
                                            return (
                                                <Th key={index}>{new Date(day.date).toUTCString().slice(5, 16)}</Th>
                                            )
                                        })}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {rfp.map((product, index) => {
                                        if (product.available || stockHistory.find((element) => element.productId === product.productId)) {
                                            return (
                                                <Tr key={index}>
                                                    <Td>{product.product?.internalCodes?.find((element) => element.storeGroupId === store.storeGroupId)?.code}</Td>
                                                    <Td>{product.product.barcode}</Td>
                                                    <Td>{product.product.label}</Td>
                                                    {tableDays.map((day, index) => {
                                                        if (stockSetting.stockManagement === "StockOut") {
                                                            if (!product.available) {
                                                                return (<Td key={index} style={{ backgroundColor: "grey" }} />)
                                                            } else {
                                                                let condition = stockHistory.find((element) =>
                                                                    element.productId === product.productId &&
                                                                    new Date(element.createdAt).toUTCString().slice(5, 16) === new Date(day.date).toUTCString().slice(5, 16)
                                                                )?.stockOut === true
                                                                return (<Td key={index} style={{ backgroundColor: condition && "#DE5555" }} />)
                                                            }
                                                        } else {
                                                            if (!product.available) {
                                                                return (
                                                                    <Td key={index} style={{ backgroundColor: condition && "grey", color: condition && "white" }}>
                                                                        {
                                                                            stockHistory.find(
                                                                                (element) =>
                                                                                    element.productId === product.productId &&
                                                                                    new Date(element.createdAt).toUTCString().slice(5, 16) === new Date(day.date).toUTCString().slice(5, 16)
                                                                            )?.quantity
                                                                        }
                                                                    </Td>
                                                                )
                                                            } else {
                                                                let condition = stockHistory.find((element) =>
                                                                    element.productId === product.productId &&
                                                                    new Date(element.createdAt).toUTCString().slice(5, 16) === new Date(new Date().setDate(new Date().getDate() - index)).toUTCString().slice(5, 16)
                                                                )?.quantity === 0
                                                                return (
                                                                    <Td key={index} style={{ backgroundColor: condition && "#DE5555", color: condition && "white" }}>
                                                                        {
                                                                            stockHistory.find(
                                                                                (element) =>
                                                                                    element.productId === product.productId &&
                                                                                    new Date(element.createdAt).toUTCString().slice(5, 16) === new Date(day.date).toUTCString().slice(5, 16)
                                                                            )?.quantity
                                                                        }
                                                                    </Td>
                                                                )
                                                            }
                                                        }
                                                    })}
                                                </Tr>
                                            )
                                        }
                                    })}
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default StockHistory