import React, { useEffect, useState } from 'react'
import { MetaTags } from 'react-meta-tags'
import { Container, Row } from 'reactstrap'
import Breadcrumbs from "components/Common/Breadcrumb"
import CreateGroup from './components/CreateGroup'
import { useDispatch } from 'react-redux'
import { getStoreGroupsAsync } from 'store/storeGroup/actions'
import Group from './components/Group'

export default function StoreGroupeList() {

    const dispatch = useDispatch()
    const [storeGroups, setStoreGroups] = useState([])

    const getStoreGroups = async () => {
        setStoreGroups(dispatch(await getStoreGroupsAsync()).payload.storeGroups)
    }

    useEffect(() => {
        getStoreGroups()
    }, [])

    return (
        <>
            <div className="page-content" >
                <MetaTags>
                    <title>Group list</title>
                </MetaTags>
                <Container fluid >
                    <Breadcrumbs title="Settings" breadcrumbItem="Group list" />
                    <Row>
                        <CreateGroup getStoreGroups={getStoreGroups}/>
                        {storeGroups.map((group, index)=>{
                            return (
                                <Group key={index} group={group} getStoreGroups={getStoreGroups}/>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </>
    )
}
