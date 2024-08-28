export const KeyComponent = ({ letter, width }: { letter: string; width?: number}) => {

    const myWidth = width ? `${width * 2.5}rem` : "2.5rem";

    if (letter === "") {

        return (
            <div className={"size-10 flex justify-center bg-blue-500  rounded select-none"} style={{width: myWidth}}>-</div>
        )
    }


    return ( <div className={"h-[40px] flex justify-center shadow bg-white border-gray-500 border rounded select-none cursor-pointer"} style={{width: myWidth}}>{letter}</div>
    )
};
