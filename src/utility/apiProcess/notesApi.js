import apiList from "constant/apiUrl";
import { startRequest } from "utility/requestHelper/requestHelper";

export const getNotesList = async () => {
  const apiData = {
    url: apiList.noteApi,
    method: "GET",
  };

  return startRequest(apiData);
};

// example for uptade data
export const updateNotesList = async (dataList) => {
  const apiData = {
    url: `${apiList.noteApi}/update/${dataList.id}`,
    method: "POST",
    data: {
      id: dataList.id,
      // or
      // ...dataList
    },
  };
  
  console.log("START UPDATE", apiData)
  return { 
    message: "updated"
  }
  // return startRequest(apiData);
};