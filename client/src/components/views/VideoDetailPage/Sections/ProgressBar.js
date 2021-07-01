import React from 'react'

function ProgressBar({ currentTime, totalTime, onTouchStart, onChange, onTouchMove, onTouchEnd }) {
    const percent = ((currentTime / totalTime || 0) * 100)
    return (
        <div className="progressBar">
            <input
                type="range"
                min="0"
                max="100"
                value={percent}
                step="0.01"
                onInput={onChange}
                onChange={onChange}
                onMouseDown={onTouchStart}
                onMouseUp={onTouchEnd}
            // ontouchend={onchange.bind(this)}
            />
        </div>
    )
}

export default ProgressBar
