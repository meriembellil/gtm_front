import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Col, Label, Modal, Row, UncontrolledAlert } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'
import { upsertStoreGroup } from 'store/storeGroup/services'

export default function Group(props) {

    const { group, getStoreGroups } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [selectedFile, setselectedFile] = useState(null)
    const [storeGroup, setStoreGroup] = useState(group)

    const updateStoreGroup = (storeGroup, selectedFile) => {
        upsertStoreGroup(storeGroup, selectedFile).then(() => {
            getStoreGroups()
            setselectedFile(null)
            tog_standard()
        })
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        setselectedFile(null)
        document.body.classList.add("no_padding")
    }

    useEffect(() => {
        setStoreGroup({ ...storeGroup, name: storeGroup.name?.toUpperCase() })
    }, [storeGroup.name])

    return (
        <>
            <Col xl="2" sm="6" style={{ cursor: "pointer" }} onClick={() => { tog_standard() }}>
                <Card className="text-center">
                    <CardBody style={{ height: "15rem" }}>
                        {group.enabled ? (
                            <img
                                style={{ width: "100%", height: "100%" }}
                                src={group?.path ? (group.path) : ("https://pbs.twimg.com/profile_images/1063925348205821958/DlGcxdOl.jpg")}
                            />
                        ) : (
                            <img
                                style={{ width: "100%", height: "100%" }}
                                src={"https://www.dsbrowser.com/documentation/images/0/09/Blocage-256.png"}
                            />
                        )}
                    </CardBody>
                    <CardFooter className="bg-transparent border-top">
                        <h5> {group.name} </h5>
                    </CardFooter>
                </Card>
            </Col>
            {/* modal */}
            <Modal
                isOpen={modal_standard}
                toggle={() => { tog_standard() }}
                size="lg"
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Create group
                    </h5>
                    <button
                        type="button"
                        onClick={() => { tog_standard() }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <AvForm
                        className="form-horizontal"
                        onValidSubmit={() => { updateStoreGroup(storeGroup, selectedFile) }}
                    >
                        <Row>
                            <Col>
                                <AvField
                                    className="mb-3"
                                    name="name"
                                    label="Name"
                                    placeholder="Name"
                                    type="text"
                                    errorMessage="Brand name is required."
                                    validate={{ required: { value: true } }}
                                    value={group.name}
                                    onChange={(e) => { setStoreGroup({ ...storeGroup, name: e.target.value }) }}
                                />
                            </Col>
                            <Col>
                                <Col>
                                    <Label>Active</Label>
                                    <div className="form-check form-switch form-switch-md mb-3">
                                        <input
                                            type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            className="form-check-input"
                                            id="customSwitchsizemd"
                                            checked={storeGroup.enabled}
                                            onChange={() => { setStoreGroup({ ...storeGroup, enabled: !storeGroup.enabled }) }}
                                        />
                                    </div>
                                </Col>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <ImageUpload selectedFile={selectedFile} setselectedFile={setselectedFile} />
                            </Col>
                            {(selectedFile || group.path) &&
                                <Col>
                                    <img
                                        style={{ width: 'auto', height: '14rem' }}
                                        alt={selectedFile ? (selectedFile.name) : (group.name)}
                                        src={selectedFile ? (selectedFile.preview) : (group.path)}
                                    />
                                </Col>
                            }
                        </Row>
                        <button
                            type="submit"
                            className="btn btn-primary waves-effect"
                            data-dismiss="modal"
                            style={{ float: "right", marginTop: "1rem" }}
                        >
                            Save
                        </button>
                    </AvForm>
                </div>
            </Modal>
        </>
    )
}
