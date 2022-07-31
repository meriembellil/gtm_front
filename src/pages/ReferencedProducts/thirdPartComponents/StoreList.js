import React, { useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const StoreList = (props) => {

    const { chosenStores, setChosenStores } = props

    useEffect(() => {
        $('#storesdatatable').DataTable()
    }, [])

    return (
        <div className="table-rep-plugin" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <div
                className="table-responsive mb-0"
                data-pattern="priority-columns"
            >
                <Table
                    id="storesmydatatable"
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
                        {chosenStores?.map((store, index) => (
                            <Tr key={index}>
                                <Td> {store.name} </Td>
                                <Td> {store.address} </Td>
                                <Td> {store.governorate} </Td>
                                <Td>
                                    <i
                                        className="mdi mdi-trash-can text-danger font-size-20 me-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => { setChosenStores(chosenStores.filter((store, i) => i !== index)) }}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        </div>
    )
}
export default StoreList