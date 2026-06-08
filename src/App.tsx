import React, { useState, useEffect } from 'react';
import { UserProfile, ForumPost, Facility, GameSession, Task, ScheduleItem } from './types';
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

import { 
  StartMatchModal, 
  StartDiscussionModal, 
  ForumDetailModal, 
  FacilityBookModal 
} from './components/Modals';

export default function App() {
  // Navigation Router tab state
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Mobile drawer trigger
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Search input state (synchronized globally but acts locally per view context)
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Personas selection
  const [activeUser, setActiveUser] = useState<UserProfile>(USER_PROFILES[0]);
  
  // Centralized State collections with local persistence fallbacks
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('beenet_forum_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [gameSessions, setGameSessions] = useState<GameSession[]>(() => {
    const saved = localStorage.getItem('beenet_game_sessions');
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [facilities, setFacilities] = useState<Facility[]>(INITIAL_FACILITIES);

  const [todoList, setTodoList] = useState<Task[]>(() => {
    const saved = localStorage.getItem('beenet_todo_list');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('beenet_schedule_list');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  // Notifications states
  const [notificationsCount, setNotificationsCount] = useState<number>(1);

  // Floating modals controls
  const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState<boolean>(false);
  const [selectedForumPost, setSelectedForumPost] = useState<ForumPost | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('beenet_forum_posts', JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    localStorage.setItem('beenet_game_sessions', JSON.stringify(gameSessions));
  }, [gameSessions]);

  useEffect(() => {
    localStorage.setItem('beenet_todo_list', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem('beenet_schedule_list', JSON.stringify(scheduleList));
  }, [scheduleList]);

  // Handle Switching student personas (resets local queries safely)
  const handleUserChange = (newUser: UserProfile) => {
    setActiveUser(newUser);
    setSearchQuery('');
    // Dynamically adjust view tab to highlight specific elements matching reference mockups
    if (newUser.name === "Kevin Sukias") {
      setCurrentTab('schedule');
    } else if (newUser.name === "Richtjhie Hartawan") {
      setCurrentTab('sessions');
    } else {
      setCurrentTab('dashboard');
    }
  };

  // FORUM ACTIONS
  // Upvotes + Downvotes thread handler
  const handleVotePost = (postId: string, direction: 'up' | 'down') => {
    setForumPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id !== postId) return post;
        
        let currentVote = post.voted;
        let upvoteChange = 0;
        
        if (direction === 'up') {
          if (currentVote === 'up') {
            upvoteChange = -1;
            currentVote = null;
          } else {
            upvoteChange = currentVote === 'down' ? 2 : 1;
            currentVote = 'up';
          }
        } else {
          if (currentVote === 'down') {
            upvoteChange = 1;
            currentVote = null;
          } else {
            upvoteChange = currentVote === 'up' ? -2 : -1;
            currentVote = 'down';
          }
        }
        
        const updated = {
          ...post,
          upvotes: post.upvotes + upvoteChange,
          voted: currentVote
        };

        // If this is currently focus-selected, refresh modal details
        if (selectedForumPost && selectedForumPost.id === postId) {
          setSelectedForumPost(updated);
        }

        return updated;
      })
    );
  };

  // Add Comment/Reply to Forum discussion thread
  const handlePostComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `com_${Date.now()}`,
      author: activeUser.name,
      avatar: activeUser.avatar,
      timeAgo: 'Just now',
      body: commentText
    };

    setForumPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id !== postId) return post;
        
        const updated = {
          ...post,
          replies: post.replies + 1,
          comments: [...post.comments, newComment]
        };

        // If this is currently focus-selected, refresh modal details
        if (selectedForumPost && selectedForumPost.id === postId) {
          setSelectedForumPost(updated);
        }

        return updated;
      })
    );
  };

  // Start Discussion
  const handleCreateThread = (newPostData: Partial<ForumPost>) => {
    const newPost: ForumPost = {
      id: `post_${Date.now()}`,
      author: activeUser.name,
      avatar: activeUser.avatar,
      timeAgo: 'Just now',
      category: newPostData.category || 'Hobby Talks',
      tag: newPostData.tag || 'RANDOM',
      title: newPostData.title || '',
      body: newPostData.body || '',
      image: newPostData.image,
      replies: 0,
      upvotes: 1,
      voted: 'up',
      comments: []
    };

    setForumPosts([newPost, ...forumPosts]);
    setNotificationsCount(prev => prev + 1);
  };

  // GAME SESSIONS ACTIONS
  // Join or Leave Pick-up matches
  const handleJoinSession = (sessionId: string) => {
    setGameSessions(prevSessions => 
      prevSessions.map(sess => {
        if (sess.id !== sessionId) return sess;

        const alreadyJoined = sess.hasJoined;
        const updatedJoinedCount = alreadyJoined 
          ? sess.playersJoined - 1 
          : sess.playersJoined + 1;

        const updated = {
          ...sess,
          playersJoined: updatedJoinedCount,
          hasJoined: !alreadyJoined
        };

        // Side effect: If joined, add a schedule training item
        if (!alreadyJoined) {
          const freshSched: ScheduleItem = {
            id: `sch_sess_${sess.id}`,
            day: '06', // Sat 06 June standard placeholder
            title: sess.title,
            location: sess.location,
            color: 'success',
            time: sess.time
          };
          
          setScheduleList(prev => {
            if (prev.some(s => s.id === freshSched.id)) return prev;
            return [...prev, freshSched];
          });

          // Also create a linked checklist item in todo!
          const freshTask: Task = {
            id: `task_sess_${sess.id}`,
            title: `${sess.title} (${sess.sport})`,
            time: sess.time,
            completed: false,
            isYesterday: false
          };
          setTodoList(prev => {
            if (prev.some(t => t.id === freshTask.id)) return prev;
            return [freshTask, ...prev];
          });

        } else {
          // If leaving, clean schedule and task
          setScheduleList(prev => prev.filter(s => s.id !== `sch_sess_${sess.id}`));
          setTodoList(prev => prev.filter(t => t.id !== `task_sess_${sess.id}`));
        }

        return updated;
      })
    );
  };

  // Host a Match
  const handleCreateMatch = (newMatchData: Partial<GameSession>) => {
    const newMatch: GameSession = {
      id: `ses_${Date.now()}`,
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
      image: newMatchData.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23UukNLYQRULFRNJKCbqe-sJCSwt3mTl5Sw&s",
      hasJoined: true
    };

    setGameSessions([newMatch, ...gameSessions]);

    // Automatically reserve this on calendar schedule reactively
    const matchSched: ScheduleItem = {
      id: `sch_sess_${newMatch.id}`,
      day: '05', // Places on Fri 05 June
      title: newMatch.title,
      location: newMatch.location,
      color: 'primary',
      time: newMatch.time
    };
    setScheduleList(prev => [...prev, matchSched]);

    // Also place in student's active todo checklist
    const matchTask: Task = {
      id: `task_sess_${newMatch.id}`,
      title: `${newMatch.title} [Hosted]`,
      time: newMatch.time,
      completed: false,
      isYesterday: false
    };
    setTodoList(prev => [matchTask, ...prev]);

    setNotificationsCount(prev => prev + 1);
    alert(`🎉 Success! Match "${newMatch.title}" hosted. We added it to your schedule & to-do checklist!`);
  };

  // FACILITY RESERVATIONS
  // Booking confirmation
  const handleConfirmBooking = (facId: string, day: string, time: string, titleName: string) => {
    const bookingSchedItem: ScheduleItem = {
      id: `sch_book_${Date.now()}`,
      day: day, // assigned day
      title: `Booked: ${titleName}`,
      location: facilities.find(f => f.id === facId)?.title || "Campus Facility",
      color: 'secondary',
      time: time
    };

    setScheduleList(prev => [...prev, bookingSchedItem]);

    // Automatically checkmark as scheduled task
    const bookingTask: Task = {
      id: `task_book_${Date.now()}`,
      title: `Attend ${titleName} reservation`,
      time: time,
      completed: false,
      isYesterday: false
    };
    setTodoList(prev => [bookingTask, ...prev]);

    setNotificationsCount(prev => prev + 1);
    alert(`📅 Venue Booked! Created schedule slot on Day June ${day} at ${time}.`);
  };

  // TASK OPERATIONS
  // Toggle checkboard
  const handleToggleTodo = (id: string) => {
    setTodoList(prev => 
      prev.map(task => {
        if (task.id === id) {
          const toggledState = !task.completed;
          return {
            ...task,
            completed: toggledState
          };
        }
        return task;
      })
    );
  };

  // Create customized inline task
  const handleAddTodo = (title: string, time: string) => {
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title,
      time,
      completed: false,
      isYesterday: false
    };
    setTodoList([newTask, ...todoList]);
  };

  const handleClearNotifications = () => {
    setNotificationsCount(0);
  };

  // Render contextual routing views
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
          />
        );
      case 'facilities':
        return (
          <FacilityBookingView 
            facilities={facilities}
            searchQuery={searchQuery}
            onBookNow={(fac) => setSelectedFacility(fac)}
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
          />
        );
      case 'schedule':
        return (
          <ScheduleView 
            activeUser={activeUser}
            scheduleList={scheduleList}
            forumSearch={searchQuery}
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
      
      {/* Sidebar navigation */}
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setSearchQuery(''); // clear searches 
        }}
        onStartMatch={() => setIsMatchModalOpen(true)}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Main Canvas layout area */}
      <div className="flex-grow flex flex-col md:pl-64 min-h-screen">
        
        {/* Top bar header */}
        <Header 
          currentTab={currentTab}
          activeUser={activeUser}
          allUsers={USER_PROFILES}
          onUserChange={handleUserChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuTrigger={() => setMobileMenuOpen(true)}
          notificationsCount={notificationsCount}
          onClearNotifications={handleClearNotifications}
        />

        {/* Content viewport */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12 bg-[#f7f9ff]">
          {renderTabContent()}
          
          {/* Global Web credentials footer */}
          <footer className="mt-16 border-t border-[#c1c6d7]/20 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#717786] text-xs">
            <div className="flex items-center gap-2 select-none">
              <span className="font-extrabold text-[#0059bb] font-display">BeeNET</span>
              <span>© 2026 Group 12</span>
            </div>
            <div className="flex gap-6 font-semibold">
              <button onClick={() => alert("Privacy Policy: All booking data is compiled onto secure academic rosters.")} className="hover:text-[#0059bb] cursor-pointer">Privacy Policy</button>
              <button onClick={() => alert("Terms of Service: Respect athletic fields guidelines & show sportsmanship.")} className="hover:text-[#0059bb] cursor-pointer">Terms of Service</button>
              <button onClick={() => alert("Support: contact Admin helpdesk at admin-beenet@binus.ac.id")} className="hover:text-[#0059bb] cursor-pointer">Contact Admin</button>
            </div>
          </footer>
        </main>

        {/* Floating Mobile Bottom Navigation drawer */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#c1c6d7]/30 py-3.5 px-6 flex justify-between items-center z-40 shadow-md">
          <button 
            onClick={() => setCurrentTab('dashboard')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'dashboard' ? 'text-[#0059bb]' : 'text-[#717786]'}`}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-[10px] font-bold">Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('facilities')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'facilities' ? 'text-[#0059bb]' : 'text-[#717786]'}`}
          >
            <span className="material-symbols-outlined text-[22px]">stadium</span>
            <span className="text-[10px] font-bold">Facilities</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('forum')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'forum' ? 'text-[#0059bb]' : 'text-[#717786]'}`}
          >
            <span className="material-symbols-outlined text-[22px]">forum</span>
            <span className="text-[10px] font-bold">Forum</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('schedule')}
            className={`flex flex-col items-center gap-1 ${currentTab === 'schedule' ? 'text-[#0059bb]' : 'text-[#717786]'}`}
          >
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            <span className="text-[10px] font-bold">Schedule</span>
          </button>
        </nav>

      </div>

      {/* OVERLAY INTERACTIVE MODALS */}
      {/* Create custom basketball or futsal match modal */}
      <StartMatchModal 
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        activeUser={activeUser}
        onCreateMatch={handleCreateMatch}
      />

      {/* Add customized forum discussion modals */}
      <StartDiscussionModal 
        isOpen={isDiscussionModalOpen}
        onClose={() => setIsDiscussionModalOpen(false)}
        activeUser={activeUser}
        onCreateThread={handleCreateThread}
      />

      {/* Dynamic comments threaded listing */}
      <ForumDetailModal 
        post={selectedForumPost}
        isOpen={selectedForumPost !== null}
        onClose={() => setSelectedForumPost(null)}
        activeUser={activeUser}
        onPostComment={handlePostComment}
        onVotePost={handleVotePost}
      />

      {/* Booking schedule block confirm modal */}
      <FacilityBookModal 
        facility={selectedFacility}
        isOpen={selectedFacility !== null}
        onClose={() => setSelectedFacility(null)}
        onConfirmBooking={handleConfirmBooking}
      />

    </div>
  );
}
