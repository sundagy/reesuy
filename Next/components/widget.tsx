
import style from './widget.module.scss';
import React from "react";

class Widget extends React.Component<any, any> {

    private downX = 0;
    private downY = 0;

    constructor() {
        super();
        this.state = {
            position: {left: 0, top: 0},
            pressed: false,
        }
    }
    onClose(){
        //...
    }
    render(){
        const {position, pressed} = this.state;
        return (<div className={style.widget} style={{...position}}>
            <div
                className={style.header}
                onMouseDown={(e) => {
                    if ((e.target as Element).className !== style.header) {
                        return;
                    }
                    this.setState({pressed: true});
                    const rect = (e.target as Element).parentElement.getBoundingClientRect();
                    this.downX = e.clientX - rect.left;
                    this.downY = e.clientY - rect.top;
                }}
            >
                <button
                    className={style.close}
                    onClick={this.onClose.bind(this)}
                />
            </div>
            <div className={style.body}>
                {this.props.children}
            </div>
            {pressed && <div
                className={style.mouseEvents}
                onMouseMove={(e) => {
                    if (e.buttons !== 1) {
                        return;
                    }
                    const {downX, downY} = this;
                    this.setState({position: {left: e.pageX - downX, top: e.pageY - downY}});
                }}
                onMouseUp={() => {
                    this.setState({pressed: false});
                }}
            />}
        </div>)
    }
}

export default Widget