import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Col, Label, Modal, Row, UncontrolledAlert } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'
import { upsertBrand } from 'store/brand/services'

export default function Brand(props) {

    const { brand, getBrands } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [selectedFile, setselectedFile] = useState(null)
    const [selectedBrand, setSelectedBrand] = useState(brand)

    const updateBrand = (brand, selectedFile) => {
        upsertBrand(brand, selectedFile).then(() => {
            getBrands()
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
        setSelectedBrand({ ...selectedBrand, name: selectedBrand.name?.toUpperCase() })
    }, [selectedBrand.name])

    return (
        <>
            <Col xl="2" sm="6" style={{ cursor: "pointer" }} onClick={() => { tog_standard() }}>
                <Card className="text-center">
                    <CardBody style={{ height: "15rem" }}>
                        {brand.enabled ? (
                            <img
                                style={{ width: "100%", height: "100%" }}
                                src={brand?.path ? (brand.path) : ("https://pbs.twimg.com/profile_images/1063925348205821958/DlGcxdOl.jpg")}
                            />
                        ) : (
                            <img
                                style={{ width: "100%", height: "100%" }}
                                src={"https://www.dsbrowser.com/documentation/images/0/09/Blocage-256.png"}
                            />
                        )}
                    </CardBody>
                    <CardFooter className="bg-transparent border-top">
                        <h5> {brand?.name} </h5>
                    </CardFooter>
                </Card>
            </Col>
            <Modal
                isOpen={modal_standard}
                toggle={() => { tog_standard() }}
                size="lg"
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Update brand
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
                        onValidSubmit={() => { updateBrand(selectedBrand, selectedFile) }}
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
                                    value={selectedBrand.name}
                                    onChange={(e) => { setSelectedBrand({ ...selectedBrand, name: e.target.value }) }}
                                />
                            </Col>
                            <Col>
                                <Label>Active</Label>
                                <div className="form-check form-switch form-switch-md mb-3">
                                    <input
                                        type="checkbox"
                                        style={{ cursor: "pointer" }}
                                        className="form-check-input"
                                        id="customSwitchsizemd"
                                        checked={selectedBrand.enabled}
                                        onChange={() => { setSelectedBrand({ ...selectedBrand, enabled: !selectedBrand.enabled }) }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ImageUpload selectedFile={selectedFile} setselectedFile={setselectedFile} />
                            </Col>
                            {(selectedFile || selectedBrand.path) &&
                                <Col>
                                    <img
                                        style={{ width: 'auto', height: '14rem' }}
                                        alt={selectedFile ? (selectedFile.name) : (brand.name)}
                                        src={selectedFile ? (selectedFile.preview) : (brand.path)}
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