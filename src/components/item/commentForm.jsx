import { useParams } from 'react-router-dom'
import { useState, useContext } from 'react'
import { backend } from '../../config'
import { ThemeContext } from '../../contexts/themeContext'
import { RequestContext } from '../../contexts/requestContext'
import { LangContext } from '../../contexts/langContext'

function CommentForm(){
    const { l} = useContext(LangContext)
    const { itemId } = useParams()
    const [text, setText] = useState('')
    const { request } = useContext(RequestContext)
    const { ti } = useContext(ThemeContext)

    function handleClick(){
        setText('')
        request(
            `${backend}/api/comment/${itemId}`, 
            'post', 
            null, 
            {text}
        )
    }

    return(
        <div className="px-5 pt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-sm-10 col-12">
                    <textarea
                        value={text}
                        onChange={e=>setText(e.target.value)}
                        className={"form-control"+ti()} 
                        placeholder="write a comment" 
                    />
                    <div className="text-end pt-2">
                        <button 
                            disabled={!text}
                            className="btn btn-primary px-3"
                            onClick={handleClick}
                        >
                            {l('Leave a comment', 'Оставить комментарий')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CommentForm }