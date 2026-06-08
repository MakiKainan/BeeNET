import React, { useState } from 'react';
import { UserProfile, ForumPost, GameSession, Task } from '../types';

interface DashboardViewProps {
  activeUser: UserProfile;
  forumPosts: ForumPost[];
  gameSessions: GameSession[];
  todoList: Task[];
  onToggleTodo: (id: string) => void;
  onAddTodo: (title: string, duration: string) => void;
  onJoinSession: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
  onSelectPost: (post: ForumPost) => void;
}

export default function DashboardView({
  activeUser,
  forumPosts,
  gameSessions,
  todoList,
  onToggleTodo,
  onAddTodo,
  onJoinSession,
  onNavigateToTab,
  onSelectPost
}: DashboardViewProps) {
  
  // Local state for adding inline todo
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoTime, setNewTodoTime] = useState('16:00 - 17:30');

  // Find the primary featured basketball pick-up session for the Next Up card
  const nextUpSession = gameSessions.find(s => s.id === 'ses_2') || gameSessions[0];

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    onAddTodo(newTodoTitle, newTodoTime);
    setNewTodoTitle('');
    setShowAddTodo(false);
  };

  return (
    <div className="space-y-8 animate-fade-in select-none text-left">
      
      {/* Dynamic Greetings Area */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181c20] tracking-tight font-display mb-1">
            Good morning, {activeUser.name.split(' ')[0]}!
          </h2>
          <p className="text-sm md:text-base text-[#414754] font-medium">
            You have <span className="text-[#0059bb] font-bold">2 sessions</span> scheduled for today at Anggrek Campus.
          </p>
        </div>
        
        {/* Athletic Level Status Indicator */}
        <div className="px-4 py-2 rounded-full bg-[#e0e3e8] border border-[#c1c6d7]/35 flex items-center gap-1.5 shadow-2xs">
          <span className="material-symbols-outlined text-[#0059bb] text-[18px]">bolt</span>
          <span className="text-xs font-bold text-[#181c20]">
            Lv. {activeUser.level} {activeUser.athleteTier}
          </span>
        </div>
      </section>

      {/* Kinetic Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column Bento: Progress & Rector Cup */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#181c20] font-display">My Progress</h3>
              <span className="material-symbols-outlined text-[#717786] text-[22px]">trending_up</span>
            </div>

            {/* Progress Bars Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Futsal */}
              <div className="flex flex-col gap-1.5 p-4 bg-[#f1f4f9] rounded-xl border border-[#c1c6d7]/10">
                <div className="flex justify-between text-xs font-bold text-[#414754]">
                  <span>Futsal</span>
                  <span className="text-[#a04100]">{activeUser.futsalProgress}%</span>
                </div>
                <div className="h-2 w-full bg-[#e0e3e8] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#a04100] rounded-full transition-all duration-1000"
                    style={{ width: `${activeUser.futsalProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#717786] mt-0.5">Semi-Pro Tier</span>
              </div>

              {/* Basketball */}
              <div className="flex flex-col gap-1.5 p-4 bg-[#f1f4f9] rounded-xl border border-[#c1c6d7]/10">
                <div className="flex justify-between text-xs font-bold text-[#414754]">
                  <span>Basketball</span>
                  <span className="text-[#a04100]">{activeUser.basketballProgress}%</span>
                </div>
                <div className="h-2 w-full bg-[#e0e3e8] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#a04100] rounded-full transition-all duration-1000"
                    style={{ width: `${activeUser.basketballProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#717786] mt-0.5">Amateur II</span>
              </div>

              {/* Tennis */}
              <div className="flex flex-col gap-1.5 p-4 bg-[#f1f4f9] rounded-xl border border-[#c1c6d7]/10">
                <div className="flex justify-between text-xs font-bold text-[#414754]">
                  <span>Tennis</span>
                  <span className="text-[#a04100]">{activeUser.tennisProgress}%</span>
                </div>
                <div className="h-2 w-full bg-[#e0e3e8] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#a04100] rounded-full transition-all duration-1000"
                    style={{ width: `${activeUser.tennisProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#717786] mt-0.5">Rising Star</span>
              </div>

            </div>
          </div>

          {/* Rector Cup training advertisement */}
          <div className="mt-6 relative h-44 rounded-xl overflow-hidden group cursor-pointer shadow-sm" onClick={() => onNavigateToTab('facilities')}>
            <img 
              alt="Campus Sports Activity" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://student.binus.ac.id/wp-content/uploads/2018/09/RECTOR-CUP-OFFICIAL-FLAG-PRINT-size-150x100-Cm.jpg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
              <span className="bg-[#fe6b00] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 w-max">
                Featured Campaign
              </span>
              <p className="text-white font-extrabold text-lg leading-tight font-display">Train for Rector Cup 2026!</p>
              <p className="text-white/80 text-xs mt-0.5 font-medium">Verified student programs starting early next months.</p>
            </div>
          </div>
        </div>

        {/* Right Column Bento: Upcoming Session Card */}
        <div className="lg:col-span-4 bg-[#0059bb] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden bg-gradient-to-b from-[#0059bb] to-[#004493]">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 opacity-10 rounded-full blur-2xl -mr-16 -mt-16"></div>

          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="bg-[#fe6b00] text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Next Up
                </span>
                <h3 className="text-xl font-bold font-display mt-2 leading-tight">
                  {nextUpSession?.title || "Basketball Friendly"}
                </h3>
              </div>
              <span className="material-symbols-outlined text-[32px] opacity-75">
                sports_basketball
              </span>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ffdbcc]">schedule</span>
                <span>{nextUpSession?.time || "16:30 - 18:00 (Today)"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ffdbcc]">location_on</span>
                <span className="truncate">{nextUpSession?.location || "Anggrek Campus, Hall B"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ffdbcc]">group</span>
                <span>{nextUpSession?.playersJoined || 8}/{nextUpSession?.playersMax || 10} Players Joined</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button 
              onClick={() => {
                if (nextUpSession) {
                  onJoinSession(nextUpSession.id);
                  if (nextUpSession.hasJoined) {
                    alert('You have left this basketball lineup.');
                  } else {
                    alert('🎉 Joined! Added to your schedule.');
                  }
                }
              }}
              className={`flex-grow font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer ${
                nextUpSession?.hasJoined 
                  ? 'bg-white/15 hover:bg-white/25 border border-white/20 text-white' 
                  : 'bg-[#fe6b00] hover:bg-[#fe6b00]/95 text-white'
              }`}
            >
              {nextUpSession?.hasJoined ? 'Already Joined' : 'Join Now'}
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Copied match link to clipboard!');
              }}
              className="px-3.5 py-3.5 border border-white/20 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm leading-none">share</span>
            </button>
          </div>
        </div>

        {/* Lower Row: Forum Posts Overview */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#181c20] font-display">Community Forum</h3>
              <button 
                onClick={() => onNavigateToTab('forum')}
                className="text-[#0059bb] text-xs font-bold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-1">
              {forumPosts.slice(0, 2).map((post, idx) => (
                <div 
                  key={post.id} 
                  onClick={() => onSelectPost(post)}
                  className={`py-4.5 group cursor-pointer text-left transition-colors ${
                    idx > 0 ? 'border-t border-[#c1c6d7]/35' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={post.avatar} 
                      alt={post.author} 
                      className="w-8 h-8 rounded-full object-cover border"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-bold text-[#181c20]">{post.author}</span>
                    <span className="text-[11px] text-[#717786]">• {post.timeAgo}</span>
                  </div>
                  
                  <h4 className="font-bold text-sm text-[#181c20] group-hover:text-[#0059bb] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  
                  <div className="flex gap-4 mt-2.5 text-[11px] text-[#414754]/85 font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">forum</span>
                      {post.comments.length} Replies
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">thumb_up</span>
                      {post.upvotes} Votes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Row: To-Do List Widget */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#181c20] font-display">To-Do List</h3>
              <button 
                onClick={() => setShowAddTodo(!showAddTodo)}
                className="w-8 h-8 rounded-full bg-[#d8e2ff] flex items-center justify-center text-[#0059bb] hover:bg-[#0070ea] hover:text-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">add</span>
              </button>
            </div>

            {/* Quick Add Inline task bar */}
            {showAddTodo && (
              <form onSubmit={handleCreateTodo} className="mb-4 bg-[#f1f4f9] p-3.5 rounded-xl border border-[#c1c6d7]/30 space-y-2.5">
                <input 
                  type="text" 
                  value={newTodoTitle}
                  onChange={(e) => setNewTodoTitle(e.target.value)}
                  placeholder="Task name (e.g. Backhand Practice)..."
                  className="w-full bg-white text-xs px-3 py-2 border rounded-lg focus:ring-1 focus:ring-[#0059bb]/40 outline-none font-medium text-[#181c20]"
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTodoTime}
                    onChange={(e) => setNewTodoTime(e.target.value)}
                    placeholder="Duration (e.g. 15:00 - 18:00)..."
                    className="flex-1 bg-white text-xs px-3 py-1.5 border rounded-lg outline-none font-medium text-[#181c20]"
                  />
                  <button 
                    type="submit"
                    className="bg-[#fe6b00] hover:bg-[#fe6b00]/95 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg active:scale-95 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}

            {/* Tasks list */}
            <div className="space-y-2">
              {todoList.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => onToggleTodo(task.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl transition-all border cursor-pointer ${
                    task.completed 
                      ? 'bg-[#f1f4f9]/40 border-[#c1c6d7]/10 opacity-60' 
                      : 'bg-[#f1f4f9] border-[#c1c6d7]/20 border-l-4 border-l-[#fe6b00] hover:bg-[#ebeef3]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-sm leading-none select-none transition-colors ${
                    task.completed ? 'text-[#0059bb]' : 'text-[#717786]'
                  }`}>
                    {task.completed ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  
                  <div className="flex-grow">
                    <p className={`text-xs font-bold text-[#181c20] leading-tight ${task.completed ? 'line-through text-[#717786]' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-[10px] text-[#717786] mt-0.5">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fitness Gym image */}
          <div className="mt-5 rounded-xl overflow-hidden h-28 border border-[#c1c6d7]/20 shadow-2xs relative">
            <img 
              alt="Student Lifestyle Gym" 
              className="w-full h-full object-cover select-none grayscale-[0.1] hover:grayscale-0 transition-all duration-500" 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrc2xomvH-2z5Yy9ZFbDSZuy0ruxVw3RH-fA&s"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
