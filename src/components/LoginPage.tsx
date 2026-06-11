import React, { useState } from 'react';
import { UserProfile } from '../types';
import { pb } from '../pocketbase';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  allUsers: UserProfile[];
  onRegister: (newUser: UserProfile) => boolean;
}

export default function LoginPage({ onLogin, allUsers, onRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  // Registration states
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // Authenticate with PocketBase Auth Store
      await pb.collection('users').authWithPassword(email.trim().toLowerCase(), password);
      onLogin(email.trim(), password);
    } catch (err: any) {
      setError('Invalid username/email or password.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const data = {
        email: regEmail.trim(),
        emailVisibility: true,
        password: regPassword,
        passwordConfirm: regPassword,
        name: fullName.trim(),
        department: department,
        avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="80">🏃</text></svg>',
        level: 1,
        athleteTier: department === 'Admin' ? 'Junior Admin' : department === 'Moderator' ? 'Moderator' : 'Bronze Ath',
        points: 100,
        futsalProgress: 0,
        basketballProgress: 0,
        tennisProgress: 0
      };

      const record = await pb.collection('users').create(data);

      const newUser: UserProfile = {
        id: record.id,
        name: record.name,
        email: record.email,
        department: record.department,
        avatar: record.avatar,
        level: record.level,
        athleteTier: record.athleteTier,
        points: record.points,
        futsalProgress: record.futsalProgress,
        basketballProgress: record.basketballProgress,
        tennisProgress: record.tennisProgress,
        password: regPassword
      };

      const success = onRegister(newUser);
      if (success) {
        setEmail(regEmail.trim());
        setPassword(regPassword);
        setIsRegistering(false);
        setFullName('');
        setRegEmail('');
        setRegPassword('');
      }
    } catch (err: any) {
      setError('Failed to create account. Make sure email/username is unique and password is at least 1 character.');
    }
  };

  const handleFillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0059bb] via-[#0074e8] to-[#00d2ff] px-4 py-12 select-none">
      
      {/* Dynamic network nodes SVG background effect */}
      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Constellation line network */}
        <circle cx="10%" cy="20%" r="2" fill="white" />
        <circle cx="30%" cy="15%" r="3" fill="white" />
        <circle cx="20%" cy="45%" r="2" fill="white" />
        <circle cx="85%" cy="25%" r="4" fill="white" />
        <circle cx="70%" cy="60%" r="2" fill="white" />
        <circle cx="90%" cy="80%" r="3" fill="white" />
        <circle cx="45%" cy="85%" r="2.5" fill="white" />
        
        <line x1="10%" y1="20%" x2="30%" y2="15%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="30%" y1="15%" x2="20%" y2="45%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="85%" y1="25%" x2="70%" y2="60%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="70%" y1="60%" x2="90%" y2="80%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="20%" y1="45%" x2="45%" y2="85%" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </svg>

      {/* Main Card */}
      <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden z-10 p-8 pr-10 flex flex-col items-center">
        
        {/* Side vertical accent stripe from mockup image */}
        <div className="absolute left-0 top-0 h-full w-[20px] bg-gradient-to-b from-[#0059bb] to-[#0093e9] flex flex-col justify-start items-center py-4 gap-1 opacity-90">
          <div className="w-2.5 h-2.5 bg-white/20 rounded-xs"></div>
          <div className="w-2.5 h-2.5 bg-white/30 rounded-xs"></div>
          <div className="w-2.5 h-2.5 bg-white/10 rounded-xs"></div>
          <div className="w-2.5 h-2.5 bg-white/20 rounded-xs"></div>
          <div className="w-2.5 h-2.5 bg-white/45 rounded-xs"></div>
        </div>

        {/* Brand/Logo Section */}
        <div className="flex flex-col items-center mt-2 mb-6 ml-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl text-[#0059bb] font-extrabold select-none">
              sports_kabaddi
            </span>
            <div className="text-left">
              <h2 className="text-2xl font-black text-[#0059bb] tracking-tight uppercase leading-none font-display">
                BeeNET
              </h2>
            </div>
          </div>
        </div>

        {!isRegistering ? (
          <>
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4 ml-4">
              
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-left font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-600 text-sm">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Email / Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414754] text-left block">Username / Email</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 material-symbols-outlined text-[#717786] select-none text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    placeholder="2802526416 or email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#e9f0fc] hover:bg-[#e1e9f7] focus:bg-white border-2 border-transparent focus:border-[#0059bb] rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-[#181c20] placeholder-[#717786]/70 leading-none outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414754] text-left block">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 material-symbols-outlined text-[#717786] select-none text-lg">
                    lock
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#e9f0fc] hover:bg-[#e1e9f7] focus:bg-white border-2 border-transparent focus:border-[#0059bb] rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-[#181c20] placeholder-[#717786]/70 leading-none outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#0059bb] hover:bg-[#004bb0] text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer select-none text-sm mt-6 flex justify-center items-center gap-2"
              >
                <span>Login</span>
              </button>
            </form>

            {/* Toggle to Register */}
            <div className="w-full text-center mt-4 ml-4">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(true);
                  setError('');
                }}
                className="text-xs text-[#0059bb] font-bold hover:underline cursor-pointer select-none"
              >
                Don't have an account? Create one
              </button>
            </div>

            {/* Demo Credentials Helper (Collapsible) */}
            <div className="w-full border-t border-[#c1c6d7]/35 mt-6 pt-4 ml-4">
              <button
                type="button"
                onClick={() => setShowDemo(!showDemo)}
                className="w-full text-xs text-[#0059bb] font-bold hover:underline flex justify-between items-center cursor-pointer select-none"
              >
                <span>👉 Toggle Demo Account Details</span>
                <span className="material-symbols-outlined text-sm">
                  {showDemo ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {showDemo && (
                <div className="mt-3 bg-[#f7f9ff] border border-[#c1c6d7]/40 rounded-xl p-3 text-left space-y-2 text-[11px] text-[#414754]">
                  <p className="font-semibold text-xs text-[#181c20] border-b border-[#c1c6d7]/20 pb-1">Click a user to prefill credentials:</p>
                  
                  {/* Member */}
                  <button
                    type="button"
                    onClick={() => handleFillDemo('kevinsukias27@gmail.com', 'user123')}
                    className="w-full flex justify-between items-center bg-white hover:bg-[#eff6ff] p-2 rounded-lg border border-[#c1c6d7]/20 cursor-pointer text-left transition-colors"
                  >
                    <div>
                      <span className="font-bold text-[#0059bb] block">Member (CS Student)</span>
                      <span className="text-[10px] text-[#717786]">kevinsukias27@gmail.com</span>
                    </div>
                    <span className="bg-[#e9f0fc] px-1.5 py-0.5 rounded text-[10px] font-bold text-[#717786]">Fill</span>
                  </button>

                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() => handleFillDemo('kevin.admin@binus.ac.id', 'admin123')}
                    className="w-full flex justify-between items-center bg-white hover:bg-[#eff6ff] p-2 rounded-lg border border-[#c1c6d7]/20 cursor-pointer text-left transition-colors"
                  >
                    <div>
                      <span className="font-bold text-[#0059bb] block">Admin Member</span>
                      <span className="text-[10px] text-[#717786]">kevin.admin@binus.ac.id</span>
                    </div>
                    <span className="bg-[#e9f0fc] px-1.5 py-0.5 rounded text-[10px] font-bold text-[#717786]">Fill</span>
                  </button>

                  {/* Moderator */}
                  <button
                    type="button"
                    onClick={() => handleFillDemo('kevin.moderator@binus.ac.id', 'mod123')}
                    className="w-full flex justify-between items-center bg-white hover:bg-[#eff6ff] p-2 rounded-lg border border-[#c1c6d7]/20 cursor-pointer text-left transition-colors"
                  >
                    <div>
                      <span className="font-bold text-[#0059bb] block">Moderator Member</span>
                      <span className="text-[10px] text-[#717786]">kevin.moderator@binus.ac.id</span>
                    </div>
                    <span className="bg-[#e9f0fc] px-1.5 py-0.5 rounded text-[10px] font-bold text-[#717786]">Fill</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Registration Form */}
            <form onSubmit={handleRegisterSubmit} className="w-full space-y-4 ml-4">
              
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 text-left font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-600 text-sm">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414754] text-left block">Full Name</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 material-symbols-outlined text-[#717786] select-none text-lg">
                    badge
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Kevin Sukias"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#e9f0fc] hover:bg-[#e1e9f7] focus:bg-white border-2 border-transparent focus:border-[#0059bb] rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-[#181c20] placeholder-[#717786]/70 leading-none outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email / Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414754] text-left block">Username / Email</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 material-symbols-outlined text-[#717786] select-none text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. newuser or email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-[#e9f0fc] hover:bg-[#e1e9f7] focus:bg-white border-2 border-transparent focus:border-[#0059bb] rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-[#181c20] placeholder-[#717786]/70 leading-none outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414754] text-left block">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 material-symbols-outlined text-[#717786] select-none text-lg">
                    lock
                  </span>
                  <input
                    type="password"
                    placeholder="e.g. any password length"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-[#e9f0fc] hover:bg-[#e1e9f7] focus:bg-white border-2 border-transparent focus:border-[#0059bb] rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-[#181c20] placeholder-[#717786]/70 leading-none outline-none transition-all"
                  />
                </div>
              </div>

              {/* Department/Role Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#414754] text-left block">Department / Role</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 material-symbols-outlined text-[#717786] select-none text-lg z-10">
                    school
                  </span>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#e9f0fc] hover:bg-[#e1e9f7] focus:bg-white border-2 border-transparent focus:border-[#0059bb] rounded-xl py-3 pl-11 pr-8 text-sm font-semibold text-[#181c20] outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                  <span className="absolute right-3.5 material-symbols-outlined text-[#717786] select-none text-lg pointer-events-none">
                    arrow_drop_down
                  </span>
                </div>
              </div>

              {/* Submit Register Button */}
              <button
                type="submit"
                className="w-full bg-[#fe6b00] hover:bg-[#e05f00] text-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer select-none text-sm mt-6 flex justify-center items-center gap-2"
              >
                <span>Create Account</span>
              </button>
            </form>

            {/* Toggle back to Login */}
            <div className="w-full text-center mt-4 ml-4">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(false);
                  setError('');
                }}
                className="text-xs text-[#0059bb] font-bold hover:underline cursor-pointer select-none"
              >
                Already have an account? Login
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer Copy */}
      <footer className="mt-8 text-white/75 text-[11px] font-medium z-10 tracking-wide select-none text-center">
        Copyright © 2026 - BeeNET Group 12 - Binus University
      </footer>
    </div>
  );
}
