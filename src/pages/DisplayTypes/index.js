import React, { useState } from 'react'
import { MetaTags } from 'react-meta-tags'
import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap'
import Breadcrumbs from "components/Common/Breadcrumb"
import Types from './typeComponents/Types'
import Sections from './sectionComponents/Sections'

const DisplayType = () => {

    const [selectedType, setSelectedType] = useState(null)

    return (
        <div className="page-content">
            <MetaTags>
                <title>Display Types & Sections management</title>
            </MetaTags>
            <Container fluid>
                <Breadcrumbs title="display Types" breadcrumbItem="display Types" />
                <Card>
                    <CardBody>
                        <CardTitle>Display Types & Sections management</CardTitle>
                        <Row style={{ marginTop: '2rem' }}>
                            <Types
                                setSelectedType={setSelectedType}
                                selectedType={selectedType}
                            />
                            <Sections
                                selectedType={selectedType}
                            />
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default DisplayType
