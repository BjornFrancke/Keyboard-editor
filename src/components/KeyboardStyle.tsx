import {FC, ReactNode} from "react";

interface KeyboardStyleProps {
    children: ReactNode,
    styleData: {
        fontSize?: number,
        bold?: boolean,
    }
}


export const KeyboardStyle: FC<KeyboardStyleProps> = ({children, styleData}) => {
    const fontSize = styleData.fontSize ? `${styleData.fontSize}px` : "16px";
    const fontWeight = styleData.bold ? "bold" : "normal"

    return (
        <div style={{fontSize, fontWeight}}>
            {children}
        </div>
    );
};
