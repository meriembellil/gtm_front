import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import CreateProduct from "./components/CreateProduct";
import { useDispatch } from "react-redux";
import { getProductsAsync } from "store/product/actions";
import { getBrandsAsync } from "store/brand/actions";
import UpdateProduct from "./components/UpdateProduct";
import ProductDetail from "./components/ProductDetail";
import Gallery from "shared/Gallery";

export default function ProductsList() {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        setProducts(dispatch(await getProductsAsync()).payload.products);
    }

    const getList = async () => {
        await getProducts().then(() => {
            $('#mydatatable').DataTable()
        })
    }

    useEffect(async () => {
        dispatch(await getBrandsAsync()).payload.brands
        await getList()
    }, [])

    return (
        <div className="page-content">
            <MetaTags>
                <title>Product list</title>
            </MetaTags>
            <div className="container-fluid">
                <Breadcrumbs title="Products" breadcrumbItem="Product List" />
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle>Product List </CardTitle>
                                <CreateProduct getProducts={getList} />
                                {products.length > 0 ? (
                                    <div className="table-rep-plugin" style={{ marginTop: "2rem" }}>
                                        <div
                                            className="table-responsive mb-0"
                                            data-pattern="priority-columns"
                                        >
                                            <Table
                                                id="mydatatable"
                                                className="table table-striped table-bordered"
                                            >
                                                <Thead>
                                                    <Tr>
                                                        <Th>Image</Th>
                                                        <Th>Label</Th>
                                                        <Th>Brand</Th>
                                                        <Th>Category</Th>
                                                        <Th>Typology</Th>
                                                        <Th>Actions</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {products?.map((product, index) => {
                                                        return (
                                                            <Tr key={index}>
                                                                <Td>
                                                                    <img
                                                                        src={product?.path}
                                                                        style={{ width: "4rem", height: "4rem" }}
                                                                    />
                                                                </Td>
                                                                <Td>
                                                                    <p style={{ marginTop: "1.5rem" }}> {product?.label} </p>
                                                                </Td>
                                                                <Td>
                                                                    <p style={{ marginTop: "1.5rem" }}> {product?.brand?.name} </p>
                                                                </Td>
                                                                <Td>
                                                                    <p style={{ marginTop: "1.5rem" }}> {product?.category?.name} </p>
                                                                </Td>
                                                                <Td>
                                                                    <p style={{ marginTop: "1.5rem" }}> {product?.typology} </p>
                                                                </Td>
                                                                <Td>
                                                                    <Row>
                                                                        <Col xl="3" lg="3">
                                                                            <UpdateProduct
                                                                                prod={product}
                                                                                getProducts={getProducts}
                                                                            />
                                                                        </Col>
                                                                        <Col xl="3" lg="3">
                                                                            <ProductDetail
                                                                                product={product}
                                                                            />
                                                                        </Col>
                                                                        <Col xl="3" lg="3">
                                                                            <div style={{ marginTop: "1.2rem" }}>
                                                                                <Gallery
                                                                                    pictures={product?.productPictures}
                                                                                />
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Td>
                                                            </Tr>
                                                        )
                                                    })}
                                                </Tbody>
                                            </Table>
                                        </div>
                                    </div>
                                ) : (
                                    <h1 style={{ width: "30%", margin: "auto", marginTop: "10rem", marginBottom: "10rem" }}>No products available</h1>
                                )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}