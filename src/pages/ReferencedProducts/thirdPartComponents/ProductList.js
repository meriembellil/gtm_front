import React, { useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const ProductList = (props) => {

    const { chosenProducts, setChosenProducts } = props

    useEffect(() => {
        $('#productsdatatable').DataTable()
    }, [])

    return (
        <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
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
                            <Th>Image</Th>
                            <Th>Label</Th>
                            <Th>Brand</Th>
                            <Th>Category</Th>
                            <Th>Typology</Th>
                            <Th>Actons</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {chosenProducts?.map((product, index) => (
                            <Tr key={index}>
                                <Td>
                                    <img
                                        src={product.path}
                                        style={{ width: "4rem", height: "4rem" }}
                                    />
                                </Td>
                                <Td>
                                    <p style={{ marginTop: "1.5rem" }}> {product.label} </p>
                                </Td>
                                <Td>
                                    <p style={{ marginTop: "1.5rem" }}> {product.brand?.name} </p>
                                </Td>
                                <Td>
                                    <p style={{ marginTop: "1.5rem" }}> {product.category?.name} </p>
                                </Td>
                                <Td>
                                    <p style={{ marginTop: "1.5rem" }}> {product.typology} </p>
                                </Td>
                                <Td>
                                    <div style={{ marginTop: "1.3rem" }}>
                                        <i
                                            className="mdi mdi-trash-can text-danger font-size-20 me-2"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { setChosenProducts(chosenProducts.filter((prduct, i) => i !== index)) }}
                                        />
                                    </div>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        </div>
    )
}
export default ProductList