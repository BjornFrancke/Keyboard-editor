interface ControlPanelProps {
    newLetter: string;
    setNewLetter: (letter: string) => void;
    newSize: number;
    setNewSize: (size: number) => void;
    styleData: { fontSize?: number; bold?: boolean };
    setStyleData: (style: { fontSize?: number; bold?: boolean }) => void;
    handleEditKey: () => void;
    deleteKey: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
                                                              newLetter,
                                                              setNewLetter,
                                                              newSize,
                                                              setNewSize,
                                                              styleData,
                                                              setStyleData,
                                                              handleEditKey,
                                                              deleteKey,
                                                          }) => {
    return (
        <>
            <div>
                <input
                    onChange={(e) => setStyleData({...styleData, fontSize: e.target.valueAsNumber})}
                    type="number"
                    value={styleData.fontSize}
                />
            </div>
            <div className="bg-blue-500 size-auto p-2 space-y-2 rounded-t">
                <input
                    className="myInput"
                    type="text"
                    value={newLetter}
                    onChange={(e) => setNewLetter(e.target.value)}
                />
                <input
                    className="myInput"
                    type="number"
                    min={0}
                    max={3}
                    step={0.25}
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.valueAsNumber)}
                />
                <div className="flex space-x-2">
                    <button onClick={handleEditKey} className="bg-white py-1 px-2 rounded text-black text-opacity-80">
                        Save
                    </button>
                    <button onClick={deleteKey} className="bg-red-500 py-1 px-2 rounded text-black text-opacity-80">
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};
