import Tools from "./tools";
import style from './layout.module.scss';
import React from "react";

class Layout extends React.Component<any, any> {
    private layoutRef: React.RefObject<any>;
    constructor(props) {
        super(props);
        this.state = {}
        this.layoutRef = React.createRef();
    }
    widgetMove(x, y, w, h){
        const layout = (this.layoutRef.current as Element);
        const nodes = layout.childNodes;
        for (let i=0; i<nodes.length; i++) {
            const node = (nodes.item(i) as Element);
            const side = node.getAttribute('data-side');
            if (side) {
                const br = node.getBoundingClientRect()
                if (Math.abs(x - br.left) < 10 || Math.abs(x+w - br.right) < 10) {
                    //node.appendChild(<div>dddff</div>)
                    console.log('gizmo!');
                }
            }
        }
    }
    render() {
        const {items} = this.state;
        return <div className={style.layout} ref={this.layoutRef}>
            <div className={style.side} data-side="left"/>
            <div className={style.workplace}>WORKPLACE</div>
            <div className={style.side} data-side="right"/>

            <Tools onMove={this.widgetMove.bind(this)}/>
        </div>
    }
}

export default Layout