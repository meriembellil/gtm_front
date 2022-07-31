import React from 'react'
import { UncontrolledAlert } from 'reactstrap'

export default function ErrorAlert(props) {

    const { errorMessage } = props

    return (
        <UncontrolledAlert
            color="danger"
            className="alert-dismissible fade show"
            role="alert"
        >
            <i className="mdi mdi-block-helper me-2"></i> {errorMessage}
        </UncontrolledAlert>
    )
}
