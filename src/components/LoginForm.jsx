
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'preact/hooks';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    if (auth.currentUser) {
      // Redirect to the history page if the user is already logged in
      window.location.href = '/history';
    } else {
      setLoading(false); // Stop loading if not logged in
    }
  }, []); // Run only once when the component mounts

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user_id', user.uid)

      console.log(user.uid)
      // Success: User logged in successfully
      setMessage("🎉 Welcome back!");
      setIsError(false);

      // Redirect to the history page after 2 seconds
      setTimeout(() => {
        window.location.href = '/history'; // Redirect to the history page
      }, 2000);

    } catch (error) {
      let errorMsg = "Login failed.";
      console.error("Login error:", error);  // Log detailed error
      switch (error.code) {
        case 'auth/user-not-found':
          errorMsg = "🚫 User not found. Please sign up first.";
          break;
        case 'auth/wrong-password':
          errorMsg = "❌ Incorrect password. Please try again.";
          break;
        case 'auth/invalid-email':
          errorMsg = "⚠️ Invalid email format.";
          break;
        default:
          errorMsg = "Error: " + error.message;
      }

      setMessage(errorMsg);
      setIsError(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-accent dark:text-white highlight mb-6">Welcome Back</h2>

        {/* 🔔 Feedback Message */}
        {message && (
          <div className={`text-sm mb-4 rounded-md p-3 text-center transition-all ${
            isError ? 'bg-red-100 text-red-700 dark:bg-red-800/40' : 'bg-green-100 text-green-700 dark:bg-green-800/40'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right">
            <a href="/forgot-password" className="text-accent dark:text-blue-400 hover:underline text-sm">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent text-white font-bold py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account? <a href="/signup" className="text-accent dark:text-blue-400 font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;