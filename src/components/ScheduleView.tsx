import React, { useState } from 'react';
import { ScheduleItem, UserProfile } from '../types';

interface ScheduleViewProps {
  activeUser: UserProfile;
  scheduleList: ScheduleItem[];
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Returns 0=Mon offset for first day of month
function getFirstDayOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay(); // 0=Sun
  return day === 0 ? 6 : day - 1;
}

export default function ScheduleView({ scheduleList }: ScheduleViewProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDayNum, setSelectedDayNum] = useState<string | null>(null);

  const viewMonthStr = String(viewMonth + 1).padStart(2, '0');
  const viewYearStr = String(viewYear);
  const todayDayStr = String(today.getDate()).padStart(2, '0');
  const isCurrentMonthView = viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else { setViewMonth(m => m - 1); }
    setSelectedDayNum(null);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else { setViewMonth(m => m + 1); }
    setSelectedDayNum(null);
  };

  const computeCalendarDays = () => {
    const daysInCurrent = getDaysInMonth(viewYear, viewMonth);
    const offset = getFirstDayOffset(viewYear, viewMonth);

    const days: { num: string; currentMonth: boolean }[] = [];

    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const daysInPrev = getDaysInMonth(prevYear, prevMonth);
    for (let i = offset - 1; i >= 0; i--) {
      days.push({ num: String(daysInPrev - i).padStart(2, '0'), currentMonth: false });
    }

    for (let d = 1; d <= daysInCurrent; d++) {
      days.push({ num: String(d).padStart(2, '0'), currentMonth: true });
    }

    const remaining = days.length % 7 === 0 ? 0 : 7 - (days.length % 7);
    for (let d = 1; d <= remaining; d++) {
      days.push({ num: String(d).padStart(2, '0'), currentMonth: false });
    }

    return days;
  };

  const getEventsForDay = (dayNum: string) => {
    return scheduleList.filter(e => {
      if (e.day !== dayNum) return false;
      // Legacy items without month/year always match the current view month (best effort)
      const eMonth = e.month ?? viewMonthStr;
      const eYear = e.year ?? viewYearStr;
      return eMonth === viewMonthStr && eYear === viewYearStr;
    });
  };

  const getEventStyle = (color: string) => {
    switch (color) {
      case 'secondary': return 'bg-[#ffdbcc] text-[#a04100] border-l-2 border-l-[#a04100]';
      case 'tertiary':  return 'bg-[#fe6b00]/15 text-[#a04100] border-l-2 border-l-[#fe6b00]';
      case 'success':   return 'bg-emerald-50 text-emerald-700 border-l-2 border-l-emerald-600';
      default:          return 'bg-[#d8e2ff] text-[#0059bb] border-l-2 border-l-[#0059bb]';
    }
  };

  const calendarDays = computeCalendarDays();
  const selectedEvents = selectedDayNum ? getEventsForDay(selectedDayNum) : [];

  return (
    <div className="space-y-8 animate-fade-in select-none text-left">

      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181c20] tracking-tight font-display mb-1">
            Training Schedule
          </h2>
          <div className="flex items-center gap-1 mt-1">
            <button onClick={goToPrevMonth} className="p-1 rounded-lg hover:bg-[#ebeef3] transition-colors cursor-pointer text-[#414754]">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <span className="text-sm font-bold text-[#414754] min-w-36 text-center">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button onClick={goToNextMonth} className="p-1 rounded-lg hover:bg-[#ebeef3] transition-colors cursor-pointer text-[#414754]">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="flex bg-[#e5e8ee] p-1 rounded-xl text-xs font-bold border border-[#c1c6d7]/10">
          <button className="px-4 py-2 bg-white text-[#0059bb] font-bold rounded-lg shadow-2xs cursor-pointer">
            Monthly
          </button>
          <button className="px-4 py-2 text-[#414754] hover:text-[#181c20] font-bold rounded-lg cursor-pointer">
            Weekly
          </button>
        </div>
      </section>

      {/* Calendar */}
      <div className="bg-white p-5 rounded-3xl border border-[#c1c6d7]/20 shadow-xs space-y-4">

        <div className="grid grid-cols-7 text-center font-bold text-xs text-[#717786]/80 pb-3 border-b border-[#c1c6d7]/15">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => <div key={d}>{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {calendarDays.map((day, idx) => {
            const dayEvents = getEventsForDay(day.num);
            const isToday = day.currentMonth && isCurrentMonthView && day.num === todayDayStr;
            const isSelected = day.currentMonth && day.num === selectedDayNum;

            return (
              <div
                key={`${day.num}-${idx}`}
                onClick={() => {
                  if (!day.currentMonth) return;
                  setSelectedDayNum(prev => prev === day.num ? null : day.num);
                }}
                className={`h-28 p-2 rounded-xl transition-all border text-left flex flex-col justify-between ${
                  !day.currentMonth
                    ? 'bg-[#f1f4f9]/35 border-transparent opacity-35 cursor-default'
                    : isSelected
                    ? 'bg-[#eff6ff] border-[#0059bb]/30 cursor-pointer'
                    : 'bg-white border-[#c1c6d7]/15 hover:bg-[#f7f9ff] cursor-pointer'
                }`}
              >
                <span className={`text-xs font-bold leading-none ${
                  isToday
                    ? 'w-5 h-5 rounded-full bg-[#0059bb] text-white flex items-center justify-center text-[10px]'
                    : day.currentMonth ? 'text-[#181c20]' : 'text-[#717786]'
                }`}>
                  {day.num}
                </span>

                <div className="space-y-1 overflow-y-auto max-h-16 pr-0.5">
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className={`p-1.5 rounded text-[9px] font-black uppercase tracking-tight leading-tight ${getEventStyle(ev.color)}`}
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

        {/* Day detail panel */}
        {selectedDayNum && (
          <div className="mt-2 p-4 bg-[#f7f9ff] rounded-2xl border border-[#c1c6d7]/20 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-sm text-[#181c20]">
                {MONTH_NAMES[viewMonth]} {parseInt(selectedDayNum, 10)}
                {selectedEvents.length > 0
                  ? ` — ${selectedEvents.length} event${selectedEvents.length > 1 ? 's' : ''}`
                  : ' — No events'}
              </h4>
              <button onClick={() => setSelectedDayNum(null)} className="text-[#717786] hover:text-[#181c20] cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            {selectedEvents.length > 0 ? (
              <div className="space-y-2">
                {selectedEvents.map(ev => (
                  <div key={ev.id} className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-3 ${getEventStyle(ev.color)}`}>
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <div>
                      <p className="font-bold">{ev.title}</p>
                      <p className="opacity-75">{ev.time} • {ev.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#717786] font-medium">No sport activities scheduled. Book a facility or join a session to add events!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
