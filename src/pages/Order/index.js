import React, { useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags';
import { Row, Card, CardBody, CardTitle } from "reactstrap"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { getOrdersAsync } from 'store/order/actions';
import OrderDetail from './components/OrderDetail';

const OrderList = () => {

    const dispatch = useDispatch();
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        setOrders(dispatch(await getOrdersAsync()).payload.orders);
    }

    const getList = async () => {
        await getOrders().then(() => {
            $('#mydatatable').DataTable()
        })
    }

    useEffect(async () => {
        await getList()
    }, [])

    return (
        <div className="page-content">
            <MetaTags>
                <title>Order list</title>
            </MetaTags>
            <div className="container-fluid">
                <Breadcrumbs title="Orders" breadcrumbItem="Order List" />
                <Card>
                    <CardBody>
                        <Row>
                            <CardTitle>Order List </CardTitle>
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
                                            <Th>Code</Th>
                                            <Th>Store</Th>
                                            <Th>Total amount</Th>
                                            <Th>Delivery date</Th>
                                            <Th>user</Th>
                                            <Th>Actons</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {orders?.map((order, index) => {
                                            return (
                                                <Tr key={index}>
                                                    <Td>
                                                        {order.code}
                                                    </Td>
                                                    <Td>
                                                        {order.store.name}
                                                    </Td>
                                                    <Td>
                                                        {order.amount}
                                                    </Td>
                                                    <Td>
                                                        {new Date(order.date).toUTCString().slice(0, 16)}
                                                    </Td>
                                                    <Td>
                                                        {order.user.first_name + " " + order.user.last_name}
                                                    </Td>
                                                    <Td>
                                                        <OrderDetail
                                                            order={order}
                                                        />
                                                    </Td>
                                                </Tr>
                                            )
                                        })}
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
export default OrderList