import { Header } from './header'
import { ThemeContext } from '../../contexts/themeContext'
import { useContext } from 'react'

function HeaderFrame({children}){
    const {t} = useContext(ThemeContext)
    return(
        <div className="overflow-x-hidden d-flex flex-column flex-shrink-0 position-absolute end-0 start-0 top-0 bottom-0">
            <div className={t()}>
                <Header />
            </div>
            <div className={"flex-grow-1 overflow-y-auto position-relative frameBody"+t()}>
                {children}
            </div>
        </div>
    )
}

export { HeaderFrame }


const data = Array(100).fill('some')