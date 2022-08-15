import Widget from "./widget";

const Tools = ({onMove, onMoveStart, onMoveEnd}) => {
    return (<Widget
        onMove={onMove}
        onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
    >

        <button>+</button>

    </Widget>)
}

export default Tools