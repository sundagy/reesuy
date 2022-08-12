import Tools from "./tools";
import style from './layout.module.scss';
import React from "react";

class Workspace extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className={style.workplace}>WORKPLACE</div>;
    }
}

interface SideProps {

}

class Side extends React.Component<SideProps, any> {
    private sideRef: React.RefObject<any>;
    constructor(props) {
        super(props);
        this.state = {}
        this.sideRef = React.createRef();
    }
    widgetMove(x, y, w, h){
        const el = this.sideRef.current;
        for (let i=0; i<el.childNodes.length; i++) {
            const w = el.childNodes[i];
            const rect = w.getBoundingClientRect();
            console.log(rect);
        }
    }
    render() {
        return <div className={style.side} ref={this.sideRef}>
            {this.props.children}
        </div>;
    }
}

const widgets = {
    tools: Tools,
    workspace: Workspace,
};

class Layout extends React.Component<any, any> {
    private partRefs: React.RefObject<any>[] = [];
    constructor(props) {
        super(props);
        this.state = {
            parts: [
                [],
                ['workspace', 'tools'],
                [],
            ],
        }
        for (let p of this.state.parts) {
            this.partRefs.push(React.createRef());
        }
    }
    widgetMove(x, y, w, h){
        for (let p of this.partRefs) {
            p.current.widgetMove(x,y,w,h)
        }
    }
    render() {
        const {parts} = this.state;
        return <div className={style.layout}>
            {parts.map((a, i) => <Side key={`s${i}`} ref={this.partRefs[i]}>
                {a.map((w, j) => {
                    const W = widgets[w];
                    return <W key={`w${i}-${j}`} onMove={this.widgetMove.bind(this)}/>;
                })}
            </Side>)}
        </div>
    }
}

export default Layout