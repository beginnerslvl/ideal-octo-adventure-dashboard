import { db } from "../../firebase";
import { query, where, getDocs, collection } from "firebase/firestore";

async function getUserPetName(userIdentifier) {
  const userProfilesRef = collection(db, "userProfiles");

  // Query the userProfiles collection to find the user by their email or UID
  const q = query(userProfilesRef, where("email", "==", userIdentifier)); // You can change "email" to any field you want to search by

  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      const petName = user.petName;
      console.log(`User's pet name: ${petName}`);
      return petName;
    });
  } catch (error) {
    console.error("Error getting user's pet name:", error);
    return null;
  }
}

export default getUserPetName;
