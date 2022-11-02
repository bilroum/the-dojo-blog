import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

import React from "react";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        error: null,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  //dispatchIfNotCancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    //console.log('iscncelled1: ', isCancelled)
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
