
import style from './widget.module.scss';
import React, {MouseEventHandler} from "react";

class Widget extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            width: 160,
            height: 200,
        }
    }
    componentDidMount() {

    }
    onClose(){
        //...
    }
    startResize(x, y) {
        const mouseMove = (e: MouseEvent) => {
            x == 1 && this.setState({width: e.clientX - this.state.left - 2});
            x ==-1 && this.setState({left: e.clientX - this.state.left});
        }
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', mouseMove);
        }, {once: true});
    }
    startMove(e: MouseEvent){
        if ((e.target as Element).id !== 'header') return;

        const rect = (e.target as Element).parentElement.getBoundingClientRect();
        const downX = e.clientX - rect.left;
        const downY = e.clientY - rect.top;

        const mouseMove = (e: MouseEvent) => {
            this.setState({left: e.pageX - downX, top: e.pageY - downY});
        }
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', (e: MouseEvent) => {
            document.removeEventListener('mousemove', mouseMove);
        }, {once: true});
    }
    render(){
        const {left, top, width, height} = this.state;
        return (<div className={style.widget} style={{left, top, width, height}}>

            <div
                id={'header'}
                className={style.header}
                onMouseDown={this.startMove.bind(this)}
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
            <div className={[style.edge, style.edgeLeft].join(' ')} onMouseDown={this.startResize.bind(this, -1, 0)}/>
            <div className={[style.edge, style.edgeRight].join(' ')} onMouseDown={this.startResize.bind(this, 1, 0)}/>
            <div className={[style.edge, style.edgeBottom].join(' ')}/>

            <div className={[style.edge, style.corner00].join(' ')}/>
            <div className={[style.edge, style.corner10].join(' ')}/>
            <div className={[style.edge, style.corner11].join(' ')}/>
            <div className={[style.edge, style.corner01].join(' ')}/>
        </div>)
    }
}

export default Widget