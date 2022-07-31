import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { getReferencedProductsByStore } from 'store/referencedProduct/services';

const StoreProducts = (props) => {

    const { storeId } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [rfp, setRfp] = useState([])

    const getRfp = (storeId) => {
        getReferencedProductsByStore(storeId).then((data) => {
            setRfp(data);
        })
    }

    const tog_standard = () => {
        setmodal_standard(!modal_standard)
        if (!modal_standard) {
            getRfp(storeId)
            setTimeout(() => {
                $('#detaildatatable').DataTable()
            }, 200);
        }
    }

    return (
        <>
            <i
                className="mdi mdi-eye-minus-outline"
                style={{ fontSize: "23px", float: "right", cursor: "pointer", color: "#556EE6" }}
                onClick={() => { tog_standard() }}
            />
            <Modal
                isOpen={modal_standard}
                size="xl"
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Store products
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
                                id={"detaildatatable"}
                                className="table table-striped table-bordered"
                            >
                                <Thead>
                                    <Tr>
                                        <Th>Image</Th>
                                        <Th>Label</Th>
                                        <Th>Brand</Th>
                                        <Th>Category</Th>
                                        <Th>Typology</Th>
                                        <Th>Available</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {rfp?.map((element, index) => {
                                        return (
                                            <Tr key={index}>
                                                    <Td>
                                                        <img
                                                            src={element.product.path}
                                                            style={{ width: "4rem", height: "4rem" }}
                                                        />
                                                    </Td>
                                                    <Td>
                                                        <p style={{ marginTop: "1.5rem" }}> {element.product.label} </p>
                                                    </Td>
                                                    <Td>
                                                        <p style={{ marginTop: "1.5rem" }}> {element.product.brand?.name} </p>
                                                    </Td>
                                                    <Td>
                                                        <p style={{ marginTop: "1.5rem" }}> {element.product.category?.name} </p>
                                                    </Td>
                                                    <Td>
                                                        <p style={{ marginTop: "1.5rem" }}> {element.product.typology} </p>
                                                    </Td>
                                                    <Td>
                                                        <div className="form-check form-switch form-switch-md mb-3" >
                                                            <input
                                                                type="checkbox"
                                                                style={{ cursor: "pointer", marginTop: "1rem" }}
                                                                className="form-check-input"
                                                                id="enabletooltip"
                                                                checked={element.available}
                                                                onChange={() => { }}
                                                            />
                                                        </div>
                                                    </Td>
                                            </Tr>
                                        )
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

export default StoreProducts
