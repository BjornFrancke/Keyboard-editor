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

    return (
        <div style={{fontSize}}>
            {children}
        </div>
    );
};
