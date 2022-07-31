import React from 'react'
import { Col, InputGroup, Label, Row } from 'reactstrap'
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import Select from "react-select";

function NotifPointage(props) {

  const { setNotification, notification, storeOptions, userOptions, setSelectedStores, setSelectedUsers } = props

  return (
    <>
      <Row>
        <Col>
          <Label style={{ marginTop: "1rem" }}>Type</Label>
          <select
            className="form-control"
            onChange={(e) => { setNotification({ ...notification, pointage_type: e.target.value }) }}
          >
            <option value={"Check-In"}>{"Check-In"}</option>
            <option value={"Check-Out"}>{"Check-Out"}</option>
          </select>
        </Col>
        <Col>
          <Label style={{ marginTop: "1rem" }}>Time</Label>
          <InputGroup>
            <Flatpickr
              className="form-control d-block"
              placeholder="Select time"
              options={{
                enableTime: true,
                noCalendar: true,
                time_24hr: true
              }}
              onChange={(e) => { setNotification({ ...notification, pointage_time: new Date(e[0]).getHours() + ":" + new Date(e[0]).getMinutes() + ":" + new Date(e[0]).getSeconds() }) }}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i className="mdi mdi-clock-outline" />
              </span>
            </div>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label style={{ marginTop: "1rem" }}>Concerned merchandisers</Label>
          <Select
            placeholder="Merchandisers..."
            options={userOptions}
            isMulti={true}
            classNamePrefix="select2-selection"
            onChange={(e) => { setSelectedUsers(e) }}
          />
        </Col>
        <Col>
          <Label style={{ marginTop: "1rem" }}>Concerned stores</Label>
          <Select
            placeholder="Magasins..."
            options={storeOptions}
            isMulti={true}
            classNamePrefix="select2-selection"
            onChange={(e) => { setSelectedStores(e) }}
          />
        </Col>
      </Row>
    </>
  )
}

export default NotifPointage