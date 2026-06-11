import React, { useState } from 'react';
import { Facility, Toast } from '../types';

interface FacilityBookingViewProps {
  facilities: Facility[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBookNow: (facility: Facility) => void;
  onShowToast: (message: string, type?: Toast['type']) => void;
}

export default function FacilityBookingView({
  facilities,
  searchQuery,
  onSearchChange,
  onBookNow,
  onShowToast
}: FacilityBookingViewProps) {

  const [selectedSports, setSelectedSports] = useState<string[]>(['Futsal', 'Basketball']);
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');
  const [priceMax, setPriceMax] = useState(250000);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>(['Instant Booking']);

  const toggleSport = (sport: string) => {
    setSelectedSports(prev =>
      prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
    );
  };

  const toggleAvailability = (avail: string) => {
    setSelectedAvailabilities(prev =>
      prev.includes(avail) ? prev.filter(a => a !== avail) : [...prev, avail]
    );
  };

  const resetFilters = () => {
    setSelectedSports(['Futsal', 'Basketball']);
    setSelectedCampus('All Campuses');
    setPriceMax(250000);
    setSelectedAvailabilities(['Instant Booking']);
    onSearchChange('');
  };

  const filteredFacilities = facilities.filter((fac) => {
    const matchesSearch =
      fac.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport = selectedSports.length === 0 || selectedSports.some((sport) => {
      if (fac.title.toLowerCase().includes(sport.toLowerCase())) return true;
      if (sport === 'Tennis' && fac.title.toLowerCase().includes('aquatic')) return false;
      return false;
    });

    const matchesCampus = selectedCampus === 'All Campuses' || fac.location.toLowerCase().includes(selectedCampus.toLowerCase());
    const matchesPrice = fac.pricePerHour <= priceMax;

    return matchesSearch && matchesSport && matchesCampus && matchesPrice;
  });

  return (
    <div className="space-y-8 animate-fade-in select-none text-left">

      <section>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#181c20] tracking-tight font-display mb-1">
          Book a Facility
        </h2>
        <p className="text-sm md:text-base text-[#414754] font-medium max-w-2xl leading-relaxed">
          Reserve professional sports venues across all campus locations. Filter by availability and sport type to secure your perfect lineup instantly.
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Filter Sidebar */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="glass-card rounded-2xl p-6 space-y-6">

            <div className="flex justify-between items-center pb-2 border-b border-[#c1c6d7]/20">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#717786]">Filters</h3>
              <button onClick={resetFilters} className="text-[#0059bb] text-xs font-bold hover:underline cursor-pointer">
                Clear all
              </button>
            </div>

            {/* Search — lives here on Facilities tab */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#717786] text-[18px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search venues..."
                className="w-full bg-[#f1f4f9] rounded-xl py-2.5 pl-9 pr-3 text-xs font-medium text-[#181c20] placeholder-[#717786]/70 outline-none focus:ring-2 focus:ring-[#0059bb]/15 border border-transparent focus:border-[#0059bb]/20 transition-all"
              />
            </div>

            {/* Sport Type */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#181c20] uppercase tracking-wider">Sport Type</label>
              <div className="space-y-2 text-sm font-semibold text-[#414754]">
                {['Futsal', 'Badminton', 'Basketball', 'Tennis'].map((sport) => (
                  <label key={sport} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedSports.includes(sport)}
                      onChange={() => toggleSport(sport)}
                      className="rounded border-[#717786]/50 h-5 w-5 cursor-pointer accent-[#fe6b00]"
                    />
                    <span className="group-hover:text-[#0059bb] transition-colors">{sport}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Campus */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-[#181c20] uppercase tracking-wider">Campus Location</label>
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/35 rounded-xl p-3 text-xs font-bold text-[#181c20] focus:border-[#0059bb] outline-none cursor-pointer"
              >
                <option value="All Campuses">All Campuses</option>
                <option value="Anggrek">Anggrek Campus</option>
                <option value="Syahdan">Syahdan Campus</option>
                <option value="Alam Sutera">Alam Sutera</option>
                <option value="Senayan">Senayan Campus</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-[#181c20] uppercase tracking-wider">Price per Hour</label>
                <span className="text-xs font-bold text-[#0059bb]">Rp {priceMax.toLocaleString('id-ID')}</span>
              </div>
              <input
                type="range" min="50000" max="250000" step="10000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#fe6b00] h-2 bg-[#e0e3e8] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#717786] font-bold">
                <span>Rp 50k</span><span>Rp 250k</span>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-[#181c20] uppercase tracking-wider">Availability</label>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Instant Booking', 'Evening Slots', 'Weekend Only'].map((avail) => (
                  <button
                    key={avail} type="button"
                    onClick={() => toggleAvailability(avail)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
                      selectedAvailabilities.includes(avail)
                        ? 'bg-[#ffdbcc] text-[#572000] border-[#fe6b00]'
                        : 'bg-[#f1f4f9] text-[#414754] border-transparent hover:border-[#c1c6d7]/40'
                    }`}
                  >
                    {avail}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Facility Grid */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#414754] font-medium leading-none">
              <span className="font-extrabold text-[#181c20]">{filteredFacilities.length} Facilities</span> found for your search
            </p>
            <div className="flex items-center gap-1 text-[#0059bb] font-bold text-xs uppercase select-none cursor-pointer">
              <span>Sort by: Popularity</span>
              <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFacilities.map((fac) => {
              const bBtnDisabled = fac.fullyBooked;
              return (
                <div
                  key={fac.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all border flex flex-col ${
                    bBtnDisabled
                      ? 'border-[#c1c6d7]/15 opacity-75 grayscale-[0.3]'
                      : 'border-[#c1c6d7]/20 hover:border-[#0059bb]/30'
                  }`}
                >
                  <div className="h-52 relative overflow-hidden bg-[#ebeef3]">
                    {bBtnDisabled && (
                      <div className="absolute inset-0 bg-[#181c20]/45 flex items-center justify-center text-white font-black text-sm uppercase tracking-widest backdrop-blur-[1px] z-10">
                        Fully Booked
                      </div>
                    )}
                    <img src={fac.image} alt={fac.title} className="w-full h-full object-cover select-none transition-transform duration-500 hover:scale-103" />
                    {fac.isVerified && (
                      <div className="absolute top-3.5 left-3.5 bg-[#0059bb]/95 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                        <span className="material-symbols-outlined text-xs font-bold leading-none">verified</span>
                        <span>Verified Campus Facility</span>
                      </div>
                    )}
                    <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-[#a04100] shadow-sm tracking-tight border border-white/40">
                      {fac.pricePerHour === 0 ? 'FREE / Open Play' : `Rp ${fac.pricePerHour.toLocaleString('id-ID')} / hr`}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow text-left justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-base font-extrabold text-[#181c20] font-display leading-tight">{fac.title}</h3>
                        <div className="flex items-center text-[#fe6b00] shrink-0 font-bold text-xs gap-0.5">
                          <span className="material-symbols-outlined text-sm font-bold fill-active">star</span>
                          <span>{fac.rating}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#717786] font-semibold flex items-center gap-0.5 leading-none mb-4">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        <span>{fac.location}</span>
                      </p>
                      <div className="flex gap-4.5 pt-1">
                        {fac.amenities.map((am) => (
                          <div key={am.name} className="flex flex-col items-center gap-1 select-none">
                            <div className="w-9 h-9 rounded-xl bg-[#f1f4f9] border border-[#c1c6d7]/15 flex items-center justify-center text-[#0059bb]">
                              <span className="material-symbols-outlined text-sm font-bold">{am.icon}</span>
                            </div>
                            <span className="text-[9px] uppercase font-black text-[#717786] text-center tracking-wider">{am.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {bBtnDisabled ? (
                        <button disabled className="w-full bg-[#d7dadf] text-[#717786] font-extrabold py-3 rounded-xl text-xs text-center cursor-not-allowed uppercase tracking-wider">
                          Unavailable
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => onBookNow(fac)}
                            className="flex-1 bg-[#fe6b00] hover:bg-[#fe6b00]/95 text-white font-extrabold py-3 rounded-xl text-xs shadow-xs transition-all active:scale-[0.97] duration-150 cursor-pointer uppercase tracking-wider text-center"
                          >
                            Book Now
                          </button>
                          <button
                            onClick={() => onShowToast(`Added ${fac.title} to your favorited venues!`, 'success')}
                            className="w-11 border border-[#c1c6d7]/40 hover:bg-[#f1f4f9] flex items-center justify-center rounded-xl transition-colors cursor-pointer text-[#414754]"
                          >
                            <span className="material-symbols-outlined text-sm font-bold">favorite</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredFacilities.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#c1c6d7]/35 p-8">
              <span className="material-symbols-outlined text-[#717786] text-5xl mb-2">sports_handball</span>
              <p className="text-base font-bold text-[#181c20]">No sports facilities match current filters.</p>
              <p className="text-xs text-[#717786] mt-0.5">Please check other campus selections or reset checkmarks.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
