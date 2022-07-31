import React from 'react'
import { Modal, Row } from "reactstrap"
import Maps from 'shared/Maps'

const VisitDetail = (props) => {

    const { detailModal, setDetailModal, tog_detail, selectedVisit } = props

    return (
        <Modal
            isOpen={detailModal}
            toggle={() => {
                tog_detail()
            }}
            size="lg"
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    {selectedVisit?.store?.name}
                </h5>
                <button
                    type="button"
                    onClick={() => {
                        setDetailModal(false)
                    }}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <Row style={{ width: '100%', height: '20rem' }}>
                    <Maps lat={selectedVisit?.store?.lat} lng={selectedVisit?.store?.lng} />
                </Row>
            </div>
        </Modal>
    )
}
export default VisitDetail