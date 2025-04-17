import { useState } from 'preact/hooks';
import { auth, database } from '../firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function SignupForm() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;
    const confirmPassword = event.target['confirm-password'].value;

    if (password !== confirmPassword) {
      setMessage("🚫 Passwords do not match.");
      setIsSuccess(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(database, 'users/' + user.uid), {
        fullName: name,
        email: email,
        createdAt: new Date().toISOString()
      });

      setMessage("🎉 Signup successful! Redirecting to OTP...");
      setIsSuccess(true);

      setTimeout(() => {
        window.location.href = "/otp";
      }, 2000);
    } catch (error) {
      setMessage("❌ Error: " + error.message);
      setIsSuccess(false);
      console.error(error);
    }
  };

  return (
    <>
      {message && (
        <div className={`text-center text-sm font-medium mb-4 rounded-md p-3 transition-all ${
          isSuccess ? 'text-green-700 bg-green-100 dark:bg-green-800/40' : 'text-red-700 bg-red-100 dark:bg-red-800/40'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full px-4 py-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white transition"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full px-4 py-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white transition"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            className="w-full px-4 py-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white transition"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-gray-700 dark:text-gray-300 font-medium">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            name="confirm-password" 
            required 
            className="w-full px-4 py-3 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white transition"
            placeholder="Re-enter your password"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-accent text-white font-semibold py-3 rounded-lg shadow-md hover:bg-accent-dark hover:scale-[1.03] transition-transform"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}