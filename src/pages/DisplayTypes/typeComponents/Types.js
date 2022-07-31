import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row, Table } from 'reactstrap'
import { getDisplayTypesAsync } from 'store/display/actions'
import { Tbody, Th, Thead, Tr } from 'react-super-responsive-table';
import { Link } from 'react-router-dom';
import CreateType from './CreateType';

const Types = (props) => {

    const { selectedType, setSelectedType } = props
    const dispatch = useDispatch()
    const [types, setTypes] = useState([])
    const [filtredTypes, setFiltredTypes] = useState([]);
    const [keyword, setKeyword] = useState("");

    const getTypes = async () => {
        return dispatch(await getDisplayTypesAsync()).payload.displayTypes
    }

    const getTypesAsync = async () => {
        getTypes().then((data) => {
            setTypes(data)
            setFiltredTypes(data)
        })
    }

    useEffect(() => {
        getTypesAsync()
    }, [])

    useEffect(async () => {
        setFiltredTypes(types?.filter(type => {
            return type.name.toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1;
        }))
    }, [keyword])

    return (
        <Col>
            <Row>
                <Col>
                    <h5>Types</h5>
                </Col>
                <CreateType
                    getTypesAsync={getTypesAsync}
                />
            </Row>
            <div className="app-search">
                <div style={{ margin: "auto" }} >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type..."
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                    />
                </div>
            </div>
            <Table className="table table-striped table-bordered">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>With brand</Th>
                        <Th>With category</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filtredTypes.map((type, index) => (
                        <tr key={index}>
                            <td>
                                {type.name}
                            </td>
                            <td>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={type.withBrand}
                                />
                            </td>
                            <td>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={type.withCategory}
                                />
                            </td>
                            <td>
                                <Link to="#" onClick={() => { setSelectedType(type.id) }}>
                                    {selectedType === type.id ? ("") : ("select...")}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </Tbody>
            </Table>
        </Col>
    )
}

export default Types
