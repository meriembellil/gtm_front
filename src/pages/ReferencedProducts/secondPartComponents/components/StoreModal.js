import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Col, Modal, Row } from 'reactstrap'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { getStoresAsync } from 'store/pos/actions';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import StoreProducts from './StoreProducts';
import { Link } from 'react-router-dom';

const StoreModal = (props) => {

    const { selectedStore, setSelectedStore } = props
    const dispatch = useDispatch();
    const [modal_standard, setmodal_standard] = useState(false)
    const [stores, setStores] = useState([])

    const getStores = async () => {
        setStores(dispatch(await getStoresAsync()).payload.stores)
    }

    const tog_standard = async () => {
        setmodal_standard(!modal_standard)
        if (!modal_standard) {
            setSelectedStore(null)
            await getStores()
            $('#datatable').DataTable()
        }
    }

    return (
        <>
            <Button
                outline
                color="primary"
                style={{ float: "right" }}
                onClick={() => { tog_standard() }}
            >
                get products from store
            </Button>
            <Modal
                isOpen={modal_standard}
                size="xl"
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Referenced products
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
                                id="datatable"
                                className="table table-striped table-bordered"
                            >
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Address</Th>
                                        <Th>Governorate</Th>
                                        <Th>Actons</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {stores?.map((store, index) => (
                                        <Tr key={index}>
                                            <Td> {store.name} </Td>
                                            <Td> {store.address} </Td>
                                            <Td> {store.governorate} </Td>
                                            <Td>
                                                <Row>
                                                    <Col xl="2" lg="2" md="2" sm="2" xs="2">
                                                        <StoreProducts
                                                            storeId={store.id}
                                                        />
                                                    </Col>
                                                    <Col>
                                                        {selectedStore !== store.id &&
                                                            <Link
                                                                to="#"
                                                                style={{ float: "left", marginTop: "0.3rem" }}
                                                                onClick={() => { setSelectedStore(store.id); tog_standard() }}
                                                            >
                                                                select...
                                                            </Link>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default StoreModal