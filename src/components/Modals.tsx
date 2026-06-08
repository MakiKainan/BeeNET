import React, { useState } from 'react';
import { ForumPost, Facility, GameSession, UserProfile } from '../types';

interface StartMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onCreateMatch: (newMatch: Partial<GameSession>) => void;
}

export function StartMatchModal({ isOpen, onClose, activeUser, onCreateMatch }: StartMatchModalProps) {
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('Futsal');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('16:00 - 17:30');
  const [playersMax, setPlayersMax] = useState(10);
  const [level, setLevel] = useState('Casual');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) {
      alert('Please fill out all fields');
      return;
    }

    // Assign appropriate placeholder image based on sport
    let image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23UukNLYQRULFRNJKCbqe-sJCSwt3mTl5Sw&s";
    if (sport === "Basketball") {
      image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMHCnG3V3acaGf8MBzIxVtomMAOuYbhWC3Q&s";
    } else if (sport === "Tennis") {
      image = "https://asset.ayo.co.id/image/venue/174731032673521.image_cropper_1747310022731.jpg_large.jpeg";
    } else if (sport === "E-Sports") {
      image = "https://i.ytimg.com/vi/c1xWaYGJKis/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBbbG6FU0WO7EdurIdU7tVhHpOrsA";
    }

    onCreateMatch({
      title,
      sport,
      location,
      time,
      playersMax,
      playersJoined: 1, // Host joined
      level,
      hostName: activeUser.name,
      hostAvatar: activeUser.avatar,
      hostId: String(Math.floor(1000000000 + Math.random() * 9000000000)),
      image,
      hasJoined: true
    });
    
    // reset
    setTitle('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#0059bb] text-white flex justify-between items-center bg-gradient-to-r from-[#0059bb] to-[#0070ea]">
          <div>
            <h3 className="text-xl font-bold font-display leading-tight">Host a New Match</h3>
            <p className="text-[11px] opacity-80 mt-0.5">Bring campus athletes together and kick things off.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-left">
          
          {/* Match Title */}
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Match Title / Activity</label>
            <input 
              type="text"
              required
              placeholder="e.g. 3v3 Half-Court Hoop, Futsal Friendly scrim!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sport Type select */}
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Sport Type</label>
              <select 
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer"
              >
                <option value="Futsal">Futsal</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="E-Sports">E-Sports</option>
                <option value="Running">Running</option>
              </select>
            </div>

            {/* Level selector */}
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Game Level</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer"
              >
                <option value="Casual">Casual</option>
                <option value="Competitive">Competitive (Ranked)</option>
                <option value="All Levels">All Levels Welcome</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date Time interval */}
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Time Interval</label>
              <input 
                type="text"
                required
                placeholder="e.g. 16:30 - 18:00 (Today)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
              />
            </div>

            {/* Maximum Capacity */}
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Max Players ({playersMax})</label>
              <input 
                type="range"
                min="2"
                max="24"
                value={playersMax}
                onChange={(e) => setPlayersMax(Number(e.target.value))}
                className="w-full accent-[#fe6b00] h-2 bg-[#f1f4f9] rounded-lg cursor-pointer mt-4"
              />
            </div>
          </div>

          {/* Location details */}
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Location / Court Venue</label>
            <input 
              type="text"
              required
              placeholder="e.g. Anggrek Campus, Hall B"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
            />
          </div>

          <div className="p-3 bg-[#f7f9ff] rounded-xl text-left border border-[#c1c6d7]/20">
            <p className="text-xs text-[#414754]/90 font-medium">
              🌟 You are hosting this match as <strong>{activeUser.name}</strong>. The schedule will automatically synchronize onto your personal calendar.
            </p>
          </div>

          {/* Actions footer */}
          <div className="flex gap-3.5 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#c1c6d7] hover:bg-[#f1f4f9] text-[#414754] font-bold py-3.5 rounded-xl transition-all cursor-pointer text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-sm active:scale-98"
            >
              Host Match
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

interface StartDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onCreateThread: (newPost: Partial<ForumPost>) => void;
}

export function StartDiscussionModal({ isOpen, onClose, activeUser, onCreateThread }: StartDiscussionModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hobby Talks');
  const [tag, setTag] = useState('RANDOM');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      alert('Title and details are required');
      return;
    }

    onCreateThread({
      title,
      category,
      tag,
      body,
      image: imageUrl || undefined,
      author: activeUser.name,
      avatar: activeUser.avatar,
      timeAgo: "Just now",
      replies: 0,
      upvotes: 1, // Author automatic self-upvote
      voted: 'up',
      comments: []
    });

    setTitle('');
    setBody('');
    setImageUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0059bb] text-white flex justify-between items-center bg-gradient-to-r from-[#0059bb] to-[#0070ea]">
          <div>
            <h3 className="text-xl font-bold font-display leading-tight">Start a Discussion</h3>
            <p className="text-[11px] opacity-80 mt-0.5">Share thoughts, seek athletic feedback, or find scrimmage teammates.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Body Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow text-left">
          
          {/* Discussion Title */}
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Discussion Title</label>
            <input 
              type="text"
              required
              placeholder="Write a clear, catchy subject line..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category Select */}
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Category Board</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer"
              >
                <option value="Hobby Talks">Hobby Talks</option>
                <option value="Training Tips">Training Tips</option>
              </select>
            </div>

            {/* Tag Selection */}
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Tag Code</label>
              <select 
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer"
              >
                <option value="RANDOM">RANDOM</option>
                <option value="ACTIVITIES">ACTIVITIES</option>
                <option value="NBA">NBA</option>
                <option value="QUESTION">QUESTION</option>
              </select>
            </div>
          </div>

          {/* Body Information */}
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Discussion Content</label>
            <textarea 
              rows={4}
              required
              placeholder="Provide ample context so other campus athletes can respond constructively..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none resize-none"
            />
          </div>

          {/* IMAGE ATTACHMENT DRAG SIMULATION */}
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Attach Image / Screenshot URL (Optional)</label>
            <input 
              type="url"
              placeholder="e.g. https://images.unsplash.com/... or leave blank"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
            />
            <div className="mt-2 border-2 border-dashed border-[#c1c6d7]/40 rounded-xl p-4 text-center cursor-pointer hover:bg-[#f7f9ff] transition-all" onClick={() => {
              // Simulated drag file trigger
              setImageUrl('https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=800&auto=format&fit=crop');
              alert("Linked simulated campus sports image for showcase upload!");
            }}>
              <span className="material-symbols-outlined text-[#717786] text-3xl">upload_file</span>
              <p className="text-xs font-semibold text-[#414754] mt-1.5">Simulate File Drag-and-Drop or Upload</p>
              <p className="text-[10px] text-[#717786] mt-0.5">Accepts athletic action pictures or campus activity shots.</p>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex gap-3.5 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#c1c6d7] hover:bg-[#f1f4f9] text-[#414754] font-bold py-3.5 rounded-xl transition-all cursor-pointer text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-sm active:scale-98"
            >
              Post Discussion
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

interface ForumDetailModalProps {
  post: ForumPost | null;
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onPostComment: (postId: string, commentText: string) => void;
  onVotePost: (postId: string, direction: 'up' | 'down') => void;
}

export function ForumDetailModal({ post, isOpen, onClose, activeUser, onPostComment, onVotePost }: ForumDetailModalProps) {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !post) return null;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onPostComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#c1c6d7]/20 flex justify-between items-center bg-[#f7f9ff]">
          <div className="flex items-center gap-1.5 text-[#0059bb] font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-[18px]">forum</span>
            <span>Thread conversation</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#f1f4f9] text-[#414754] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Content body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
          
          {/* Main Original Author Thread content card */}
          <div className="bg-[#f7f9ff] p-5 rounded-2xl border border-[#c1c6d7]/15">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={post.avatar} 
                alt={post.author} 
                className="w-10 h-10 rounded-full object-cover shadow-xs border"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-bold text-sm text-[#181c20] block">{post.author}</span>
                <span className="text-[11px] text-[#717786]">{post.timeAgo} • category: <strong>{post.category}</strong></span>
              </div>
              <span className="ml-auto bg-[#ebeef3] text-[#414754] px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">
                {post.tag}
              </span>
            </div>

            <h2 className="text-xl font-bold font-display text-[#181c20] mb-3 leading-snug">
              {post.title}
            </h2>

            <p className="text-sm text-[#414754] whitespace-pre-wrap leading-relaxed">
              {post.body}
            </p>

            {/* Optional Thumbnail banner attached */}
            {post.image && (
              <div className="mt-4 rounded-xl overflow-hidden max-h-64 bg-[#ebeef3]">
                <img src={post.image} alt="Attachment" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Engagement Indicators / Vote lines */}
            <div className="flex items-center gap-6 mt-4.5 pt-4 border-t border-[#c1c6d7]/20">
              <div className="flex items-center bg-white rounded-full px-2 py-0.5 border border-[#c1c6d7]/30 shadow-2xs">
                <button 
                  onClick={() => onVotePost(post.id, 'up')}
                  className={`material-symbols-outlined p-1 text-sm rounded-full transition-colors cursor-pointer ${
                    post.voted === 'up' ? 'text-[#0059bb] bg-[#f1f4f9]' : 'text-[#717786] hover:text-[#0059bb]'
                  }`}
                >
                  expand_less
                </button>
                <span className="text-xs font-bold px-1.5 text-[#181c20] min-w-4 text-center">{post.upvotes}</span>
                <button 
                  onClick={() => onVotePost(post.id, 'down')}
                  className={`material-symbols-outlined p-1 text-sm rounded-full transition-colors cursor-pointer ${
                    post.voted === 'down' ? 'text-[#ba1a1a] bg-[#f1f4f9]' : 'text-[#717786] hover:text-[#ba1a1a]'
                  }`}
                >
                  expand_more
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#717786] font-semibold">
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                <span>{post.comments.length} replies</span>
              </div>
            </div>

          </div>

          {/* Comments/Replies list area */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs text-[#414754] uppercase tracking-wider px-1">Replies / Comments ({post.comments.length})</h4>
            
            {post.comments.length > 0 ? (
              <div className="space-y-3 pl-2 border-l-2 border-[#f1f4f9]">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-4.5 rounded-xl border border-[#c1c6d7]/15 shadow-2xs space-y-2 flex gap-3">
                    <img 
                      src={comment.avatar} 
                      alt={comment.author} 
                      className="w-8 h-8 rounded-full object-cover border shadow-2xs mt-0.5 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#181c20]">{comment.author}</span>
                        <span className="text-[10px] text-[#717786]">{comment.timeAgo}</span>
                      </div>
                      <p className="text-xs text-[#414754] mt-1 whitespace-pre-wrap leading-relaxed">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#f7f9ff] rounded-2xl border border-dashed border-[#c1c6d7]/30">
                <p className="text-xs text-[#717786] font-medium">No replies yet. Be the first to start the dialog trail!</p>
              </div>
            )}
          </div>

        </div>

        {/* Action input box comments footer */}
        <form onSubmit={handleSendComment} className="p-4 border-t border-[#c1c6d7]/20 bg-[#f7f9ff] flex gap-2">
          <input 
            type="text"
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={`Reply to ${post.author} as student...`}
            className="flex-1 bg-white border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-1 focus:ring-[#0059bb]/40 outline-none"
          />
          <button 
            type="submit"
            className="bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold px-5 rounded-xl transition-all cursor-pointer shadow-sm text-xs flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Send</span>
          </button>
        </form>

      </div>
    </div>
  );
}

interface FacilityBookModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (facId: string, day: string, time: string, titleName: string) => void;
}

export function FacilityBookModal({ facility, isOpen, onClose, onConfirmBooking }: FacilityBookModalProps) {
  const [selectedDay, setSelectedDay] = useState('06'); // Match schedule days 
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  if (!isOpen || !facility) return null;

  const daysList = [
    { dayNum: '05', label: 'Fri 05 June' },
    { dayNum: '06', label: 'Sat 06 June' },
    { dayNum: '07', label: 'Sun 07 June' },
    { dayNum: '08', label: 'Mon 08 June' },
    { dayNum: '09', label: 'Tue 09 June' }
  ];

  const timeSlots = [
    "08:00 - 09:30",
    "10:00 - 11:30",
    "13:00 - 14:30",
    "15:00 - 16:30",
    "17:00 - 18:30",
    "19:00 - 20:30"
  ];

  const handleBookSubmit = () => {
    if (!selectedTimeSlot) {
      alert("Please select a specific hourly time slot.");
      return;
    }

    onConfirmBooking(
      facility.id, 
      selectedDay, 
      selectedTimeSlot,
      facility.title.replace("Court", "").replace("Hall", "").trim()
    );
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col">
        
        {/* Banner with picture */}
        <div className="h-40 relative bg-[#ebeef3]">
          <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="absolute bottom-4 left-4 text-white text-left">
            <span className="bg-[#fe6b00] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 inline-block">
              Rp {facility.pricePerHour.toLocaleString('id-ID')} / hr
            </span>
            <h3 className="text-lg font-bold font-display leading-tight">{facility.title}</h3>
            <p className="text-[10px] opacity-80 mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[10px]">location_on</span>{facility.location}
            </p>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 text-left space-y-4">
          
          {/* Calendar day picker */}
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-2">1. Choose Date</label>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {daysList.map((d) => (
                <button
                  key={d.dayNum}
                  type="button"
                  onClick={() => setSelectedDay(d.dayNum)}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                    selectedDay === d.dayNum
                      ? 'bg-[#0059bb] border-[#0059bb] text-white shadow-xs'
                      : 'border-[#c1c6d7]/30 text-[#414754] bg-[#f1f4f9] hover:bg-[#ebeef3]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeslot picker grids */}
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-2">2. Available Slots</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-2.5 text-xs font-semibold rounded-xl border transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#fe6b00]/10 border-[#fe6b00] text-[#fe6b00] font-bold ring-1 ring-[#fe6b00]/10'
                        : 'border-[#c1c6d7]/30 text-[#414754] bg-white hover:bg-[#f7f9ff]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick billing calculation summary block */}
          <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#c1c6d7]/20 text-xs text-[#414754] space-y-1">
            <div className="flex justify-between font-bold text-[#181c20]">
              <span>Rental Charge (1 block - 1.5 hr)</span>
              <span>Rp {(facility.pricePerHour * 1.5).toLocaleString('id-ID')}</span>
            </div>
            <p className="opacity-80 leading-snug">Billing gets automatically compiled and processed onto your Student ID invoice system.</p>
          </div>

          {/* Confirm Button */}
          <button 
            type="button"
            onClick={handleBookSubmit}
            className="w-full bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-sm text-center block active:scale-95"
          >
            Confirm Reservation
          </button>

        </div>

      </div>
    </div>
  );
}
