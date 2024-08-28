export interface Key {
    letter: string;
    width?: number;
    height?: number;
}

export interface KeyArr {
    keys: Key[];
}

export type KeyMatrix = KeyArr[];
