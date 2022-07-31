import React, { useEffect, useState } from 'react'
import Breadcrumbs from "components/Common/Breadcrumb"
import { MetaTags } from 'react-meta-tags'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import CreateDisplay from './createComponents'
import { useDispatch } from 'react-redux'
import { getDisplayListAsync } from 'store/display/actions'
import DisplayDetail from './detailComponents'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import $ from 'jquery';
import Swal from 'sweetalert2'
import { deleteDisplayById } from 'store/display/services'
import UpdateDetail from './updateComponents'

const Display = () => {

    const dispatch = useDispatch()
    const [displayList, setDisplayList] = useState([])

    const getDisplayList = async () => {
        return dispatch(await getDisplayListAsync()).payload.displayList
    }

    const getAsyncDisplayList = async () => {
        await getDisplayList().then((data) => {
            setDisplayList(data)
        })
    }

    const deleteDisplay = (id, index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete display!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDisplayById(id)
                    .then(async () => {
                        setDisplayList(displayList.filter((display, i) => i !== index))
                        Swal.fire(
                            'Deleted!',
                            'Display deleted!',
                            'success'
                        )
                    })
            }
        })
    }

    useEffect(async () => {
        await getAsyncDisplayList()
        setTimeout(() => {
            $('#mydatatable').DataTable()
        }, 300);
    }, [])

    return (
        <div className="page-content">
            <MetaTags>
                <title>Display list</title>
            </MetaTags>
            <div className="container-fluid">
                <Breadcrumbs title="Display" breadcrumbItem="Display List" />
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                <CardTitle>Display List</CardTitle>
                            </Col>
                            <Col>
                                {/* <CreateDisplay
                                    getAsyncDisplayList={getAsyncDisplayList}
                                /> */}
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
                                            <Th>Store</Th>
                                            <Th>Merchandiser</Th>
                                            <Th>Type</Th>
                                            <Th>Date</Th>
                                            <Th>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {displayList.map((display, index) => (
                                            <Tr key={index}>
                                                <Td>{display.store.name}</Td>
                                                <Td>{display.user.first_name + ' ' + display.user.last_name}</Td>
                                                <Td>{display.displayType.name}</Td>
                                                <Td>{new Date(display.createdAt).toUTCString().slice(0, 22)}</Td>
                                                <Td>
                                                    <DisplayDetail
                                                        display={display}
                                                    />
                                                    {new Date(display.createdAt).toUTCString().slice(0, 16) === new Date().toUTCString().slice(0, 16) &&
                                                        <>
                                                            <UpdateDetail
                                                                display={display}
                                                                getAsyncDisplayList={getAsyncDisplayList}
                                                            />
                                                            <i
                                                                className="bx bx-trash"
                                                                style={{ cursor: 'pointer', color: 'red', fontSize: '1.2rem' }}
                                                                onClick={() => { deleteDisplay(display.id, index) }}
                                                            />
                                                        </>
                                                    }
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
export default Display