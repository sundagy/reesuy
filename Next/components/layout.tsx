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
    free: boolean;
    gizmo: boolean;
    items: WidgetItem[];
    layout: ILayout;
    updateItems: (items: any[]) => void
}

interface ILayout {
    widgetStart: () => void
    widgetStop: () => void
    widgetMove: (x,y,w,h: number) => void
}

class Side extends React.Component<SideProps, any> {
    private sideRef: React.RefObject<any>;
    constructor(props) {
        super(props);
        this.state = {}
        this.sideRef = React.createRef();
    }
    widgetMove(x,y,w,h){
        this.props.layout.widgetMove(x,y,w,h);
    }
    widgetMoveStart(){
        this.props.layout.widgetStart();
    }
    widgetMoveEnd(){
        this.props.layout.widgetStop();
    }
    /*movingAnyWidget(x, y, w, h){
        const {items} = this.props;
        if (this.props.free) {
            return;
        }
        const gizmo = items.filter(a => a.type === 'gizmo').length > 0;
        const el = this.sideRef.current;
        const br = el.getBoundingClientRect();
        if (x - br.left > 0 && x - br.right < 0) {
            if (!gizmo) {
                this.props.updateItems([...items, {type: 'gizmo'}]);
            }
        } else {
            if (gizmo) {
                this.props.updateItems(items.filter(a => a.type !== 'gizmo'));
            }
        }
    }*/
    render() {
        const {wide, free, gizmo, items} = this.props;
        return <div className={[style.side].concat(free ? [style.free, 'free'] : []).join(' ')}
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
            {gizmo && <Gizmo/>}
        </div>;
    }
}

class Layout extends React.Component<any, any> implements ILayout {
    private partRefs: React.RefObject<any>[] = [];
    constructor(props) {
        super(props);
        this.state = {
            gizmoPos: -1,
            parts: [
                {wide: false, free: false, items: []},
                {wide: true,  free: false, items: [{type: 'workspace'}]},
                {wide: false, free: false, items: []},
                {wide: false, free: true,  items: [{type: 'tools'}]},
            ],
            targetMode: false,
        }
        for (let p of this.state.parts) {
            this.partRefs.push(React.createRef());
        }
    }
    widgetMove(x,y,w,h){
        const {parts} = this.state;
        for (let ref of this.partRefs) {
            if (ref.current.props.free) {
                continue;
            }
            const br = ref.current.sideRef.current.getBoundingClientRect();
            console.log(br);
            //p.current.movingAnyWidget(x,y,w,h);
        }
    }
    widgetStart(){
        this.setState({targetMode: true});
    }
    widgetStop(){
        this.setState({targetMode: false});
    }
    updateItems(items, idx){
        const {parts} = this.state;
        this.setState({
            parts: parts.map((a, j) => j == idx
                ? {...a, items}
                : a,
            )});
    }
    render() {
        const {parts, targetMode, gizmoPos} = this.state;
        return <div className={[style.layout, ...(targetMode ? [style.target] : [])].join(' ')}>
                {parts.map((a, i) => <Side key={`s${i}`}
                                           ref={this.partRefs[i]}
                                           wide={a.wide}
                                           free={a.free}
                                           items={a.items}
                                           gizmo={i === gizmoPos}
                                           updateItems={items => this.updateItems(items, i)}
                                           layout={this}
                />)}
            </div>
    }
}

export default Layout