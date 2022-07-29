
const Widget = ({children}) => {
    return (<div style={{
        color: 'black',
        minWidth: '60px',
        minHeight: '60px',
        display: 'flex',
    }}>
        <div style={{
    backgroundColor: '#666',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
}}/>
        <div>
            {children}
        </div>
    </div>)
}

export default Widget