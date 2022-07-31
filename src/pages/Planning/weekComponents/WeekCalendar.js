import React, { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 } from "uuid";
import { deleteVisitById, getVisitByUser, upsertVisit } from "store/visit/services";
import AddVisit from "./components/AddVisit";
import VisitDetail from "./components/VisitDetail";
import CopyVisits from "./components/CopyVisits";
import Swal from 'sweetalert2'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useSelector } from "react-redux";
import NewOrder from "../components/NewOrder";
import UpdateStock from "../components/UpdateStock";
import CreateDisplay from "../components/createComponents";

const WeekCalendar = (props) => {

    const { merchandisers, selectedMerchandiser, setCalendarType } = props
    const connectedUser = useSelector(state => state.User?.user)
    let mondayData = []
    let tuesdayData = []
    let wednesdayData = []
    let thursdayData = []
    let fridayData = []
    let saturdayData = []
    let sundayData = []
    const [curr] = useState(new Date())
    const [monday, setMonday] = useState(new Date(curr.setDate(curr.getDate() - curr.getDay() + 1)))
    const [tuesday, setTuesday] = useState(new Date(curr.setDate(curr.getDate() - curr.getDay() + 2)))
    const [wednesday, setWednesday] = useState(new Date(curr.setDate(curr.getDate() - curr.getDay() + 3)))
    const [thursday, setThursday] = useState(new Date(curr.setDate(curr.getDate() - curr.getDay() + 4)))
    const [friday, setFriday] = useState(new Date(curr.setDate(curr.getDate() - curr.getDay() + 5)))
    const [saturday, setSaturday] = useState(new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)))
    const [sunday, setSunday] = useState(new Date(curr.setDate(curr.getDate() - curr.getDay() + 7)))
    const [selectedDay, setSelectedDay] = useState(null)
    const [selectedVisit, setSelectedVisit] = useState(null)
    const [nbVisits, setNbVisits] = useState(null)
    const [columns, setColumns] = useState({})
    const [visits, setVisits] = useState([])
    const [createModal, setCreateModal] = useState(false)
    const [detailModal, setDetailModal] = useState(false)
    const [orderModal, setOrderModal] = useState(false)
    const [stockModal, setStockModal] = useState(false)
    const [displayModal, setDisplayModal] = useState(false)
    const [visitId, setVisitId] = useState(null)
    const [selectedStore, setSelectedStore] = useState({})

    function tog_order() {
        setOrderModal(!orderModal)
    }

    function tog_stock() {
        setStockModal(!stockModal)
    }

    function tog_display() {
        setDisplayModal(!displayModal)
    }

    function tog_create() {
        setCreateModal(!createModal)
    }

    function tog_detail() {
        setDetailModal(!detailModal)
    }

    const resetColumns = () => {
        setColumns({
            [v4()]: {
                name: "Lundi-" + monday.getDate() + '-' + parseInt(monday.getMonth() + 1),
                date: monday,
                items: mondayData.sort((a, b) => { return a.visit.order - b.visit.order })
            },
            [v4()]: {
                name: "Mardi-" + tuesday.getDate() + '-' + parseInt(tuesday.getMonth() + 1),
                date: tuesday,
                items: tuesdayData.sort((a, b) => { return a.visit.order - b.visit.order })
            },
            [v4()]: {
                name: "Mercredi-" + wednesday.getDate() + '-' + parseInt(wednesday.getMonth() + 1),
                date: wednesday,
                items: wednesdayData.sort((a, b) => { return a.visit.order - b.visit.order })
            },
            [v4()]: {
                name: "Jeudi-" + thursday.getDate() + '-' + parseInt(thursday.getMonth() + 1),
                date: thursday,
                items: thursdayData.sort((a, b) => { return a.visit.order - b.visit.order })
            },
            [v4()]: {
                name: "Vendredi-" + friday.getDate() + '-' + parseInt(friday.getMonth() + 1),
                date: friday,
                items: fridayData.sort((a, b) => { return a.visit.order - b.visit.order })
            },
            [v4()]: {
                name: "Samedi-" + saturday.getDate() + '-' + parseInt(saturday.getMonth() + 1),
                date: saturday,
                items: saturdayData.sort((a, b) => { return a.visit.order - b.visit.order })
            },
            [v4()]: {
                name: "Dimanche-" + sunday.getDate() + '-' + parseInt(sunday.getMonth() + 1),
                date: (sunday),
                items: sundayData.sort((a, b) => { return a.visit.order - b.visit.order })
            }
        })
        setVisits(mondayData.concat(tuesdayData).concat(wednesdayData).concat(thursdayData).concat(fridayData).concat(saturdayData).concat(sundayData))
    }

    const setWeek = async (action) => {
        if (action === "next") {
            setMonday(new Date(monday.setDate(monday.getDate() + 7)))
            setTuesday(new Date(tuesday.setDate(tuesday.getDate() + 7)))
            setWednesday(new Date(wednesday.setDate(wednesday.getDate() + 7)))
            setThursday(new Date(thursday.setDate(thursday.getDate() + 7)))
            setFriday(new Date(friday.setDate(friday.getDate() + 7)))
            setSaturday(new Date(saturday.setDate(saturday.getDate() + 7)))
            setSunday(new Date(sunday.setDate(sunday.getDate() + 7)))
        } else if (action === "prev") {
            setMonday(new Date(monday.setDate(monday.getDate() - 7)))
            setTuesday(new Date(tuesday.setDate(tuesday.getDate() - 7)))
            setWednesday(new Date(wednesday.setDate(wednesday.getDate() - 7)))
            setThursday(new Date(thursday.setDate(thursday.getDate() - 7)))
            setFriday(new Date(friday.setDate(friday.getDate() - 7)))
            setSaturday(new Date(saturday.setDate(saturday.getDate() - 7)))
            setSunday(new Date(sunday.setDate(sunday.getDate() - 7)))
        } else {
            let day = new Date
            setMonday(new Date(day.setDate(day.getDate() - day.getDay() + 1)))
            setTuesday(new Date(day.setDate(day.getDate() - day.getDay() + 2)))
            setWednesday(new Date(day.setDate(day.getDate() - day.getDay() + 3)))
            setThursday(new Date(day.setDate(day.getDate() - day.getDay() + 4)))
            setFriday(new Date(day.setDate(day.getDate() - day.getDay() + 5)))
            setSaturday(new Date(day.setDate(day.getDate() - day.getDay() + 6)))
            setSunday(new Date(day.setDate(day.getDate() - day.getDay() + 7)))
        }
    }

    const getVisits = async (userId) => {
        await getVisitByUser(
            userId,
            new Date(new Date(new Date(new Date(monday).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0),
            sunday
        ).then(async (data) => {
            data.forEach((visit) => {
                if (new Date(visit.day).getDate() === new Date(monday).getDate()) {
                    mondayData.push({ id: v4(), visit: visit })
                } else if (new Date(visit.day).getDate() === new Date(tuesday).getDate()) {
                    tuesdayData.push({ id: v4(), visit: visit })
                } else if (new Date(visit.day).getDate() === new Date(wednesday).getDate()) {
                    wednesdayData.push({ id: v4(), visit: visit })
                } else if (new Date(visit.day).getDate() === new Date(thursday).getDate()) {
                    thursdayData.push({ id: v4(), visit: visit })
                } else if (new Date(visit.day).getDate() === new Date(friday).getDate()) {
                    fridayData.push({ id: v4(), visit: visit })
                } else if (new Date(visit.day).getDate() === new Date(saturday).getDate()) {
                    saturdayData.push({ id: v4(), visit: visit })
                } else if (new Date(visit.day).getDate() === new Date(sunday).getDate()) {
                    sundayData.push({ id: v4(), visit: visit })
                }
            })
            resetColumns()
        }).catch(() => {
            mondayData = []
            tuesdayData = []
            wednesdayData = []
            thursdayData = []
            fridayData = []
            saturdayData = []
            sundayData = []
        })
    }

    useEffect(async () => {
        await getVisits(selectedMerchandiser)
    }, [selectedMerchandiser, monday])

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        if (
            (connectedUser?.role?.name === "admin" || connectedUser?.role?.name === "super_admin") &&
            new Date(destColumn.date) >= new Date(new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0) &&
            new Date(destColumn.date) >= new Date(new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0)
        ) {
            if (source.droppableId !== destination.droppableId) {
                setColumns({
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        items: sourceItems
                    },
                    [destination.droppableId]: {
                        ...destColumn,
                        items: destItems
                    }
                });
                upsertVisit([{
                    ...columns[source.droppableId].items[source.index].visit,
                    day: destColumn.date
                }])
            } else {
                const column = columns[source.droppableId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                setColumns({
                    ...columns,
                    [source.droppableId]: {
                        ...column,
                        items: copiedItems
                    }
                });
                let updatedVisits = []
                copiedItems.forEach((item, index) => {
                    updatedVisits.push({ ...item.visit, order: index })
                })
                upsertVisit(updatedVisits)
            }
        }
    };

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
                        getVisits(selectedMerchandiser)
                        Swal.fire(
                            'Deleted!',
                            'Visit deleted!',
                            'success'
                        )
                    })
            }
        })
    }

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
                    .then(() => { getVisits(selectedMerchandiser) })
            }
        })
    }

    return (
        <Card>
            <CardBody>
                <Row style={{ marginBottom: "1rem" }}>
                    <Col>
                        <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                            style={{ float: "left" }}
                        >
                            <Button color="primary" onClick={() => { setWeek("prev"); }}><i className="bx bx-chevron-left" style={{ fontSize: 20 }} /></Button>
                            <Button color="primary" onClick={() => { setWeek("today"); }}>Aujourd'hui</Button>
                            <Button color="primary" onClick={() => { setWeek("next"); }}><i className="bx bx-chevron-right" style={{ fontSize: 20 }} /></Button>
                        </div>
                    </Col>
                    <Col><h5 style={{ marginTop: "0.5rem" }}>{monday.toString().slice(0, 11) + " - " + sunday.toString().slice(0, 11)}</h5></Col>

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
                        {(connectedUser?.role?.name === "admin" || connectedUser?.role?.name === "super_admin") &&
                            <CopyVisits
                                merchandisers={merchandisers}
                                selectedMerchandiser={selectedMerchandiser}
                                visits={visits}
                                monday={monday}
                            />
                        }
                    </Col>
                </Row>

                <div className="table-responsive">
                    <Table className="table table-bordered mb-0">
                        <Thead>
                            <Tr>
                                {Object.entries(columns).map(([columnId, column], index) => {
                                    return (
                                        <Th key={index}>{column.name}</Th>
                                    )
                                })}
                            </Tr>
                        </Thead>
                        <DragDropContext
                            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                        >
                            <Tbody>
                                <Tr>
                                    {Object.entries(columns).map(([columnId, column], index) => {
                                        return (
                                            <Td key={index} style={{ width: "14.28%" }}>
                                                <div key={columnId}>
                                                    {(connectedUser?.role?.name === "admin" || connectedUser?.role?.name === "super_admin") && new Date(column.date) >= new Date().setDate(new Date().getDate() - 1) &&
                                                        <i
                                                            className="bx bx-list-plus"
                                                            style={{ fontSize: "25px", cursor: "pointer", color: '#556EE6', marginBottom: '1rem', marginLeft: "80%" }}
                                                            onClick={() => { setNbVisits(column.items.length); setSelectedDay(column.date); tog_create(); }}
                                                        />
                                                    }
                                                    <Droppable droppableId={columnId} key={columnId}>
                                                        {(provided) => {
                                                            return (
                                                                <div
                                                                    {...provided.droppableProps}
                                                                    ref={provided.innerRef}
                                                                    style={{
                                                                        minHeight: "30rem",
                                                                    }}
                                                                >

                                                                    {column.items.map((item, index) => {
                                                                        return (
                                                                            <Draggable
                                                                                key={item.id}
                                                                                draggableId={item.id}
                                                                                index={index}
                                                                            >
                                                                                {(provided) => {
                                                                                    return (
                                                                                        <div
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                        >
                                                                                            <Card
                                                                                                outline
                                                                                                color="primary"
                                                                                                className="border"
                                                                                                style={{ width: "11rem" }}

                                                                                            >
                                                                                                <CardHeader className="bg-transparent">
                                                                                                    <Row>
                                                                                                        <Col xl={10} lg={10}>
                                                                                                            <h5
                                                                                                                className="my-0 text-primary"
                                                                                                                onClick={() => { setSelectedVisit(item.visit); tog_detail(); }}
                                                                                                            >
                                                                                                                {item.visit.store.name}
                                                                                                            </h5>
                                                                                                        </Col>
                                                                                                        <Col xl={2} lg={2}>
                                                                                                            {(connectedUser?.role?.name === "admin" || connectedUser?.role?.name === "super_admin") && new Date(column.date) >= new Date().setDate(new Date().getDate() - 1) &&
                                                                                                                <i
                                                                                                                    className="close"
                                                                                                                    style={{ marginTop: '-0.8rem' }}
                                                                                                                    onClick={() => { deleteVisit(item.visit.id) }}
                                                                                                                />
                                                                                                            }
                                                                                                            {
                                                                                                                connectedUser?.role?.name === "merchandiser" &&
                                                                                                                new Date(column.date).getDate() === new Date().getDate() &&
                                                                                                                new Date(column.date).getMonth() === new Date().getMonth() &&
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
                                                </div>
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            </Tbody>
                        </DragDropContext>
                    </Table>
                </div>
                <AddVisit
                    createModal={createModal}
                    setCreateModal={setCreateModal}
                    tog_create={tog_create}
                    selectedMerchandiser={selectedMerchandiser}
                    selectedDay={selectedDay}
                    getVisits={getVisits}
                    nbVisits={nbVisits}
                />
                <VisitDetail
                    detailModal={detailModal}
                    setDetailModal={setDetailModal}
                    tog_detail={tog_detail}
                    selectedVisit={selectedVisit}
                    selectedMerchandiser={selectedMerchandiser}
                    getVisits={getVisits}
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
            </CardBody>
        </Card>
    )
}

export default WeekCalendar
