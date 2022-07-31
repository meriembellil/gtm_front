import React, { useState } from 'react'
import Select from 'react-select'
import { Col, Label, Modal, Row } from 'reactstrap'
import "flatpickr/dist/themes/material_green.css";
import { upsertVisit } from 'store/visit/services';

const CopyVisits = (props) => {

    const { merchandisers, selectedMerchandiser, visits, monday } = props
    const [copyModal, setCopyModal] = useState(false)
    const [check, setCheck] = useState(true)
    const [merchandiserId, setMerchandiserId] = useState(selectedMerchandiser)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndtDate] = useState(null)

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

    const updateVisits = () => {
        var date1 = new Date(monday);
        var date2 = new Date(startDate);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let newVisits = []
        visits.forEach((data) => {
            delete data.visit.id
            newVisits.push({ ...data.visit, day: new Date(new Date(data.visit.day).setDate(new Date(data.visit.day).getDate() + Difference_In_Days + 1)) })
        })
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
                        <Col>
                            <label
                                htmlFor="example-date-input"
                                className="col-md-2 col-form-label"
                            >
                                From
                            </label>
                            <input
                                className="form-control"
                                type="date"
                                id="example-date-input"
                                onChange={(e) => { setStartDate(e.target.value); }}
                            />
                        </Col>
                        <Col>
                            <label
                                htmlFor="example-date-input"
                                className="col-md-2 col-form-label"
                            >
                                To
                            </label>
                            <input
                                className="form-control"
                                type="date"
                                id="example-date-input"
                                onChange={(e) => { setEndtDate(e.target.value); }}
                            />
                        </Col>
                    </Row>
                    <button
                        type="button"
                        className="btn btn-primary waves-effect"
                        data-dismiss="modal"
                        style={{ float: "right", marginTop: "1rem" }}
                        onClick={() => { updateVisits() }}
                        disabled={
                            new Date(startDate) < new Date() ||
                            new Date(startDate).getDay() !== 1 ||
                            new Date(startDate).getTime() > new Date(endDate).getTime()
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