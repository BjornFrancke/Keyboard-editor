import {Key, KeyMatrix} from "../types.ts";

export const editKeyInMatrix = (matrix: KeyMatrix, row: number, col: number, newLetter: string, newSize: number): KeyMatrix => {
    return matrix.map((rowData, rIndex) => (
        rIndex === row
            ? {
                keys: rowData.keys.map((key, kIndex) => (
                    kIndex === col ? {letter: newLetter, width: newSize} : key
                )),
            }
            : rowData
    ));
};
export const deleteKeyFromMatrix = (matrix: KeyMatrix, row: number, col: number): KeyMatrix => {
    return matrix.map((rowData, rIndex) => (
        rIndex === row
            ? {
                keys: rowData.keys.filter((_, kIndex) => kIndex !== col),
            }
            : rowData
    ));
};
export const addKeyToRow = (matrix: KeyMatrix, row: number, newLetter: string): KeyMatrix => {
    return matrix.map((rowData, rIndex) => (
        rIndex === row
            ? {
                keys: [...rowData.keys, {letter: newLetter}],
            }
            : rowData
    ));
};
export const addKeyToNewRow = (matrix: KeyMatrix, newKey: Key): KeyMatrix => {
    return [...matrix, {keys: [newKey]}];
};
