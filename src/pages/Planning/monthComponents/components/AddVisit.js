import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { Col, Modal, Row, Table } from "reactstrap"
import { getStoresAsync } from 'store/pos/actions'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Link } from 'react-router-dom'
import { upsertVisit } from 'store/visit/services'
import DayVisit from 'pages/PlanningControl/components/DayVisit'

const AddVisit = (props) => {

    const { createModal, setCreateModal, tog_create, selectedMerchandiser, selectedDay, getVisits, nbVisits } = props
    const dispatch = useDispatch()
    const [stores, setStores] = useState([])
    const [selectedStores, setSelectedStores] = useState([])

    const updateSelectedStores = (store) => {
        setSelectedStores(selectedStores => [...selectedStores, store])
    }

    const upsertVisitAsync = async () => {
        let events = []
        selectedStores.map((store, index) => {
            events.push({
                day: new Date(selectedDay).setHours(new Date(selectedDay).getHours() + 1),
                order: nbVisits + index,
                storeId: store.id,
                userId: selectedMerchandiser
            })
        })
        upsertVisit(events).then(() => {
            getVisits()
            tog_create()
            setSelectedStores([])
        })
    }

    useEffect(async () => {
        setStores(dispatch(await getStoresAsync()).payload.stores);
    }, [])

    useEffect(() => {
        if (createModal) {
            setTimeout(() => {
                $('#mydatatable').DataTable(
                    {
                        "lengthChange": false,
                        "pageLength": 10
                    }
                )
            });
        }
    }, [createModal])

    return (
        <Modal
            isOpen={createModal}
            toggle={() => {
                tog_create()
            }}
            size="lg"
        >
            <div className="modal-header" onClick={() => { console.log(new Date(selectedDay)) }}>
                <h5 className="modal-title mt-0" id="myModalLabel">
                    Add visit
                </h5>
                <button
                    type="button"
                    onClick={() => {
                        setCreateModal(false)
                    }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <Row>
                    {selectedStores.map((store, index) => (
                        <Col lg="3" key={index}>
                            <Link to="#" className="text-body d-flex align-items-center">
                                <span className="me-auto">{store.name}</span>
                                <i className="mdi mdi-trash-can text-danger font-size-16 me-2" onClick={() => { selectedStores.splice(index, 1) }} />
                            </Link>
                        </Col>
                    ))}
                </Row>
                <div className="table-rep-plugin" >
                    <div
                        className="table-responsive mb-0"
                        data-pattern="priority-columns"
                    >
                        <Table
                            id="mydatatable"
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
                                            {!selectedStores.find(obj => obj.id === store.id) &&
                                                <Link
                                                    to="#"
                                                    onClick={() => { updateSelectedStores(store) }}
                                                >
                                                    select...
                                                </Link>
                                            }
                                        </Td>
                                    </tr>
                                ))}
                            </Tbody>
                        </Table>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary waves-effect"
                    data-dismiss="modal"
                    style={{ float: "right", marginTop: "1rem" }}
                    onClick={() => { upsertVisitAsync() }}
                >
                    Save
                </button>
            </div>
        </Modal>
    )
}
export default AddVisit