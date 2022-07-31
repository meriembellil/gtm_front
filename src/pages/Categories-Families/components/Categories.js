import React, { useEffect, useState } from 'react'
import { Col, Table } from 'reactstrap'
import CreateCategory from './CreateCategory'

export default function Categories(props) {

    const { selectedFamily, categories, getCategories } = props
    const [filtredCategories, setFiltredCategories] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        setFiltredCategories(categories)
    }, [categories])

    useEffect(async () => {
        setFiltredCategories(categories?.filter(category => {
            return category.name.toString().toLowerCase().indexOf(keyword.toString().toLowerCase()) !== -1;
        }))
    }, [keyword])

    return (
        <Col>

            {selectedFamily ? (
                <>
                    <h5 >Categories</h5>
                    <CreateCategory
                        selectedFamily={selectedFamily}
                        getCategories={getCategories}
                    />
                    <div className="app-search">
                        <div style={{ margin: "auto" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category..."
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="table-rep-plugin">
                        <div
                            className="table-responsive mb-0"
                            data-pattern="priority-columns"
                        >
                            <Table
                                id="tech-companies-1"
                                className="table table-striped table-bordered"
                            >
                                <tbody>
                                    {filtredCategories.map((category, index) => (
                                        <tr key={index}>
                                            <td> {category.name} </td>
                                            <td><p style={{ float: "right" }}>a</p></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </>
            ) : (
                <h3 style={{ margin: "auto", width: "60%", marginTop: "10rem" }}>Choose family to manage categories</h3>
            )
            }
        </Col>
    )
}