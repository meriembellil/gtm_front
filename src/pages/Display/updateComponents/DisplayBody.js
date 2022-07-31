import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Input, Row } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'

const DisplayBody = (props) => {

    const { section, displayData, customValues, files, setFiles } = props
    const [selectedFile, setselectedFile] = useState(null)

    useEffect(() => {
        if (selectedFile) {
            setFiles(files => [...files, { file: selectedFile, description: '', displaySectionId: section.id }])
        }
    }, [selectedFile])

    return (
        <>
                <Card
                    style={{ width: '80%', margin: 'auto', marginTop: '2rem', marginBottom: '2rem' }}
                    className="border"
                    outline
                    color="primary"
                    xl="6"
                    lg="6"
                >
                    <CardBody>
                        <CardTitle>
                            {section.name}
                        </CardTitle>
                        <Row style={{ marginBottom: "1rem" }}>
                            {customValues.map((field, index) => {
                                if (field.displayCustomField.displaySectionId === section.id) {
                                    return (
                                        <Col lg="6" xl="6" key={index}>
                                            <label> {field.displayCustomField.name} </label>
                                            <input
                                                className="form-control"
                                                type={field.displayCustomField.type === "String" && "text" || field.displayCustomField.type === "Date" && "date" || field.displayCustomField.type === "Integer" && "number" || field.displayCustomField.type === "Double" && "number"}
                                                placeholder={field.displayCustomField.name}
                                                defaultValue={customValues[index].value}
                                                onChange={(e) => { customValues[index].value = e.target.value }}
                                            />
                                        </Col>
                                    )
                                }
                            }
                            )}
                        </Row>
                        <ImageUpload
                            selectedFile={selectedFile}
                            setselectedFile={setselectedFile}
                        />
                        <Row style={{ marginTop: '1rem' }}>
                            {displayData?.map((file, index) => {
                                if (file?.displaySectionId === section.id) {
                                    return (
                                        <Col key={index} xl="3" lg="3" style={{ marginTop: '1rem' }}>
                                            <img
                                                style={{ width: '100%', height: '12rem' }}
                                                data-dz-thumbnail=""
                                                className="avatar-sm rounded bg-light"
                                                alt=""
                                                src={file.path}
                                            />
                                            <Input
                                                type="textarea"
                                                maxLength="225"
                                                rows="2"
                                                placeholder="description..."
                                                value={file.description}
                                                readOnly
                                            />
                                        </Col>
                                    )
                                }
                            })}
                            {files?.map((file, index) => {
                                if (file?.displaySectionId === section.id) {
                                    return (
                                        <Col key={index} xl="3" lg="3" style={{ marginTop: '1rem' }}>
                                            <img
                                                style={{ width: '100%', height: '12rem' }}
                                                data-dz-thumbnail=""
                                                className="avatar-sm rounded bg-light"
                                                alt={file.file?.name}
                                                src={file.file?.preview}
                                            />
                                            <Input
                                                type="textarea"
                                                id="textarea"
                                                onChange={e => { file.description = e.target.value }}
                                                maxLength="225"
                                                rows="2"
                                                placeholder="description..."
                                            />
                                            <Button
                                                color='danger'
                                                style={{ width: '100%' }}
                                                onClick={() => { setFiles(files.filter((file, i) => i !== index)) }}
                                            >
                                                Delete{' '}
                                                <i className='bx bx-trash' />
                                            </Button>
                                        </Col>
                                    )
                                }
                            })}
                        </Row>
                    </CardBody>
                </Card>
        </>
    )
}

export default DisplayBody
