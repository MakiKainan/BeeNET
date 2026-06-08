import React from 'react';
import { ScheduleItem, UserProfile } from '../types';

interface ScheduleViewProps {
  activeUser: UserProfile;
  scheduleList: ScheduleItem[];
  forumSearch: string; // not used directly, here for compliance
}

export default function ScheduleView({
  activeUser,
  scheduleList
}: ScheduleViewProps) {
  
  // Custom alignment for calendar days from Monday (June 2026 starts on Monday!)
  // In the mockup:
  // Mon 01, Tue 02, Wed 03, Thu 04, Fri 05, Sat 06, Sun 07
  // Mon 08, Tue 09, Wed 10
  const calendarDays = [
    { num: '28', currentMonth: false },
    { num: '29', currentMonth: false },
    { num: '30', currentMonth: false },
    { num: '31', currentMonth: false },
    { num: '01', currentMonth: true },
    { num: '02', currentMonth: true },
    { num: '03', currentMonth: true },
    { num: '04', currentMonth: true },
    { num: '05', currentMonth: true },
    { num: '06', currentMonth: true },
    { num: '07', currentMonth: true },
    { num: '08', currentMonth: true },
    { num: '09', currentMonth: true },
    { num: '10', currentMonth: true },
    { num: '11', currentMonth: true },
    { num: '12', currentMonth: true },
    { num: '13', currentMonth: true },
    { num: '14', currentMonth: true }
  ];

  // Helper to color code calendar items matching scheduleList
  const getEventStyle = (color: string) => {
    switch (color) {
      case 'secondary':
        return 'bg-[#ffdbcc] text-[#a04100] border-l-2 border-l-[#a04100]';
      case 'tertiary':
        return 'bg-[#fe6b00]/15 text-[#a04100] border-l-2 border-l-[#fe6b00]';
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-l-2 border-l-emerald-600';
      default:
        return 'bg-[#d8e2ff] text-[#0059bb] border-l-2 border-l-[#0059bb]';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in select-none text-left">
      
      {/* Calendar header row */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181c20] tracking-tight font-display mb-1">
            Training Schedule
          </h2>
          <p className="text-sm md:text-base text-[#414754] font-medium font-display">
            June 2026
          </p>
        </div>
        
        <div className="flex bg-[#e5e8ee] p-1 rounded-xl text-xs font-bold border border-[#c1c6d7]/10">
          <button className="px-4 py-2 bg-white text-[#0059bb] font-bold rounded-lg shadow-2xs cursor-pointer">
            Monthly
          </button>
          <button onClick={() => alert("Weekly layout filters scheduled items by hour rows.")} className="px-4 py-2 text-[#414754] hover:text-[#181c20] font-bold rounded-lg cursor-pointer">
            Weekly
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Calendar bento-table */}
        <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-[#c1c6d7]/20 shadow-xs space-y-4">
          
          {/* Days labels */}
          <div className="grid grid-cols-7 text-center font-bold text-xs text-[#717786]/80 pb-3 border-b border-[#c1c6d7]/15">
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, idx) => {
              // Find matching schedule events
              const dayEvents = scheduleList.filter(e => e.day === day.num && day.currentMonth);
              
              return (
                <div 
                  key={`${day.num}-${idx}`}
                  onClick={() => {
                    if (dayEvents.length > 0) {
                      alert(`Day June ${day.num} Schedules:\n` + dayEvents.map(e => `• [${e.time}] ${e.title} - ${e.location}`).join('\n'));
                    } else if (day.currentMonth) {
                      alert(`No scheduled sport activities for June ${day.num}. Book a facility to write updates!`);
                    }
                  }}
                  className={`h-28 p-2 rounded-xl transition-all border text-left flex flex-col justify-between cursor-pointer ${
                    day.currentMonth 
                      ? 'bg-white border-[#c1c6d7]/15 hover:bg-[#f7f9ff]' 
                      : 'bg-[#f1f4f9]/35 border-transparent opacity-35'
                  }`}
                >
                  <span className={`text-xs font-bold ${day.currentMonth ? 'text-[#181c20]' : 'text-[#717786]'}`}>
                    {day.num}
                  </span>

                  {/* Labeled custom indicators */}
                  <div className="space-y-1 overflow-y-auto max-h-16 pr-0.5">
                    {dayEvents.map((ev) => (
                      <div 
                        key={ev.id}
                        className={`p-1.5 rounded text-[9px] font-black uppercase tracking-tight leading-tight uppercase ${getEventStyle(ev.color)}`}
                      >
                        <div className="truncate font-extrabold">{ev.title}</div>
                        <div className="text-[7px] opacity-75 truncate">{ev.time.split(' ')[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right column sidebar widgets */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Highlight Next Event card */}
          <div className="relative overflow-hidden rounded-3xl bg-white border border-[#c1c6d7]/25 p-5 shadow-sm text-left select-none">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#fe6b00]/5 blur-3xl -mr-12 -mt-12"></div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="bg-[#fe6b00] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full leading-none">
                Next Event
              </span>
              <button className="material-symbols-outlined text-[#717786]/70 cursor-pointer hover:text-[#fe6b00]">
                more_horiz
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-black font-display text-[#181c20] leading-tight">Intramural Soccer Finals</h3>
                <p className="text-xs text-[#414754] font-semibold flex items-center gap-0.5 mt-1 leading-none">
                  <span className="material-symbols-outlined text-[15px]">location_on</span>
                  <span>Central Arena, Field B</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div className="bg-[#f1f4f9]/45 p-3 rounded-2xl border border-[#c1c6d7]/20 flex flex-col">
                  <span className="text-[10px] font-extrabold text-[#717786] uppercase leading-none">Date</span>
                  <span className="text-xs font-black text-[#181c20] mt-1.5">Today, 4:30 PM</span>
                </div>
                <div className="bg-[#f1f4f9]/45 p-3 rounded-2xl border border-[#c1c6d7]/20 flex flex-col">
                  <span className="text-[10px] font-extrabold text-[#717786] uppercase leading-none">Players</span>
                  <span className="text-xs font-black text-[#181c20] mt-1.5">22 Confirmed</span>
                </div>
              </div>

              <button 
                onClick={() => alert("🗺️ Displaying integrated transit router map: Anggrek Campus ➔ Senayan Central Arena, Field B.")}
                className="w-full bg-[#0059bb] hover:bg-[#0070ea] text-white font-bold py-3.5 rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs"
              >
                <span className="material-symbols-outlined text-sm leading-none">directions</span>
                Get Field Directions
              </button>
            </div>
          </div>

          {/* Location Map Widget */}
          <div className="bg-white p-5 rounded-3xl border border-[#c1c6d7]/20 shadow-xs text-left">
            <h4 className="font-bold text-xs text-[#414754] uppercase tracking-wider mb-3 flex justify-between items-center select-none">
              Nearby Venues
              <span className="material-symbols-outlined text-sm text-[#717786]">map</span>
            </h4>

            {/* Simulated map location widget from mokcup */}
            <div className="relative h-44 rounded-2xl overflow-hidden group shadow-3xs bg-[#ebeef3]">
              <img 
                src="https://tempatwisataseru.com/wp-content/uploads/2018/09/Lapangan-Basket-di-Taman-Menteng-via-Tripadvisor.jpg" 
                alt="University local map" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between items-end text-white leading-none">
                <div>
                  <span className="text-[9px] uppercase font-bold opacity-70 block mb-0.5">Current Venue</span>
                  <span className="text-xs font-black leading-none">Taman Menteng</span>
                </div>
                <a 
                  href="https://maps.google.com/?q=Taman+Menteng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-[#0059bb] p-1.5 rounded-lg shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm font-bold leading-none">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Access practice cards */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#414754] uppercase tracking-wider px-1">Quick Access</h4>
            
            <div onClick={() => alert("Showing lesson plans for Tennis Practice")} className="flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-[#c1c6d7]/15 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#ffdbcc] text-[#a04100] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">sports_tennis</span>
              </div>
              <div className="flex-grow">
                <p className="font-bold text-xs text-[#181c20] leading-none">Tennis Practice</p>
                <p className="text-[10px] text-[#717786] mt-1 font-semibold">Tomorrow • 09:00 AM</p>
              </div>
              <span className="material-symbols-outlined text-[#717786]/40 text-sm">chevron_right</span>
            </div>

            <div onClick={() => alert("Showing lesson plans for Swim Lanes")} className="flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-[#c1c6d7]/15 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#d8e2ff] text-[#0059bb] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">pool</span>
              </div>
              <div className="flex-grow">
                <p className="font-bold text-xs text-[#181c20] leading-none">Swim Lanes #4</p>
                <p className="text-[10px] text-[#717786] mt-1 font-semibold">Oct 12 • 05:00 PM</p>
              </div>
              <span className="material-symbols-outlined text-[#717786]/40 text-sm">chevron_right</span>
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}
