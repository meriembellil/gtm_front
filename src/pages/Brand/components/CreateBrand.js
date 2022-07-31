import React, { useEffect, useState } from 'react'
import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import { Card, CardBody, CardFooter, Col, Modal, Row } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'
import { upsertBrand } from 'store/brand/services'

export default function CreateBrand(props) {

    const { getBrands } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [brand, setBrand] = useState({})
    const [selectedFile, setselectedFile] = useState(null)

    const createBrand = (brand, selectedFile) => {
        upsertBrand(brand, selectedFile).then(() => {
            getBrands()
            tog_standard()
            setBrand({})
            setselectedFile(null)
        })
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        document.body.classList.add("no_padding")
    }

    useEffect(() => {
        setBrand({...brand, name: brand.name?.toUpperCase()})
    }, [brand.name])

    return (
        <>
            {/* col button */}
            <Col xl="2" sm="6" style={{ cursor: "pointer" }} onClick={() => { tog_standard() }}>
                <Card style={{ color: "#556EE6", fontSize: "8rem" }} className="text-center">
                    <CardBody>
                        <i className="bx bx-plus" style={{ fontSize: "6rem" }} />
                    </CardBody>
                    <CardFooter className="bg-transparent border-top">
                        <h5>new brand</h5>
                    </CardFooter>
                </Card>
            </Col>
            {/* modal */}
            <Modal
                isOpen={modal_standard}
                toggle={() => {
                    tog_standard()
                }}
                size="lg"
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Create brand
                    </h5>
                    <button
                        type="button"
                        onClick={() => {
                            setmodal_standard(false)
                        }}
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
                        onValidSubmit={() => { createBrand(brand, selectedFile) }}
                    >
                        <AvField
                            className="mb-3"
                            name="name"
                            label="Name"
                            placeholder="Name"
                            type="text"
                            errorMessage="Brand name is required."
                            validate={{ required: { value: true } }}
                            value={brand.name}
                            onChange={(e) => { setBrand({ ...brand, name: e.target.value }) }}
                        />
                        <Row>
                            <Col>
                                <ImageUpload selectedFile={selectedFile} setselectedFile={setselectedFile} />
                            </Col>
                            {selectedFile &&
                                <Col>
                                    <img
                                        style={{ width: 'auto', height: '14rem', }}
                                        alt={selectedFile.name}
                                        src={selectedFile.preview}
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
