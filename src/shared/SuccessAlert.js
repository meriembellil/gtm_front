import React from 'react'
import { UncontrolledAlert } from 'reactstrap'

export default function SuccessAlert(props) {

    const { successMessage } = props

    return (
        <UncontrolledAlert
        color="success"
        className="alert-dismissible fade show"
        role="alert"
        >
            <i className="mdi mdi-check-all me-2"></i>{successMessage}
        </UncontrolledAlert>
    )
}
