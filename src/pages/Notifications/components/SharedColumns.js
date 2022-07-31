import React from 'react'
import { Col, Label, Row } from 'reactstrap';

function SharedColumns(props) {

    const { setNotification, notification } = props

    return (
        <>
            
            <Row>
                <Col xl="6" lg="6">
                    <Label style={{ marginTop: "1rem" }}>Extra</Label>
                    <Row>
                        <Col>
                            <div className="form-check form-switch form-switch-md mb-3">
                                <input
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    className="form-check-input"
                                    checked={notification.email}
                                    onChange={() => { setNotification({ ...notification, email: !notification.email }) }}
                                />
                                <Label>Email</Label>
                            </div>
                        </Col>
                        <Col>
                            <div className="form-check form-switch form-switch-md mb-3">
                                <input
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    className="form-check-input"
                                    checked={notification.sms}
                                    onChange={() => { setNotification({ ...notification, sms: !notification.sms }) }}
                                />
                                <Label>SMS</Label>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </>
    )
}

export default SharedColumns