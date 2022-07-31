import React, { useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import $ from 'jquery';
import { useDispatch } from 'react-redux'
import { getStoresAsync } from 'store/pos/actions'
import StockHistory from './components/StockHistory'
import NewOrder from './components/NewOrder'
import UpdateStock from './components/UpdateStock'
import StockSettings from './components/StockSettings'

const Stockout = () => {

    const dispatch = useDispatch();
    const [stores, setStores] = useState([])

    const getStores = async () => {
        setStores(dispatch(await getStoresAsync()).payload.stores)
    }

    useEffect(async () => {
        await getStores()
        $('#mydatatable').DataTable()
    }, [])

    return (
        <div className="page-content">
            <MetaTags>
                <title>StockOut</title>
            </MetaTags>
            <div className="container-fluid">
                <Breadcrumbs title="Stock management" breadcrumbItem="StockOut" />
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                <CardTitle>StockOut </CardTitle>
                            </Col>
                            <Col>
                                <StockSettings/>
                            </Col>
                        </Row>
                        <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
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
                                            <Tr key={index}>
                                                <Td> {store.name} </Td>
                                                <Td> {store.address} </Td>
                                                <Td> {store.governorate} </Td>
                                                <Td>
                                                    <StockHistory
                                                        store={store}
                                                    />{/* 
                                                    <UpdateStock
                                                        store={store}
                                                    />
                                                    <NewOrder
                                                        store={store}
                                                    /> */}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Stockout
