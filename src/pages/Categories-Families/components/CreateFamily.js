import React, { useState } from 'react'
import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import { Modal } from "reactstrap"
import { upsertFamily } from 'store/categories-families/services'

export default function CreateFamily(props) {

    const { getFamilies } = props
    const [family, setFamily] = useState({})
    const [modal_standard, setmodal_standard] = useState(false)

    const createFamily = (family) => {
        upsertFamily(family).then(()=>{
            getFamilies()
            tog_standard()
        })
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        document.body.classList.add("no_padding")
    }

    return (
        <div>
            <i
                className="bx bx-list-plus"
                style={{ fontSize: "25px", float: "right", cursor: "pointer", color: "#556EE6", marginTop: "-1.7rem" }}
                onClick={() => { tog_standard() }}
            ></i>
            <Modal
                isOpen={modal_standard}
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Create Family
                    </h5>
                    <button
                        type="button"
                        onClick={() => { setmodal_standard(false) }}
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
                        onValidSubmit={() => {
                            createFamily(family)
                         }}
                    >
                        <AvField
                            className="mb-3"
                            name="name"
                            label="Name"
                            placeholder="Name"
                            type="text"
                            errorMessage="Family name is required."
                            validate={{ required: { value: true } }}
                            value={family.name}
                            onChange={(e)=>{ setFamily({...family, name: e.target.value }) }}
                        />
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
        </div>
    )
}
