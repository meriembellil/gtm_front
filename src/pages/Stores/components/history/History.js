import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, UncontrolledTooltip, Spinner, Card, CardHeader, CardBody, Row, Col } from 'reactstrap'
import InfiniteScroll from "react-infinite-scroll-component";
import { getStoreVisits } from 'store/pos/services';
import StockHistory from './StockHistory';
import OrderDetail from './OrderDetail';
import DisplayDetail from './displayDetail';

const StoreHistory = (props) => {

    const { storeId } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const [visits, setVisits] = useState([])
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        if (!modal_fullscreen) {
            getStoreVisits(storeId, limit, offset)
                .then((data) => {
                    setVisits(data);
                })
        }
    }

    const fetchMoreData = () => {
        setOffset(offset + 10)
        setTimeout(() => {
            getStoreVisits(storeId, limit, offset)
                .then((data) => {
                    setVisits(data);
                })
        }, 1500);
    };

    return (
        <>
            <Link
                to="#"
                onClick={() => { tog_fullscreen() }}
                style={{ fontSize: "1.3rem" }}
            >
                <i className="bx bx-list-ul" id="detailtooltip" />
                <UncontrolledTooltip placement="top" target="detailtooltip">
                    View history
                </UncontrolledTooltip>
            </Link>
            <Modal
                size="lg"
                isOpen={modal_fullscreen}
                toggle={() => { tog_fullscreen() }}
                scrollable
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="exampleModalFullscreenLabel"
                    >
                        Store History
                    </h5>
                    <button
                        onClick={() => { setmodal_fullscreen(false) }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" id="scrollableDiv">
                    <InfiniteScroll
                        dataLength={visits.length}
                        next={() => { fetchMoreData() }}
                        hasMore={true}
                        loader={
                            <div style={{ marginTop: "2rem", width: "20%", margin: "auto" }}>
                                <Spinner type="grow" className="ms-2" color="secondary" />
                                <Spinner type="grow" className="ms-2" color="secondary" />
                                <Spinner type="grow" className="ms-2" color="secondary" />
                            </div>
                        }
                        scrollableTarget="scrollableDiv"
                    >
                        {visits.map((visit, index) => (
                            <Card
                                key={index}
                                outline
                                className="border"
                                color={visit.stocks.length === 0 && visit.orders.length === 0 && visit.displays.length === 0 ? "danger" : "primary"}
                            >
                                <CardHeader className="bg-transparent">
                                    <h5
                                        className={visit.stocks.length === 0 && visit.orders.length === 0 && visit.displays.length === 0 ? "my-0 text-danger" : "my-0 text-primary"}
                                    >
                                        <i className="bx bx-calendar me-3" />{visit.day.slice(0, 10)}
                                    </h5>
                                </CardHeader>
                                <CardBody>
                                    {visit.stocks.length === 0 && visit.orders.length === 0 && visit.displays.length === 0 ? (
                                        <h2 className='text-center'>Visit not performed</h2>
                                    ) : (
                                        <Row>
                                            {visit.stocks.length > 0 &&
                                                <Col xl="6" lg="6">
                                                    <StockHistory
                                                        store={visit.store}
                                                    />
                                                </Col>
                                            }
                                            {visit.orders.map((order, i) => (
                                                <Col key={i} xl="6" lg="6">
                                                    <OrderDetail
                                                        order={order}
                                                        user={visit.user}
                                                        store={visit.store}
                                                    />
                                                </Col>
                                            ))}
                                            {visit.displays.length > 0 &&
                                                <Col xl="6" lg="6">
                                                    <DisplayDetail
                                                        displays={visit.displays}
                                                        store={visit.store}
                                                        user={visit.user}
                                                    />
                                                </Col>
                                            }
                                        </Row>
                                    )}
                                </CardBody>
                            </Card>
                        ))}
                    </InfiniteScroll>
                </div>
            </Modal>
        </>
    )
}

export default StoreHistory
