import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import DayVisit from '../DayVisit'
import { getVisitByUser } from 'store/visit/services'
import UnplannedVisit from '../UnplannedVisit'

const WeekComponent = (props) => {

    const { selectedMerchandiser, setCalendarType } = props
    const [visits, setVisits] = useState([])
    const [displays, setDisplays] = useState([])
    const [stock, setStock] = useState([])
    const [unplannedStock, setUnplannedStock] = useState([])
    const [unplannedDisplays, setUnplannedDisplays] = useState([])
    const [columns, setColumns] = useState([
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 2)),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 3)),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 4)),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 5)),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6)),
        new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))
    ])

    const getVisits = async () => {
        await getVisitByUser(selectedMerchandiser, columns[0], columns[columns?.length - 1]).then(async (data) => {
            setVisits(data);
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
            setColumns([
                new Date(new Date(columns[0]).setDate(new Date(columns[0]).getDate() + 7)),
                new Date(new Date(columns[1]).setDate(new Date(columns[1]).getDate() + 7)),
                new Date(new Date(columns[2]).setDate(new Date(columns[2]).getDate() + 7)),
                new Date(new Date(columns[3]).setDate(new Date(columns[3]).getDate() + 7)),
                new Date(new Date(columns[4]).setDate(new Date(columns[4]).getDate() + 7)),
                new Date(new Date(columns[5]).setDate(new Date(columns[5]).getDate() + 7)),
                new Date(new Date(columns[6]).setDate(new Date(columns[6]).getDate() + 7)),
            ])
        } else if (direction === "prev") {
            setColumns([
                new Date(new Date(columns[0]).setDate(new Date(columns[0]).getDate() - 7)),
                new Date(new Date(columns[1]).setDate(new Date(columns[1]).getDate() - 7)),
                new Date(new Date(columns[2]).setDate(new Date(columns[2]).getDate() - 7)),
                new Date(new Date(columns[3]).setDate(new Date(columns[3]).getDate() - 7)),
                new Date(new Date(columns[4]).setDate(new Date(columns[4]).getDate() - 7)),
                new Date(new Date(columns[5]).setDate(new Date(columns[5]).getDate() - 7)),
                new Date(new Date(columns[6]).setDate(new Date(columns[6]).getDate() - 7)),
            ])
        } else if (direction === "today") {
            setColumns([
                new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)),
                new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 2)),
                new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 3)),
                new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 4)),
                new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 5)),
                new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6)),
                new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 7))
            ])
        }
    }

    useEffect(() => {
        if (visits.length) {
            getUnplannedVisit()
        }
    }, [visits])

    useEffect(() => {
        getVisits()
    }, [selectedMerchandiser, columns[0]])

    return (
        <div>
            <Row style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                <Col lg="4" xl="4">
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
                            onClick={async () => { changeMonth("today") }}
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
                    <h5 style={{ marginTop: "0.5rem" }}>{new Date(columns[0]).toString().slice(0, 11) + " - " + new Date(columns[6]).toString().slice(0, 16)}</h5>
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
                            {columns.map((day, index) => {
                                return (
                                    <Th key={index}>{new Date(day).toUTCString().slice(0, 11)}</Th>
                                )
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            {columns.map((day, i) => {
                                let dayVisits = []
                                return (
                                    <Td key={i} style={{ width: "14.2857%" }}>
                                        <div style={{ minHeight: "10rem" }}>
                                            {visits?.filter((e) => {
                                                if (new Date(e.day).getDate() === new Date(columns[i]).getDate()) {
                                                    dayVisits.push(e)
                                                }
                                            })}
                                            {dayVisits.map((visit, index) => {

                                                if (visit.planned) {
                                                    return (
                                                        <DayVisit
                                                            key={index}
                                                            visit={visit}
                                                            displays={visit.displays}
                                                            stock={visit.stocks}
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
                    </Tbody>
                </Table>
            </div>
        </div>
    )
}
export default WeekComponent