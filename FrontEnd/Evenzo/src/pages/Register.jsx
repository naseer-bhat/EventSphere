// src/components/Register.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebase"; // db = Firestore
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !username || !email || !role || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save extra user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username,
        email,
        role,
        createdAt: new Date(),
      });

      // Save in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('fullName', fullName);

      alert(`Registered as ${fullName} (${role})`);
      navigate(`/${role}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register & Explore Events</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-transparent border my-2 border-gray-500/30 outline-none rounded-full py-2.5 px-4" required />
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-transparent border my-2 border-gray-500/30 outline-none rounded-full py-2.5 px-4" required />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border my-2 border-gray-500/30 outline-none rounded-full py-2.5 px-4" required />
          <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border my-2 border-gray-500/30 outline-none rounded-full py-2.5 px-4" required />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-transparent border border-gray-500/30 my-2 outline-none rounded-full py-2.5 px-4" required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="coordinator">Coordinator</option>
            <option value="participant">Participant</option>
          </select>
          <button type="submit" className="w-full bg-indigo-500 py-2.5 mt-4 rounded-full text-white">Register</button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
        </p>

        <button type="button" className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
          Register with Apple
        </button>

        <button type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
          Register with Google
        </button>
      </div>
    </div>
  );
}

export default Register;
