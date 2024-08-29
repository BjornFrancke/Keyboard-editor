import {useState} from "react";
import "./App.css";
import {initialKeyMatrixANSI} from "./utils/InitialKeyMatrixANSI.tsx";
import {KeyMatrix} from "./types.ts";
import {BottomBar, ControlPanel, KeyMatrixComponent, MenuButtons} from "./components";
import {addKeyToNewRow, addKeyToRow, deleteKeyFromMatrix, editKeyInMatrix} from "./utils/utils.ts";

function App() {
    const [keyMatrix, setKeyMatrix] = useState<KeyMatrix>(initialKeyMatrixANSI);
    const [selectedKey, setSelectedKey] = useState<{ row: number, col: number }>({row: 0, col: 0});
    const [newLetter, setNewLetter] = useState<string>("Select a key");
    const [newSize, setNewSize] = useState<number>(1);
    const [styleData, setStyleData] = useState<{ fontSize?: number; bold?: boolean }>({fontSize: 16});

    const handleEditKey = () => {
        setKeyMatrix(prevMatrix => editKeyInMatrix(prevMatrix, selectedKey.row, selectedKey.col, newLetter, newSize));
    };

    const handleDeleteKey = () => {
        setKeyMatrix(prevMatrix => deleteKeyFromMatrix(prevMatrix, selectedKey.row, selectedKey.col));
    };

    const handleAddKey = (rowIndex: number, newLetter: string) => {
        setKeyMatrix(prevMatrix => addKeyToRow(prevMatrix, rowIndex, newLetter));
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
            <div className="w-full h-full">
                <KeyMatrixComponent
                    keyMatrix={keyMatrix}
                    styleData={styleData}
                    handleKeyClick={handleKeyClick}
                    handleAddKey={handleAddKey}
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
