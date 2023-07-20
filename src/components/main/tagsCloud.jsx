import { useState, useEffect } from 'react'
import { backend } from '../../config'
import { Link } from 'react-router-dom'
import loadingGif from '../adminPanel/static/loading.gif'

function TagsCloud(){
    const [ tags, setTags ] = useState('loading');
    
    useEffect(()=>{
        const cb = res => setTags(res.tags)
        fetch(`${backend}/api/tag/popular`)
            .then(a=>a.json())
            .then(cb)
    }, [])

    if(tags === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }

    return(
        <div className="px-4">
            { tags.map(i=>
                <Link
                    to={`/items-by-tag/${i._id}`}
                    key={i._id} 
                    className="btn btn-info ms-1 mt-1 rounded-pill"
                >
                    {i.name}
                </Link>
            )}
        </div>
    )
}

export { TagsCloud }