import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, ForumPost, Facility, GameSession, Task, ScheduleItem, Toast } from './types';
import {
  USER_PROFILES,
  INITIAL_FACILITIES,
  INITIAL_SESSIONS,
  INITIAL_POSTS,
  INITIAL_TASKS,
  INITIAL_SCHEDULE
} from './store';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import ForumView from './components/ForumView';
import FacilityBookingView from './components/FacilityBookingView';
import GameSessionsView from './components/GameSessionsView';
import ScheduleView from './components/ScheduleView';
import ToastContainer from './components/Toast';
import LoginPage from './components/LoginPage';

import {
  StartMatchModal,
  StartDiscussionModal,
  ForumDetailModal,
  FacilityBookModal,
  SessionDetailModal
} from './components/Modals';

import { pb } from './pocketbase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [activeUser, setActiveUser] = useState<UserProfile | null>(() => {
    return pb.authStore.model ? (pb.authStore.model as any) : null;
  });

  const [campaignBanner, setCampaignBanner] = useState(() => {
    const saved = localStorage.getItem('beenet_campaign_banner_clean_v1');
    return saved ? JSON.parse(saved) : {
      title: 'Train for Rector Cup 2026!',
      subtitle: 'Verified student programs starting early next months.',
      image: 'https://student.binus.ac.id/wp-content/uploads/2018/09/RECTOR-CUP-OFFICIAL-FLAG-PRINT-size-150x100-Cm.jpg'
    };
  });

  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [facilities] = useState<Facility[]>(INITIAL_FACILITIES);
  const [todoList, setTodoList] = useState<Task[]>([]);
  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState<boolean>(false);
  const [selectedForumPost, setSelectedForumPost] = useState<ForumPost | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedGameSession, setSelectedGameSession] = useState<GameSession | null>(null);
  const [defaultMatchLocation, setDefaultMatchLocation] = useState<string>('');

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Fetch users & setup real-time/sync details
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const records = await pb.collection('users').getFullList();
        setUsers(records.map(r => ({
          id: r.id,
          name: r.name,
          email: r.email,
          department: r.department,
          avatar: r.avatar,
          level: r.level,
          athleteTier: r.athleteTier,
          points: r.points,
          futsalProgress: r.futsalProgress,
          basketballProgress: r.basketballProgress,
          tennisProgress: r.tennisProgress
        })));
      } catch (err) {
        console.error("Failed to fetch users from PocketBase", err);
      }
    };

    fetchUsers();
  }, [activeUser]);

  // Load user data on activeUser changes
  useEffect(() => {
    if (!activeUser) return;

    const loadData = async () => {
      try {
        // Fetch forum posts
        const posts = await pb.collection('forum_posts').getFullList({ sort: '-created' });
        setForumPosts(posts.map(p => ({
          id: p.id,
          author: p.author,
          avatar: p.avatar,
          timeAgo: p.timeAgo,
          category: p.category,
          title: p.title,
          body: p.body,
          image: p.image,
          replies: p.replies,
          upvotes: p.upvotes,
          tag: p.tag,
          comments: p.comments || []
        })));

        // Fetch game sessions
        const sessions = await pb.collection('game_sessions').getFullList({ sort: '-created' });
        setGameSessions(sessions.map(s => ({
          id: s.id,
          title: s.title,
          location: s.location,
          time: s.time,
          playersJoined: s.playersJoined,
          playersMax: s.playersMax,
          sport: s.sport,
          level: s.level,
          hostName: s.hostName,
          hostAvatar: s.hostAvatar,
          hostId: s.hostId,
          image: s.image
        })));

        // Fetch tasks
        const tasks = await pb.collection('tasks').getFullList({
          filter: `userId = "${activeUser.id}"`,
          sort: '-created'
        });
        setTodoList(tasks.map(t => ({
          id: t.id,
          title: t.title,
          time: t.time,
          completed: t.completed,
          isYesterday: t.isYesterday
        })));

        // Fetch schedules
        const schedules = await pb.collection('schedules').getFullList({
          filter: `userId = "${activeUser.id}"`,
          sort: 'day'
        });
        setScheduleList(schedules.map(s => ({
          id: s.id,
          day: s.day,
          month: s.month,
          year: s.year,
          title: s.title,
          location: s.location,
          color: s.color as any,
          time: s.time
        })));
      } catch (err) {
        console.error("Failed to load user-specific data from PocketBase", err);
      }
    };

    loadData();
  }, [activeUser]);

  const handleUpdateCampaign = (title: string, subtitle: string, image: string) => {
    const updated = { title, subtitle, image };
    setCampaignBanner(updated);
    localStorage.setItem('beenet_campaign_banner_clean_v1', JSON.stringify(updated));
    showToast('Dashboard campaign banner updated successfully!', 'success');
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await pb.collection('forum_posts').delete(postId);
      setForumPosts(prev => prev.filter(p => p.id !== postId));
      showToast('Forum post deleted successfully.', 'success');
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await pb.collection('game_sessions').delete(sessionId);
      setGameSessions(prev => prev.filter(s => s.id !== sessionId));

      const schedules = await pb.collection('schedules').getList(1, 100, {
        filter: `userId = "${activeUser.id}"`
      });
      for (const s of schedules.items) {
        if (s.id === `sch_sess_${sessionId}`) {
          await pb.collection('schedules').delete(s.id);
        }
      }
      setScheduleList(prev => prev.filter(s => s.id !== `sch_sess_${sessionId}`));

      const tasks = await pb.collection('tasks').getList(1, 100, {
        filter: `userId = "${activeUser.id}"`
      });
      for (const t of tasks.items) {
        if (t.id === `task_sess_${sessionId}`) {
          await pb.collection('tasks').delete(t.id);
        }
      }
      setTodoList(prev => prev.filter(t => t.id !== `task_sess_${sessionId}`));

      showToast('Game session cancelled and deleted completely.', 'success');
    } catch (err) {
      console.error("Failed to delete session", err);
    }
  };

  const handleRegister = (newUser: UserProfile): boolean => {
    setUsers(prev => {
      if (prev.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) return prev;
      return [...prev, newUser];
    });
    showToast(`Account for ${newUser.name} created successfully!`, 'success');
    return true;
  };

  const handleLogin = (email: string) => {
    const foundUser = pb.authStore.model ? (pb.authStore.model as any) : null;
    if (foundUser) {
      setActiveUser(foundUser);
      showToast(`Logged in successfully as ${foundUser.name}!`, 'success');
      
      if (foundUser.department === 'Computer Science') {
        setCurrentTab('schedule');
      } else if (foundUser.department === 'Moderator') {
        setCurrentTab('sessions');
      } else {
        setCurrentTab('dashboard');
      }
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    setActiveUser(null);
    showToast('Logged out successfully.', 'info');
  };

  const handleUserChange = async (newUser: UserProfile) => {
    try {
      let password = 'user123';
      if (newUser.email === 'kevin.admin@binus.ac.id') password = 'admin123';
      else if (newUser.email === 'kevin.moderator@binus.ac.id') password = 'mod123';
      else if (newUser.password) password = newUser.password;

      await pb.collection('users').authWithPassword(newUser.email, password);
      
      const foundUser = pb.authStore.model ? (pb.authStore.model as any) : null;
      if (foundUser) {
        setActiveUser(foundUser);
        setSearchQuery('');
        if (foundUser.department === 'Computer Science') {
          setCurrentTab('schedule');
        } else if (foundUser.department === 'Moderator') {
          setCurrentTab('sessions');
        } else {
          setCurrentTab('dashboard');
        }
      }
    } catch (err) {
      console.error("Failed to switch user", err);
    }
  };

  // FORUM ACTIONS
  const handleVotePost = async (postId: string, direction: 'up' | 'down') => {
    let upvoteChange = 0;
    let post = forumPosts.find(p => p.id === postId);
    if (!post) return;

    let currentVote = post.voted;
    if (direction === 'up') {
      if (currentVote === 'up') { upvoteChange = -1; currentVote = null; }
      else { upvoteChange = currentVote === 'down' ? 2 : 1; currentVote = 'up'; }
    } else {
      if (currentVote === 'down') { upvoteChange = 1; currentVote = null; }
      else { upvoteChange = currentVote === 'up' ? -2 : -1; currentVote = 'down'; }
    }

    const updatedVotes = post.upvotes + upvoteChange;

    try {
      await pb.collection('forum_posts').update(postId, {
        upvotes: updatedVotes
      });

      setForumPosts(prevPosts =>
        prevPosts.map(p => {
          if (p.id !== postId) return p;
          const updated = { ...p, upvotes: updatedVotes, voted: currentVote };
          if (selectedForumPost?.id === postId) setSelectedForumPost(updated);
          return updated;
        })
      );
    } catch (err) {
      console.error("Failed to vote post", err);
    }
  };

  const handlePostComment = async (postId: string, commentText: string) => {
    const newComment = {
      id: `com_${Date.now()}`,
      author: activeUser.name,
      avatar: activeUser.avatar,
      timeAgo: 'Just now',
      body: commentText
    };

    const post = forumPosts.find(p => p.id === postId);
    if (!post) return;

    const updatedComments = [...post.comments, newComment];

    try {
      await pb.collection('forum_posts').update(postId, {
        replies: post.replies + 1,
        comments: updatedComments
      });
      
      setForumPosts(prevPosts =>
        prevPosts.map(p => {
          if (p.id !== postId) return p;
          const updated = { ...p, replies: p.replies + 1, comments: updatedComments };
          if (selectedForumPost?.id === postId) setSelectedForumPost(updated);
          return updated;
        })
      );
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleCreateThread = async (newPostData: Partial<ForumPost>) => {
    const newPost = {
      author: activeUser.name,
      avatar: activeUser.avatar,
      timeAgo: 'Just now',
      category: newPostData.category || 'Hobby Talks',
      tag: newPostData.tag || 'RANDOM',
      title: newPostData.title || '',
      body: newPostData.body || '',
      image: newPostData.image || '',
      replies: 0,
      upvotes: 1,
      comments: []
    };
    
    try {
      const record = await pb.collection('forum_posts').create(newPost);
      setForumPosts([record as any, ...forumPosts]);
    } catch (err) {
      console.error("Failed to create thread", err);
    }
  };

  // GAME SESSION ACTIONS
  const handleJoinSession = async (sessionId: string) => {
    const now = new Date();
    const todayDay = String(now.getDate()).padStart(2, '0');
    const todayMonth = String(now.getMonth() + 1).padStart(2, '0');
    const todayYear = String(now.getFullYear());

    const sess = gameSessions.find(s => s.id === sessionId);
    if (!sess) return;

    const alreadyJoined = sess.hasJoined;
    const updatedPlayersJoined = alreadyJoined ? sess.playersJoined - 1 : sess.playersJoined + 1;

    try {
      await pb.collection('game_sessions').update(sessionId, {
        playersJoined: updatedPlayersJoined
      });

      setGameSessions(prevSessions =>
        prevSessions.map(s => {
          if (s.id !== sessionId) return s;
          return { ...s, playersJoined: updatedPlayersJoined, hasJoined: !alreadyJoined };
        })
      );

      if (!alreadyJoined) {
        const scheduleRecord = await pb.collection('schedules').create({
          day: todayDay,
          month: todayMonth,
          year: todayYear,
          title: sess.title,
          location: sess.location,
          color: 'success',
          time: sess.time,
          userId: activeUser.id
        });
        setScheduleList(prev => [...prev, scheduleRecord as any]);

        const taskRecord = await pb.collection('tasks').create({
          title: `${sess.title} (${sess.sport})`,
          time: sess.time,
          completed: false,
          isYesterday: false,
          userId: activeUser.id
        });
        setTodoList(prev => [taskRecord as any, ...prev]);
      } else {
        const schedules = await pb.collection('schedules').getList(1, 1, {
          filter: `userId = "${activeUser.id}" && title = "${sess.title}"`
        });
        if (schedules.items.length > 0) {
          await pb.collection('schedules').delete(schedules.items[0].id);
          setScheduleList(prev => prev.filter(s => s.id !== schedules.items[0].id));
        }

        const tasks = await pb.collection('tasks').getList(1, 1, {
          filter: `userId = "${activeUser.id}" && title = "${sess.title} (${sess.sport})"`
        });
        if (tasks.items.length > 0) {
          await pb.collection('tasks').delete(tasks.items[0].id);
          setTodoList(prev => prev.filter(t => t.id !== tasks.items[0].id));
        }
      }
    } catch (err) {
      console.error("Failed to join session", err);
    }
  };

  const handleCreateMatch = async (newMatchData: Partial<GameSession>) => {
    const now = new Date();
    const todayDay = String(now.getDate()).padStart(2, '0');
    const todayMonth = String(now.getMonth() + 1).padStart(2, '0');
    const todayYear = String(now.getFullYear());

    const newMatch = {
      title: newMatchData.title || '',
      location: newMatchData.location || '',
      time: newMatchData.time || '17:00 - 18:30',
      playersJoined: 1,
      playersMax: newMatchData.playersMax || 10,
      sport: newMatchData.sport || 'Futsal',
      level: newMatchData.level || 'Casual',
      hostName: activeUser.name,
      hostAvatar: activeUser.avatar,
      hostId: newMatchData.hostId || '2802522304',
      image: newMatchData.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23UukNLYQRULFRNJKCbqe-sJCSwt3mTl5Sw&s"
    };

    try {
      const matchRecord = await pb.collection('game_sessions').create(newMatch);
      setGameSessions([matchRecord as any, ...gameSessions]);

      const scheduleRecord = await pb.collection('schedules').create({
        day: todayDay,
        month: todayMonth,
        year: todayYear,
        title: matchRecord.title,
        location: matchRecord.location,
        color: 'primary',
        time: matchRecord.time,
        userId: activeUser.id
      });
      setScheduleList(prev => [...prev, scheduleRecord as any]);

      const taskRecord = await pb.collection('tasks').create({
        title: `${matchRecord.title} [Hosted]`,
        time: matchRecord.time,
        completed: false,
        isYesterday: false,
        userId: activeUser.id
      });
      setTodoList(prev => [taskRecord as any, ...prev]);

      showToast(`Match "${matchRecord.title}" hosted! Added to your schedule.`, 'success');
    } catch (err) {
      console.error("Failed to host match", err);
    }
  };

  // FACILITY RESERVATIONS
  const handleConfirmBooking = async (facId: string, day: string, month: string, year: string, time: string, titleName: string) => {
    try {
      const facilityName = facilities.find(f => f.id === facId)?.title || 'Campus Facility';
      
      const scheduleRecord = await pb.collection('schedules').create({
        day,
        month,
        year,
        title: `Booked: ${titleName}`,
        location: facilityName,
        color: 'secondary',
        time,
        userId: activeUser.id
      });
      setScheduleList(prev => [...prev, scheduleRecord as any]);

      const taskRecord = await pb.collection('tasks').create({
        title: `Attend ${titleName} reservation`,
        time,
        completed: false,
        isYesterday: false,
        userId: activeUser.id
      });
      setTodoList(prev => [taskRecord as any, ...prev]);

      showToast(`Venue booked on ${day}/${month} at ${time}. Added to schedule!`, 'success');

      const bookedFac = facilities.find(f => f.id === facId);
      if (bookedFac) {
        setDefaultMatchLocation(bookedFac.title);
        setTimeout(() => {
          setIsMatchModalOpen(true);
        }, 500);
      }
    } catch (err) {
      console.error("Failed to confirm booking", err);
    }
  };

  // TASK OPERATIONS
  const handleToggleTodo = async (id: string) => {
    const task = todoList.find(t => t.id === id);
    if (!task) return;

    try {
      await pb.collection('tasks').update(id, {
        completed: !task.completed
      });

      setTodoList(prev =>
        prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      );
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  const handleAddTodo = async (title: string, time: string) => {
    try {
      const record = await pb.collection('tasks').create({
        title,
        time,
        completed: false,
        isYesterday: false,
        userId: activeUser.id
      });
      setTodoList([record as any, ...todoList]);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  if (!activeUser) {
    return (
      <div className="min-h-screen bg-[#f7f9ff]">
        <LoginPage onLogin={handleLogin} allUsers={users} onRegister={handleRegister} />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView
            activeUser={activeUser}
            forumPosts={forumPosts}
            gameSessions={gameSessions}
            todoList={todoList}
            onToggleTodo={handleToggleTodo}
            onAddTodo={handleAddTodo}
            onJoinSession={handleJoinSession}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onSelectPost={(post) => setSelectedForumPost(post)}
            onShowToast={showToast}
            onSelectSession={(session) => setSelectedGameSession(session)}
            campaignBanner={campaignBanner}
            onUpdateCampaign={handleUpdateCampaign}
          />
        );
      case 'forum':
        return (
          <ForumView
            activeUser={activeUser}
            forumPosts={forumPosts}
            searchQuery={searchQuery}
            onSelectPost={(post) => setSelectedForumPost(post)}
            onOpenCreateDiscussion={() => setIsDiscussionModalOpen(true)}
            onVotePost={handleVotePost}
            onShowToast={showToast}
            onDeletePost={handleDeletePost}
          />
        );
      case 'facilities':
        return (
          <FacilityBookingView
            facilities={facilities}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onBookNow={(fac) => setSelectedFacility(fac)}
            onShowToast={showToast}
          />
        );
      case 'sessions':
        return (
          <GameSessionsView
            activeUser={activeUser}
            gameSessions={gameSessions}
            searchQuery={searchQuery}
            onJoinSession={handleJoinSession}
            onOpenCreateMatch={() => setIsMatchModalOpen(true)}
            onShowToast={showToast}
            onSelectSession={(session) => setSelectedGameSession(session)}
          />
        );
      case 'schedule':
        return (
          <ScheduleView
            activeUser={activeUser}
            scheduleList={scheduleList}
          />
        );
      case 'settings':
        return (
          <div className="glass-card rounded-2xl p-8 max-w-2xl text-left space-y-6">
            <h3 className="text-xl font-bold font-display text-[#181c20]">General Settings</h3>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-[#f1f4f9] rounded-xl">
                <p className="font-bold text-[#181c20]">Student Profile Integration</p>
                <p className="text-xs text-[#717786] mt-0.5">Integrate athletic records with Binus University academic scores.</p>
              </div>
              <div className="p-4 bg-[#f1f4f9] rounded-xl">
                <p className="font-bold text-[#181c20]">Location Geolocation tracking</p>
                <p className="text-xs text-[#717786] mt-0.5">Allow GPS tracking for mapping field routes.</p>
              </div>
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="glass-card rounded-2xl p-8 max-w-2xl text-left space-y-6">
            <h3 className="text-xl font-bold font-display text-[#181c20]">BeeNET Administration & Support</h3>
            <div className="space-y-4 text-sm">
              <p className="text-[#414754] font-medium">Need help hosting matches, booking court sessions, or reporting forum spam? Contact group admins via email at support@beenet.edu or dial campus extension 4882.</p>
            </div>
          </div>
        );
      default:
        return <div className="p-12">Tab not implemented.</div>;
    }
  };

  return (
    <div className="flex bg-[#f7f9ff] text-[#181c20] font-sans min-h-screen">
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => { setCurrentTab(tab); setSearchQuery(''); }}
        onStartMatch={() => setIsMatchModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        onLogout={handleLogout}
      />

      <div className="flex-grow flex flex-col md:pl-64 min-h-screen">
        <Header
          currentTab={currentTab}
          activeUser={activeUser}
          allUsers={users}
          onUserChange={handleUserChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuTrigger={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12 bg-[#f7f9ff]">
          {renderTabContent()}

          <footer className="mt-16 border-t border-[#c1c6d7]/20 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#717786] text-xs">
            <div className="flex items-center gap-2 select-none">
              <span className="font-extrabold text-[#0059bb] font-display">BeeNET</span>
              <span>© 2026 Group 12</span>
            </div>
            <div className="flex gap-6 font-semibold">
              <button onClick={() => showToast('Privacy Policy: All booking data is compiled onto secure academic rosters.', 'info')} className="hover:text-[#0059bb] cursor-pointer">Privacy Policy</button>
              <button onClick={() => showToast('Terms of Service: Respect athletic fields guidelines & show sportsmanship.', 'info')} className="hover:text-[#0059bb] cursor-pointer">Terms of Service</button>
              <button onClick={() => showToast('Support: contact Admin helpdesk at admin-beenet@binus.ac.id', 'info')} className="hover:text-[#0059bb] cursor-pointer">Contact Admin</button>
            </div>
          </footer>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#c1c6d7]/30 py-3.5 px-6 flex justify-between items-center z-40 shadow-md">
          <button onClick={() => setCurrentTab('dashboard')} className={`flex flex-col items-center gap-1 ${currentTab === 'dashboard' ? 'text-[#0059bb]' : 'text-[#717786]'}`}>
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => setCurrentTab('facilities')} className={`flex flex-col items-center gap-1 ${currentTab === 'facilities' ? 'text-[#0059bb]' : 'text-[#717786]'}`}>
            <span className="material-symbols-outlined text-[22px]">stadium</span>
            <span className="text-[10px] font-bold">Facilities</span>
          </button>
          <button onClick={() => setCurrentTab('forum')} className={`flex flex-col items-center gap-1 ${currentTab === 'forum' ? 'text-[#0059bb]' : 'text-[#717786]'}`}>
            <span className="material-symbols-outlined text-[22px]">forum</span>
            <span className="text-[10px] font-bold">Forum</span>
          </button>
          <button onClick={() => setCurrentTab('schedule')} className={`flex flex-col items-center gap-1 ${currentTab === 'schedule' ? 'text-[#0059bb]' : 'text-[#717786]'}`}>
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            <span className="text-[10px] font-bold">Schedule</span>
          </button>
        </nav>
      </div>

      <StartMatchModal
        isOpen={isMatchModalOpen}
        onClose={() => {
          setIsMatchModalOpen(false);
          setDefaultMatchLocation('');
        }}
        activeUser={activeUser}
        onCreateMatch={handleCreateMatch}
        onShowToast={showToast}
        facilities={facilities}
        defaultLocation={defaultMatchLocation}
      />
      <StartDiscussionModal
        isOpen={isDiscussionModalOpen}
        onClose={() => setIsDiscussionModalOpen(false)}
        activeUser={activeUser}
        onCreateThread={handleCreateThread}
        onShowToast={showToast}
      />
      <ForumDetailModal
        post={selectedForumPost}
        isOpen={selectedForumPost !== null}
        onClose={() => setSelectedForumPost(null)}
        activeUser={activeUser}
        onPostComment={handlePostComment}
        onVotePost={handleVotePost}
      />
      <FacilityBookModal
        facility={selectedFacility}
        isOpen={selectedFacility !== null}
        onClose={() => setSelectedFacility(null)}
        onConfirmBooking={handleConfirmBooking}
        onShowToast={showToast}
      />
      <SessionDetailModal
        session={selectedGameSession}
        isOpen={selectedGameSession !== null}
        onClose={() => setSelectedGameSession(null)}
        activeUser={activeUser}
        onJoinSession={handleJoinSession}
        onShowToast={showToast}
        onDeleteSession={handleDeleteSession}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
