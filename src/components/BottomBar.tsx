export function BottomBar({selectedKey: {col, row}}: { selectedKey: { row: number; col: number } }) {
    return <div
        className={"bg-green-500 absolute h-fit bottom-0 w-full"}>{row}, {col}</div>;
}
