import React, { useState } from 'react'
import Select from 'react-select'
import { Button, Label, Modal } from 'reactstrap'

const CreateCustomFieldsModal = (props) => {

    const { setFields } = props
    const [modal_standard, setmodal_standard] = useState(false)
    const [field, setField] = useState({ name: '', type: '' })
    const options = [
        { value: "String", label: "String" },
        { value: "Integer", label: "Integer" },
        { value: "Double", label: "Double" },
        { value: "Date", label: "Date" },
    ]
    function tog_standard() {
        setmodal_standard(!modal_standard)
        setField({name: '', type: ''})
    }

    return (
        <>
            <Button
                type="button"
                color="primary"
                className="ms-1"
                style={{ float: 'right' }}
                onClick={() => tog_standard()}
            >
                Add field
            </Button>
            <Modal
                isOpen={modal_standard}
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0">
                        Create Custom Field
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
                    <label htmlFor="example-text-input" className="col-md-2 col-form-label">
                        Field name
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Field name"
                        value={field.name}
                        onChange={(e) => { setField({ ...field, name: e.target.value }) }}
                    />
                    <div className="mb-3">
                        <Label>Type</Label>
                        <Select
                            placeholder="Type"
                            options={options}
                            classNamePrefix="select2-selection"
                            onChange={(e) => { setField({ ...field, type: e.value }) }}
                        />
                    </div>
                    <div className="d-flex flex-wrap gap-2" style={{ float: "right" }}>
                        <Button
                            type="submit"
                            color="primary"
                            className="ms-1"
                            style={{ float: 'right' }}
                            disabled={
                                field.name === '' || field.type === ''
                            }
                            onClick={() => {
                                setFields(fields => [...fields, field]);
                                tog_standard()
                            }}
                        >
                            Create field
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CreateCustomFieldsModal
