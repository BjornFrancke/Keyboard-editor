import {useState} from "react";
import "./App.css"
import {initialKeyMatrixANSI} from "./utils/InitialKeyMatrixANSI.tsx";
import {BottomBar} from "./components/BottomBar.tsx";
import {Key, KeyMatrix} from "./types.ts";
import {MenuButtons} from "./components/MenuButtons.tsx";
import {KeyMatrixComponent} from "./components/KeyMatrixComponent.tsx";
import {ControlPanel} from "./components/ControlPanel.tsx";


function App() {

    const [keyMatrix, setKeyMatrix] = useState<KeyMatrix>(initialKeyMatrixANSI);
    const [selectedKey, setSelectedKey] = useState<{ row: number, col: number }>({
        row: 0,
        col: 0,
    });
    const [newLetter, setNewLetter] = useState<string>("Select a key");
    const [newSize, setNewSize] = useState<number>(1);
    const [styleData, setStyleData] = useState<{
        fontSize?: number;
        bold?: boolean;
    }>({fontSize: 16,});

    const handleEditKey = () => {
        const updatedMatrix = keyMatrix.map((row, rIndex) => {
            if (rIndex === selectedKey.row) {
                return {
                    keys: row.keys.map((key, kIndex) => {
                        if (kIndex === selectedKey.col) {
                            return {letter: newLetter, width: newSize};
                        }
                        return key;
                    }),
                };
            }
            return row;
        });
        setKeyMatrix(updatedMatrix);
    };


    const addKeyToNewRow = (newKey: Key) => {
        const updatedMatrix = [...keyMatrix, {keys: [newKey]}];
        setKeyMatrix(updatedMatrix);
    };

    const handleAddKey = (rowIndex: number, newLetter: string) => {
        const updatedMatrix = keyMatrix.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                return {
                    keys: [...row.keys, {letter: newLetter}]
                };
            }
            return row;
        });
        setKeyMatrix(updatedMatrix);
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
    
    function displayKeyMatrixAsJSON() {
        return JSON.stringify(keyMatrix, null, 2);
    }

    const handleCopyToClipboard = () => {
        const jsonData = displayKeyMatrixAsJSON()
        navigator.clipboard.writeText(jsonData)
    }

    const deleteKey = (rowIndex: number, keyIndex: number) => {
        const updatedMatrix = keyMatrix.map((row, index) => {
            if (index === rowIndex) {
                const lastKeyIndex = keyIndex
                if (lastKeyIndex >= 0) {
                    row.keys.splice(lastKeyIndex, 1);
                }
            }
            return {keys: row.keys};
        });
        setKeyMatrix(updatedMatrix);
    };

    const handleKeyClick = (rowIndex: number, keyIndex: number) => {
        setSelectedKey({row: rowIndex, col: keyIndex});
        setNewLetter(keyMatrix[rowIndex].keys[keyIndex].letter);
        setNewSize(keyMatrix[rowIndex].keys[keyIndex].width || 0);
    }
    return (
        <div>
            <div className={"w-full h-full"}>
                <KeyMatrixComponent keyMatrix={keyMatrix} styleData={styleData} handleKeyClick={handleKeyClick}
                                    handleAddKey={handleAddKey}/>
                <div className="mx-auto w-52 h-fit bg-blue-500 rounded space-y-2">

                    <ControlPanel
                        newLetter={newLetter}
                        setNewLetter={setNewLetter}
                        newSize={newSize}
                        setNewSize={setNewSize}
                        styleData={styleData}
                        setStyleData={setStyleData}
                        handleEditKey={() => handleEditKey()}
                        deleteKey={() => deleteKey(selectedKey.row, selectedKey.col)}
                    />
                    <MenuButtons
                        onSave={saveKeyMatrixToLocalStorage}
                        onRestore={restoreKeyMatrixFromLocalStorage}
                        onNewRow={() => addKeyToNewRow({letter: " "})}
                        onCopyToClipboard={handleCopyToClipboard}
                    />
                </div>
            </div>

            <BottomBar selectedKey={selectedKey}/>
        </div>
    );
}

export default App;
