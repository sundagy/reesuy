import Tools from "./tools";
import style from './layout.module.scss';

const Layout = ({children}) => {
    return (<div className={style.layout}>

        <Tools/>

        {children}

    </div>)
}

export default Layout