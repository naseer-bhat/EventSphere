// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('Failed to send reset email. Make sure your email is correct.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 py-2.5 rounded-full text-white"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600">
            ✅ A password reset link has been sent to <b>{email}</b>.
          </div>
        )}

        <p className="text-center mt-4">
          Back to{' '}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
