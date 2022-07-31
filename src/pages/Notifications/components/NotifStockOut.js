import React from 'react'
import { Col, Label, Row } from 'reactstrap'
import Select from "react-select";

function NotifStockOut(props) {

    const { storeOptions, setSelectedStores, productOptions, setSelectedproducts } = props

    return (
        <Row>
            <Col>
                <Label style={{ marginTop: "1rem" }}>Concerned stores</Label>
                <Select
                    placeholder="Stores..."
                    options={storeOptions}
                    isMulti={true}
                    classNamePrefix="select2-selection"
                    onChange={(e) => { setSelectedStores(e) }}
                />
            </Col>
            <Col>
                <Label style={{ marginTop: "1rem" }}>Concerned products</Label>
                <Select
                    placeholder="Products..."
                    options={productOptions}
                    isMulti={true}
                    classNamePrefix="select2-selection"
                    onChange={(e) => { setSelectedproducts(e) }}
                />
            </Col>
        </Row>
    )
}

export default NotifStockOut