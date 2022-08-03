
import style from './widget.module.scss';
import React, {MouseEventHandler} from "react";

class Widget extends React.Component<any, any> {

    private downX = 0;
    private downY = 0;

    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            width: 160,
            height: 200,
            pressed: false,
        }
    }
    onClose(){
        //...
    }
    resize(e: MouseEvent) {
        if (e.buttons == 1) {
            this.setState({width: e.pageX - this.state.left});
        }
    }
    render(){
        const {pressed, left, top, width, height} = this.state;
        return (<div className={style.widget} style={{left, top, width, height}}>

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

            <div className={[style.edge, style.edgeTop].join(' ')}/>
            <div className={[style.edge, style.edgeLeft].join(' ')}/>
            <div className={[style.edge, style.edgeRight].join(' ')} onMouseMove={this.resize.bind(this)}/>
            <div className={[style.edge, style.edgeBottom].join(' ')}/>

            <div className={[style.edge, style.corner00].join(' ')}/>
            <div className={[style.edge, style.corner10].join(' ')}/>
            <div className={[style.edge, style.corner11].join(' ')}/>
            <div className={[style.edge, style.corner01].join(' ')}/>

            {pressed && <div
                className={style.mouseEvents}
                onMouseLeave={(e) => {
                    this.setState({pressed: false});
                }}
                onMouseMove={(e) => {
                    const {downX, downY} = this;
                    //console.log(e.buttons, downX, e.pageX, {left: e.pageX - downX, top: e.pageY - downY});

                    if (e.buttons !== 1) {
                        this.setState({pressed: false});
                        return;
                    }
                    this.setState({left: e.pageX - downX, top: e.pageY - downY});
                }}
                onMouseUp={() => {
                    this.setState({pressed: false});
                }}
            />}
        </div>)
    }
}

export default Widget