import React, {useEffect, useRef} from 'react'
import "./Confirm.scss"


const Confirm = ({
                     message, onConfirm = () => {
    }, setConfirm, abortMessage
                 }) => {
    const confirmRef = useRef()
    const handleValid = () => {
        onConfirm()
        setConfirm(false)
    }
    return (
        <div ref={confirmRef} className="overlay-popin" onClick={(e) => {
            if (e.target === confirmRef.current) setConfirm(false)
        }}>
            <div className="confirm-popin">
                {message}
                <div className="actions">
                    {abortMessage &&
                    <button className="btn small abort" onClick={() => {
                        setConfirm(false)
                    }}>Annuler
                    </button>
                    }

                    <button className="btn small confirm" onClick={handleValid}>Ok</button>
                </div>
            </div>
        </div>
    )
}
export default Confirm;