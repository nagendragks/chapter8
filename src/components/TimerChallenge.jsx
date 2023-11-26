import { React, useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const newdialog = useRef();

    const[timeRemaining, setTimeRemaining] = useState(targetTime*1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if(timeRemaining<=0) {
        clearInterval(timer.current);
        newdialog.current.open(); 
    }

    function handleReset() {
        setTimeRemaining(targetTime*1000);
    }

    function handleStart() {
      timer.current = setInterval(()=>{
            setTimeRemaining(prevTimeReamining => prevTimeReamining-10);
        }, 10)
    }

    function handleStop() {
        clearInterval(timer.current);
        newdialog.current.open();
    }

    return(
        <>
       <ResultModal ref={newdialog} targetTime={targetTime} timeRemaining={timeRemaining} handleReset={handleReset}/>
        <section className="challenge">
            <h2> {title} </h2>
            <p className="challenege-title"> 
                {targetTime} second {targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}> 
                {timerIsActive ? 'Stop' : 'Start' } Challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is Running...' : 'Timer Inactive'}
            </p>
        </section>
        </>
    );
};