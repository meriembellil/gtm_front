import React, { useEffect, useState } from 'react'
import { Col, Label, Row } from 'reactstrap'
import AvField from "availity-reactstrap-validation/lib/AvField";
import Select from "react-select"

const options = [
    { value: "supermarket", label: "supermarket" },
    { value: "hypermarket", label: "hypermarket" },
    { value: "Perfumery", label: "Perfumery" },
]

export default function Form(props) {

    const { store, setStore, storeGroups } = props
    const [selectedOption, setselectedOption] = useState(null)
    const [groupOptions, setGroupOptions] = useState([])
    const [selectedGroup, setselectedGroup] = useState(null)

    function handleSelectOption(selectedOption) {
        setselectedOption(selectedOption)
    }

    function handleSelectGroup(selectedGroup) {
        setselectedGroup(selectedGroup)
    }

    useEffect(() => {
        options.find((str) => {
            if (str.value === store.type)
                setselectedOption(str)
        });
        groupOptions.find((str) => {
            if (str.value === store.storeGroupId)
                setselectedGroup(str)
        });
    }, [store, groupOptions])

    useEffect(() => {
        storeGroups.forEach(group => {
            setGroupOptions(groupOptions => [...groupOptions, { value: group.id, label: group.name }])
        });
    }, [storeGroups])


    return (
        <Row>
            <Col sm="6">
                <AvField
                    className="mb-3"
                    name="name"
                    label="Store name"
                    placeholder="Store name"
                    type="text"
                    errorMessage="Store name is required."
                    validate={{ required: { value: true } }}
                    value={store.name}
                    onChange={(e) => { setStore({ ...store, name: e.target.value }) }}
                />
                <AvField
                    className="mb-3"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                    errorMessage="Email is required."
                    validate={{
                        required: { value: true },
                        email: { value: true },
                    }}
                    value={store.email}
                    onChange={(e) => { setStore({ ...store, email: e.target.value }) }}
                />
                <AvField
                    className="mb-3"
                    name="address"
                    label="Address"
                    placeholder="Address"
                    type="text"
                    errorMessage="Address is required."
                    validate={{ required: { value: true } }}
                    value={store.address}
                    onChange={(e) => { setStore({ ...store, address: e.target.value }) }}
                />
                <AvField
                    className="mb-3"
                    name="postal code"
                    label="Posatl code"
                    placeholder="Postal code"
                    type="text"
                    errorMessage="Postal code is required."
                    validate={{ required: { value: true } }}
                    value={store.postal_code}
                    onChange={(e) => { setStore({ ...store, postal_code: e.target.value }) }}
                />
            </Col>
            <Col sm="6">
                <div className="mb-3">
                    <Label onClick={() => { console.log(selectedGroup); }}>Store group</Label>
                    <Select
                        placeholder="Group"
                        options={groupOptions}
                        classNamePrefix="select2-selection"
                        value={selectedGroup}
                        onChange={(e) => { handleSelectGroup(); setStore({ ...store, storeGroupId: e.value }) }}
                    />
                </div>
                <div className="mb-3">
                    <Label>Type</Label>
                    <Select
                        placeholder="Type"
                        options={options}
                        classNamePrefix="select2-selection"
                        value={selectedOption}
                        onChange={(e) => { handleSelectOption(); setStore({ ...store, type: e.label }) }}
                    />
                </div>
                <AvField
                    className="mb-3"
                    name="phone_number"
                    label="Phone number"
                    placeholder="Phone number"
                    type="number"
                    errorMessage="Phone number is required."
                    validate={{
                        required: { value: true },
                        pattern: {
                            value: "^[0-9]{8}$",
                            errorMessage: "the number must be composed of 8 digits",
                        },
                    }}
                    value={store.phone_number}
                    onChange={(e) => { setStore({ ...store, phone_number: e.target.value }) }}
                />
                <AvField
                    className="mb-3"
                    name="governorate"
                    label="Governorate"
                    placeholder="Governorate"
                    type="text"
                    errorMessage="Governorate is required."
                    validate={{ required: { value: true } }}
                    value={store.governorate}
                    onChange={(e) => { setStore({ ...store, governorate: e.target.value }) }}
                />
            </Col>
        </Row>
    )
}
