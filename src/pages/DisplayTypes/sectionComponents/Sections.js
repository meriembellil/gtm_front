import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row, Table } from 'reactstrap'
import { getDisplaySectionsBydisplayTypeIdAsync } from 'store/display/actions'
import { Tbody, Th, Thead, Tr } from 'react-super-responsive-table';
import CreateSection from './CreateSection';
const Sections = (props) => {

    const { selectedType } = props
    const dispatch = useDispatch()
    const [sections, setSections] = useState([])
    const [filtredSections, setFiltredSections] = useState([]);
    const [keyword, setKeyword] = useState("")

    const getSections = async () => {
        return dispatch(await getDisplaySectionsBydisplayTypeIdAsync(selectedType)).payload.displaySections
    }

    const getSectionsAsync = async () => {
        getSections().then((data) => {
            setSections(data)
            setFiltredSections(data)
        })
    }

    useEffect(async () => {
        if (selectedType) {
            await getSectionsAsync()
        }
    }, [selectedType])

    useEffect(async () => {
        setFiltredSections(sections?.filter(section => {
            return section.name.toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1;
        }))
    }, [keyword])

    return (
        <Col>
            {!selectedType ? (
                <h3 style={{ margin: "auto", width: "50%", marginTop: "8rem" }}>Choose Type to manage Sections</h3>
            ) : (
                <Row>
                    <Col>
                        <h5>Sections</h5>
                    </Col>
                    <CreateSection
                        selectedType={selectedType}
                        getSectionsAsync={getSectionsAsync}
                    />
                    <div className="app-search">
                        <div style={{ margin: "auto" }} >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Section..."
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value) }}
                            />
                        </div>
                    </div>
                    <Table className="table table-striped table-bordered">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filtredSections.map((section, index) => (
                                <tr key={index}>
                                    <td>
                                        {section.name}
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </Tbody>
                    </Table>
                </Row>
            )}
        </Col>
    )
}

export default Sections
