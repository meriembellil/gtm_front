import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import StoreDetail from './StoreDetail';

const StoresTable = (props) => {

    const { stores, i, chosenStores, setChosenStores, setCol } = props
    const [tableSelected, setTableSelected] = useState(false)
    const [selectedStores, setSelectedStores] = useState([])

    useEffect(() => {
        $('#mydatatable' + i).DataTable()
    }, [stores])

    const handleCheck = () => {
        if (!tableSelected) {
            setSelectedStores(stores)
            stores.forEach((store) => {
                if (chosenStores.findIndex((element) => element.id === store.id) < 0) {
                    setChosenStores(chosenStores => [...chosenStores, store])
                }
            })
        } else {
            stores.forEach((store) => {
                setChosenStores(chosenStores.slice(chosenStores.findIndex((element) => element.id === store.id), 1))
            })
            setSelectedStores([])
        }
    }

    const checkStore = (store) => {
        if (selectedStores.find(el => el.id === store.id)) {
            setSelectedStores(selectedStores.filter(el => el.id !== store.id))
            setChosenStores(chosenStores.filter(el => el.id !== store.id))
        } else {
            setSelectedStores(selectedStores => [...selectedStores, store])
            setChosenStores(chosenStores => [...chosenStores, store])
        }
    }

    useEffect(() => {
        if (selectedStores.length === stores.length) {
            setTableSelected(true)
        } else {
            setTableSelected(false)
        }
    }, [selectedStores.length])

    useEffect(() => {
        if (chosenStores.length === 0) {
            setSelectedStores([])
            setCol(0)
        }
    }, [chosenStores])

    return (
        <div className="accordion-body">
            <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
                <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                >
                    <Table
                        id={"mydatatable" + i}
                        className="table table-striped table-bordered"
                    >
                        <Thead>
                            <Tr>
                                <Th className="text-center">
                                    <input type="checkbox"
                                        checked={tableSelected}
                                        onChange={() => { handleCheck() }}
                                    />
                                </Th>
                                <Th>Name</Th>
                                <Th>Address</Th>
                                <Th>Governorate</Th>
                                <Th>Actons</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {stores?.map((store, index) => (
                                <Tr key={index}>
                                    <Td className="text-center">
                                        <input type="checkbox"
                                            checked={selectedStores.find(element => element.id === store.id)}
                                            onChange={() => { checkStore(store) }}
                                        />
                                    </Td>
                                    <Td> {store.name} </Td>
                                    <Td> {store.address} </Td>
                                    <Td> {store.governorate} </Td>
                                    <Td>
                                        <StoreDetail
                                            storeId={store.id}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default StoresTable
