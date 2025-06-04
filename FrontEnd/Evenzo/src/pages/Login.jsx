// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert('Please fill in both email/username and password.');
      return;
    }

    try {
      let email = identifier;

      // If identifier doesn't look like an email, treat it as a username
      if (!identifier.includes('@')) {
        const q = query(collection(db, 'users'), where('username', '==', identifier));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert('Username not found');
          return;
        }

        email = querySnapshot.docs[0].data().email;
      }

      // Sign in with resolved email
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch role and other info from Firestore
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (!docSnap.exists()) {
        alert("User data not found");
        return;
      }

      const userData = docSnap.data();

      // Save in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', userData.role);
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('fullName', userData.fullName);

      onLogin(userData.role);
      navigate(`/${userData.role}`);
    } catch (error) {
      console.error(error);
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docSnap = await getDoc(doc(db, 'users', user.uid));
      let role = 'participant';

      if (docSnap.exists()) {
        const userData = docSnap.data();
        localStorage.setItem('role', userData.role);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('fullName', userData.fullName);
        role = userData.role;
      } else {
        // Set default user if not found
        localStorage.setItem('email', user.email);
        localStorage.setItem('username', user.displayName || 'unknown');
        localStorage.setItem('fullName', user.displayName || 'User');
        localStorage.setItem('role', role);
      }

      localStorage.setItem('isLoggedIn', 'true');
      onLogin(role);
      navigate(`/${role}`);
    } catch (err) {
      console.error(err);
      alert('Google login failed.');
    }
  };

  const handleAppleLogin = () => {
    alert('Apple login is not available in Firebase by default.\nUse OAuth 2.0 + Apple Developer account to set it up.');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Let’s Go!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter email or username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          />

          <div className="text-right py-4">
            <a className="text-blue-600 underline" href="/forgot">Forgot Password</a>
          </div>

          <button type="submit" className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white">
            Log in
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account? <a href="/register" className="text-blue-500 underline">Signup</a>
        </p>

        <button
          type="button"
          onClick={handleAppleLogin}
          className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white"
        >
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
          Log in with Apple
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
          Log in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
