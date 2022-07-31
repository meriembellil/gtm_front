import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Button, Card, CardBody, Col, Container, Label, Row } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Select from "react-select";
import { getUsersByRole } from "store/user/services";
import WeekComponent from "./components/weekComponents";
import MonthComponent from "./components/monthComponents";
import { useSelector } from "react-redux";

const PlanningControl = () => {

    const connectedUser = useSelector(state => state.User?.user)
    const [merchandisers] = useState([])
    const [selectedMerchandiser, setSelectedMerchandiser] = useState(null)
    const [calendarType, setCalendarType] = useState("month")

    useEffect(() => {
        getUsersByRole("merchandiser").then((data) => {
            data.forEach(element => {
                merchandisers.push({ value: element.id, label: element.first_name + " " + element.last_name })
            });
        })
    }, [])

    useEffect(() => {
        if (connectedUser?.role?.name === "merchandiser") {
            setSelectedMerchandiser(connectedUser.id);
        }
    }, [connectedUser])

    return (
        <div className="page-content">
            <MetaTags>
                <title>Planning review</title>
            </MetaTags>
            <Container fluid={true}>
                <Breadcrumbs title="Planning" breadcrumbItem="Planning review" />
                <Card>
                    <CardBody>
                        {(connectedUser?.role?.name === "admin" || connectedUser?.role?.name === "super_admin") &&
                            <Row style={{ width: "50%", margin: "auto" }}>
                                <Col>
                                    <div className="mb-3">
                                        <Label>Choose a merchandiser</Label>
                                        <Select
                                            placeholder="Choose a merchandiser..."
                                            options={merchandisers}
                                            classNamePrefix="select2-selection"
                                            onChange={(e) => { setSelectedMerchandiser(e.value); }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        }
                        {
                        selectedMerchandiser ? (
                            <>
                                {calendarType === "week" ? (
                                    <WeekComponent
                                        selectedMerchandiser={selectedMerchandiser}
                                        setCalendarType={setCalendarType}
                                    />
                                ) : (
                                    <MonthComponent
                                        selectedMerchandiser={selectedMerchandiser}
                                        setCalendarType={setCalendarType}
                                    />
                                )}
                            </>
                        ) : (
                            <h1 style={{ width: '45%', margin: 'auto', marginTop: '5rem', marginBottom: '29rem' }}>Select merchandiser to see planning</h1>
                        )
                        }
                    </CardBody>
                </Card>
            </Container >
        </div >
    )
}
export default PlanningControl