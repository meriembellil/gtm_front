import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Table } from 'reactstrap'
import CreateFamily from './CreateFamily'

export default function Families(props) {

    const { families, selectedFamily, setSelectedFamily, getFamilies } = props
    const [filtredFamilies, setFiltredFamilies] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        setFiltredFamilies(families)
    }, [families])

    useEffect(async () => {
        setFiltredFamilies(families?.filter(family => {
            return family.name.toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1;
        }))
    }, [keyword])

    return (
        <Col>
            <h5>Families</h5>
            <CreateFamily getFamilies={getFamilies}/>
            <div className="app-search">
                <div style={{ margin: "auto" }} >
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Family..."
                        value={keyword}
                        onChange={(e)=>{setKeyword(e.target.value)}}
                    />
                </div>
            </div>
            <div className="table-responsive" style={{ marginBottom: "3rem" }}>
                <Table className="table mb-0">
                    <tbody>
                        {filtredFamilies.map((family, index) => (
                            <tr key={index}>
                                <td>
                                    {family.name}
                                </td>
                                <td>
                                    {selectedFamily !== family.id &&
                                        <Link to="#" onClick={() => { setSelectedFamily(family.id) }}>select...</Link>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Col>
    )
}
