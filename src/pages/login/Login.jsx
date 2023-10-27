import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"; // Make sure to import db from Firebase
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { db, collection, query, where, getDocs } from "firebase/firestore";

const fetchAndLogPetName = async (email) => {
  const userProfilesRef = collection(db, "userProfiles");
  const q = query(userProfilesRef, where("email", "==", email));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    const userProfile = querySnapshot.docs[0].data();
    const petName = userProfile.petName;

    console.log(`Pet Name: ${petName}`);
    return petName;
  } catch (error) {
    console.error("Error fetching pet name: ", error);
    return null;
  }
};

// Example usage:
const emailToSearch = "ajmalwaleed107@gmail.com"; // Replace with the email you want to search
fetchAndLogPetName(emailToSearch);


const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [petName, setPetName] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user profile data to Firestore
      await addUserProfile(user.uid, nickname, petName);

      // Log the user's nickname and pet name
      console.log(`Nickname: ${nickname}, Pet Name: ${petName}`);

      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  const addUserProfile = async (uid, nickname, petName) => {
    // Reference the 'userProfiles' collection
    const userProfilesRef = collection(db, "userProfiles");

    try {
      // Add the user profile data to Firestore
      await addDoc(userProfilesRef, {
        uid,
        email,
        nickname, // Add nickname to Firestore
        petName, // Add pet name to Firestore
      });
    } catch (error) {
      console.error("Error adding user profile: ", error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text" // Change this to text for nickname
          placeholder="Nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text" // Change this to text for pet name
          placeholder="Pet Name"
          onChange={(e) => setPetName(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  );
};

export default Login;
