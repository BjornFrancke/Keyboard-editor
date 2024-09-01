export interface Key {
    location?: {
        y?: number,
        x?: number
    },
    letter: string;
    width?: number;
    height?: number;
}

export interface KeyArr {
    keys: Key[];
}


export type KeyMatrix = KeyArr[];
