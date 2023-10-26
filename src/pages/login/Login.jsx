import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState(""); // Add nickname state
  const [petName, setPetName] = useState(""); // Add pet name state

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user profile data to Firestore
      await addUserProfile(user.uid, nickname, petName);

      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  // Function to add user profile data to Firestore
  const addUserProfile = async (uid, nickname, petName) => {
    // Reference the 'userProfiles' collection (assuming this is the collection name)
    const userProfilesRef = collection(db, "userProfiles");

    try {
      // Add the user profile data to Firestore
      await addDoc(userProfilesRef, {
        uid,
        email,
        nickname,
        petName,
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
          type="email"
          placeholder="Nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="password"
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
