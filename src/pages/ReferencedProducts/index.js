import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { Button, Card, CardBody, Col, Container, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap"
import classnames from "classnames"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import FirstPart from "./firstPartComponents";
import SecondPart from "./secondPartComponents";
import ThirdPart from "./thirdPartComponents";
import { upsertReferencedProducts } from "store/referencedProduct/services";
import Swal from 'sweetalert2'

const ReferencedProducts = () => {

    const [activeTab, setactiveTab] = useState(1)
    const [chosenStores, setChosenStores] = useState([])
    const [chosenProducts, setChosenProducts] = useState([])

    function toggleTab(tab) {
        if (activeTab !== tab) {
            if (tab >= 1 && tab <= 3) {
                setactiveTab(tab)
            }
        }
    } 

    const saveRef = () => {
        let referencedProducts = []
        chosenStores.forEach((store) => {
            chosenProducts.forEach((product) => {
                referencedProducts.push({ storeId: store.id, productId: product.id, available: true }) 
            });
        });
        upsertReferencedProducts(referencedProducts).then(() => {
            toggleTab(1)
            setChosenProducts([])
            setChosenStores([])
            Swal.fire(
                'Referenced!',
                'Products referenced successfully.',
                'success'
            )
        })
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Referenced Product</title>
                </MetaTags>
                <Container fluid={true}>
                    <Breadcrumbs title="products referencing" breadcrumbItem="Referenced product management" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title mb-4">Referenced product management</h4> 

                                    <div className="wizard clearfix">
                                        <div className="steps clearfix"> 
                                            <ul>
                                                <NavItem
                                                    onClick={() => { toggleTab(1) }}
                                                    className={classnames({ current: activeTab === 1 })}   
                                                >
                                                    <NavLink
                                                        className={classnames({ current: activeTab === 1 })}
                                                    >
                                                        <span className="number">01</span>{" "} Choose stores
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem
                                                    onClick={() => { toggleTab(2) }}
                                                    className={classnames({ current: activeTab === 2 })}
                                                >
                                                    <NavLink
                                                        className={classnames({ active: activeTab === 2 })}
                                                    >
                                                        <span className="number ms-2">02</span>{" "} Choose products
                                                    </NavLink> 
                                                </NavItem>
                                                <NavItem
                                                    onClick={() => { toggleTab(3) }}
                                                    className={classnames({ current: activeTab === 3 })}
                                                >
                                                    <NavLink
                                                        className={classnames({ active: activeTab === 3 })}
                                                    >
                                                        <span className="number">03</span>{" "} Referencing detail
                                                    </NavLink>
                                                </NavItem>
                                            </ul>
                                            <div className="mt-4">
                                                <TabContent activeTab={activeTab}>
                                                    <TabPane tabId={1}>
                                                        <FirstPart
                                                            chosenStores={chosenStores}
                                                            setChosenStores={setChosenStores}
                                                        />
                                                    </TabPane>
                                                    <TabPane tabId={2}>
                                                        <SecondPart
                                                            chosenProducts={chosenProducts}
                                                            setChosenProducts={setChosenProducts}
                                                        />
                                                    </TabPane>
                                                    <TabPane tabId={3}>
                                                        <ThirdPart
                                                            chosenStores={chosenStores}
                                                            setChosenStores={setChosenStores}
                                                            chosenProducts={chosenProducts}
                                                            setChosenProducts={setChosenProducts}
                                                        />
                                                    </TabPane>
                                                </TabContent> 
                                            </div>
                                            <div className="actions clearfix" style={{ marginTop: "2rem" }}>
                                                <ul>
                                                    <l  i>
                                                        <Button
                                                            className="btn btn-primary"
                                                            color="primary"
                                                            disabled={activeTab === 1}
                                                            onClick={() => { toggleTab(activeTab - 1) }}
                                                        >
                                                            Previous
                                                        </Button> 
                                                    </l>
                                                    <li>
                                                        <Button
                                                            className="btn btn-primary"
                                                            color="primary"
                                                            disabled={
                                                                activeTab === 3 &&
                                                                (
                                                                    chosenStores.length === 0 ||
                                                                    chosenProducts.length === 0
                                                                )
                                                            }
                                                            onClick={() => {
                                                                if (activeTab < 3) {
                                                                    toggleTab(activeTab + 1)
                                                                } else {
                                                                    saveRef()
                                                                }
                                                            }}
                                                        >
                                                            {activeTab === 1 && 'Choose products'}
                                                            {activeTab === 2 && 'Referencing detail'}
                                                            {activeTab === 3 && 'Save'}
                                                        </Button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default ReferencedProducts