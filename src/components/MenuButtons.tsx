export function MenuButtons({onNewRow, onRestore, onSave, onCopyToClipboard}: {
    onSave: () => void,
    onRestore: () => void,
    onNewRow: () => void
    onCopyToClipboard: () => void,
}) {



    return <div className={"flex flex-col"}>
        <button className={"bg-white rounded px-2 py-1 m-1 border border-white hover:bg-gray-400"} onClick={onSave}>Save</button>
        <button className={"bg-white rounded px-2 py-1 m-1 border border-white hover:bg-gray-400"} onClick={onRestore}>Restore</button>
        <button
            className={"bg-white rounded px-2 py-1 m-1 border border-white hover:bg-gray-400"} onClick={onNewRow}
        > new row
        </button>
        <button className={"bg-white rounded px-2 py-1 m-1 border border-white hover:bg-gray-400"} onClick={onCopyToClipboard}>Copy to clipboard</button>
    </div>;
}
