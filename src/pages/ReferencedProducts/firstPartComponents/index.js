import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Collapse } from 'reactstrap'
import { getStoreGroupsAsync } from 'store/storeGroup/actions'
import StoresTable from './StoresTable'

const FirstPart = (props) => {

    const { chosenStores, setChosenStores } = props
    const dispatch = useDispatch()
    const [col, setCol] = useState(0)
    const [storeGroups, setStoreGroups] = useState([])

    const getStoreGroups = async () => {
        setStoreGroups(dispatch(await getStoreGroupsAsync()).payload.storeGroups)
    }

    useEffect(() => {
        getStoreGroups()
    }, [])

    return (
        <>
            {storeGroups.map((group, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className={col === index + 1 ? ("accordion-button fw-medium") : ("accordion-button fw-medium collapsed")}
                            type="button"
                            style={{ cursor: "pointer" }}
                            onClick={() => { if (col !== index + 1) { setCol(index + 1) } else { setCol(0) } }}
                        >
                            {group.name}
                        </button>
                    </h2>
                    <Collapse isOpen={col === index + 1} className="accordion-collapse">
                        <StoresTable
                            key={index}
                            i={index}
                            stores={group.stores}
                            chosenStores={chosenStores}
                            setChosenStores={setChosenStores}
                            setCol={setCol}
                        />
                    </Collapse>
                </div>
            ))}
        </>
    )
}

export default FirstPart
