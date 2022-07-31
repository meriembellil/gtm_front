import AvField from 'availity-reactstrap-validation/lib/AvField'
import AvForm from 'availity-reactstrap-validation/lib/AvForm'
import React, { useEffect, useState } from 'react'
import { Modal } from "reactstrap"
import { upsertCategory } from 'store/categories-families/services'
export default function CreateCategory(props) {

    const { getCategories, selectedFamily } = props
    const [category, setCategory] = useState({})
    const [modal_standard, setmodal_standard] = useState(false)

    const createCategory = (category) => {
        upsertCategory(category).then(()=>{
            getCategories()
            tog_standard()
        })
    }

    function tog_standard() {
        setmodal_standard(!modal_standard)
        document.body.classList.add("no_padding")
    }

    useEffect(() => {
        setCategory({
            ...category,
            familyId: selectedFamily
        })
    }, [selectedFamily])

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
                        Create category
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
                        onValidSubmit={() => { createCategory(category) }}
                    >
                        <AvField
                            className="mb-3"
                            name="name"
                            label="Name"
                            placeholder="Name"
                            type="text"
                            errorMessage="Category name is required."
                            validate={{ required: { value: true } }}
                            value={category.name}
                            onChange={(e)=>{ setCategory({...category, name: e.target.value}) }}
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
