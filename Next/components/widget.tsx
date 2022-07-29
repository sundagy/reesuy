
import style from './widget.module.scss';
import React from "react";

class Widget extends React.Component<any, any> {

    private downX = 0;
    private downY = 0;

    constructor() {
        super();
        this.state = {
            pressed: false,
        }
    }
    render(){
        return (<div className={style.widget}>
            {this.state.pressed && <div
                className={style.mouseEvents}
                onMouseMove={(e) => {
                    if (e.buttons !== 1) {
                        return;
                    }
                    const w = (e.target as Element).parentElement;
                    w.style.left = (e.pageX - this.downX) + 'px';
                    w.style.top = (e.pageY - this.downY) + 'px';
                }}
                onMouseUp={() => {
                    this.setState({pressed: false});
                }}
            />}
            <div
                className={style.header}
                onMouseDown={(e) => {
                    this.setState({pressed: true});
                    const rect = (e.target as Element).getBoundingClientRect();
                    this.downX = e.clientX - rect.left;
                    this.downY = e.clientY - rect.top;
                }}
            />
            <div>
                {this.props.children}
            </div>
        </div>)
    }
}

export default Widget