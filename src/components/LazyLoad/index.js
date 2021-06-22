import React from "react"

const Loading = React.memo(({error, timedOut, pastDelay, retry}) => {
    if (error) {
        return (
            <div>
                Something when wrong
                <button onClick={retry}>retry</button>
            </div>
        )
    }
    if (timedOut) {
        return (
            <div>
                taking too much time... ?
                <button onClick={retry}>retry</button>
            </div>
        )
    }
    if (pastDelay) {
        return (
            <div className="pt-3 text-center">
                <div className="sk-spinner sk-spinner-pulse"/>
            </div>
        )
    }
    return null
})

export default Loading