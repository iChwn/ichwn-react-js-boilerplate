import { increaseCounter } from "module/sampleRedux/action";
import { sampleSelector } from "module/sampleRedux/selector";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "assets/css/custom.scss"
import { useNote } from "utility/hooks/apiHooks/useNotes";
import _ from "lodash";

const HomePage = () => {
  const dispatch = useDispatch()
  const increaseData = useSelector(sampleSelector);

  const { getNotes, isGetNotesLoading, notesList, updateNotes } = useNote()
  
  useEffect(() => {
    console.log(notesList)
  }, [isGetNotesLoading, notesList])


  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <h1>Welcome to HomePage</h1>
      <button className="bg-green-300 px-4 py-2 text-white rounded-md mt-2" onClick={() => dispatch(increaseCounter())}>Test Redux Button count : {increaseData} </button>
      <button className="sampleButtonScss">Sample button scss</button>
      <button className="bg-blue-300 px-4 py-2 text-white rounded-md mt-2" onClick={getNotes}>get sample api</button>
      <button className="bg-blue-300 px-4 py-2 text-white rounded-md mt-2" onClick={() => updateNotes({id: 1, title: "update"})}>update sample api</button>
      <span>{isGetNotesLoading && "Loading..."}</span>
      {!isGetNotesLoading && !_.isEmpty(notesList) && (
        <div className="mt-[10px]">
          <span>Title: {notesList.data[0].title}</span> <br/>
          <span>Data Length: {notesList.data.length}</span>
        </div>
      )}
    </div>
  )
}

export default HomePage;