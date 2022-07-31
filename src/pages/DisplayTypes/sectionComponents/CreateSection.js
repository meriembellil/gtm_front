import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import React, { useState } from 'react'
import { Button, Col, Modal } from 'reactstrap'
import { upsertDisplaySection } from 'store/display/services'
import CreateCustomFieldsModal from './CreateCustomFieldsModal'

const CreateSection = (props) => {

    const { selectedType, getSectionsAsync } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [name, setName] = useState("")
    const [fields, setFields] = useState([])

    function tog_standard() {
        setmodal_standard(!modal_standard)
        setName("")
    }

    const upsertSection = () => {
        upsertDisplaySection({ name: name, displayTypeId: selectedType }, fields).then(() => {
            getSectionsAsync()
            tog_standard()
        })
    }

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
                    <h5 className="modal-title mt-0" onClick={() => { console.log(fields); }}>
                        Create new section
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
                    <AvForm onValidSubmit={() => { upsertSection() }}>
                        <AvField
                            className="mb-3"
                            name="Section"
                            label="Section"
                            placeholder="Name"
                            type="text"
                            errorMessage="Section name is required."
                            validate={{ required: { value: true } }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {fields.map((field, index) => (
                            <AvField
                                key={index}
                                className="mb-3"
                                name="Display Type"
                                label={field.name}
                                placeholder={field.type}
                                type={field.type === "String" && "text" || field.type === "Date" && "date" || field.type === "Integer" && "number" || field.type === "Double" && "number"}
                                readOnly
                            />
                        ))}
                        <div className="d-flex flex-wrap gap-2" style={{ float: "right" }}>
                            <CreateCustomFieldsModal
                                setFields={setFields}
                            />
                            <Button
                                type="submit"
                                color="primary"
                                className="ms-1"
                                style={{ float: 'right' }}
                            >
                                Create type
                            </Button>
                        </div>
                    </AvForm>
                </div>
            </Modal>
        </Col>
    )
}
export default CreateSection