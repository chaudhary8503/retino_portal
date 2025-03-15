import { useState } from 'preact/hooks';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login button clicked!", { email, password });
    // Add authentication logic here
  };

  return (
    <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div class="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 class="text-3xl font-bold text-center text-accent dark:text-white highlight mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} class="space-y-6">
          {/* Email Input */}
          <div>
            <label for="email" class="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              required 
              class="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label for="password" class="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              required 
              class="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password Link */}
          <div class="text-right">
            <a href="/forgot-password" class="text-accent dark:text-blue-400 hover:underline text-sm">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            class="w-full bg-accent text-white font-bold py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p class="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account? <a href="/signup" class="text-accent dark:text-blue-400 font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
