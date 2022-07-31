import React, { useEffect, useState } from 'react'
import AvField from 'availity-reactstrap-validation/lib/AvField'
import { Col, Label, Row } from 'reactstrap'
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAsync, getFamiliesAsync } from 'store/categories-families/actions';

const brandOptions = []
const categoryOptions = []
const familyOptions = []

export default function Form(props) {

    const { product, setProduct } = props
    const dispatch = useDispatch()
    const brands = useSelector(state => state.Brands.brands)
    const categories = useSelector(state => state.Families.categories)
    const families = useSelector(state => state.Families.families)
    const [selectedBrand, setselectedBrand] = useState(null)
    const [selectedCategory, setselectedCategory] = useState(null)
    const [selectedFamily, setselectedFamily] = useState(null)
    const [familyId, setFamilyId] = useState(null)

    function handleSelectCategory(selectedCategory) {
        setselectedCategory(selectedCategory)
    }

    function handleSelectBrand(selectedBrand) {
        setselectedBrand(selectedBrand)
    }

    function handleSelectFamily(selectedFamily) {
        setselectedFamily(selectedFamily)
    }

    useEffect(async () => {
        dispatch(await getFamiliesAsync()).payload.families
        if (product?.category?.familyId) {
            dispatch(await getCategoriesAsync(product?.category?.familyId)).payload.categories
        }
        brandOptions?.find((str) => {
            if (str.value === product?.brand?.name)
                setselectedBrand(str)
        });
        categoryOptions?.find((str) => {
            if (str.value === product?.category?.name)
                setselectedCategory(str)
        });
        familyOptions?.find((str) => {
            if (str.value === product?.category?.family?.name)
                setselectedFamily(str)
        });
    }, [product])

    useEffect(() => {
        if (brandOptions.length === 0) {
            brands?.map((brand) => {
                brandOptions.push({ ...brand, value: brand.name, label: brand.name })
            })
        }
    }, [])

    useEffect(() => {
        categoryOptions.splice(0, categoryOptions.length)
        categories?.map((category) => {
            categoryOptions.push({ ...category, value: category.name, label: category.name })
        })
    }, [categories])

    useEffect(() => {
        if (familyOptions.length === 0) {
            families?.map((family) => {
                familyOptions.push({ ...family, value: family.name, label: family.name })
            })
        }
    }, [families])

    useEffect(async () => {
        if (familyId) {
            dispatch(await getCategoriesAsync(familyId)).payload.categories
        }
    }, [familyId])

    return (
        <>
            <Col sm="6">
                <AvField
                    className="mb-3"
                    name="label"
                    label="Label"
                    placeholder="Label"
                    type="text"
                    errorMessage="Label is required."
                    validate={{ required: { value: true } }}
                    value={product.label}
                    onChange={(e) => { setProduct({ ...product, label: e.target.value }) }}
                />
            </Col>
            <Col sm="6">
                <div className="mb-3">
                    <Label>Brand</Label>
                    <Select
                        placeholder="Type"
                        options={brandOptions}
                        classNamePrefix="select2-selection"
                        value={selectedBrand}
                        onChange={(e) => { handleSelectBrand(); setProduct({ ...product, brandId: e.id }) }}
                    />
                </div>
            </Col>
            <Col sm="6">
                <div className="mb-3">
                    <Label>Family</Label>
                    <Select
                        placeholder="Type"
                        options={familyOptions}
                        classNamePrefix="select2-selection"
                        value={selectedFamily}
                        onChange={(e) => { handleSelectFamily(); setFamilyId(e.id) }}
                    />
                </div>
            </Col>
            <Col sm="6">
                <div className="mb-3">
                    <Label>Category</Label>
                    <Select
                        placeholder="Type"
                        options={categoryOptions}
                        classNamePrefix="select2-selection"
                        value={selectedCategory}
                        onChange={(e) => { handleSelectCategory(); setProduct({ ...product, categoryId: e.id }) }}
                    />
                </div>
            </Col>
            <Col sm="6">
                <AvField
                    type="select"
                    name="select"
                    label="Typology"
                    placeholder="test"
                    errorMessage="Typology is required."
                    validate={{ required: { value: true } }}
                    value={product.typology}
                    onChange={(e) => { setProduct({ ...product, typology: parseInt(e.target.value) }) }}
                >
                    <option>Typologies</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </AvField>
            </Col>
            <Col sm="6">
                <AvField
                    className="mb-3"
                    name="barcode"
                    label="Barcode"
                    placeholder="Barcode"
                    type="text"
                    errorMessage="Barcode is required."
                    validate={{ required: { value: true } }}
                    value={product.barcode}
                    onChange={(e) => { setProduct({ ...product, barcode: e.target.value }) }}
                />
            </Col>
        </>
    )
}
