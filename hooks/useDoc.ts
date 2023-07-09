import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../config/FirebaseConfig";

const useDoc = (colRef: string, docRef: string) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const Ref = collection(FIREBASE_DB, colRef);
    const Doc = doc(Ref, docRef);

    const unsubscribe2 = onSnapshot(Doc, (snapshot) => {
      const data: any = snapshot.data();
      setData(data);
    });

    return () => {
      unsubscribe2();
    };
  }, [colRef, docRef]);

  return { data };
};

export default useDoc;
