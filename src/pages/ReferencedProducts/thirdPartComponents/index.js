import React, { useState } from 'react'
import { Collapse } from 'reactstrap'
import ProductList from './ProductList'
import StoreList from './StoreList'

const ThirdPart = (props) => {

    const { chosenStores, setChosenStores, chosenProducts, setChosenProducts } = props
    const [col, setCol] = useState(0)

    return (
        <div>
            {chosenStores.length > 0 && chosenProducts.length > 0 ? (
                <>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className={col === 1 ? ("accordion-button fw-medium") : ("accordion-button fw-medium collapsed")}
                                type="button"
                                style={{ cursor: "pointer" }}
                                onClick={() => { if (col !== 1) { setCol(1) } else { setCol(0) } }}
                            >
                                Store list
                            </button>
                        </h2>
                        <Collapse isOpen={col === 1} className="accordion-collapse">
                            <StoreList
                                chosenStores={chosenStores}
                                setChosenStores={setChosenStores}
                            />
                        </Collapse>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className={col === 2 ? ("accordion-button fw-medium") : ("accordion-button fw-medium collapsed")}
                                type="button"
                                style={{ cursor: "pointer" }}
                                onClick={() => { if (col !== 2) { setCol(2) } else { setCol(0) } }}
                            >
                                Product list
                            </button>
                        </h2>
                        <Collapse isOpen={col === 2} className="accordion-collapse">
                            <ProductList
                                chosenProducts={chosenProducts}
                                setChosenProducts={setChosenProducts}
                            />
                        </Collapse>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <div className="mb-4">
                        <i className="mdi mdi-alert-outline me-2 text-warning display-4" />
                    </div>
                    <div>
                        <h5>missing data</h5>
                        <p className="text-muted">
                            please select at least one product and one store
                        </p>
                    </div>
                </div>
            )
            }
        </div>
    )
}
export default ThirdPart