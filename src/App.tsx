import {useState} from "react";
import {KeyComponent} from "./components/KeyComponent.tsx";
import "./App.css"
import {initialKeyMatrixANSI} from "./InitialKeyMatrixANSI.tsx";
import {BottomBar} from "./components/BottomBar.tsx";
import {MenuButtons} from "./components/MenuButtons.tsx";
import {Key, KeyMatrix} from "./types.ts";


function App() {

    const [keyMatrix, setKeyMatrix] = useState<KeyMatrix>(initialKeyMatrixANSI);
    const [selectedKey, setSelectedKey] = useState<{ row: number, col: number }>({
        row: 0,
        col: 0,
    });
    const [newLetter, setNewLetter] = useState<string>("Select a key");
    const [newSize, setNewSize] = useState<number>(1);

    const handleEditKey = (rowIndex: number, keyIndex: number, newLetter: string, newSize: number) => {
        const updatedMatrix = keyMatrix.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                return {
                    keys: row.keys.map((key, kIndex) => {
                        if (kIndex === keyIndex) {
                            return {letter: newLetter, width: newSize};
                        }
                        return key;
                    })
                };
            }
            return row;
        });
        console.log("Updated: " + newSize)
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

    /*
        function displayKeyMatrixAsText() {
            let text = "";
            keyMatrix.forEach((row, rowIndex) => {
                text += `Row ${rowIndex + 1}: `;
                row.keys.forEach((key, keyIndex) => {
                    text += `${key.letter} `;
                });
                text += "\n";
            });
            return text;
        }
        */
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
                <div
                    className={"h-fit w-fit min-w-8 my-5 bg-blue-500 border border-blue-300 shadow-xl mx-auto  p-3 flex flex-col space-y-1 rounded"}>
                    {keyMatrix.map((row, rowIndex) => (
                        <>
                            {row.keys.length > 0 && (
                                <>
                                    <div className={"flex"}>
                                        <div className={"flex flex-row"} key={rowIndex}>
                                            {row.keys.map((key, keyIndex) => (
                                                <div key={keyIndex} onClick={() => {
                                                    handleKeyClick(rowIndex, keyIndex);
                                                }}>
                                                    <KeyComponent key={keyIndex} letter={key.letter}
                                                                  width={key.width}/>
                                                </div>
                                            ))}
                                        </div>
                                        <button className={" p-1 h-fit my-auto text-white"}
                                                onClick={() => {
                                                    const newLetter = prompt("Enter a new letter to add:") || ""; // Handle null by providing a default value
                                                    handleAddKey(rowIndex, newLetter);
                                                }}
                                        >+
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    ))}
                </div>
                <div className={"mx-auto w-52 h-fit bg-green-500 rounded"}>

                    <div className={"bg-blue-500 size-auto p-2 space-y-2 rounded-t"}>
                        <input className={"w-full px-2 py-1 rounded"} type={"text"} value={newLetter}
                               onChange={(e) => setNewLetter(e.target.value)}/>
                        <input className={"w-full px-2 py-1 rounded"} type={"number"} min={0} max={3} step={0.25}
                               value={newSize}
                               onChange={(e) => setNewSize(e.target.valueAsNumber)}/>
                        <div className={"flex space-x-2"}>
                            <button
                                onClick={() => handleEditKey(selectedKey.row, selectedKey.col, newLetter, newSize)}
                                className={"bg-white py-1 px-2 rounded"}>Save
                            </button>
                            <button className={"bg-red-500 py-1 px-2 rounded"}
                                    onClick={() => deleteKey(selectedKey.row, selectedKey.col)}>Delete
                            </button>
                        </div>
                    </div>
                    <MenuButtons onSave={() => saveKeyMatrixToLocalStorage()}
                                 onRestore={() => restoreKeyMatrixFromLocalStorage()}
                                 onNewRow={() => addKeyToNewRow({letter: " "})}
                                 onCopyToClipboard={() => handleCopyToClipboard()}/>
                </div>
                ;
            </div>
            <BottomBar selectedKey={selectedKey}/>
        </div>
    );
}

export default App;
