import React, { useEffect, useState } from 'react'
import { MetaTags } from 'react-meta-tags'
import { Card, CardBody, CardTitle, Container, Row } from 'reactstrap'
import Breadcrumbs from "components/Common/Breadcrumb"
import Families from './components/Families'
import Categories from './components/Categories'
import { useDispatch } from 'react-redux'
import { getCategoriesAsync, getFamiliesAsync } from 'store/categories-families/actions'

export default function CategoriesFamilies() {

    const dispatch = useDispatch()
    const [families, setFamilies] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedFamily, setSelectedFamily] = useState(null)

    const getFamilies = async () => {
        setFamilies(dispatch(await getFamiliesAsync()).payload.families)
    }

    const getCategories = async () => {
        setCategories(dispatch(await getCategoriesAsync(selectedFamily)).payload.categories)
    }

    useEffect(async () => {
        await getFamilies();
    }, [])

    useEffect(async () => {
        if (selectedFamily) {
            await getCategories();
        }
    }, [selectedFamily])

    return (
        <div className="page-content">
            <MetaTags>
                <title>Categories & families management</title>
            </MetaTags>
            <Container fluid>
                <Breadcrumbs title="Settings" breadcrumbItem="Categories & families management" />
                <Card>
                    <CardBody>
                        <CardTitle>Categories & families management</CardTitle>
                        <Row style={{ marginTop: "3rem" }}>
                            <Families
                                families={families}
                                selectedFamily={selectedFamily}
                                setSelectedFamily={setSelectedFamily}
                                getFamilies={getFamilies}
                            />
                            <Categories
                                selectedFamily={selectedFamily}
                                categories={categories}
                                getCategories={getCategories}
                            />
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}
