import React, { useEffect, useState } from 'react'
import { MetaTags } from 'react-meta-tags'
import { Container, Row } from 'reactstrap'
import Breadcrumbs from "components/Common/Breadcrumb"
import CreateBrand from './components/CreateBrand'
import { useDispatch } from 'react-redux'
import { getBrandsAsync } from 'store/brand/actions'
import Brand from './components/Brand'

export default function BrandsList() {

    const dispatch = useDispatch()
    const [brands, setBrands] = useState([])

    const getBrands = async () => {
        setBrands(dispatch(await getBrandsAsync()).payload.brands)
    }

    useEffect(async () => {
        await getBrands()
    }, [])

    return (
        <div className="page-content" >
            <MetaTags>
                <title>Brand list</title>
            </MetaTags>
            <Container fluid >
                <Breadcrumbs title="Settings" breadcrumbItem="Brand list" />
                <Row>
                    <CreateBrand getBrands={getBrands} />
                    {brands.map((brand, index) => {
                        return (
                            <Brand key={index} brand={brand} getBrands={getBrands} />
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}