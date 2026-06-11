import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: string;
  activeUser: UserProfile;
  allUsers: UserProfile[];
  onUserChange: (user: UserProfile) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMenuTrigger: () => void;
}

export default function Header({
  currentTab,
  activeUser,
  allUsers,
  onUserChange,
  searchQuery,
  onSearchChange,
  onMenuTrigger,
}: HeaderProps) {

  const getSearchPlaceholder = () => {
    switch (currentTab) {
      case 'sessions': return 'Search pick-up sessions or hosts...';
      case 'forum':    return 'Search forum discussions or tags...';
      case 'schedule': return 'Search your training schedules...';
      default:         return 'Search sessions, facilities or buddies...';
    }
  };

  // Search bar is hidden on Facilities — it lives inside the filter panel there
  const showSearch = currentTab !== 'facilities';

  return (
    <header className="sticky top-0 w-full flex justify-between items-center px-6 md:px-8 py-3.5 z-40 bg-white/85 backdrop-blur-xl border-b border-[#c1c6d7]/20 shadow-xs h-20 select-none">

      <div className="flex items-center gap-3.5 flex-1 max-w-lg">
        <button
          onClick={onMenuTrigger}
          className="md:hidden p-1.5 rounded-xl hover:bg-[#f1f4f9] text-[#414754] transition-colors"
        >
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>


      </div>

      <div className="flex items-center gap-4 ml-4">
        <div className="flex items-center gap-2.5 p-1.5 pr-3 select-none">
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
        </div>
      </div>
    </header>
  );
}
