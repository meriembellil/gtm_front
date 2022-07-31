import React from 'react'
import { Col, Row } from 'reactstrap'
import ImgSlider from './ImgSlider'

const DisplayBody = (props) => {

    const { sections, displayData, customValues } = props

    return (
        <Row>
            <div className="row justify-content-center">
                {sections.map((section, index) => (
                    <Col key={index} xl="6" lg="6">
                        <div className="my-5">
                            <h5 style={{ marginLeft: '5rem' }}>{section.name}</h5>
                            <ImgSlider
                                displayData={displayData}
                                sectionId={section.id}
                            />
                        </div>
                        {customValues.length > 0 &&
                            <div className="mt-4">
                                <div className="text-muted font-size-14">
                                    <div className="mt-4">
                                        <h5 style={{ marginLeft: '5rem' }} className="mb-3">Other informations: </h5>
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-6">
                                                {customValues.map((value, i) => {
                                                    if (value.displayCustomField.displaySectionId === section.id) {
                                                        return (
                                                            <h6 key={i} style={{ marginLeft: '5rem' }}>{value.displayCustomField.name + " : " + value.value}</h6>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <hr />
                    </Col>
                ))}
            </div>
        </Row>
    )
}
export default DisplayBody