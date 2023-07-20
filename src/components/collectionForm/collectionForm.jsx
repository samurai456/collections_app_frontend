import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { useState, useContext, useEffect } from 'react'
import { modules, formats } from './quillConfig.js'
import { ItemFieldForm } from './itemFieldForm.jsx'
import { backend } from '../../config'
import { ToastContext } from '../../contexts/toastContext'
import { DragNDrop } from './dragNDrop'
import { useParams, useNavigate } from 'react-router-dom'
import loadingGif from '../adminPanel/static/loading.gif'
import { ThemeContext } from '../../contexts/themeContext.jsx'
import { PermissionContext } from '../../contexts/permissionContext.jsx'
import { RequestContext } from '../../contexts/requestContext.jsx'
import { LangContext } from '../../contexts/langContext.jsx'

function CollectionForm({initial}){
    const { l } = useContext(LangContext)
    const { request } = useContext(RequestContext)
    const {updatePermission} = useContext(PermissionContext)
    const navigate = useNavigate()
    const {authorId} = initial? {authorId: initial.author}: useParams()
    const [name, setName] = useState(initial?.name||'');
    const [description, setDescription] = useState(initial?.description||'');
    const [topic, setTopic] = useState(initial?.topic||'');
    const [img, setImg] = useState(initial?.img&&{name: initial.img, isUrl: true});
    const [fields, setFields] = useState(initial?.itemFields||[]);
    const initialUniqueKey = initial?.itemFields
        ?.reduce((a,i)=>a>i? a: i.key, 0) +1
    const [uniqueKey, setUniqueKey] = useState(initialUniqueKey||0);
    const [topicOptions, setTopicOptions] = useState('loading');
    const [showEmpty, setShowEmpty] = useState(false);
    const {setShowToast, setToastText} = useContext(ToastContext);
    const {ti} = useContext(ThemeContext)

    useEffect(()=>{
        const cb =res => {
            setTopicOptions([...res.topics, {name: 'other', _id: ''}])
            if(!initial) return setTopic(res.topics[0]._id)
            if(!res.topics.map(i=>i._id).includes(initial.topic)) setTopic('')
        }
        fetch(`${backend}/api/topic/all`)
            .then(a=>a.json())
            .then(cb)
    }, [])

    function handleAddField(){
        setUniqueKey(o=>o+1);
        setFields([
            ...fields.map(i=>({...i})), 
            {key: uniqueKey, name: '', type: 'number', options: []}
        ]);
    }

    function emptyFieldExist(){
        const fieldNamesFilled = fields.every(i=>i.name)
        const optionsFilled = fields.every(i=>(i.type==='options')? i.options.length: true)
        const descriptionFilled = />[^<]/i.test(description)
        return (!name || !descriptionFilled || !fieldNamesFilled || !optionsFilled)
    }

    function handleCreateCollection(){
        setShowEmpty(true)
        if(emptyFieldExist()){
            setShowToast(true)
            setToastText(l('fill empty fields','Заполните пустые поля'))
            return
        }
        if(!fieldNamesUnique()){
            setShowToast(true)
            setToastText(
                l('names of additional fields for items should be unique',
                'Названия дополнительных полей для айтемов должны быть уникальными')
            )
            return
        }
        submitForm()
    }

    function fieldNamesUnique(){
        const u = []
        return fields.every(i=>{
            if(u.includes(i.name)) return false
            u.push(i.name)
            return true
        })
    }

    function submitForm(){
        const fd = createFormData()
        setTopicOptions('loading')
        const cb = res=>{
            updatePermission(res.permission)
            if(res.type !== 'success'){
                setShowToast(true)
                setToastText(res.msg)
            }
            navigate(`/user-collections/${authorId}`)
        }
        const [ url, method ] = initial? 
            [ `${backend}/api/collection/${initial._id}`, 'put' ] :
            [ `${backend}/api/collection`, 'post' ]
        request(url, method, cb, fd)
    }

    function createFormData(){
        const fd = new FormData;
        fd.append('name', name);
        fd.append('description', description);
        fd.append('topic', topic);
        fd.append('img', img);
        if(!initial) fd.append('author', authorId)
        fd.append('itemFields', JSON.stringify(fields));
        return fd
    }

    if(topicOptions === 'loading'){
        return(
            <div className="row justify-content-center mt-5">
                <img src={loadingGif} className="col-xl-1 col-md-2 col-3" />
            </div>
        )
    }
    const labelStyle='col-xl-3 col-lg-3 col-md-3 col-auto text-end align-self-center';
    return(
        <div className="m-2 mt-4 row fs-5 pb-5" >
            <div className="row mb-4 justify-content-end">
                <button
                    onClick={()=>navigate(-1)}
                    className="btn btn-primary col-auto p-3 px-4"
                >
                    {l('Go back', 'Назад')}
                </button>
            </div>
            <div className="row p-0 m-0 mb-3">
                <div className={labelStyle}>{l('Collection name','Название коллекции')}: </div>
                <div className="col-xl-7 col-lg-8 col-md-9">
                    <input 
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className={ti()+"form-control fs-5" + ((!name&&showEmpty)?' is-invalid': '')} 
                    />
                </div>
            </div>
            <div className="row p-0 m-0 mb-3">
                <div className={labelStyle}>{l('Description','Описание')}: </div>
                <div className="col-xl-7 col-lg-8 col-md-9 fs-5">
                    <ReactQuill
                        className={ti()+"m-0 p-0 form-control" + 
                            ((!/>[^<]/i.test(description)&&showEmpty)?
                                ' is-invalid': ' border-white')
                        }
                        theme="snow" 
                        value={description} 
                        onChange={e=>setDescription(e)}
                        modules={modules}
                        formats={formats} 
                    />
                </div>
            </div>
            <div className="row p-0 m-0 mb-3">
                <div className={labelStyle}>{l('Topic','Тематика')}: </div>
                <div className="col-xl-7 col-lg-8 col-md-9">
                    <select 
                        className={"form-select text-center fs-5"+ti()}
                        onChange={e=>setTopic(e.target.value)}
                        value={topic}
                    >
                        {topicOptions.map(i=>(
                            <option key={i._id} value={i._id}>{i.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="row p-0 m-0 mb-3">
                <div className={labelStyle}>
                    {l('Image (optional)','Изображение (опционально)')}: 
                </div>
                <div className="col-xl-7 col-lg-8 col-md-9">
                   <DragNDrop img={img} setImg={setImg} />
                </div>
            </div>
            <div className="row p-0 m-0 mb-3">
                <div className={labelStyle}>
                    {l('Additional fields for items','Дополнительные поля айтемов')}: 
                </div>
                <div className="col-xl-7 col-lg-8 col-md-9">
                    {fields.map(i=>(
                        <ItemFieldForm 
                            key={i.key} 
                            field={i}
                            fields={fields}
                            setFields={setFields}
                            showEmpty={showEmpty} 
                        />
                    ))}
                    <button 
                        onClick={handleAddField}
                        className="btn btn-primary"
                    >
                        + {l('Add field','Добавить поле')}
                    </button>
                </div>
            </div>
            <div className="row justify-content-end px-5">
                <button 
                    className="btn btn-primary col-auto fs-5 px-4 py-2"
                    onClick={handleCreateCollection}
                >
                    {initial? 
                        l('Save','Сохранить') : 
                        l('Create collection','Создать коллекцию')
                    }
                </button>
            </div>
        </div>
    )
}

export { CollectionForm }