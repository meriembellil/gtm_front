import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Col, Label, Modal, Row } from 'reactstrap'
import { getDisplayTypesAsync } from 'store/display/actions'
import DisplayBody from './DisplayBody'
import StoresModal from './StoresModal'

const CreateDisplay = (props) => {

    const { getAsyncDisplayList } = props
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const dispatch = useDispatch()
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [selectedStore, setSelectedStore] = useState(null)

    function tog_fullscreen() {
        setSelectedStore(null)
        setSelectedType(null)
        setmodal_fullscreen(!modal_fullscreen)
    }

    const getTypes = async () => {
        return dispatch(await getDisplayTypesAsync()).payload.displayTypes
    }

    const getTypesAsync = async () => {
        getTypes().then((data) => {
            data.forEach(element => {
                setTypes(types => [...types, { value: element, label: element.name }])
            });
        })
    }

    useEffect(() => {
        getTypesAsync()
    }, [])

    return (
        <>
            <i
                className="bx bx-list-plus"
                style={{ fontSize: "25px", float: "right", cursor: "pointer", color: '#556EE6' }}
                onClick={() => { tog_fullscreen() }}
            />
            <Modal
                size="xl"
                isOpen={modal_fullscreen}
                toggle={() => { tog_fullscreen() }}
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="exampleModalFullscreenLabel"
                    >
                        Create Display
                    </h5>
                    <button
                        onClick={() => { setmodal_fullscreen(false) }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    <Row style={{ marginBottom: '1rem' }}>
                        <Col>
                            <div style={{ float: 'right', width: '42%' }}>
                                <Label>Choose Display type</Label>
                                <Select
                                    classNamePrefix="select2-selection"
                                    placeholder="Choose Display type..."
                                    options={types}
                                    onChange={(e) => setSelectedType(e.value)}
                                />
                            </div>
                        </Col>
                        <StoresModal
                            selectedStore={selectedStore}
                            setSelectedStore={setSelectedStore}
                        />
                    </Row>
                    {selectedStore &&
                        <div style={{ width: '43%', margin: 'auto', fontSize: 20, marginBottom: '1rem' }}>
                            <Link to='#' style={{ color: 'black' }}>{'Store: ' + selectedStore?.name + ', ' + selectedStore?.address + ' - ' + selectedStore?.governorate}</Link>
                        </div>
                    }
                    {selectedType &&
                        <DisplayBody
                            selectedType={selectedType}
                            selectedStore={selectedStore}
                            tog_fullscreen={tog_fullscreen}
                            getAsyncDisplayList={getAsyncDisplayList}
                        />
                    }
                </div>
            </Modal>
        </>
    )
}
export default CreateDisplay