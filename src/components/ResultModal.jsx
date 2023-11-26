import React, { useImperativeHandle } from 'react';
import { createPortal } from "react-dom";
import { forwardRef, useRef } from 'react';

const ResultModal = forwardRef(function ResultModal({targetTime, timeRemaining, handleReset}, ref){
    const dialog = useRef();

    const userLost = timeRemaining<=0;
    const formatTimeRemaining = (timeRemaining/1000).toFixed(2);
    const score = Math.round((1-timeRemaining / (targetTime*1000)) * 100);

    useImperativeHandle(ref, ()=>{
        return { 
            open() {
                dialog.current.showModal();
            }
        }
    });

    return(
        createPortal(<dialog className="result-modal" ref={dialog} onClose={handleReset}>
            {userLost && <h2> You Lost </h2>}
            {!userLost && <h2> Your Score: {score} </h2>}
            <p> 
                The target time was <strong> {targetTime} </strong> seconds.
            </p>
            <p>
                You stopped the timer with <strong> {formatTimeRemaining} </strong> seconds left. 
            </p>
            <form action="dialog" onSubmit={handleReset}>
                <button> Close </button>
            </form>
        </dialog>, document.getElementById('modal'))
    )
});

export default ResultModal;