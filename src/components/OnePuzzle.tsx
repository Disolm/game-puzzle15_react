import React from "react";
import {INumberData} from "../models";

interface NumberProps {
    number: INumberData
    clickPuzzle: (number: INumberData) => void
}

export function OnePuzzle({number, clickPuzzle }:NumberProps) {
    const activeBtn = [
        number.right ? 'border-solid border-l-2 border-green-500' : '',
        number.left ? 'border-solid border-r-2 border-green-500' : '',
        number.bottom ? 'border-solid border-t-2 border-green-500' : '',
        number.top ? 'border-solid border-b-2 border-green-500' : '',
    ].join(' ')
    const numEmpty = number.empty ? 'bg-blue-200' : 'bg-green-200 drop-shadow-cast'
    const numClass = [numEmpty, activeBtn, 'one-puzzle h-20 w-20 rounded-md flex flex-row justify-center items-center text-4xl']

    return (
        <button
            disabled={!number.clickDisabled}
            className={numClass.join(' ')}
            onClick={()=>{clickPuzzle(number)}}
        >
            {number.title}
        </button>
    )
}