import React, { useState } from 'react'
import { Button, FormGroup, Modal, Label, UncontrolledAlert } from 'reactstrap';
import { upsertNotificationConfig } from 'store/notification/services';
import NotifPointage from './NotifPointage';
import NotifStockOut from './NotifStockOut';
import SharedColumns from './SharedColumns';

function CreateNotif(props) {

    const { users, stores, products, getNotifications } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [userOptions, setUserOptions] = useState([])
    const [storeOptions, setStoreOptions] = useState([])
    const [productOptions, setProductOptions] = useState([])
    const [selectedproducts, setSelectedproducts] = useState(null)
    const [selectedStores, setSelectedStores] = useState(null)
    const [selectedUsers, setSelectedUsers] = useState(null)
    const [notification, setNotification] = useState({
        pointage_type: "Check-In",
    })

    function tog_standard() {
        setmodal_standard(!modal_standard)
        if (modal_standard) {
            setUserOptions([])
            setStoreOptions([])
            setProductOptions([])
            setSelectedproducts(null)
            setSelectedStores(null)
            setSelectedUsers(null)
            setNotification({ ...notification, type: null })
        } else {
            products.forEach(element => {
                productOptions.push({ value: element.id, label: element.label })
            });
            users.forEach(element => {
                userOptions.push({ value: element.id, label: element.first_name + " " + element.last_name })
            });
            stores.forEach(element => {
                storeOptions.push({ value: element.id, label: element.name + " | " + element.address + ", " + element.postal_code + " - " + element.governorate })
            });
        }
    }

    const createNotification = () => {
        if (!notification.type) {
            setErrorMessage("Please select notification type!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        } else if (notification.type === "Pointage" && !notification.pointage_time) {
            setErrorMessage("Please select time!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        } else {
            upsertNotificationConfig(
                notification,
                !selectedStores ? storeOptions : selectedStores,
                !selectedUsers ? userOptions : selectedUsers,
                !selectedproducts ? productOptions : selectedproducts
            )
                .then(() => {
                    tog_standard()
                    getNotifications()
                })
                .catch((error) => {
                    setErrorMessage(error?.response?.data?.message)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000);
                })
        }
    }

    return (
        <>
            <i
                className="bx bx-list-plus"
                style={{ fontSize: "25px", float: "right", cursor: "pointer", color: '#556EE6' }}
                onClick={() => { tog_standard(); }}
                data-toggle="modal"
            ></i>
            <Modal
                isOpen={modal_standard}
                size="lg"
                toggle={() => {
                    tog_standard()
                }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0">
                        Create notification
                    </h5>
                    <i className="bx bx-x"
                        onClick={() => setmodal_standard(false)}
                        data-dismiss="modal"
                        aria-label="Close"
                        style={{ cursor: "pointer", fontSize: "1.3rem" }}
                    />
                </div>
                <div className="modal-body">
                    <div style={{ width: "50%", margin: "auto" }}>
                        <Label>Type</Label>
                        <select
                            className="form-control"
                            onChange={(e) => { setNotification({ ...notification, type: e.target.value }); }}
                        >
                            <option>Select type</option>
                            <option value={"StockOut"}>StockOut</option>
                            <option value={"Pointage"}>Check-In / Check-Out</option>
                        </select>
                    </div>
                    {notification.type === "Pointage" &&
                        <NotifPointage
                            notification={notification}
                            setNotification={setNotification}
                            setSelectedStores={setSelectedStores}
                            setSelectedUsers={setSelectedUsers}
                            userOptions={userOptions}
                            storeOptions={storeOptions}
                        />
                    }
                    {notification.type === "StockOut" &&
                        <NotifStockOut
                            setNotification={setNotification}
                            notification={notification}
                            setSelectedStores={setSelectedStores}
                            storeOptions={storeOptions}
                            setSelectedproducts={setSelectedproducts}
                            productOptions={productOptions}
                        />
                    }
                    {notification.type &&
                        <SharedColumns
                            notification={notification}
                            setNotification={setNotification}
                        />
                    }
                    {errorMessage &&
                        <UncontrolledAlert
                            color="danger"
                            className="alert-dismissible fade show"
                            role="alert"
                            style={{ marginTop: !notification.type && "2rem" }}
                        >
                            <i className="mdi mdi-block-helper me-2"></i> {errorMessage}
                        </UncontrolledAlert>
                    }
                    <FormGroup className="mb-0" style={{ float: 'right', marginTop: "1rem" }}>
                        <Button
                            type="button"
                            color="primary"
                            className="ms-1"
                            onClick={() => { createNotification() }}
                        >
                            Create
                        </Button>
                    </FormGroup>
                </div>
            </Modal>
        </>
    )
}

export default CreateNotif