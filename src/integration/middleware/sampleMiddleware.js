const sampleMiddleware = ({ dispatch, getState }) => (next) => {
	return (action) => {
    console.log("SAMPLE MIDDLEWARE IS CALLED")
    next(action)
  };
}

export default sampleMiddleware;