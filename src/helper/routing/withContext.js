import React from 'react'

function withContext(Component = <div/>, Consumer = null) {
  if (!Consumer) return <Component/>
  function innerContext(props) {
    return (
      <Consumer>
        { contextProps => <Component {...contextProps} {...props} /> }
      </Consumer>
    )
  }
  innerContext.displayName = `withContext(${Component.displayName || Component.name || 'Component'})`
  return innerContext
}

export default withContext
