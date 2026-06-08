import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [activeView, setActiveView] = useState('login');

  return (
    <div className="min-h-screen">
      <div className="fixed left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-slate-950/85 p-1 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setActiveView('login')}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeView === 'login'
              ? 'bg-cyan-400 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setActiveView('signup')}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeView === 'signup'
              ? 'bg-cyan-400 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          Sign up
        </button>
      </div>

      {activeView === 'login' ? (
        <Login onSwitchToSignup={() => setActiveView('signup')} />
      ) : (
        <Signup onSwitchToLogin={() => setActiveView('login')} />
      )}
    </div>
  );
};

export default App;
