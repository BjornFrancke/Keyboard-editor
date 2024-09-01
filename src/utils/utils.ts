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

export const calculateNewPosition = (currentLocation: { x?: number, y?: number }, direction: string) => {
    const x = currentLocation.x || 0;
    const y = currentLocation.y || 0;

    const movement = {
        ArrowUp: {x, y: y - 10},
        ArrowDown: {x, y: y + 10},
        ArrowLeft: {x: x - 10, y},
        ArrowRight: {x: x + 10, y}
    };

    return movement[direction as keyof typeof movement];
};

export const moveKeyInCol = (matrix: KeyMatrix, row: number, col: number, x: number) => {
    return matrix.map((rowData, rIndex) => (
        rIndex === row
            ? {
                keys: rowData.keys.map((key, kIndex) => (
                    kIndex === col ? {...key, location: {...key.location, x: x}} : key
                )),
            }
            : rowData
    ))
}

export const moveKeyInRow = (matrix: KeyMatrix, row: number, col: number, y: number) => {
    return matrix.map((rowData, rIndex) => (
        rIndex === row
            ? {
                keys: rowData.keys.map((key, kIndex) => (
                    kIndex === col ? {...key, location: {...key.location, y: y}} : key
                )),
            }
            : rowData
    ))
}


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
