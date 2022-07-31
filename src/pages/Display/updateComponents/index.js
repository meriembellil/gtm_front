import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Modal, Label, Button } from "reactstrap"
import { getCategoriesList } from 'store/categories-families/services'
import { getBrandsAsync } from 'store/brand/actions'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import StoresModal from './StoresModal'
import DisplayBody from './DisplayBody'
import { upsertDisplay } from 'store/display/services'

const UpdateDetail = (props) => {

    const { display, getAsyncDisplayList } = props
    const dispatch = useDispatch()
    const [modal_fullscreen, setmodal_fullscreen] = useState(false)
    const [customValues, setCustomValues] = useState(display.displayCustomFieldValues)
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedBrand, setSelectedBrand] = useState(display?.brandId)
    const [selectedCategory, setSelectedCategory] = useState(display?.categoryId)
    const [selectedStore, setSelectedStore] = useState(display.store)
    const [files, setFiles] = useState([])

    function tog_fullscreen() {
        setmodal_fullscreen(!modal_fullscreen)
        document.body.classList.add("no_padding")
    }

    const updateDisplay = () => {
        upsertDisplay(
            {
                ...display,
                storeId: selectedStore.id,
                categoryId: selectedCategory?.value,
                brandId: selectedBrand?.value
            },
            files,
            customValues
        ).then(() => {
            tog_fullscreen()
            getAsyncDisplayList()
        })
    }

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

    useEffect(() => {
        getBrandList()
        getCategories()
    }, [])

    useEffect(() => {
        if (display) {
            categories?.find((str) => {
                if (str.value === display?.category?.id)
                    setSelectedCategory(str)
            })
            brands?.find((str) => {
                if (str.value === display?.brand?.id)
                    setSelectedBrand(str)
            })
        }
    }, [categories.length, brands.length])

    return (
        <>
            <Link
                to="#"
                style={{ fontSize: "1.3rem", marginRight: "1rem" }}
                onClick={() => { tog_fullscreen(); }}
            >
                <i className="bx bx-edit-alt" />
            </Link>
            <Modal
                size="xl"
                isOpen={modal_fullscreen}
                toggle={() => { tog_fullscreen() }}
            >
                <div className="modal-header">
                    <h5
                        className="modal-title mt-0"
                        id="exampleModalFullscreenLabel"
                    >
                        {"Display detail"}
                    </h5>
                    <button
                        onClick={() => { setmodal_fullscreen(false) }}
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row justify-content-center">
                        <div className="col-xl-9">
                            <div className="text-center">
                                <div className="mb-4">
                                    <Link
                                        to="#"
                                        className="badge bg-light font-size-12"
                                    >
                                        <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                                        {display.displayType.name}
                                    </Link>
                                </div>
                                <h4>{"Merchandiser : " + display.user.first_name + " " + display.user.last_name}</h4>
                                {selectedStore ? (
                                    <h4>{"Store : " + selectedStore.name + ", " + selectedStore.address + " - " + selectedStore.governorate}</h4>
                                ) : (
                                    <h4>{"Store : " + display.store.name + ", " + display.store.address + " - " + display.store.governorate}</h4>
                                )}
                                <p className="text-muted mb-4">
                                    <i className="mdi mdi-calendar me-1"></i> {new Date(display.createdAt).toUTCString().slice(0, 22)}
                                </p>
                                <StoresModal
                                    selectedStore={selectedStore}
                                    setSelectedStore={setSelectedStore}
                                />
                            </div>
                            {(display.category?.name || display.brand?.name) &&
                                <>
                                    <hr />
                                    <div className="text-center">
                                        <Row>
                                            {display.category?.name &&
                                                <Col>
                                                    <Label>Category</Label>
                                                    <div style={{ width: "35%", margin: "auto" }}>
                                                        <Select
                                                            classNamePrefix="select2-selection"
                                                            placeholder="Choose Category..."
                                                            options={categories}
                                                            value={selectedCategory}
                                                            onChange={(e) => setSelectedCategory(e)}
                                                        />
                                                    </div>
                                                </Col>
                                            }
                                            {display.brand?.name &&
                                                <Col>
                                                    <Label>Brand</Label>
                                                    <div style={{ width: "35%", margin: "auto" }}>
                                                        <Select
                                                            classNamePrefix="select2-selection"
                                                            placeholder="Choose Brand..."
                                                            options={brands}
                                                            value={selectedBrand}
                                                            onChange={(e) => setSelectedBrand(e)}
                                                        />
                                                    </div>
                                                </Col>
                                            }
                                        </Row>
                                    </div>
                                    <hr />
                                </>
                            }
                            {display.displayType.displaySections.map((section, index) => (
                                <DisplayBody
                                    key={index}
                                    section={section}
                                    displayData={display.displayData}
                                    customValues={customValues}
                                    files={files}
                                    setFiles={setFiles}
                                />
                            ))}

                        </div>
                    </div>
                    <Button
                        color='primary'
                        style={{ marginTop: '1rem', float: 'right' }}
                        onClick={() => { updateDisplay() }}
                    >
                        Edit display
                    </Button>
                </div>
            </Modal>
        </>
    )
}
export default UpdateDetail