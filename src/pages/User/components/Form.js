import React from 'react'
import AvField from 'availity-reactstrap-validation/lib/AvField'
import { Label, Row } from 'reactstrap'

export default function Form(props) {

    const { user, setUser, roles } = props

    return (
        <>
            <AvField
                className="mb-3"
                name="First name"
                label="First name"
                placeholder="First name"
                type="text"
                errorMessage="First name is required."
                validate={{ required: { value: true } }}
                value={user.first_name}
                onChange={(e) => { setUser({ ...user, first_name: e.target.value }); }}
            />
            <AvField
                className="mb-3"
                name="Last name"
                label="Last name"
                placeholder="Last name"
                type="text"
                errorMessage="Last name is required."
                validate={{ required: { value: true } }}
                value={user.last_name}
                onChange={(e) => { setUser({ ...user, last_name: e.target.value }); }}
            />
            <AvField
                className="mb-3"
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                errorMessage="Invalid Email"
                value={user.email}
                onChange={(e) => { setUser({ ...user, email: e.target.value }); }}
            />
            <AvField
                className="mb-3"
                name="Phone number"
                label="Phone number"
                placeholder="Phone number"
                type="number"
                errorMessage="Enter Only Number"
                validate={{
                    required: { value: true },
                    pattern: {
                        value: "^[0-9]{8}$",
                        errorMessage: "the number must be composed of 8 digits",
                    },
                }}
                value={user.phone_number}
                onChange={(e) => { setUser({ ...user, phone_number: e.target.value }); }}
            />
            <div className="mb-3">
                <Label htmlFor="formrow-InputCity">Gender</Label>
                <Row>
                    <div style={{ marginLeft: '1rem' }} className="form-check form-radio-outline form-radio-primary mb-3">
                        <label className="form-check-label"> Male </label>
                        <input
                            type="radio"
                            name="customRadiooutlinecolor1"
                            className="form-check-input"
                            value="M"
                            onChange={(e) => { setUser({ ...user, gender: e.target.value }); }}
                        />
                    </div>
                    <div style={{ marginLeft: '5rem', marginTop: '-2.2rem' }} className="form-check form-radio-outline form-radio-danger mb-3">
                        <label className="form-check-label"> Female </label>
                        <input
                            type="radio"
                            name="customRadiooutlinecolor1"
                            className="form-check-input"
                            value="F"
                            onChange={(e) => { setUser({ ...user, gender: e.target.value }); }}
                        />
                    </div>
                </Row>
            </div>
            <AvField
                className="mb-3"
                name="Role"
                label="Role"
                placeholder="Enter Only number"
                type="select"
                errorMessage="Role is required"
                validate={{
                    required: { value: true },
                }}
                onChange={(e) => { setUser({ ...user, roleId: e.target.value }); }}
            >
                <option>Choose role...</option>
                {roles?.map((role, index) => (
                    <option key={index} value={role.id}>{role.name}</option>
                ))}
            </AvField>
        </>
    )
}