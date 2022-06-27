import { increaseCounter } from "module/sampleRedux/action";
import { sampleSelector } from "module/sampleRedux/selector";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "assets/css/custom.scss"

const HomePage = () => {
  const dispatch = useDispatch()
  const increaseData = useSelector(sampleSelector);

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <h1>Welcome to HomePage</h1>
      <button className="bg-green-300 px-4 py-2 text-white rounded-md mt-2" onClick={() => dispatch(increaseCounter())}>Test Redux Button count : {increaseData} </button>
      <button className="sampleButtonScss">Sample button scss</button>
    </div>
  )
}

export default HomePage;