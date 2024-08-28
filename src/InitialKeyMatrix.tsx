import { KeyMatrix } from "./types.ts";

export const initialKeyMatrix: KeyMatrix = [
    {
        keys: [{ letter: "$", width: 1 }, { letter: "1", width: 1 }, { letter: "2", width: 1 }, { letter: "3", width: 1 }, { letter: "4", width: 1 }, { letter: "5", width: 1 }, { letter: "6", width: 1 }, { letter: "7", width: 1 }, { letter: "8", width: 1 }, { letter: "9", width: 1 }, { letter: "0", width: 1 }, { letter: "?", width: 1 }, { letter: "?", width: 1 }, { letter: "del", width: 2 }]
    },
    {
        keys: [{ letter: "TAB", width: 1.50 }, { letter: "Q", width: 1 }, { letter: "W", width: 1 }, { letter: "E", width: 1 }, { letter: "R", width: 1 }, { letter: "T", width: 1 }, { letter: "Y", width: 1 }, { letter: "U", width: 1 }, { letter: "I", width: 1 }, { letter: "O", width: 1 }, { letter: "P", width: 1 }, { letter: "[", width: 1 }, { letter: "]", width: 1 }, { letter: "|", width: 1.50 }]
    },
    {
        keys: [{ letter: "CAPS", width: 1.75 }, { letter: "A", width: 1 }, { letter: "S", width: 1 }, { letter: "D", width: 1 }, { letter: "F", width: 1 }, { letter: "G", width: 1 }, { letter: "H", width: 1 }, { letter: "J", width: 1 }, { letter: "K", width: 1 }, { letter: "L", width: 1 }, { letter: ";", width: 1 }, { letter: ":", width: 1 }, { letter: "Enter", width: 2.25 }]
    },
    {
        keys: [{ letter: "SHIFT", width: 2.25 }, { letter: "Z", width: 1 }, { letter: "X", width: 1 }, { letter: "C", width: 1 }, { letter: "V", width: 1 }, { letter: "B", width: 1 }, { letter: "N", width: 1 }, { letter: "m", width: 1 }, { letter: ",", width: 1 }, { letter: ".", width: 1 }, { letter: "?", width: 1 }, { letter: "SHIFT", width: 2.75 }]
    },
    {
        keys: [{ letter: "CTLR", width: 1.25 }, { letter: "WIN", width: 1.25 }, { letter: "ALT", width: 1.25 }, { letter: "SPACE", width: 6.25 }, { letter: "ALT", width: 1.25 }, { letter: "WIN", width: 1.25 }, { letter: "MENU", width: 1.25 }, { letter: "CTLR", width: 1.25 }]
    },
];
