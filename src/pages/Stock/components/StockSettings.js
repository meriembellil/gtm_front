import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, FormGroup, Modal, Row, UncontrolledTooltip } from 'reactstrap'
import Slider from 'react-rangeslider'
import "react-rangeslider/lib/index.css"
import { findStockSetting, upsertStockSetting } from 'store/stock/services'

const StockSettings = () => {

    const [modal_standard, setmodal_standard] = useState(false)
    const [setting, setSetting] = useState({ stockManagement: "StockOut", days: 3 })

    function tog_standard() {
        setmodal_standard(!modal_standard)
    }

    useEffect(() => {
        findStockSetting().then((data) => {
            setSetting(data[0]);
        })
    }, [])

    return (
        <>
            <Link
                to="#"
                onClick={() => { tog_standard() }}
                style={{ fontSize: "1.3rem", marginRight: "1rem", float: "right" }}
            >
                <i className="bx bx-slider-alt" id="stocksettings" />
                <UncontrolledTooltip placement="top" target="stocksettings">
                    Stock settings
                </UncontrolledTooltip>
            </Link>
            <Modal
                isOpen={modal_standard}
                size="md"
                toggle={() => { tog_standard() }}
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                        Stock settings
                    </h5>
                    <button
                        type="button"
                        onClick={() => { setmodal_standard(false) }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <Row>
                        <Col><strong>StockManagement</strong></Col>
                        <Col>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios"
                                    value="StockOut"
                                    onClick={(e) => { setSetting({ ...setting, stockManagement: e.target.value }); }}
                                    defaultChecked={setting.stockManagement === "StockOut"}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                >
                                    StockOut
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exampleRadios"
                                    value="Quantity"
                                    onClick={(e) => { setSetting({ ...setting, stockManagement: e.target.value }); }}
                                    defaultChecked={setting.stockManagement === "Quantity"}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleRadios1"
                                >
                                    Quantity
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="p-3">
                            <strong>History days ({setting.days})</strong>
                            <Slider
                                value={setting.days}
                                step={1}
                                min={3}
                                max={10}
                                orientation="horizontal"
                                onChange={value => { setSetting({ ...setting, days: value }); }}
                            />
                            <Row>
                                <Col><strong>3</strong></Col>
                                <Col><strong style={{ float: "right" }}>10</strong></Col>
                            </Row>
                        </div>
                    </Row>

                    <FormGroup className="mb-0" style={{ float: 'right', marginTop: "2rem" }}>
                        <Button
                            type="button"
                            color="primary"
                            className="ms-1"
                            onClick={() => { upsertStockSetting(setting).then(() => { tog_standard() }) }}
                        >
                            Confirm
                        </Button>
                    </FormGroup>
                </div>
            </Modal>
        </>
    )
}

export default StockSettings
