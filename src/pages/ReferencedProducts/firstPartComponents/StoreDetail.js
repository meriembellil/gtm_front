import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { Modal, UncontrolledTooltip } from 'reactstrap'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { getReferencedProductsByStore, upsertReferencedProducts } from 'store/referencedProduct/services';
import Swal from 'sweetalert2'

const StoreDetail = (props) => {

    const { storeId } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [rfp, setRfp] = useState([])

    const getRfp = (storeId) => {
        getReferencedProductsByStore(storeId).then((data) => {
            setRfp(data);
        })
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        if (!modal_standard) {
            getRfp(storeId)
            setTimeout(() => {
                $('#detaildatatable').DataTable()
            }, 200);
        }
    }

    const updateRFP = (product) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update status!'
        }).then((result) => {
            if (result.isConfirmed) {
                upsertReferencedProducts([product]).then(() => {
                    getRfp(storeId)
                    Swal.fire(
                        'Updated!',
                        'Product updated successfully.',
                        'success'
                    )
                })
            }
        })
    }

    return (
        <>
            <i
                className="mdi mdi-eye-minus-outline"
                style={{ fontSize: "25px", cursor: "pointer", color: "#556EE6" }}
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
                                className="table table-bordered"
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
                                    {rfp?.map((product, index) => {
                                        return (
                                            <Tr key={index} style={{backgroundColor: product.available?("#BCF0A9"):('')}}>
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
                                                    <p style={{ marginTop: "1.5rem" }}> {product.product.typology} </p>
                                                </Td>
                                                <Td>
                                                    <div className="form-check form-switch form-switch-md mb-3" >
                                                        <input
                                                            type="checkbox"
                                                            style={{ cursor: "pointer", marginTop: "1rem" }}
                                                            className="form-check-input"
                                                            id="enabletooltip"
                                                            checked={product.available}
                                                            onChange={() => { updateRFP({ ...product, available: !product.available }) }}
                                                        />
                                                        <UncontrolledTooltip placement="top" target="enabletooltip">
                                                            change status
                                                        </UncontrolledTooltip>
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
export default StoreDetail