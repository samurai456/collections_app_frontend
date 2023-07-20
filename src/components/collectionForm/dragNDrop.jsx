import { useRef, useContext, useState } from 'react'
import { ThemeContext } from '../../contexts/themeContext'
import { LangContext } from '../../contexts/langContext';

function DragNDrop({img, setImg}){
    const { l } = useContext(LangContext)
    const {ti} = useContext(ThemeContext)
    const r = useRef();
    const [uploadedImgSrc, setUploadedImgSrc] = useState();

    function readFile(file){
        const f = new FileReader()
        f.onload = () => {
            setImg(file)
            setUploadedImgSrc(f.result);
        }
        f.readAsDataURL(file);
    }

    function handleFileInput(e){
        readFile(e.target.files[0])
    }

    function handleDrop(e){
        e.preventDefault();
        readFile(e.dataTransfer.files[0]);
    }

    function handleDragOver(e){
        e.preventDefault();
    }

    return (
        <div
            style={{height: 150}} 
            onDrop={handleDrop} 
            onDragOver={handleDragOver}
            className={ti()+"d-flex justify-content-center flex-column align-items-center border border-3 rounded"}
        >
            
            {img?
                <div className="position-relative w-100 d-flex px-5 justify-content-center align-items-center">
                    <div className="text-truncate">
                        <img src={img?.isUrl ?img.name: uploadedImgSrc} style={{height: 120, width: 120}} className="rounded object-fit-cover" />
                    </div>
                    <div>
                        <button
                            className="btn btn-danger ms-2"
                            onClick={()=>setImg()}
                        >
                            X
                        </button>
                    </div>   
                </div>
            :
                <>
                    {l('Drag and drop image here','Перетащите сюда изображение')}
                    <div>
                        {l('or','или')}
                        <button
                            className="btn btn-light m-2 border"
                            onClick={()=>r.current.click()}
                        >
                            {l('Select image','Выбрать изображение')}
                        </button> 
                        <input 
                            type="file" 
                            hidden 
                            ref={r} 
                            onChange={handleFileInput}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export { DragNDrop }