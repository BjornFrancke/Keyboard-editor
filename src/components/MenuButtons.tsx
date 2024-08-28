import "../App.css"

export function MenuButtons({onNewRow, onRestore, onSave, onCopyToClipboard}: {
    onSave: () => void,
    onRestore: () => void,
    onNewRow: () => void
    onCopyToClipboard: () => void,
}) {


    return <div className={"flex flex-col p-2 space-y-2 shadow-lg"}>
        <button className={"menuButton"} onClick={onSave}>Save</button>
        <button className={"menuButton"} onClick={onRestore}>Restore</button>
        <button
            className={"menuButton"} onClick={onNewRow}
        > new row
        </button>
        <button className={"menuButton"} onClick={onCopyToClipboard}>Copy to clipboard</button>
    </div>;
}
