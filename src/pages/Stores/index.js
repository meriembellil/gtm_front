import React, { useState, useEffect } from "react"
import MetaTags from 'react-meta-tags';
import { useDispatch } from "react-redux";
import { getStoresAsync } from "store/pos/actions";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import UpdateModal from "./components/UpdateModal";
import $ from 'jquery';
import CreateModal from "./components/CreateModal";
import DetailModal from "./components/DetailModal";
import StoreHistory from "./components/history/History"
import Gallery from "shared/Gallery";
import { getStoreGroupsAsync } from "store/storeGroup/actions";

export default function PosList() {

    const dispatch = useDispatch();
    const [stores, setStores] = useState([])
    const [storeGroups, setStoreGroups] = useState([])



    const getStores = async () => {
        return dispatch(await getStoresAsync()).payload;
    }

    const getList = async () => {
        await getStores().then((res) => {
            setStores(res.stores);
        }).catch(() => {
            setStores([])
        })
    }

    const getStoreGroups = async () => {
        setStoreGroups(dispatch(await getStoreGroupsAsync()).payload.storeGroups)
    }

    useEffect(async () => {
        getStoreGroups()
        await getList()
        $('#mydatatable').DataTable()
    }, [])

    return (
        <div className="page-content">
            <MetaTags>
                <title>Store list</title>
            </MetaTags>
            <div className="container-fluid">
                <Breadcrumbs title="Stores" breadcrumbItem="Store List" />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle>Store List </CardTitle>
                                <CreateModal
                                    getList={getList}
                                    storeGroups={storeGroups}
                                />
                                {stores.length > 0 &&
                                    <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
                                        <div
                                            className="table-responsive mb-0"
                                            data-pattern="priority-columns"
                                        >
                                            <Table
                                                id="mydatatable"
                                                className="table table-striped table-bordered"
                                             
                                            >
                                                <Thead > 
                                                    <Tr  >
                                                        <Th>Name</Th>
                                                        <Th>Address</Th>
                                                        <Th>Governorate</Th>
                                                        <Th>Email</Th>
                                                        <Th>Phone number</Th>
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {stores?.map((store, index) => (
                                                        <Tr key={index}>
                                                            <Td> {store.name} </Td>
                                                            <Td> {store.address} </Td>
                                                            <Td> {store.governorate} </Td>
                                                            <Td> {store.email} </Td>
                                                            <Td> {store.phone_number} </Td>
                                                            <Td>
                                                                <Row>
                                                                    <Col xl="3" lg="3">
                                                                        <UpdateModal
                                                                            currentStore={store}
                                                                            getList={getList}
                                                                            storeGroups={storeGroups}
                                                                        />
                                                                    </Col>
                                                                    <Col xl="3" lg="3">
                                                                        <DetailModal
                                                                            store={store}
                                                                        />
                                                                    </Col>
                                                                    <Col xl="3" lg="3">
                                                                        {store?.storePictures?.length > 0 &&
                                                                            <Gallery
                                                                                pictures={store?.storePictures}
                                                                            />
                                                                        }
                                                                    </Col>
                                                                    <Col xl="3" lg="3">
                                                                        <StoreHistory
                                                                            storeId={store.id}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}