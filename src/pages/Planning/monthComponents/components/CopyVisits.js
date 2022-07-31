import React, { useState } from 'react'
import Select from 'react-select'
import { Col, Label, Modal, Row } from 'reactstrap'
import "flatpickr/dist/themes/material_green.css";
import { upsertVisit } from 'store/visit/services';

const CopyVisits = (props) => {

    const { merchandisers, selectedMerchandiser, visits, curr } = props
    const [copyModal, setCopyModal] = useState(false)
    const [check, setCheck] = useState(true)
    const [merchandiserId, setMerchandiserId] = useState(selectedMerchandiser)
    const [selectedMonth, setSelectedMonth] = useState(null)

    function togCopyModal() {
        setCopyModal(!copyModal)
        setCheck(true)
    }

    const handleCheck = () => {
        if (check) {
            setCheck(false)
        } else {
            setMerchandiserId(selectedMerchandiser)
            setCheck(true)
        }
    }

    const monthsBtwnDates = (startDate, endDate) => {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        return (Math.ceil(
            (endDate.getFullYear() - startDate.getFullYear()) * 12 +
            endDate.getMonth() -
            startDate.getMonth()
        ))
    };

    const visitsCopy = () => {
        const diff = monthsBtwnDates(curr, selectedMonth);
        let newVisits = []
        visits.forEach(element => {
            const newDay = new Date(new Date(element.day).setMonth(new Date(element.day).getMonth() + diff))
            delete element.id
            newVisits.push({ ...element, day: newDay, userId: merchandiserId })
        });
        upsertVisit(newVisits).then(() => {
            togCopyModal()
        })
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-primary waves-effect"
                style={{ float: "right" }}
                onClick={() => { togCopyModal(); }}
            >
                <i className="bx bx-copy" />
            </button>
            <Modal
                isOpen={copyModal}
                toggle={() => { togCopyModal() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0">
                        Add merchandiser
                    </h5>
                    <button
                        type="button"
                        onClick={() => { togCopyModal() }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-check form-check-primary mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck-outlinecolor1"
                            checked={check}
                            onChange={handleCheck}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="customCheck-outlinecolor1"
                        >
                            Same merchandiser
                        </label>
                    </div>
                    {!check &&
                        <div className="mb-3">
                            <Label>Choose a merchandiser</Label>
                            <Select
                                placeholder="Merchandiser"
                                options={merchandisers}
                                classNamePrefix="select2-selection"
                                onChange={(e) => { setMerchandiserId(e.value) }}
                            />
                        </div>
                    }
                    <Row style={{ marginBottom: "1rem" }}>
                        <label
                            htmlFor="example-month-input"
                            className="col-md-2 col-form-label"
                        >
                            Month
                        </label>
                        <div className="col-md-10">
                            <input
                                className="form-control"
                                type="month"
                                id="example-month-input"
                                onChange={(e) => { setSelectedMonth(e.target.value) }}
                            />
                        </div>
                    </Row>
                    <button
                        type="button"
                        className="btn btn-primary waves-effect"
                        data-dismiss="modal"
                        style={{ float: "right", marginTop: "1rem" }}
                        onClick={() => { visitsCopy() }}
                        disabled={
                            !selectedMonth ||
                            new Date(selectedMonth) < new Date()
                        }
                    >
                        Save
                    </button>
                </div>

            </Modal>
        </>
    )
}
export default CopyVisits