import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { allDays } from './monthDays'
import DayVisit from '../DayVisit'
import { getVisitByUser } from 'store/visit/services'
import { getDisplayListByUser } from 'store/display/services'
import { findStockByUser } from 'store/stock/services'
import UnplannedVisit from '../UnplannedVisit'

const MonthComponent = (props) => {

    const { selectedMerchandiser, setCalendarType } = props
    const [curr, setCurr] = useState(new Date())
    const [days, setDays] = useState(allDays(curr))
    const [monthsNames] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [visits, setVisits] = useState([])
    const [displays, setDisplays] = useState([])
    const [stock, setStock] = useState([])
    const [unplannedStock, setUnplannedStock] = useState([])
    const [unplannedDisplays, setUnplannedDisplays] = useState([])

    const getVisits = async () => {
        setVisits([])
        await getVisitByUser(selectedMerchandiser, days[0], days[days?.length - 1]).then((data) => {
            setVisits(data);
        })
    }

    const getDisplays = async () => {
        setDisplays([])
        await getDisplayListByUser(selectedMerchandiser, days[0], days[days?.length - 1]).then((data) => {
            setDisplays(data);
        })
    }

    const getStockUpdates = async () => {
        setStock([])
        await findStockByUser(selectedMerchandiser, days[0], days[days?.length - 1]).then((data) => {
            setStock(data);
        })
    }

    const getUnplannedVisit = () => {
        setUnplannedStock([])
        setUnplannedStock(stock.filter((s) =>
            visits.findIndex(v => v.day.slice(0, 10) === s.createdAt.slice(0, 10)) && visits.findIndex(v => v.storeId !== s.storeId)
        ))
        setUnplannedDisplays([])
        setUnplannedDisplays(displays.filter((d) =>
            visits.findIndex(v => v.day.slice(0, 10) === d.createdAt.slice(0, 10)) && visits.findIndex(v => v.storeId !== d.storeId)
        ))
    }

    const changeMonth = async (direction) => {
        if (direction === "next") {
            setCurr(new Date(curr.setMonth(curr.getMonth() + 1)))

        } else {
            setCurr(new Date(curr.setMonth(curr.getMonth() - 1)))
        }
    }

    useEffect(() => {
        if (visits.length > 0 && displays.length > 0 && stock.length > 0) {
            getUnplannedVisit()
        }
    }, [visits, displays, stock])

    useEffect(() => {
        setDays(allDays(curr))
    }, [curr])

    useEffect(() => {
        getVisits()
        getDisplays()
        getStockUpdates()
    }, [selectedMerchandiser, days[0].toUTCString()])

    return (
        <div>
            <Row style={{ marginTop: "2rem", marginBottom: "1rem" }}>
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
                            Today
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
                    <h3 style={{ marginBottom: "2rem" }}>{monthsNames[curr.getMonth()] + " - " + curr.getFullYear()}</h3>
                </Col>
                <Col>
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                        style={{ marginTop: "1.7rem", float: 'right' }}
                    >
                        <Button color="primary" onClick={() => { setCalendarType("week") }}>Week</Button>
                        <Button color="primary" onClick={() => { setCalendarType("month") }}>Moth</Button>
                    </div>
                </Col>
            </Row>
            <div className="table-responsive">
                <Table className="table table-bordered mb-0">
                    <Thead>
                        <Tr>
                            <Th>Monday</Th>
                            <Th>Tuesday</Th>
                            <Th>Wednesday</Th>
                            <Th>Thursday</Th>
                            <Th>Friday</Th>
                            <Th>Saturday</Th>
                            <Th>Sunday</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {days.map((day, index) => {
                            if (index % 7 === 0) {
                                return (
                                    <Tr key={index}>
                                        {Array(7).fill().map((e, i) => {
                                            let dayVisits = []
                                            return (
                                                <Td key={i} style={{ width: "14.2857%" }}>
                                                    <div style={{ minHeight: "10rem" }}>
                                                        <h6>{new Date(days[index + i]).getDate()}</h6>
                                                        {visits?.filter((e) => {
                                                            if (new Date(e.day).getDate() === new Date(days[index + i]).getDate() && new Date(e.day).getMonth() === new Date(days[index + i]).getMonth()) {
                                                                dayVisits.push(e)
                                                            }
                                                        })}
                                                        {dayVisits.map((visit, index) => {
                                                            if (visit.planned) {
                                                                return (
                                                                    <DayVisit
                                                                        key={index}
                                                                        visit={visit}
                                                                    />
                                                                )
                                                            } else {
                                                                return (
                                                                    <UnplannedVisit
                                                                        key={index}
                                                                        visit={visit}
                                                                        displays={visit.displays}
                                                                        stock={visit.stocks}
                                                                    />
                                                                )
                                                            }
                                                        })}
                                                    </div>
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            }
                        })}
                    </Tbody>
                </Table>
            </div >
        </div >
    )
}
export default MonthComponent