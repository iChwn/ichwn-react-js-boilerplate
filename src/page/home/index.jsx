import { increaseCounter } from "module/sampleRedux/action";
import { sampleSelector } from "module/sampleRedux/selector";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "assets/css/custom.scss"
import { useCustomMutationReactQuery } from "utility/hooks/useCustomMutationReactQuery";
import apiList from "constant/apiUrl";
import { startRequest } from "utility/requestHelper/requestHelper";

const HomePage = () => {
  const dispatch = useDispatch()
  const increaseData = useSelector(sampleSelector);

  const getRedeemHistory = async () => {
    const filter = {};
 
    const apiData = {
      url: `${apiList.sampleApi}/1`,
      method: "GET",
      data: {
        ...filter,
      },
      allowBanRequest: true,
    };
  
    return startRequest(apiData);
  };

  const { decryptedData, startFetch, isLoading } = useCustomMutationReactQuery(
    getRedeemHistory,
    {
      isStartOnInit: false,
      onError: e => console.log(e),
    }
  );

  const handleGetAPI = () => {
    startFetch()
  }
  
  useEffect(() => {
    console.log(isLoading, decryptedData)
  }, [isLoading, decryptedData])


  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <h1>Welcome to HomePage</h1>
      <button className="bg-green-300 px-4 py-2 text-white rounded-md mt-2" onClick={() => dispatch(increaseCounter())}>Test Redux Button count : {increaseData} </button>
      <button className="sampleButtonScss">Sample button scss</button>
      <button className="bg-blue-300 px-4 py-2 text-white rounded-md mt-2" onClick={handleGetAPI}>get sample api</button>
      <span>{isLoading && "Loading..."}</span>
      {decryptedData && (
        <span className="mt-[10px]">Title: {decryptedData.data.title}</span>
      )}
    </div>
  )
}

export default HomePage;