import React, { useState } from 'react';
import { UserProfile, ForumPost, GameSession, Task, Toast } from '../types';

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
  onShowToast: (message: string, type?: Toast['type']) => void;
  onSelectSession?: (session: GameSession) => void;
  campaignBanner: { title: string; subtitle: string; image: string };
  onUpdateCampaign?: (title: string, subtitle: string, image: string) => void;
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
  onSelectPost,
  onShowToast,
  onSelectSession,
  campaignBanner,
  onUpdateCampaign
}: DashboardViewProps) {

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoTime, setNewTodoTime] = useState('16:00 - 17:30');

  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editImage, setEditImage] = useState('');

  // Show the first joined session in Next Up, fall back to first available
  const nextUpSession = gameSessions.find(s => s.hasJoined) ?? gameSessions[0] ?? null;

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim() || !editImage.trim()) return;
    onUpdateCampaign?.(editTitle, editSubtitle, editImage);
    setIsEditingCampaign(false);
  };

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    onAddTodo(newTodoTitle, newTodoTime);
    setNewTodoTitle('');
    setShowAddTodo(false);
  };

  const todayItems = todoList.filter(t => !t.completed).length;

  return (
    <div className="space-y-8 animate-fade-in select-none text-left">

      {/* Greeting */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181c20] tracking-tight font-display mb-1">
            Good morning, {activeUser.name.split(' ')[0]}!
          </h2>
          <p className="text-sm md:text-base text-[#414754] font-medium">
            {todayItems > 0 ? (
              <>You have <span className="text-[#0059bb] font-bold">{todayItems} task{todayItems > 1 ? 's' : ''}</span> scheduled for today on campus.</>
            ) : (
              "Welcome back! You have a clean slate. No scheduled active tasks or matches."
            )}
          </p>
        </div>
        <div className="px-4 py-2 rounded-full bg-[#e0e3e8] border border-[#c1c6d7]/35 flex items-center gap-1.5 shadow-2xs">
          <span className="material-symbols-outlined text-[#0059bb] text-[18px]">bolt</span>
          <span className="text-xs font-bold text-[#181c20]">
            Lv. {activeUser.level} {activeUser.athleteTier}
          </span>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Progress & Rector Cup */}
        <div className="lg:col-span-12 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#181c20] font-display">My Progress</h3>
              <span className="material-symbols-outlined text-[#717786] text-[22px]">trending_up</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Futsal', value: activeUser.futsalProgress, tier: 'Semi-Pro Tier' },
                { label: 'Basketball', value: activeUser.basketballProgress, tier: 'Amateur II' },
                { label: 'Tennis', value: activeUser.tennisProgress, tier: 'Rising Star' },
              ].map(({ label, value, tier }) => (
                <div key={label} className="flex flex-col gap-1.5 p-4 bg-[#f1f4f9] rounded-xl border border-[#c1c6d7]/10">
                  <div className="flex justify-between text-xs font-bold text-[#414754]">
                    <span>{label}</span>
                    <span className="text-[#a04100]">{value}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#e0e3e8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#a04100] rounded-full transition-all duration-1000" style={{ width: `${value}%` }} />
                  </div>
                  <span className="text-[10px] font-semibold text-[#717786] mt-0.5">{tier}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 relative h-44 rounded-xl overflow-hidden group cursor-pointer shadow-sm" onClick={() => onNavigateToTab('facilities')}>
            <img
              alt="Campus Sports Activity"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={campaignBanner.image}
              referrerPolicy="no-referrer"
            />
            {activeUser.department === 'Admin' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditTitle(campaignBanner.title);
                  setEditSubtitle(campaignBanner.subtitle);
                  setEditImage(campaignBanner.image);
                  setIsEditingCampaign(true);
                }}
                className="absolute top-4 right-4 bg-white hover:bg-[#f1f4f9] text-[#0059bb] font-black text-[10px] uppercase px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md cursor-pointer transition-all active:scale-95 z-20 border border-[#c1c6d7]/30"
              >
                <span className="material-symbols-outlined text-[13px] font-bold">upload</span>
                <span>Upload Content</span>
              </button>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
              <span className="bg-[#fe6b00] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1 w-max">
                Featured Campaign
              </span>
              <p className="text-white font-extrabold text-lg leading-tight font-display">{campaignBanner.title}</p>
              <p className="text-white/80 text-xs mt-0.5 font-medium">{campaignBanner.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Community Forum */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#181c20] font-display">Community Forum</h3>
              <button onClick={() => onNavigateToTab('forum')} className="text-[#0059bb] text-xs font-bold hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-1">
              {forumPosts.length > 0 ? (
                forumPosts.slice(0, 2).map((post, idx) => (
                  <div
                    key={post.id}
                    onClick={() => onSelectPost(post)}
                    className={`py-4.5 group cursor-pointer text-left transition-colors ${idx > 0 ? 'border-t border-[#c1c6d7]/35' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border" referrerPolicy="no-referrer" />
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
                ))
              ) : (
                <div className="py-8 text-center bg-[#f1f4f9]/30 rounded-xl border border-dashed border-[#c1c6d7] flex flex-col items-center justify-center p-4">
                  <span className="material-symbols-outlined text-[#717786] text-[36px] mb-2">forum</span>
                  <p className="text-xs font-bold text-[#181c20]">No discussion threads yet</p>
                  <p className="text-[11px] text-[#717786] mt-0.5 mb-3">Be the first to share a sports update or ask a question!</p>
                  <button onClick={() => onNavigateToTab('forum')} className="bg-[#0059bb] hover:bg-[#0059bb]/90 text-white text-[11px] font-bold px-3 py-1.5 rounded">
                    Post on Forum
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* To-Do List */}
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
                  <button type="submit" className="bg-[#fe6b00] hover:bg-[#fe6b00]/95 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg active:scale-95 cursor-pointer">
                    Add
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {todoList.length > 0 ? (
                todoList.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onToggleTodo(task.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl transition-all border cursor-pointer ${
                      task.completed
                        ? 'bg-[#f1f4f9]/40 border-[#c1c6d7]/10 opacity-60'
                        : 'bg-[#f1f4f9] border-[#c1c6d7]/20 border-l-4 border-l-[#fe6b00] hover:bg-[#ebeef3]'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-sm leading-none select-none transition-colors ${task.completed ? 'text-[#0059bb]' : 'text-[#717786]'}`}>
                      {task.completed ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <div className="flex-grow">
                      <p className={`text-xs font-bold text-[#181c20] leading-tight ${task.completed ? 'line-through text-[#717786]' : ''}`}>
                        {task.title}
                      </p>
                      <p className="text-[10px] text-[#717786] mt-0.5">{task.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center bg-[#f1f4f9]/30 rounded-xl border border-dashed border-[#c1c6d7] flex flex-col items-center justify-center p-4">
                  <span className="material-symbols-outlined text-[#717786] text-[36px] mb-2">assignment_turned_in</span>
                  <p className="text-xs font-bold text-[#181c20]">Tasks list is empty</p>
                  <p className="text-[11px] text-[#717786] mt-0.5">Host a session or booking to add tasks, or type custom items above!</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Upcoming Matches Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#181c20] font-display">Upcoming Matches</h3>
          <button 
            onClick={() => onNavigateToTab('sessions')} 
            className="text-[#0059bb] text-xs font-bold hover:underline"
          >
            Explore All Games
          </button>
        </div>
        
        {gameSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameSessions.slice(0, 3).map((session) => {
              const isCapacityFull = session.playersJoined >= session.playersMax;
              const isUserJoined = session.hasJoined;
              return (
                <div 
                  key={session.id}
                  onClick={() => onSelectSession?.(session)}
                  className="bg-white rounded-2xl border border-[#c1c6d7]/15 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group cursor-pointer text-left"
                >
                  {/* Banner with cover */}
                  <div className="relative h-36 overflow-hidden bg-slate-100">
                    <img 
                      src={session.image} 
                      alt={session.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#fe6b00] px-2.5 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                      {session.level}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-[#0059bb]/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-wider">
                      {session.sport}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#181c20] font-display leading-tight group-hover:text-[#0059bb] transition-colors">{session.title}</h4>
                      <p className="text-[10px] text-[#717786] font-semibold flex items-center gap-0.5 mt-1">
                        <span className="material-symbols-outlined text-xs leading-none">location_on</span>
                        <span className="truncate">{session.location}</span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs font-semibold py-1.5 px-2.5 bg-[#f1f4f9] rounded-lg border border-[#c1c6d7]/10">
                      <span className="text-[#181c20] text-[10px]">{session.time}</span>
                      <span className={`text-[10px] font-black ${isCapacityFull ? 'text-[#fe6b00]' : 'text-[#0059bb]'}`}>
                        {session.playersJoined}/{session.playersMax} Joined
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#f1f4f9]">
                      <div className="flex items-center gap-2">
                        <img src={session.hostAvatar} alt={session.hostName} className="w-6 h-6 rounded-full object-cover border" referrerPolicy="no-referrer" />
                        <span className="text-[10px] font-bold text-[#181c20]">{session.hostName}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinSession(session.id);
                          onShowToast(
                            isUserJoined 
                              ? `Left match "${session.title}"` 
                              : `Joined match "${session.title}"! Added to schedule & to-do list.`,
                            isUserJoined ? 'info' : 'success'
                          );
                        }}
                        className={`px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase transition-all cursor-pointer ${
                          isUserJoined 
                            ? 'bg-[#e0e3e8] text-[#414754]' 
                            : 'bg-[#0059bb] text-white hover:bg-[#0070ea]'
                        }`}
                      >
                        {isUserJoined ? 'Joined' : 'Join'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center bg-[#f1f4f9]/30 rounded-xl border border-dashed border-[#c1c6d7] flex flex-col items-center justify-center p-4">
            <span className="material-symbols-outlined text-[#717786] text-[36px] mb-2">sports_handball</span>
            <p className="text-xs font-bold text-[#181c20]">No upcoming matches scheduled</p>
            <p className="text-[11px] text-[#717786] mt-0.5">Host a new session to invite classmates!</p>
          </div>
        )}
      </section>

      {/* Campaign Editor Modal */}
      {isEditingCampaign && (
        <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in select-none">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-left flex flex-col">
            <div className="px-6 py-5 bg-[#0059bb] text-white flex justify-between items-center bg-gradient-to-r from-[#0059bb] to-[#0070ea]">
              <div>
                <h3 className="text-lg font-bold font-display leading-tight">Upload Campaign Banner</h3>
                <p className="text-[10px] opacity-85 mt-0.5">Edit cover campaign card on student dashboard.</p>
              </div>
              <button onClick={() => setIsEditingCampaign(false)} className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Campaign Title</label>
                <input
                  type="text" required placeholder="e.g. Train for Rector Cup 2026!"
                  value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-[#0059bb]/10 outline-none text-[#181c20]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Subtitle / Description</label>
                <input
                  type="text" required placeholder="e.g. Verified student programs starting early next months."
                  value={editSubtitle} onChange={(e) => setEditSubtitle(e.target.value)}
                  className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-[#0059bb]/10 outline-none text-[#181c20]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Image Cover URL</label>
                <input
                  type="url" required placeholder="e.g. https://student.binus.ac.id/..."
                  value={editImage} onChange={(e) => setEditImage(e.target.value)}
                  className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-[#0059bb]/10 outline-none text-[#181c20]"
                />
                
                {/* Image presets helper */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Rector Cup', url: 'https://student.binus.ac.id/wp-content/uploads/2018/09/RECTOR-CUP-OFFICIAL-FLAG-PRINT-size-150x100-Cm.jpg' },
                    { label: 'Basketball', url: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=800&auto=format&fit=crop' },
                    { label: 'Running', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop' }
                  ].map((preset) => (
                    <button
                      key={preset.label} type="button"
                      onClick={() => setEditImage(preset.url)}
                      className="text-[10px] font-bold p-1 bg-[#f1f4f9] border rounded hover:bg-[#0059bb] hover:text-white transition-colors truncate"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3.5 pt-4">
                <button type="button" onClick={() => setIsEditingCampaign(false)} className="flex-1 border border-[#c1c6d7] hover:bg-[#f1f4f9] text-[#414754] font-bold py-3.5 rounded-xl transition-all cursor-pointer text-xs">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-xs active:scale-98">
                  Publish Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
