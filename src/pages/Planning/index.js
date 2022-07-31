import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useSelector } from "react-redux";
import Select from "react-select";
import WeekCalendar from "./weekComponents/WeekCalendar";
import { getUsersByRole } from "store/user/services";
import MonthCalendar from "./monthComponents/MonthCalendar";

const Planning = () => {

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
                <title>Planning</title>
            </MetaTags>
            <Container fluid={true}>
                <Breadcrumbs title="Planning" breadcrumbItem="Planning Management" />
                <Card>
                    <CardBody>
                        {(connectedUser?.role?.name === "admin" || connectedUser?.role?.name === "super_admin") &&
                            <Row style={{ width: "50%", margin: "auto" }}>
                                <Col>
                                    <div className="mb-3">
                                        <Label>merchandiser</Label>
                                        <Select
                                            placeholder="Selectionner un merchandiser..."
                                            options={merchandisers}
                                            classNamePrefix="select2-selection"
                                            onChange={(e) => { setSelectedMerchandiser(e.value); }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        }
                        {selectedMerchandiser ? (
                            <>
                                {calendarType === "week" ? (
                                    <WeekCalendar
                                        selectedMerchandiser={selectedMerchandiser}
                                        merchandisers={merchandisers}
                                        setCalendarType={setCalendarType}
                                    />
                                ) : (
                                    <MonthCalendar
                                        selectedMerchandiser={selectedMerchandiser}
                                        merchandisers={merchandisers}
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
export default Planning