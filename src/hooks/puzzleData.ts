import React, {useEffect, useState} from "react";
import {INumberData} from "../models";

interface unlockConst {
    right: boolean
    left: boolean
    top: boolean
    bottom: boolean
}
export function usePuzzleData() {
    const [numbers, setNumbers] = useState<INumberData[]>([])
    const [sizePuzzle, setSizePuzzle] = useState<number>(4)
    const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSizePuzzle(+event.target.value)
        setNumbers(createAnArray(+event.target.value))
    }

    const createAnArray = function (sizePuzzle: number) {
        const array: INumberData[] = [...Array(sizePuzzle * sizePuzzle)]
        array.forEach((item, i) => {
            item = {
                id: i,
                address: i,
                title: i === array.length - 1 ? '' :  (i + 1).toString(),
                empty: i === array.length - 1,
                clickDisabled: i === array.length - 1 || i === array.length - 1 - 1 || i === array.length - sizePuzzle - 1,
                top: i === array.length - 1 - sizePuzzle,
                bottom: false,
                right: false,
                left: i === array.length - 1 - 1
            }
            array[i] = {...item}
        })
        return array
    }

    const searchEmitPuzzle = function (arr: INumberData[]) {
        let emitInArray: number = 0
        arr.forEach((num: INumberData, i: number) => {
            if (num.title === '') {
                emitInArray = i
            }
        })
        return emitInArray
    }
    const savePuzzle = function (arrayPuzzle: INumberData[]) {
        setNumbers(arrayPuzzle)
    }
    const swapPuzzle = function (eventClick: INumberData){
        const puzzles = swap(eventClick, numbers)
        savePuzzle(puzzles)
        gameIsOver(puzzles)
    }
    const swap = function (eventClick: INumberData, arrayPuzzle: INumberData[]) {
        setVictory(false)
        if (!eventClick.clickDisabled) {
            return arrayPuzzle
        }
        let emitInArray: number = searchEmitPuzzle(arrayPuzzle)
        let clickInArray: number = eventClick.address
            return arrayPuzzle.map((num: INumberData, i: number) => {
                if (num.address === eventClick.address) {
                    return {
                        ...arrayPuzzle[emitInArray],
                        clickDisabled: false,
                        address: i,
                        right: false,
                        left: false,
                        bottom: false,
                        top: false,
                    }
                }
                const unlock: unlockConst = {
                    right: ((clickInArray + 1) % sizePuzzle !== 0) && i === clickInArray + 1,
                    left: (clickInArray % sizePuzzle !== 0) && i === clickInArray - 1,
                    bottom: i === clickInArray + sizePuzzle,
                    top: i === clickInArray - sizePuzzle,
                }
                if (num.title === '') {
                    return {
                        ...arrayPuzzle[clickInArray],
                        clickDisabled: true,
                        address: i,
                        ...unlock
                    }
                }
                 const newClickDisabled: boolean =
                     unlock.right ||
                     unlock.left ||
                     unlock.bottom ||
                     unlock.top
                return {
                    ...num,
                    clickDisabled: newClickDisabled,
                    address: i,
                    ...unlock
                }
            })
    }
    const mixPuzzle = async function () {
        let arrayPuzzle: INumberData[] = numbers
        const index: number = 1000

        for (let i = 0; i < index; i++) {
            const arrStep: number[] = [-sizePuzzle, -1, 1, sizePuzzle];
            let addressMix: number
            const addressEmpty: number = searchEmitPuzzle(arrayPuzzle)
            do {
                addressMix = addressEmpty + arrStep[Math.floor(Math.random() * arrStep.length)]
            } while (
                addressMix < 0 ||
                addressMix > (sizePuzzle * sizePuzzle - 1)
                )
            arrayPuzzle = swap(arrayPuzzle[addressMix], arrayPuzzle)!;
        }
        savePuzzle(arrayPuzzle)
    }
    const [victory, setVictory] = useState(false)
    const gameIsOver = function (puzzles: INumberData[]) {
        let step: number = 0
        puzzles.forEach((num:INumberData, i:number) => {
            if (num.id === i) {
                step += 1
            }
        })
        if (step === puzzles.length) {
            setVictory(true)
        }
    }
    useEffect(() =>{
        setNumbers(createAnArray(sizePuzzle))
    },[])
    return {numbers, sizePuzzle, victory, swapPuzzle, mixPuzzle, changeHandler}
}