
import style from './widget.module.scss';

const Widget = ({children}) => {
    return (<div className={style.widget}>
        <div className={style.header}/>
        <div>
            {children}
        </div>
    </div>)
}

export default Widget