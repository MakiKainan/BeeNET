import React from 'react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onStartMatch: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onLogout?: () => void;
}

export default function Sidebar({
  currentTab,
  onTabChange,
  onStartMatch,
  mobileOpen,
  setMobileOpen,
  onLogout
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'facilities', label: 'Facility Booking', icon: 'stadium' },
    { id: 'sessions', label: 'Game Sessions', icon: 'sports_kabaddi' },
    { id: 'forum', label: 'Forum', icon: 'forum' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_month' }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#181c20]/40 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Navigation Drawer */}
      <aside 
        className={`fixed left-0 top-0 h-full w-64 flex flex-col p-4 border-r border-[#c1c6d7]/30 bg-white z-50 transform md:transform-none transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between mb-8 px-2 pt-1">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-[#0059bb] tracking-tighter uppercase font-display select-none">
              BeeNET
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#414754] font-semibold leading-none mt-0.5">
              Campus Sports Hub
            </p>
          </div>
          {/* Close button inside mobile menu */}
          <button 
            className="md:hidden p-1 rounded-full hover:bg-[#f1f4f9] text-[#414754]"
            onClick={() => setMobileOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Menu Items list */}
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileOpen(false); // Close mobile side-nav
                }}
                className={`w-full flex items-center gap-3.5 px-4.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-[#fe6b00] text-white shadow-sm font-bold scale-[1.02]'
                    : 'text-[#414754] hover:bg-[#f1f4f9] hover:translate-x-1'
                }`}
              >
                <span className={`material-symbols-outlined leading-none ${isActive ? 'fill-active' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Panel Actions */}
        <div className="mt-auto flex flex-col gap-1.5 border-t border-[#c1c6d7]/25 pt-4">
          {/* Quick Match CTA */}
          <button 
            onClick={() => {
              onStartMatch();
              setMobileOpen(false);
            }}
            className="w-full bg-[#a04100] hover:bg-[#a04100]/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-md cursor-pointer outline-none transition-all active:scale-95 text-sm transform flex items-center justify-center gap-2 select-none"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Start a Match
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              onTabChange('settings');
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3.5 px-4.5 py-2.5 rounded-xl font-semibold text-sm transition-colors text-[#414754] hover:bg-[#f1f4f9] select-none ${
              currentTab === 'settings' ? 'bg-[#f1f4f9] text-[#0059bb]' : ''
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </button>

          {/* Support / Help */}
          <button
            onClick={() => {
              onTabChange('support');
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3.5 px-4.5 py-2.5 rounded-xl font-semibold text-sm transition-colors text-[#414754] hover:bg-[#f1f4f9] select-none ${
              currentTab === 'support' ? 'bg-[#f1f4f9] text-[#0059bb]' : ''
            }`}
          >
            <span className="material-symbols-outlined">help</span>
            <span>Support</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              if (onLogout) {
                onLogout();
                setMobileOpen(false);
              }
            }}
            className="w-full flex items-center gap-3.5 px-4.5 py-2.5 rounded-xl font-semibold text-sm text-red-600 hover:bg-red-50 select-none transition-colors border-none bg-transparent cursor-pointer"
          >
            <span className="material-symbols-outlined text-red-600">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
