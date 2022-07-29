import Tools from "./tools";

const Layout = ({children}) => {
    return (<div style={{color: 'black'}}>

        <Tools/>

        {children}

    </div>)
}

export default Layout