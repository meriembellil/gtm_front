import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Input, Row } from 'reactstrap'
import ImageUpload from 'shared/ImageUpload'

const DisplayData = (props) => {

    const { section, files, setFiles, customValues, setCustomValues } = props
    const [selectedFile, setselectedFile] = useState(null)

    useEffect(() => {
        if (selectedFile) {
            setFiles(files => [...files, { file: selectedFile, description: '', displaySectionId: section.id }])
        }
    }, [selectedFile])

    useEffect(() => {
        setFiles([])
        section.displayCustomFields.forEach((element) => {
            setCustomValues(customValues => [...customValues, { field: element, value: '', displayCustomFieldId: element.id }])
        });
    }, [section])

    return (
        <Card
            style={{ width: '80%', margin: 'auto', marginTop: '2rem', marginBottom: '2rem' }}
            className="border"
            outline
            color="primary"
        >
            <CardBody>
                <CardTitle>
                    {section.name}
                </CardTitle>
                <Row style={{ marginBottom: "1rem" }}>
                    {customValues.map((field, index) => {
                        if (field.field.displaySectionId === section.id) {
                            return (
                                <Col lg="6" xl="6" key={index}>
                                    <label> {field.field.name} </label>
                                    <input
                                        className="form-control"
                                        type={field.field.type === "String" && "text" || field.field.type === "Date" && "date" || field.field.type === "Integer" && "number" || field.field.type === "Double" && "number"}
                                        placeholder={field.field.name}
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
                    {files?.map((file, index) => {
                        if (file?.displaySectionId === section.id) {
                            return (
                                <Col key={index} xl="3" lg="3" style={{ marginTop: '1rem' }}>
                                    <img
                                        style={{ width: '100%', height: '14rem' }}
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
    )
}
export default DisplayData