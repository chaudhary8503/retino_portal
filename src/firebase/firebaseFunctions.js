import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from './firebase';  // Ensure db is properly imported

export async function getUploadHistory(userId) {
  const uploadsRef = collection(db, "uploads");  // Reference to the 'uploads' collection
  const q = query(
    uploadsRef,
    where("user_id", "==", userId),
    orderBy("date_uploaded", "desc")  // Sorting by date_uploaded
  );

  const querySnapshot = await getDocs(q);
  const history = [];

  querySnapshot.forEach((doc) => {
    history.push(doc.data());
  });

  return history;
}
