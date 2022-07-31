import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { getProductsAsync } from 'store/product/actions';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import StoreModal from './components/StoreModal';
import { getReferencedProductsByStore } from 'store/referencedProduct/services';

const SecondPart = (props) => {

    const { chosenProducts, setChosenProducts } = props
    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const [selectedStore, setSelectedStore] = useState(null)

    const getProducts = async () => {
        setProducts(dispatch(await getProductsAsync()).payload.products);
    }

    const updateChosenProducts = (product) => {
        setChosenProducts(chosenProducts => [...chosenProducts, product])
    }

    useEffect(async () => {
        await getProducts()
        $('#mydatatable').DataTable()
    }, [])

    useEffect(() => {
        if (selectedStore) {
            getReferencedProductsByStore(selectedStore).then((data) => {
                data.forEach(element => {
                    setChosenProducts(chosenProducts => [...chosenProducts, element.product])
                });
            })
        }
    }, [selectedStore])

    return (
        <>
            <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
                <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                >
                    <Table
                        id="mydatatable"
                        className="table table-bordered"
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
                            {products?.map((product, index) => {
                                return (
                                    <Tr key={index} style={{backgroundColor: chosenProducts.find(el => el.id === product.id)?("#BCF0A9"):('')}}>
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
                                            {!chosenProducts.find(obj => obj.id === product.id) &&
                                                <div style={{ marginTop: "1.5rem" }}>
                                                    <Link
                                                        to="#"
                                                        onClick={() => { updateChosenProducts(product) }}
                                                    >
                                                        select...
                                                    </Link>
                                                </div>
                                            }
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
                <StoreModal
                    selectedStore={selectedStore}
                    setSelectedStore={setSelectedStore}
                />
            </div>
            <Row style={{ marginTop: "4rem" }}>
                {chosenProducts.map((product, index) => (
                    <Col lg="2" key={index}>
                        <Link to="#" className="text-body d-flex align-items-center">
                            <span className="me-auto">{product.label}</span>
                            <i
                                className="mdi mdi-trash-can text-danger font-size-16 me-2"
                                onClick={() => { setChosenProducts(chosenProducts.filter((prduct, i) => i !== index)) }}
                            />
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default SecondPart
