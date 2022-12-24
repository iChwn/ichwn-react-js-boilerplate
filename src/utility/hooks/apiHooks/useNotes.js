import { useEffect, useState } from "react"
import { useCustomMutationReactQuery } from "../setupHooks";
import { getNotesList, updateNotesList } from "utility/apiProcess/notesApi";

export const useNote = () => {
  const [notesList, setNotesList] = useState({})

  const { isLoading: isGetNotesLoading, decryptedData, startFetch: getListNotes} = useCustomMutationReactQuery(
    getNotesList,
    {
      onError: e => console.log(e),
    }
  );

  useEffect(() => {
    if (decryptedData == null) return;

    setNotesList(decryptedData);
  }, [decryptedData]);

  const getNotes = () => {
    getListNotes()
  }

  const { isLoading: isUpdateNoteLoading, startFetch: noteUpdate} = useCustomMutationReactQuery(
    updateNotesList,
    {
      onError: e => console.log(e),
    }
  );

  const updateNotes = (data) => {
    noteUpdate(data)
  }

  return {
    getNotes,
    notesList,
    isGetNotesLoading,
    updateNotes,
    isUpdateNoteLoading
  }
}