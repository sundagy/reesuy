
import style from './widget.module.scss';
import React, {MouseEventHandler} from "react";

interface WidgetProps {
    onMove: (x, y, w, h: number) => void;
}

class Widget extends React.Component<WidgetProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
            width: 160,
            height: 200,
            float: true
        }
    }
    componentDidMount() {

    }
    onClose(){
        //...
    }
    startResize(x, y, e: MouseEvent) {
        let ax = e.clientX,
            ay = e.clientY;
        const mouseMove = (e: MouseEvent) => {
            const {left, top, width, height} = this.state;
            const dx = ax-e.clientX;
            const dy = ay-e.clientY;
            ax = e.clientX;
            ay = e.clientY;
            const s = {
                ...(x == 1 ? {width: width - dx} : {}),
                ...(x ==-1 ? {left: left - dx, width: width + dx} : {}),
                ...(y == 1 ? {height: height - dy} : {}),
                ...(y ==-1 ? {top: top - dy, height: height + dy} : {}),
            };
            if (s.width && s.width < 60) s.width = 60;
            if (s.height && s.height < 60) s.height = 60;
            this.setState(s);
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
            this.setState({left: e.pageX - downX, top: e.pageY - downY}, ()=>{
                const {left, top, width, height} = this.state;
                this.props.onMove(left, top, width, height);
            });
        }
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', (e: MouseEvent) => {
            document.removeEventListener('mousemove', mouseMove);
        }, {once: true});
    }
    render(){
        const {left, top, width, height, float} = this.state;
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

            {float && <>
                <div className={[style.edge, style.edgeTop].join(' ')} onMouseDown={this.startResize.bind(this, 0, -1)}/>
                <div className={[style.edge, style.edgeLeft].join(' ')} onMouseDown={this.startResize.bind(this, -1, 0)}/>
                <div className={[style.edge, style.edgeRight].join(' ')} onMouseDown={this.startResize.bind(this, 1, 0)}/>
                <div className={[style.edge, style.edgeBottom].join(' ')} onMouseDown={this.startResize.bind(this, 0, 1)}/>

                <div className={[style.edge, style.corner00].join(' ')} onMouseDown={this.startResize.bind(this, -1, -1)}/>
                <div className={[style.edge, style.corner10].join(' ')} onMouseDown={this.startResize.bind(this, 1, -1)}/>
                <div className={[style.edge, style.corner11].join(' ')} onMouseDown={this.startResize.bind(this, 1, 1)}/>
                <div className={[style.edge, style.corner01].join(' ')} onMouseDown={this.startResize.bind(this, -1, 1)}/>
            </>}
        </div>)
    }
}

export default Widget