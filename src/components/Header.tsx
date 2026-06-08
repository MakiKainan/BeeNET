import React, { useState } from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: string;
  activeUser: UserProfile;
  allUsers: UserProfile[];
  onUserChange: (user: UserProfile) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMenuTrigger: () => void;
  notificationsCount: number;
  onClearNotifications: () => void;
}

export default function Header({
  currentTab,
  activeUser,
  allUsers,
  onUserChange,
  searchQuery,
  onSearchChange,
  onMenuTrigger,
  notificationsCount,
  onClearNotifications,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  // Determine dynamic search placeholder based on current layout view
  const getSearchPlaceholder = () => {
    switch (currentTab) {
      case 'facilities':
        return 'Search sports venues, halls or campus sites...';
      case 'sessions':
        return 'Search pick-up sessions or hosts...';
      case 'forum':
        return 'Search forum discussions or tags...';
      case 'schedule':
        return 'Search your training schedules and venues...';
      default:
        return 'Search sessions, facilities or buddies...';
    }
  };

  return (
    <header className="sticky top-0 w-full flex justify-between items-center px-6 md:px-8 py-3.5 z-40 bg-white/85 backdrop-blur-xl border-b border-[#c1c6d7]/20 shadow-xs h-20 select-none">
      
      {/* Search Bar / Menu button on mobile */}
      <div className="flex items-center gap-3.5 flex-1 max-w-lg">
        {/* Burger Button for Mobile Responsive Layouts */}
        <button 
          onClick={onMenuTrigger}
          className="md:hidden p-1.5 rounded-xl hover:bg-[#f1f4f9] text-[#414754] transition-colors"
        >
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>

        {/* Dynamic Context Search Bar */}
        <div className="relative w-full group hidden sm:block">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#717786]">
            search
          </span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#f1f4f9] border-none rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-[#0059bb]/15 transition-all text-sm font-medium text-[#181c20] placeholder-[#717786]/70 leading-none outline-none"
            placeholder={getSearchPlaceholder()}
          />
        </div>
      </div>

      {/* Profile & Notification Indicators */}
      <div className="flex items-center gap-4 ml-4">
        
        {/* Mail Icon */}
        <button 
          className="p-2.5 rounded-full hover:bg-[#f1f4f9] text-[#414754] transition-colors active:scale-95 duration-100 cursor-pointer"
          onClick={() => {
            alert(`No new personal mail messages for ${activeUser.name}.`);
          }}
        >
          <span className="material-symbols-outlined leading-none">mail</span>
        </button>

        {/* Dynamic Notification Hub with indicator dots */}
        <div className="relative">
          <button 
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="p-2.5 rounded-full hover:bg-[#f1f4f9] text-[#414754] transition-colors active:scale-95 duration-100 relative cursor-pointer"
          >
            <span className="material-symbols-outlined leading-none">notifications</span>
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ripple"></span>
            )}
          </button>

          {/* Quick Notifications panel */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-3.5 w-80 bg-white/95 backdrop-blur-md border border-[#c1c6d7]/30 rounded-2xl shadow-xl p-4 z-50 text-left">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm text-[#181c20]">Notifications</span>
                {notificationsCount > 0 && (
                  <button 
                    onClick={() => {
                      onClearNotifications();
                      setNotifDropdownOpen(false);
                    }}
                    className="text-xs text-[#0059bb] hover:underline font-semibold"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="space-y-2 text-xs">
                {notificationsCount > 0 ? (
                  <>
                    <div className="p-2.5 bg-[#f7f9ff] rounded-xl border-l-3 border-[#fe6b00]">
                      <p className="font-semibold text-[#181c20]">New Game Session Created!</p>
                      <p className="text-[#414754] mt-0.5">A new pick-up session has been posted on the dashboard board.</p>
                    </div>
                    <div className="p-2.5 bg-[#f7f9ff] rounded-xl">
                      <p className="font-semibold text-[#181c20]">Welcome to BeeNET</p>
                      <p className="text-[#414754]">Manage and book all campus recreation facilities instantly.</p>
                    </div>
                  </>
                ) : (
                  <p className="text-[#717786] text-center py-4">No unread notifications.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#c1c6d7]/45 mx-0.5"></div>

        {/* Profile Avatar and Switcher */}
        <div className="relative">
          <div 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 hover:bg-[#f1f4f9] p-1.5 pr-3 rounded-full cursor-pointer transition-all active:scale-[0.98] duration-150 border border-transparent hover:border-[#c1c6d7]/20 select-none"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#adc7ff] shadow-xs shrink-0 bg-[#ebeef3]">
              <img 
                src={activeUser.avatar} 
                alt={activeUser.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-[#181c20] leading-none">{activeUser.name}</p>
              <p className="text-[10px] text-[#414754]/85 leading-tight mt-0.5">{activeUser.department}</p>
            </div>
            <span className="material-symbols-outlined text-[#717786]/70 text-[18px]">
              {dropdownOpen ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {/* Persona Switcher Drop Down Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-[#c1c6d7]/35 rounded-2xl shadow-2xl p-3 z-50 text-left">
              <p className="text-[10px] uppercase tracking-wider text-[#717786]/80 font-bold px-2.5 mb-2">
                Switch Student View
              </p>
              
              <div className="space-y-1">
                {allUsers.map((user) => {
                  const isCurrent = user.name === activeUser.name;
                  return (
                    <button
                      key={user.name}
                      onClick={() => {
                        onUserChange(user);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all ${
                        isCurrent 
                          ? 'bg-[#f7f9ff] text-[#0059bb] font-bold ring-1 ring-[#0059bb]/10' 
                          : 'hover:bg-[#f1f4f9] text-[#414754]'
                      }`}
                    >
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover border"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs font-bold leading-none">{user.name}</p>
                        <p className="text-[9px] mt-0.5 opacity-85 leading-none">{user.department} • Lv.{user.level}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-[#c1c6d7]/20 mt-2 pt-2 px-2">
                <p className="text-[9px] text-[#717786]">
                  Toggle viewpoints to experience how Fiko, Kevin, or Richtjhie operate within the application.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
