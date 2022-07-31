import AvField from 'availity-reactstrap-validation/lib/AvField'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col } from 'reactstrap'
import { getStoreGroupsAsync } from 'store/storeGroup/actions'

export default function CreateForm(props) {
    
    const { internalCodes } = props
    const dispatch = useDispatch()
    const [storeGroups, setStoreGroups] = useState([])

    useEffect(async () => {
        setStoreGroups(dispatch(await getStoreGroupsAsync()).payload.storeGroups)
    }, [])

    useEffect(() => {
        if (storeGroups.length>0) {
            storeGroups.map((sg) => {
                internalCodes.push({ storeGroup: sg, storeGroupId:sg.id, code: 0 })
            })
        }
    }, [storeGroups])

    return (
        <>
            {internalCodes?.map((group, index) => {
                return (
                    <Col key={index} sm="6">
                        <AvField
                            className="mb-3"
                            name={"internal code " + group.storeGroup.name}
                            label={"Internal code " + group.storeGroup.name}
                            placeholder={"Internal code " + group.storeGroup.name}
                            type="text"
                            errorMessage="Internal code is required."
                            value={group.code}
                            onChange={(e) => { group.code = e.target.value }}
                        />
                    </Col>
                )
            })}
        </>
    )
}
