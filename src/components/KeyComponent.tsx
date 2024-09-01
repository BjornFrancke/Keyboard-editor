export const KeyComponent = ({letter, width, location}: {
    letter: string;
    width?: number,
    location?: { y?: number, x?: number }
}) => {

    const styles = {
        transform: `translate(${location?.x || 0}px, ${location?.y || 0}px)`,
        width: width ? `${width * 2.5}rem` : "2.5rem"
    }

    if (letter === "") {

        return (
            <div className={"size-10 flex justify-center bg-blue-500  text-gray-700 rounded select-none"}
                 style={styles}>-</div>
        )
    }


    return (<div
            className={"h-[40px] flex justify-center shadow bg-white border-gray-500 border rounded select-none cursor-pointer"}
            style={styles}>{letter}</div>
    )
};
