import React from 'react'
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import DisplayDetail from './displayDetail'
import OrderDetail from './OrderDetail'
import StockHistory from './StockHistory'

const UnplannedVisit = (props) => {

    const { visit } = props

    return (
        <Card
            outline
            color="primary"
            className="border"
        >
            <CardHeader style={{ backgroundColor: "#0d6efd", height: "3.5rem" }}>
                <h6 style={{ color: "white" }}>{visit?.store?.name}</h6>
                {visit.start &&
                    <i className='bx bx-log-in' style={{ color: "white", fontSize: '1rem' }}>
                        {new Date(visit.start).getMinutes() < 10 ? (' ' + new Date(visit.start).getHours() + ':' + '0' + new Date(visit.start).getMinutes()) : (' ' + new Date(visit.start).getHours() + ':' + new Date(visit.start).getMinutes())}
                    </i>
                }
                {visit.end &&
                    <i className='bx bx-log-out' style={{ color: "white", fontSize: '1rem', float: 'right' }}>
                        {' ' + new Date(visit.end).getHours() + ':' + new Date(visit.end).getMinutes()}
                    </i>
                }
            </CardHeader>
            {(visit.stocks.length > 0 || visit.displays.length > 0) &&
                <CardBody>
                    <Row style={{ marginBottom: "0.5rem", marginTop: "-0.5rem" }}>
                        {visit.displays.map((display, index) => {
                            if (display.storeId === visit.storeId) {
                                return (
                                    <Col key={index} xl="3" lg="3" >
                                        <Badge
                                            className="me-1 rounded-pill bg-primary"
                                            style={{ fontSize: "0.8rem", marginLeft: "-0.8rem" }}
                                        >
                                            {display.displayType.abbreviation}
                                        </Badge>
                                    </Col>
                                )
                            }
                        })}
                    </Row>
                    <Row style={{ marginBottom: "-0.5rem" }}>
                        {visit.displays.length > 0 &&
                            <Col>
                                <DisplayDetail
                                    displays={visit.displays}
                                    store={visit.store}
                                />
                            </Col>
                        }
                        {visit.stocks.length > 0 &&
                            <Col>
                                <StockHistory
                                    store={visit.store}
                                />
                            </Col>
                        }
                        {visit.orders.map((order, index) => (
                            <Col key={index}>
                                <OrderDetail
                                    order={order}
                                    user={visit.user}
                                    store={visit.store}
                                />
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            }
        </Card>
    )
}
export default UnplannedVisit