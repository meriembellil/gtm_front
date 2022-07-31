import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'

export default function ImgSlider(props) {

    const { displayData, sectionId } = props
    const [selectedImage, setSelectedImage] = useState(displayData[0])
    const [limit, setLimit] = useState(5)
    const [start, setStart] = useState(0)

    const setNext = () => {
        if (limit < displayData.length - 1) {
            setLimit(limit + 5)
            setStart(start + 5)
        }
    }

    const setPrev = () => {
        if (limit > 5) {
            setStart(start - 5)
            setLimit(limit - 5)
        }
    }

    useEffect(() => {
        displayData.forEach((element) => {
            if (sectionId === element.displaySectionId) {
                setSelectedImage(element)
            }
        });
    }, [])

    return (
        <>
            <div className="text-center">
                <h5>{"Description : " + selectedImage?.description}</h5>
            </div>
            <img
                className="img-thumbnail mx-auto d-block"
                alt=""
                src={!selectedImage ? (displayData[0]?.path) : (selectedImage.path)}
            />
            <Row>
                <div className="row justify-content-center">
                    <Col xs="1" xl="1" lg="1" md="1">
                        <i
                            className="mdi mdi-chevron-left"
                            style={{ fontSize: "2.5rem", cursor: "pointer", marginTop: "2rem", float: "left" }}
                            onClick={() => { setPrev() }}
                        />
                    </Col>
                    <Col xs="8" xl="8" lg="8" md="8">
                        {displayData?.map((item, index) => {
                            if (index < limit && index >= start && sectionId === item.displaySectionId) {
                                return (
                                    <img
                                        key={index}
                                        style={{ height: "5rem", marginTop: "1rem", marginLeft: "1.2rem", cursor: "pointer" }}
                                        src={item.path}
                                        onClick={() => { setSelectedImage(item) }}
                                    />
                                )
                            }
                        })}
                    </Col>
                    <Col xs="1" xl="1" lg="1" md="1">
                        <i
                            className="mdi mdi-chevron-right"
                            style={{ fontSize: "2.5rem", cursor: "pointer", marginTop: "2rem", float: "right" }}
                            onClick={() => { setNext() }}
                        />
                    </Col>
                </div>
            </Row>
        </>
    )
}
