import {useState} from "react";
import "./App.css";
import {initialKeyMatrixANSI} from "./utils/InitialKeyMatrixANSI.tsx";
import {KeyMatrix} from "./types.ts";
import {BottomBar, ControlPanel, KeyMatrixComponent, MenuButtons} from "./components";
import {
    addKeyToNewRow,
    addKeyToRow,
    calculateNewPosition,
    deleteKeyFromMatrix,
    editKeyInMatrix,
    moveKeyInCol,
    moveKeyInRow,
    swapKeyInRow
} from "./utils/utils.ts";

function App() {
    const [keyMatrix, setKeyMatrix] = useState<KeyMatrix>(initialKeyMatrixANSI);
    const [selectedKey, setSelectedKey] = useState<{ row: number, col: number }>({row: 0, col: 0});
    const [newLetter, setNewLetter] = useState<string>("Select a key");
    const [newSize, setNewSize] = useState<number>(1);
    const [styleData, setStyleData] = useState<{ fontSize?: number; bold?: boolean }>({fontSize: 16});

    const handleEditKey = () => {
        setKeyMatrix(prevMatrix => editKeyInMatrix(prevMatrix, selectedKey.row, selectedKey.col, newLetter, newSize));
    };


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const {row, col} = selectedKey;
        const currentLocation = keyMatrix[row].keys[col].location || {x: 0, y: 0};
        const newPosition = calculateNewPosition(currentLocation, e.key);
        if (newPosition) {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                setKeyMatrix(prevMatrix => moveKeyInRow(prevMatrix, row, col, newPosition.y));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                setKeyMatrix(prevMatrix => moveKeyInCol(prevMatrix, row, col, newPosition.x));
            }
        }
        if (e.key === "a") {
            setKeyMatrix(prevMatrix => swapKeyInRow(prevMatrix, selectedKey.row, selectedKey.col, "left"));
            setSelectedKey({...selectedKey, col: (selectedKey.col - 1)})
        }
        if (e.key === "d") {
            setKeyMatrix(prevMatrix => swapKeyInRow(prevMatrix, selectedKey.row, selectedKey.col, "right"));
            setSelectedKey({...selectedKey, col: (selectedKey.col + 1)})
        }

    };


    const handleDeleteKey = () => {
        setKeyMatrix(prevMatrix => deleteKeyFromMatrix(prevMatrix, selectedKey.row, selectedKey.col));
        setSelectedKey({row: 0, col: 0});
        setNewLetter("Select a key");
    };

    const handleAddKey = (rowIndex: number, newLetter: string) => {
        if (newLetter != "Select a key") {
            setKeyMatrix(prevMatrix => addKeyToRow(prevMatrix, rowIndex, newLetter));
        }
    };

    const handleAddKeyToNewRow = () => {
        setKeyMatrix(prevMatrix => addKeyToNewRow(prevMatrix, {letter: " "}));
    };

    const saveKeyMatrixToLocalStorage = () => {
        localStorage.setItem("keyMatrix", JSON.stringify(keyMatrix));
    };

    const restoreKeyMatrixFromLocalStorage = () => {
        const savedKeyMatrix = localStorage.getItem("keyMatrix");
        if (savedKeyMatrix) {
            setKeyMatrix(JSON.parse(savedKeyMatrix));
        }
    };

    const displayKeyMatrixAsJSON = () => {
        return JSON.stringify(keyMatrix, null, 2);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(displayKeyMatrixAsJSON());
    };

    const handleKeyClick = (rowIndex: number, keyIndex: number) => {
        const key = keyMatrix[rowIndex].keys[keyIndex];
        setSelectedKey({row: rowIndex, col: keyIndex});
        setNewLetter(key.letter);
        setNewSize(key.width || 0);
    };

    return (
        <div>
            <div className="w-full h-full focus:outline-none" onKeyDown={handleKeyPress} tabIndex={0}>
                <KeyMatrixComponent
                    keyMatrix={keyMatrix}
                    styleData={styleData}
                    handleKeyClick={handleKeyClick}
                    handleAddKey={handleAddKey}
                    selectedKey={selectedKey}
                />
                <div className="mx-auto w-52 h-fit bg-blue-500 rounded space-y-2">
                    <ControlPanel
                        newLetter={newLetter}
                        setNewLetter={setNewLetter}
                        newSize={newSize}
                        setNewSize={setNewSize}
                        styleData={styleData}
                        setStyleData={setStyleData}
                        handleEditKey={handleEditKey}
                        deleteKey={handleDeleteKey}
                    />
                    <MenuButtons
                        onSave={saveKeyMatrixToLocalStorage}
                        onRestore={restoreKeyMatrixFromLocalStorage}
                        onNewRow={handleAddKeyToNewRow}
                        onCopyToClipboard={handleCopyToClipboard}
                    />
                </div>
            </div>
            <BottomBar selectedKey={selectedKey}/>
        </div>
    );
}

export default App;
