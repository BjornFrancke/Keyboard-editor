import {Key} from "../types.ts";
import {KeyboardStyle} from "./KeyboardStyle.tsx";
import {KeyComponent} from "./KeyComponent.tsx";

interface KeyRowProps {
    row: { keys: Key[] };
    rowIndex: number;
    styleData: { fontSize?: number; bold?: boolean };
    handleKeyClick: (rowIndex: number, keyIndex: number) => void;
    handleAddKey: (rowIndex: number, newLetter: string) => void;
}

export const KeyRow: React.FC<KeyRowProps> = ({row, rowIndex, styleData, handleKeyClick, handleAddKey}) => {
    return (
        <div className="flex">
            <div className="flex flex-row" key={rowIndex}>
                {row.keys.map((key, keyIndex) => (
                    <div key={keyIndex} onClick={() => handleKeyClick(rowIndex, keyIndex)}>
                        <KeyboardStyle styleData={styleData}>
                            <KeyComponent key={keyIndex} letter={key.letter} width={key.width} location={key.location}/>
                        </KeyboardStyle>
                    </div>
                ))}
            </div>
            <button
                className="p-1 h-fit my-auto text-white"
                onClick={() => {
                    const newLetter = prompt("Enter a new letter to add:") || "";
                    handleAddKey(rowIndex, newLetter);
                }}
            >
                +
            </button>
        </div>
    );
};
