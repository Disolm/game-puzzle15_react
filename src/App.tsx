import React from 'react';
import {OnePuzzle} from "./components/OnePuzzle";
import {usePuzzleData} from "./hooks/puzzleData";
import FlipMove from 'react-flip-move'

export interface FlipMoveProps {
    children?: React.ReactNode
    className?: string
}
function App() {
    const {numbers, sizePuzzle, swapPuzzle, victory, mixPuzzle, changeHandler} = usePuzzleData()
    const classGrid = `grid grid-cols-${+sizePuzzle} gap-3`
    return (
    <div className="App flex flex-col justify-center items-center mt-10">
        <div className='buttons mb-8 flex flex-row'>
            <button
                className='border border-solid border-emerald-400 rounded-md px-6 py-2 mx-2 bg-emerald-200 active:bg-emerald-400 hover:border-emerald-800'
                onClick={()=>mixPuzzle()}
            >
                Перемешать
            </button>
            <div className='border border-solid border-emerald-400 rounded-md px-6 mx-2 py-2 bg-emerald-200'>
                Размер:
                <select
                    value={sizePuzzle}
                    onChange={changeHandler}
                    className='border bg-emerald-100 ml-2 rounded-md px-1'>
                    <option value={3}> 3x3 </option>
                    <option value={4}> 4x4 </option>
                </select>
            </div>
        </div>
        <div className={classGrid}>
            {/*<FlipMove className='grid grid-cols-4 gap-3'>*/}
                {numbers.map(number =>(
                        <OnePuzzle
                            number={number}
                            clickPuzzle={swapPuzzle}
                            key={number.id}
                        />
                    )
                )}
            {/*</FlipMove>*/}
        </div>
        {victory && <div className='text-white bg-emerald-600 mt-6 py-2 w-72 text-center rounded-md text-2xl'>Game over</div>}
    </div>
  );
}

export default App;
