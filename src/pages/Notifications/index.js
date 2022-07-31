import React, { useEffect, useState } from 'react'
import { MetaTags } from 'react-meta-tags'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import LoadingComponent from 'shared/LoadingComponent'
import { getNotificationConfigList, upsertNotificationConfig } from 'store/notification/services'
import CreateNotif from './components/CreateNotif'
import $ from 'jquery';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { getStoresAsync } from 'store/pos/actions'
import { getUsersByRole } from 'store/user/services'
import { getProductsAsync } from 'store/product/actions'

const Notifications = () => {

    const dispatch = useDispatch();
    const [notificationConfigs, setNotificationConfigs] = useState([])
    const [users, setUsers] = useState([])
    const [stores, setStores] = useState([])
    const [products, setProducts] = useState([])

    const getNotifications = async () => {
        await getNotificationConfigList()
            .then((data) => {
                data.forEach(element => {
                    element.names="";
                    element.namesUser="";
                    element.product="";
                    var names ="";
                    var namesUser ="";
                    var product ="";
                    element.notificationReferencings.forEach(element1 => {
                        const words = names.split(',')
                        let foundNameStore=false;
                        let i=0;
                        while(i<words.length && foundNameStore==false)
                        {
                            if(words[i]==element1.store.name)
                                foundNameStore=true
                            i++;
                        }
                        if(!foundNameStore)
                        {
                            if(names=="")
                                names+=element1.store.name
                            else
                                names+=','+element1.store.name
                        }
                        if(element1.user!=null)
                        {
                            if(namesUser.indexOf(element1.user.first_name+" "+element1.user.last_name)<0)
                        {
                            if(namesUser=="")
                                namesUser+=element1.user.first_name+" "+element1.user.last_name
                            else
                                namesUser+=' , '+element1.user.first_name+" "+element1.user.last_name
                        }
                        }

                        if(element1.product!=null)
                        {
                            if(product.indexOf(element1.product.label)<0)
                        {
                            if(product=="")
                            product+=element1.product.label
                            else
                                product+=' , '+element1.product.label
                        }
                        }
                    });
                    element.names=names;
                    element.namesUser=namesUser;
                    element.product=product;  

                    
                });
                console.log(data)
                setNotificationConfigs(data);
            })
    }

    const updateNotif = (notification) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Update notification?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui'
        }).then((result) => {
            if (result.isConfirmed) {
                upsertNotificationConfig(notification, [], [], [])
                    .then(async () => {
                        await getNotifications()
                    })
            }
        })
    }

    useEffect(async () => {
        setProducts(dispatch(await getProductsAsync()).payload.products)
        setStores(dispatch(await getStoresAsync()).payload.stores)
        getUsersByRole("merchandiser")
            .then((data) => { setUsers(data); })
        await getNotifications()
        $('#mydatatable').DataTable()
    }, [])

    return (
        <div className="page-content">
            <MetaTags>
                <title>Notifications</title>
            </MetaTags>
            <div className="container-fluid">
                <Breadcrumbs title="Notifications" breadcrumbItem="Liste des notifications" />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <CardTitle>Notifications</CardTitle>
                                    </Col>
                                    <Col>
                                        <CreateNotif
                                            users={users}
                                            stores={stores}
                                            products={products}
                                            getNotifications={getNotifications}
                                        />
                                    </Col>
                                </Row>
                                {notificationConfigs.length > 0 ? (
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
                                                        <Th>Type</Th>
                                                        
                                                        <Th>Pointage type</Th>
                                                        <Th>Pointage hour</Th>
                                                        <Th>store</Th>
                                                        <Th>product</Th>
                                                        <Th>Marchandiser</Th>
                                                        <Th>Email</Th>
                                                        <Th>SMS</Th>
                                                        <Th>enabled</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {notificationConfigs.map((notif, index) => (
                                                        <Tr key={index}>
                                                            <Td>{notif.type}</Td>
                                                            <Td>{notif.pointage_type}</Td>
                                                            <Td>{notif.pointage_time && notif.pointage_time.slice(0, 5)}</Td>
                                                            
                                                            <Td>{notif.names}</Td>

                                                            <Td>{notif.product}</Td>
                                                            
                                                            <Td>{notif.namesUser}</Td>
                                                            <Td>
                                                                <div className="form-check form-switch form-switch-md mb-3" >
                                                                    <input
                                                                        type="checkbox"
                                                                        style={{ cursor: "pointer" }}
                                                                        className="form-check-input"
                                                                        checked={notif.email}
                                                                        onChange={() => { updateNotif({ ...notif, email: !notif.email }) }}
                                                                    />
                                                                </div>
                                                            </Td>
                                                            <Td>
                                                                <div className="form-check form-switch form-switch-md mb-3" >
                                                                    <input
                                                                        type="checkbox"
                                                                        style={{ cursor: "pointer" }}
                                                                        className="form-check-input"
                                                                        checked={notif.sms}
                                                                        onChange={() => { updateNotif({ ...notif, sms: !notif.sms }) }}
                                                                    />
                                                                </div>
                                                            </Td>
                                                            <Td>
                                                                <div className="form-check form-switch form-switch-md mb-3" >
                                                                    <input
                                                                        type="checkbox"
                                                                        style={{ cursor: "pointer" }}
                                                                        className="form-check-input"
                                                                        checked={notif.enabled}
                                                                        onChange={() => { updateNotif({ ...notif, enabled: !notif.enabled }) }}
                                                                    />
                                                                </div>
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                ) : (
                                    <LoadingComponent />
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
export default Notifications