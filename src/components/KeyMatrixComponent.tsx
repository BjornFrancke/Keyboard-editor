import {Key} from "../types.ts";
import {KeyRow} from "./KeyRow.tsx";

interface KeyMatrixProps {
    keyMatrix: { keys: Key[] }[];
    styleData: { fontSize?: number; bold?: boolean };
    handleKeyClick: (rowIndex: number, keyIndex: number) => void;
    handleAddKey: (rowIndex: number, newLetter: string) => void;
    selectedKey: { row: number, col: number };
}

export const KeyMatrixComponent: React.FC<KeyMatrixProps> = ({
                                                                 keyMatrix,
                                                                 styleData,
                                                                 handleKeyClick,
                                                                 handleAddKey,
                                                                 selectedKey
                                                             }) => {
    return (
        <div
            className="h-fit w-fit min-w-8 my-5 bg-blue-500 border border-blue-300 shadow-xl mx-auto p-3 flex flex-col rounded">
            {keyMatrix.map((row, rowIndex) => (
                <KeyRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    styleData={styleData}
                    handleKeyClick={handleKeyClick}
                    handleAddKey={handleAddKey}
                    selectedKey={selectedKey}
                />
            ))}
        </div>
    );
};
