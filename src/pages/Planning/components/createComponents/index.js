import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Col, Label, Modal, Row } from 'reactstrap'
import { getDisplayTypesAsync } from 'store/display/actions'
import DisplayBody from './DisplayBody'

const CreateDisplay = (props) => {

    const { store, visitId, displayModal, setDisplayModal, tog_display } = props
    const dispatch = useDispatch()
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState(null)

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

    useEffect(() => {
        if (displayModal) {
            setSelectedType(null)
        }
    }, [displayModal])


    return (

        <Modal
            size="xl"
            isOpen={displayModal}
            toggle={() => { tog_display() }}
        >
            <div className="modal-header">
                <h5
                    className="modal-title mt-0"
                    id="exampleModalFullscreenLabel"
                >
                    Create Display for {store.name}
                </h5>
                <button
                    onClick={() => { setDisplayModal(false) }}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div className="modal-body">
                <Row style={{ marginBottom: '1rem' }}>
                    <Col>
                        <div style={{ width: '43%', margin: 'auto' }}>
                            <Label>Choose Display type</Label>
                            <Select
                                classNamePrefix="select2-selection"
                                placeholder="Choose Display type..."
                                options={types}
                                onChange={(e) => setSelectedType(e.value)}
                            />
                        </div>
                    </Col>
                </Row>
                {selectedType &&
                    <DisplayBody
                        selectedType={selectedType}
                        store={store}
                        visitId={visitId}
                        tog_fullscreen={tog_display}
                    />
                }
            </div>
        </Modal>
    )
}
export default CreateDisplay