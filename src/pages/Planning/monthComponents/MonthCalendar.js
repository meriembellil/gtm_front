import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap'
import { getVisitByUser } from 'store/visit/services'
import { v4 } from 'uuid'
import CalendarBody from './components/CalendarBody'
import CopyVisits from './components/CopyVisits'
import { Table, Thead, Tr, Th } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useSelector } from 'react-redux'

const MonthCalendar = (props) => {

    const { merchandisers, selectedMerchandiser, setCalendarType } = props
    const connectedUser = useSelector(state => state.User?.user)
    const [curr, setCurr] = useState(new Date())
    const [days, setDays] = useState([])
    const [data, setData] = useState([])
    const [visits, setVisits] = useState([])

    const lastDays = () => {
        let days = new Date(curr.getFullYear(), curr.getMonth(), 0).getDate()
        let pos = new Date(curr.getFullYear(), curr.getMonth(), 0).getDay()
        let lastDays = []
        let diff = days - pos + 1
        while (diff <= days) {
            lastDays.push({
                name: diff,
                date: new Date(curr.getFullYear(), curr.getMonth() - 1, diff),
                items: []
            })
            diff++
        }
        return lastDays
    }

    const monthDays = () => {
        let days = new Date(curr.getFullYear(), curr.getMonth() + 1, 0).getDate()
        let currDays = []
        let currEl = 1

        while (days >= currEl) {
            currDays.push({
                name: currEl,
                date: new Date(curr.getFullYear(), curr.getMonth(), currEl),
                items: []
            })
            currEl++
        }
        return currDays
    }

    const nextDays = () => {
        let days = new Date(curr.getFullYear(), curr.getMonth() + 1, 1).getDay()
        let nextDays = []
        let diff = 7 - days + 1
        let start = 1
        while (start <= diff) {
            nextDays.push({
                name: start,
                date: new Date(curr.getFullYear(), curr.getMonth() + 1, start),
                items: []
            })
            start++
        }
        return nextDays
    }

    const getVisits = async () => {
        await getVisitByUser(selectedMerchandiser, days[0]?.date, days[days?.length - 1]?.date).then(async (visits) => {
            setVisits(visits)
            setDays(lastDays().concat(monthDays()).concat(nextDays()));
            days?.forEach((day) => {
                visits?.forEach((visit) => {
                    if (new Date(visit.day).getDate() === new Date(day.date).getDate() && new Date(visit.day).getMonth() === new Date(day.date).getMonth()) {
                        day.items.push({ id: v4(), visit: visit })
                    }
                })
                visits.sort((a, b) => { return a.order - b.order })
            })
            setData(days)
        })
    }

    const changeMonth = async (direction) => {
        if (direction === "next") {
            setCurr(new Date(curr.setMonth(curr.getMonth() + 1)))
        } else {
            setCurr(new Date(curr.setMonth(curr.getMonth() - 1)))
        }
    }

    useEffect(() => {
            getVisits()
    }, [selectedMerchandiser, new Date(days[0]?.date).toString(), curr])

    return (
        <Card>
            <CardBody>
                <Row style={{ marginBottom: "1rem" }}>
                    <Col lg="5" xl="5">
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                            style={{ float: "left" }}
                        >
                            <Button
                                color="primary"
                                onClick={async () => { changeMonth("prev") }}
                            >
                                <i className="bx bx-chevron-left" style={{ fontSize: 20 }} />
                            </Button>
                            <Button
                                color="primary"
                                onClick={async () => { setCurr(new Date()) }}
                            >
                                Aujourd'hui
                            </Button>
                            <Button
                                color="primary"
                                onClick={async () => { changeMonth("next") }}
                            >
                                <i className="bx bx-chevron-right" style={{ fontSize: 20 }} />
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <h3 style={{ marginTop: "0.5rem" }}>{curr.toUTCString().slice(7, 16)}</h3>
                    </Col>
                    <Col>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                            style={{ float: "right", marginLeft: "1rem" }}
                        >
                            <Button color="primary" onClick={() => { setCalendarType("week") }}>Semaine</Button>
                            <Button color="primary" onClick={() => { setCalendarType("month") }}>Mois</Button>
                        </div>
                        {connectedUser?.role?.name === "admin" &&
                            <CopyVisits
                                merchandisers={merchandisers}
                                selectedMerchandiser={selectedMerchandiser}
                                visits={visits}
                                curr={curr}
                            />
                        }
                    </Col>
                </Row>
                <div className="table-responsive">
                    <Table className="table table-bordered mb-0">
                        <Thead>
                            <Tr>
                                <Th>Lundi</Th>
                                <Th>Mardi</Th>
                                <Th>Mercredi</Th>
                                <Th>Jeudi</Th>
                                <Th>Vendredi</Th>
                                <Th>Samedi</Th>
                                <Th>Dimanche</Th>
                            </Tr>
                        </Thead>
                        <CalendarBody
                            data={data}
                            setData={setData}
                            getVisits={getVisits}
                            selectedMerchandiser={selectedMerchandiser}
                        />
                    </Table>
                </div>
            </CardBody>
        </Card>
    )
}
export default MonthCalendar