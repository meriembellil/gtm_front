import React from 'react'
import { Card, Spinner } from 'reactstrap'

function LoadingComponent() {
    return (
        <Card style={{ height: "44.7rem" }}>
            <div className="text-center" style={{ marginTop: "20rem" }}>
                <h5>Chargement...</h5>
                {Array(5).fill().map((element, index) => (
                    <Spinner key={index} className="ms-2" type="grow" color="secondary" style={{ fontSize: "2rem" }} />
                ))}
            </div>
        </Card>
    )
}

export default LoadingComponent