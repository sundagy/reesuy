import Tools from "./tools";
import style from './layout.module.scss';
import React from "react";

interface GizmoProps {

}

class Gizmo extends React.Component<GizmoProps, any> {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={style.gizmo}/>;
    }
}

class Workspace extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return <div className={style.workplace}>WORKPLACE</div>;
    }
}

const widgets = {
    gizmo: Gizmo,
    tools: Tools,
    workspace: Workspace,
};

interface WidgetItem {
    type: string;
}

interface SideProps {
    wide: boolean;
    items: WidgetItem[];
    updateItems: (newItems: WidgetItem[]) => void;
}

class Side extends React.Component<SideProps, any> {
    private sideRef: React.RefObject<any>;
    constructor(props) {
        super(props);
        this.state = {
            targetMode: false
        }
        this.sideRef = React.createRef();
    }
    widgetMove(x, y, w, h){
        const {items} = this.props;
        if (items.filter(a => a.type === 'gizmo').length) {
            return;
        }

        const el = this.sideRef.current;
        const br = el.getBoundingClientRect();

        if (Math.abs(x - br.left) < 10) {
            console.log('gizmo');

            this.props.updateItems([...items, {type: 'gizmo'}]);
        }

        /*for (let i=0; i<el.childNodes.length; i++) {
            const w = el.childNodes[i];
            const br = w.getBoundingClientRect();
            console.log(br);
        }*/
    }
    widgetMoveStart(){
        this.setState({targetMode: true});
        console.log('start');
    }
    widgetMoveEnd(){
        this.setState({targetMode: false});
        console.log('end');
    }
    render() {
        const {wide, items} = this.props;
        const {targetMode} = this.state;
        return <div className={[style.side, ...(targetMode ? ['target'] : [])].join(' ')}
                    ref={this.sideRef}
                    style={wide ? {width: '100%'} : {}}
        >
            {items.map((w, j) => {
                const W = widgets[w.type];
                return <W key={`w${j}`}
                          onMove={this.widgetMove.bind(this)}
                          onMoveStart={this.widgetMoveStart.bind(this)}
                          onMoveEnd={this.widgetMoveEnd.bind(this)}
                />;
            })}
        </div>;
    }
}

class Layout extends React.Component<any, any> {
    private partRefs: React.RefObject<any>[] = [];
    constructor(props) {
        super(props);
        this.state = {
            parts: [
                {wide: false, items: []},
                {wide: true, items: [{type: 'workspace'}, {type: 'tools'}]},
                {wide: false, items: []},
            ],
        }
        for (let p of this.state.parts) {
            this.partRefs.push(React.createRef());
        }
    }
    //widgetMove(x, y, w, h){
    //    for (let p of this.partRefs) {
    //        p.current.widgetMove(x,y,w,h)
    //    }
    //}
    render() {
        const {parts} = this.state;
        return <div className={style.layout}>
            {parts.map((a, i) => <Side key={`s${i}`}
                                       ref={this.partRefs[i]}
                                       wide={a.wide}
                                       items={a.items}
                                       updateItems={ni => this.setState({
                                           parts: parts.map((a, j) => i===j
                                               ? {...a, items: ni}
                                               : a,
                                           )})}
            />)}
        </div>
    }
}

export default Layout