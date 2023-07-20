import { useState, useEffect } from 'react'
import { backend } from '../../config'
import { CollectionsTable } from '../collectionsTable/collectionsTable'

function BiggestCollections(){
    const [ collections, setCollections ] = useState('loading')

    useEffect(()=>{
        const cb = res => setCollections(res.collections)
        fetch(`${backend}/api/collection/5largest`)
            .then(a=>a.json())
            .then(cb)
    }, [])

    return <CollectionsTable collections={collections} />
}

export { BiggestCollections }