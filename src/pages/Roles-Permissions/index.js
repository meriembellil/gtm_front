import React, { useState } from 'react'
import { MetaTags } from 'react-meta-tags'
import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap'
import PermissionsPart from './components/PermissionsPart';
import RolesPart from './components/RolesPart';
import Breadcrumbs from "components/Common/Breadcrumb"

export default function RolesPermissions() {
    
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <div className="page-content">
            <MetaTags>
                <title>Roles & Permissions management</title>
            </MetaTags>
            <Container fluid>
                <Breadcrumbs title="Roles & Permissions" breadcrumbItem="Roles & Permission" />
                <Card>
                    <CardBody>
                        <CardTitle>Roles & Permissions management</CardTitle>
                        <Row style={{ marginTop: "3rem" }}>
                            <RolesPart selectedRole={selectedRole} setSelectedRole={setSelectedRole}/>
                            <PermissionsPart selectedRole={selectedRole}/>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}
