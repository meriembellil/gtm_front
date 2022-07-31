import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { Button, Card, CardBody, CardTitle, Col, Label, Row } from 'reactstrap'
import ErrorAlert from 'shared/ErrorAlert'
import { getBrandsAsync } from 'store/brand/actions'
import { getCategoriesList } from 'store/categories-families/services'
import { upsertDisplay } from 'store/display/services'
import DisplayData from './DisplayData'

const DisplayBody = (props) => {

    const { selectedType, store, visitId, tog_fullscreen } = props
    const dispatch = useDispatch()
    const userId = useSelector(state => state.User?.user?.id)
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [files, setFiles] = useState([])
    const [customValues, setCustomValues] = useState([])
    const [errorMessage, setErrorMessage] = useState(null);

    const getBrands = async () => {
        return dispatch(await getBrandsAsync()).payload.brands
    }

    const getBrandList = async () => {
        getBrands().then((data) => {
            data.forEach(element => {
                setBrands(brands => [...brands, { value: element.id, label: element.name }])
            });
        })
    }

    const getCategories = async () => {
        getCategoriesList().then((data) => {
            data.forEach(element => {
                setCategories(categories => [...categories, { value: element.id, label: element.name }])
            });
        })
    }

    const createDisplay = () => {
        upsertDisplay(
            {
                storeId: store.id,
                userId: userId,
                displayTypeId: selectedType.id,
                categoryId: selectedCategory,
                brandId: selectedBrand,
                visitId: visitId
            },
            files,
            customValues
        ).then(() => {
            tog_fullscreen()
        })
    }

    useEffect(() => {
        getBrandList()
        getCategories()
    }, [])

    return (
        <Card outline className="border">
            <CardBody>
                <CardTitle style={{ marginBottom: '2rem' }}>
                    {selectedType.name}
                </CardTitle>
                {(selectedType.withBrand || selectedType.withCategory) &&
                    <Row>
                        {selectedType.withCategory &&
                            <Col lg="6">
                                <div>
                                    <Label>Choose Category</Label>
                                    <Select
                                        classNamePrefix="select2-selection"
                                        placeholder="Choose Category..."
                                        options={categories}
                                        onChange={(e) => setSelectedCategory(e.value)}
                                    />
                                </div>
                            </Col>
                        }
                        {selectedType.withBrand &&
                            <Col lg="6">
                                <div>
                                    <Label>Choose Brand</Label>
                                    <Select
                                        classNamePrefix="select2-selection"
                                        placeholder="Choose Brand..."
                                        options={brands}
                                        onChange={(e) => setSelectedBrand(e.value)}
                                    />
                                </div>
                            </Col>
                        }
                    </Row>
                }
                {selectedType.displaySections.map((section, index) => (
                    <DisplayData
                        key={index}
                        section={section}
                        files={files}
                        setFiles={setFiles}
                        customValues={customValues}
                        setCustomValues={setCustomValues}
                    />
                ))}
                {errorMessage &&
                    <ErrorAlert errorMessage={errorMessage} />
                }
                <Button
                    color='primary'
                    style={{ marginTop: '1rem', marginBottom: '-1rem', float: 'right' }}
                    onClick={() => { createDisplay() }}
                >
                    Add display
                </Button>
            </CardBody>
        </Card>
    )
}
export default DisplayBody