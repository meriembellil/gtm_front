import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap'
import { deleteVisitById, upsertVisit } from 'store/visit/services'
import VisitDetail from './VisitDetail'
import AddVisit from './AddVisit'
import Swal from 'sweetalert2'
import { Tbody, Tr, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useSelector } from 'react-redux'
import NewOrder from 'pages/Planning/components/NewOrder'
import UpdateStock from 'pages/Planning/components/UpdateStock'
import CreateDisplay from 'pages/Planning/components/createComponents'

const CalendarBody = (props) => {

    const { data, setData, getVisits, selectedMerchandiser } = props
    const userRole = useSelector(state => state.User?.user?.role?.name)
    const [selectedStore, setSelectedStore] = useState({})
    const [visitId, setVisitId] = useState(null)
    const [selectedVisit, setSelectedVisit] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [nbVisits, setNbVisits] = useState(null)
    const [detailModal, setDetailModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [orderModal, setOrderModal] = useState(false)
    const [stockModal, setStockModal] = useState(false)
    const [displayModal, setDisplayModal] = useState(false)

    function tog_detail() {
        setDetailModal(!detailModal)
    }

    function tog_create() {
        setCreateModal(!createModal)
    }

    function tog_order() {
        setOrderModal(!orderModal)
    }

    function tog_stock() {
        setStockModal(!stockModal)
    }

    function tog_display() {
        setDisplayModal(!displayModal)
    }

    const onDragEnd = (result, data) => {
        let source = parseInt(result?.source?.droppableId.slice(2))
        let destination = parseInt(result?.destination?.droppableId.slice(2))
        const visits = data[parseInt(result?.source?.droppableId.slice(2))].items
        let selectedIndex = parseInt(result?.source?.index)
        let newIndex = parseInt(result?.destination?.index)
        if (
            result.destination && (userRole === "admin" || userRole === "super_admin") &&
            new Date(visits[selectedIndex].visit.day) >= new Date(new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0) &&
            new Date(data[destination].date) >= new Date(new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0)
        ) {
            if (source !== destination) {
                upsertVisit([
                    {
                        ...visits[selectedIndex].visit,
                        day: data[destination].date
                    }
                ])
                data[destination].items.push(visits[selectedIndex])
                data[source].items.splice(selectedIndex, 1)
            } else {
                const element = visits[selectedIndex];
                visits.splice(selectedIndex, 1);
                visits.splice(newIndex, 0, element);
                visits.forEach((element, index) => {
                    element.order = index
                });
                data[parseInt(result.source.droppableId.slice(2))].items = visits
                let newVisits = []
                visits.forEach((element, index) => {
                    newVisits.push({ ...element.visit, order: index });
                })
                upsertVisit(newVisits)
            }
            setData(data)
        }
    };

    const check = (visit) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {

                upsertVisit([visit])
                    .then(() => { getVisits() })
            }
        })
    }

    const deleteVisit = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete visit!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVisitById(id)
                    .then(() => {
                        getVisits()
                        Swal.fire(
                            'Deleted!',
                            'Visit deleted!',
                            'success'
                        )
                    })
            }
        })
    }

    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, data)}
        >
            <VisitDetail
                detailModal={detailModal}
                setDetailModal={setDetailModal}
                tog_detail={tog_detail}
                selectedVisit={selectedVisit}
            />
            <AddVisit
                createModal={createModal}
                setCreateModal={setCreateModal}
                tog_create={tog_create}
                selectedMerchandiser={selectedMerchandiser}
                selectedDay={selectedDay}
                getVisits={getVisits}
                nbVisits={nbVisits}
            />
            {visitId &&
                <>
                    <NewOrder
                        store={selectedStore}
                        visitId={visitId}
                        tog_order={tog_order}
                        orderModal={orderModal}
                        setOrderModal={setOrderModal}
                    />
                    <UpdateStock
                        store={selectedStore}
                        visitId={visitId}
                        tog_stock={tog_stock}
                        stockModal={stockModal}
                        setStockModal={setStockModal}
                    />
                    <CreateDisplay
                        store={selectedStore}
                        visitId={visitId}
                        displayModal={displayModal}
                        setDisplayModal={setDisplayModal}
                        tog_display={tog_display}
                    />
                </>
            }
            <Tbody>
                {data.map((day, index) => {
                    if (index % 7 === 0) {
                        return (
                            <Tr key={index}>
                                {Array(7).fill().map((d, dayIndex) => (
                                    <Td key={dayIndex} style={{ width: "14.28%" }}>
                                        <Droppable droppableId={"Td" + (index + dayIndex)} key={index + dayIndex}>
                                            {(provided) => {
                                                return (
                                                    <div
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                        style={{ minHeight: "10rem" }}
                                                    >
                                                        <Row style={{ marginBottom: '1rem' }}>
                                                            {data[index + dayIndex].name}
                                                            {(userRole === "admin" || userRole === "super_admin") && new Date(data[index + dayIndex].date) >= new Date().setDate(new Date().getDate() - 1) &&
                                                                <i
                                                                    className="bx bx-list-plus"
                                                                    style={{ fontSize: "25px", cursor: "pointer", color: '#556EE6', marginLeft: "9.5rem", marginTop: "-1.4rem" }}
                                                                    onClick={() => {
                                                                        setNbVisits(data[index + dayIndex].items.length)
                                                                        setSelectedDay(new Date(data[index + dayIndex].date))
                                                                        tog_create()
                                                                    }}
                                                                />

                                                            }
                                                        </Row>
                                                        {data[index + dayIndex].items.map((item, i) => {
                                                            return (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={i}
                                                                >
                                                                    {(provided) => {
                                                                        return (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <Card
                                                                                    key={i}
                                                                                    outline
                                                                                    color="primary"
                                                                                    className="border"
                                                                                    style={{ width: "11rem" }}
                                                                                >
                                                                                    <CardHeader className="bg-Transparent">
                                                                                        <Row>
                                                                                            <Col xl={10} lg={10}>
                                                                                                <h5
                                                                                                    className="my-0 text-primary"
                                                                                                    onClick={() => {
                                                                                                        setSelectedVisit(item.visit)
                                                                                                        tog_detail()
                                                                                                    }}
                                                                                                >
                                                                                                    {item.visit.store.name}
                                                                                                </h5>
                                                                                            </Col>
                                                                                            <Col xl={2} lg={2}>
                                                                                                {
                                                                                                    (userRole === "admin" || userRole === "super_admin") &&
                                                                                                    new Date(data[index + dayIndex].date) >= new Date().setDate(new Date().getDate() - 1) &&
                                                                                                    <i
                                                                                                        className="close"
                                                                                                        style={{ marginTop: '-0.8rem' }}
                                                                                                        onClick={() => { deleteVisit(item.visit.id) }}
                                                                                                    />
                                                                                                }
                                                                                                {
                                                                                                    userRole === "merchandiser" &&
                                                                                                    new Date(data[index + dayIndex].date).getDate() === new Date().getDate() &&
                                                                                                    new Date(data[index + dayIndex].date).getMonth() === new Date().getMonth() &&
                                                                                                    <>
                                                                                                        {item.visit.start ? (
                                                                                                            <UncontrolledDropdown direction="left">
                                                                                                                <DropdownToggle href="#" className="card-drop" tag="i">
                                                                                                                    <i className="mdi mdi-dots-horizontal font-size-18" />
                                                                                                                </DropdownToggle>
                                                                                                                <DropdownMenu className="dropdown-menu-end">
                                                                                                                    <DropdownItem
                                                                                                                        onClick={() => {
                                                                                                                            setVisitId(item.visit.id)
                                                                                                                            setSelectedStore(item.visit.store)
                                                                                                                            tog_order()
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <i className="bx bx-cart text-primary me-1" />
                                                                                                                        New order
                                                                                                                    </DropdownItem>
                                                                                                                    <DropdownItem
                                                                                                                        onClick={() => {
                                                                                                                            setVisitId(item.visit.id)
                                                                                                                            setSelectedStore(item.visit.store)
                                                                                                                            tog_display()
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <i className="bx bx-images text-primary me-1" />
                                                                                                                        New display
                                                                                                                    </DropdownItem>
                                                                                                                    <DropdownItem
                                                                                                                        onClick={() => {
                                                                                                                            setVisitId(item.visit.id)
                                                                                                                            setSelectedStore(item.visit.store)
                                                                                                                            tog_stock()
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <i className="bx bx-shield-quarter text-primary me-1" />
                                                                                                                        Update stock
                                                                                                                    </DropdownItem>
                                                                                                                    <DropdownItem onClick={() => { check({ ...item.visit, type: "end" }) }}>
                                                                                                                        <i className="bx bx-log-out text-danger me-1" />
                                                                                                                        Check-Out
                                                                                                                    </DropdownItem>
                                                                                                                </DropdownMenu>
                                                                                                            </UncontrolledDropdown>
                                                                                                        ) : (
                                                                                                            <>
                                                                                                                <i
                                                                                                                    className='bx bx-log-in text-primary me-1'
                                                                                                                    id='check-in'
                                                                                                                    style={{ fontSize: '1rem' }}
                                                                                                                    onClick={() => { check({ ...item.visit, type: "start" }) }}
                                                                                                                />
                                                                                                                <UncontrolledTooltip placement="top" target="check-in">
                                                                                                                    Check-In
                                                                                                                </UncontrolledTooltip>
                                                                                                            </>
                                                                                                        )}
                                                                                                    </>
                                                                                                }
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </CardHeader>
                                                                                </Card>
                                                                            </div>
                                                                        )
                                                                    }}
                                                                </Draggable>
                                                            )
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                )
                                            }}
                                        </Droppable>
                                    </Td>
                                ))}

                            </Tr>
                        )
                    }
                })}
            </Tbody>
        </DragDropContext>
    )
}
export default CalendarBody