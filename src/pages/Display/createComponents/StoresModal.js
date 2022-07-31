import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { Button, Col, Modal } from 'reactstrap'
import { getStoresAsync } from 'store/pos/actions'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Link } from 'react-router-dom'

const StoresModal = (props) => {

    const { selectedStore, setSelectedStore } = props
    const dispatch = useDispatch()
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const [stores, setStores] = useState([])

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
    }

    const getStores = async () => {
        return dispatch(await getStoresAsync()).payload.stores
    }

    const getStoreList = async () => {
        await getStores().then((res) => {
            setStores(res)
        })
    }

    useEffect(() => {
        getStoreList()
        if (modal_fullscreen) {
            setTimeout(() => {
                $('#mydatatable1').DataTable(
                    {
                        "lengthChange": false,
                        "pageLength": 10
                    }
                )
            });
        }
    }, [modal_fullscreen])

    return (
        <Col>
            <Button
                color="primary"
                outline
                style={{ marginTop: '1.8rem' }}
                onClick={() => tog_fullscreen()}
            >
                Choose store...
            </Button>
            <Modal
                size="lg"
                isOpen={modal_fullscreen}
                toggle={() => { tog_fullscreen() }}
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="exampleModalFullscreenLabel"
                        onClick={() => console.log(stores)}
                    >
                        Choose store
                    </h5>
                    <button
                        onClick={() => { setmodal_fullscreen(false) }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <div className="table-rep-plugin" >
                        <div
                            className="table-responsive mb-0"
                            data-pattern="priority-columns"
                        >
                            <Table
                                id="mydatatable1"
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
                                        <tr key={index}>
                                            <Td> {store.name} </Td>
                                            <Td> {store.address} </Td>
                                            <Td> {store.governorate} </Td>
                                            <Td>
                                                <Link
                                                    to="#"
                                                    onClick={() => {
                                                        setSelectedStore(store)
                                                        tog_fullscreen()
                                                    }}
                                                >
                                                    {store.id !== selectedStore?.id ? ("select...") : ("")}
                                                </Link>
                                            </Td>
                                        </tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Modal>
        </Col>
    )
}
export default StoresModal