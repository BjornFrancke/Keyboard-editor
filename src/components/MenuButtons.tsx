export function MenuButtons({onNewRow, onRestore, onSave}: {
    onSave: () => void,
    onRestore: () => void,
    onNewRow: () => void
}) {
    return <div className={"flex flex-col"}>
        <button onClick={onSave}>Save</button>
        <button onClick={onRestore}>Restore</button>
        <button
            onClick={onNewRow}
        > new row
        </button>
    </div>;
}
