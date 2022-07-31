import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'reactstrap'
import { upsertDisplayType } from 'store/display/services'

const CreateType = (props) => {

    const { getTypesAsync } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [type, setType] = useState({})

    function tog_standard() {
        setmodal_standard(!modal_standard)
    }

    const upsertType = () => {
        upsertDisplayType(type).then(async () => {
            await getTypesAsync()
            tog_standard()
            setType({})
        })
    }

    useEffect(() => {
        setType({
            ...type,
            name: '',
            abbreviation: '',
            withBrand: false,
            withCategory: false
        })
    }, [])

    return (
        <Col>
            <i
                className="bx bx-list-plus"
                style={{ fontSize: "25px", float: "right", cursor: "pointer", color: '#556EE6' }}
                onClick={() => tog_standard()}
            />
            <Modal
                isOpen={modal_standard}
                toggle={() => {
                    tog_standard()
                }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" onClick={() => { console.log(type); }}>
                        Create new type
                    </h5>
                    <button
                        type="button"
                        onClick={() => setmodal_standard(false)}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                    </button>
                </div>
                <div className="modal-body">
                    <AvForm onValidSubmit={() => { upsertType() }}>
                        <AvField
                            className="mb-3"
                            name="name"
                            label="Name"
                            placeholder="Name"
                            type="text"
                            errorMessage="Display Type name is required."
                            validate={{ required: { value: true } }}
                            value={type.name}
                            onChange={(e) => setType({ ...type, name: e.target.value })}
                        />
                        <AvField
                            className="mb-3"
                            name="abbreviation"
                            label="Abbreviation"
                            placeholder="Abbreviation"
                            type="text"
                            errorMessage="Display Type abbreviation is required."
                            validate={{ required: { value: true } }}
                            value={type.abbreviation}
                            onChange={(e) => setType({ ...type, abbreviation: e.target.value })}
                        />
                        <Row>
                            <Col md="3">
                                <div className="form-check mb-3">
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        With brand
                                    </label>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={type.withBrand}
                                        checked={type.withBrand}
                                        onChange={(e) => setType({ ...type, withBrand: !type.withBrand })}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className="form-check mb-3">
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        With category
                                    </label>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={type.withCategory}
                                        checked={type.withCategory}
                                        onChange={(e) => setType({ ...type, withCategory: !type.withCategory })}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Button
                            type="submit"
                            color="primary"
                            className="ms-1"
                            style={{ float: 'right' }}
                        >
                            Create type
                        </Button>
                    </AvForm>
                </div>
            </Modal>
        </Col>
    )
}
export default CreateType