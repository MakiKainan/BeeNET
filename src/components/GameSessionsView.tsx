import React, { useState } from 'react';
import { GameSession, UserProfile } from '../types';

interface GameSessionsViewProps {
  activeUser: UserProfile;
  gameSessions: GameSession[];
  searchQuery: string;
  onJoinSession: (id: string) => void;
  onOpenCreateMatch: () => void;
}

export default function GameSessionsView({
  activeUser,
  gameSessions,
  searchQuery,
  onJoinSession,
  onOpenCreateMatch
}: GameSessionsViewProps) {
  
  const [selectedSportFilter, setSelectedSportFilter] = useState('All');

  // Filter sessions based on search queries and quick-slide sport selections
  const filteredSessions = gameSessions.filter((session) => {
    const matchSearch = 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.hostName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchSport = 
      selectedSportFilter === 'All' || 
      session.sport.toLowerCase() === selectedSportFilter.toLowerCase();

    return matchSearch && matchSport;
  });

  const sportsCarouselOpts = ['All', 'Futsal', 'Basketball', 'Badminton', 'Tennis', 'E-Sports', 'Running'];

  return (
    <div className="space-y-8 animate-fade-in select-none text-left">
      
      {/* Header sections */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181c20] tracking-tight font-display mb-1">
            Game Sessions
          </h2>
          <p className="text-sm md:text-base text-[#414754] font-medium max-w-2xl leading-relaxed">
            Join competitive or casual pick-up games happening live across our campuses. Bond with fellow students, find team substitutes, and stay active.
          </p>
        </div>

        <button 
          onClick={onOpenCreateMatch}
          className="flex items-center gap-2 bg-[#fe6b00] hover:bg-[#fe6b00]/95 text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer leading-none"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Start a Match</span>
        </button>
      </section>

      {/* Quick horizontal slide filters carousel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-1.5 border-y border-[#c1c6d7]/15">
        <div className="flex gap-2.5 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0 scrollbar-none">
          {sportsCarouselOpts.map((sport) => {
            const isSelected = selectedSportFilter === sport;
            return (
              <button
                key={sport}
                onClick={() => setSelectedSportFilter(sport)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer select-none leading-none ${
                  isSelected
                    ? 'bg-[#0059bb] text-white border-transparent shadow-xs scale-[1.03]'
                    : 'bg-[#f1f4f9] text-[#414754] border-[#c1c6d7]/20 hover:bg-[#ebeef3]'
                }`}
              >
                {sport === 'All' ? 'All Sports' : sport}
              </button>
            );
          })}
        </div>
        
        <button 
          onClick={() => alert("Multi-filters include campus distance, hosting schedule slots, and athlete rating ranges.")}
          className="flex items-center gap-1 text-[#414754] hover:text-[#0059bb] transition-colors text-xs font-bold shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          <span>More Filters</span>
        </button>
      </div>

      {/* Matchmaking grid board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {filteredSessions.map((session) => {
          const isCapacityFull = session.playersJoined >= session.playersMax;
          const isUserJoined = session.hasJoined;

          return (
            <div 
              key={session.id}
              className="bg-white rounded-2xl border border-[#c1c6d7]/15 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group text-left"
            >
              {/* Banner with cover */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img 
                  src={session.image} 
                  alt={session.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* Level status overlay tag */}
                <div className="absolute top-3.5 left-3.5 bg-[#fe6b00] px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-sm select-none">
                  {session.level}
                </div>

                {/* Sport type overlay tag */}
                <div className="absolute top-3.5 right-3.5 bg-[#0059bb]/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider select-none">
                  {session.sport}
                </div>
              </div>

              {/* Core session info packet */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                
                <div>
                  <h3 className="text-base font-extrabold text-[#181c20] font-display leading-tight">{session.title}</h3>
                  
                  <p className="text-[11px] text-[#717786] font-semibold flex items-center gap-0.5 leading-none mt-1.5 mb-3.5">
                    <span className="material-symbols-outlined text-xs leading-none">location_on</span>
                    <span className="truncate">{session.location}</span>
                  </p>

                  {/* Interval parameters */}
                  <div className="flex justify-between items-center py-2.5 px-3.5 bg-[#f1f4f9] rounded-xl text-xs font-semibold border border-[#c1c6d7]/10">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#717786] uppercase tracking-wider">Time Slot</span>
                      <span className="font-bold text-[#181c20] mt-0.5">{session.time}</span>
                    </div>

                    <div className="w-px h-6 bg-[#c1c6d7]/35"></div>

                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-[#717786] uppercase tracking-wider">Lineup</span>
                      <span className={`font-black mt-0.5 ${isCapacityFull ? 'text-[#fe6b00]' : 'text-[#0059bb]'}`}>
                        {session.playersJoined}/{session.playersMax} Joined
                      </span>
                    </div>
                  </div>
                </div>

                {/* Host identity profile details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pt-1.5 border-t border-[#f1f4f9]">
                    <img 
                      src={session.hostAvatar} 
                      alt={session.hostName} 
                      className="w-8 h-8 rounded-full object-cover border shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#181c20] leading-none">{session.hostName}</p>
                      <p className="text-[9px] uppercase tracking-wider text-[#717786] mt-1 font-bold">Host ID: {session.hostId}</p>
                    </div>
                  </div>

                  {/* Join buttons triggers */}
                  <button 
                    onClick={() => onJoinSession(session.id)}
                    className={`w-full py-3 rounded-xl font-bold text-xs shadow-2xs transition-all tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer active:scale-97 ${
                      isUserJoined
                        ? 'bg-[#e0e3e8] hover:bg-[#d7dadf] text-[#414754]'
                        : 'bg-[#0059bb] hover:bg-[#0070ea] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">
                      {isUserJoined ? 'check_circle' : 'sports_handball'}
                    </span>
                    <span>{isUserJoined ? 'Leave Lineup' : 'Join Session'}</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}

        {/* Empty State custom invite card (designed placeholder) */}
        <div className="bg-[#f1f4f9]/50 border-2 border-dashed border-[#c1c6d7]/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[340px]">
          <div className="w-14 h-14 bg-[#e5e8ee] text-[#414754] rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">person_add</span>
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#181c20] font-display">Don't see your sport?</h4>
            <p className="text-xs text-[#717786] max-w-[200px] mx-auto mt-1 font-medium leading-relaxed">
              Launch a sports match and meet active students around the campus.
            </p>
          </div>
          <button 
            onClick={onOpenCreateMatch}
            className="px-5 py-2.5 bg-[#e0e3e8] hover:bg-[#e5e8ee] text-[#181c20] font-bold text-xs rounded-xl border border-[#c1c6d7]/20 transition-all cursor-pointer shadow-3xs"
          >
            Create Custom Game
          </button>
        </div>

      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#c1c6d7]/35 p-8">
          <span className="material-symbols-outlined text-[#717786] text-5xl mb-2">sports_basketball</span>
          <p className="text-base font-bold text-[#181c20]">No matchmaking sessions find.</p>
          <p className="text-xs text-[#717786] mt-0.5">Change selected sport filters or create a custom match above!</p>
        </div>
      )}

    </div>
  );
}
