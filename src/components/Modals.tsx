import React, { useState } from 'react';
import { ForumPost, Facility, GameSession, UserProfile, Toast } from '../types';

// ─── StartMatchModal ────────────────────────────────────────────────────────

interface StartMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onCreateMatch: (newMatch: Partial<GameSession>) => void;
  onShowToast: (message: string, type?: Toast['type']) => void;
  facilities: Facility[];
  defaultLocation?: string;
}

function getFacilitiesForSport(sport: string, facilities: Facility[]) {
  const s = sport.toLowerCase();
  
  if (s === 'e-sports') {
    return [];
  }
  
  return facilities.filter(fac => {
    const title = fac.title.toLowerCase();
    if (s === 'futsal') {
      return title.includes('futsal') || title.includes('pitch');
    }
    if (s === 'basketball') {
      return title.includes('basketball') || title.includes('singkarak') || title.includes('menteng') || title.includes('hall');
    }
    if (s === 'badminton') {
      return title.includes('badminton') || title.includes('hall');
    }
    if (s === 'tennis') {
      return title.includes('tennis') || title.includes('hall');
    }
    if (s === 'running') {
      return title.includes('running') || title.includes('track');
    }
    return true;
  });
}

export function StartMatchModal({
  isOpen,
  onClose,
  activeUser,
  onCreateMatch,
  onShowToast,
  facilities,
  defaultLocation
}: StartMatchModalProps) {
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('Futsal');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('16:00 - 17:30');
  const [playersMax, setPlayersMax] = useState(10);
  const [level, setLevel] = useState('Casual');
  const [formError, setFormError] = useState('');

  // Filter venues when sport changes
  const filteredVenues = React.useMemo(() => {
    return getFacilitiesForSport(sport, facilities);
  }, [sport, facilities]);

  // Sync sport selection and auto-location
  React.useEffect(() => {
    if (sport === 'E-Sports') {
      setLocation('Online');
    } else {
      const isCurrentLocationValid = filteredVenues.some(f => f.title === location);
      if (!isCurrentLocationValid && filteredVenues.length > 0) {
        setLocation(filteredVenues[0].title);
      }
    }
  }, [sport, filteredVenues, location]);

  React.useEffect(() => {
    if (isOpen) {
      if (defaultLocation) {
        setLocation(defaultLocation);
        const matchedFac = facilities.find(f => f.title === defaultLocation);
        if (matchedFac) {
          if (matchedFac.title.toLowerCase().includes('futsal')) setSport('Futsal');
          else if (matchedFac.title.toLowerCase().includes('basketball') || matchedFac.title.toLowerCase().includes('singkarak') || matchedFac.title.toLowerCase().includes('menteng')) setSport('Basketball');
          else if (matchedFac.title.toLowerCase().includes('tennis')) setSport('Tennis');
          else if (matchedFac.title.toLowerCase().includes('hall') || matchedFac.title.toLowerCase().includes('badminton')) setSport('Badminton');
          else if (matchedFac.title.toLowerCase().includes('running') || matchedFac.title.toLowerCase().includes('track')) setSport('Running');
        }
      } else {
        setSport('Futsal');
        const futsalFacs = getFacilitiesForSport('Futsal', facilities);
        if (futsalFacs.length > 0) {
          setLocation(futsalFacs[0].title);
        }
      }
    }
  }, [isOpen, defaultLocation, facilities]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) {
      setFormError('Please fill in the match title and location.');
      return;
    }
    setFormError('');

    let image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS23UukNLYQRULFRNJKCbqe-sJCSwt3mTl5Sw&s";
    if (sport === 'Basketball') image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMHCnG3V3acaGf8MBzIxVtomMAOuYbhWC3Q&s";
    else if (sport === 'Tennis') image = "https://asset.ayo.co.id/image/venue/174731032673521.image_cropper_1747310022731.jpg_large.jpeg";
    else if (sport === 'E-Sports') image = "https://i.ytimg.com/vi/c1xWaYGJKis/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBbbG6FU0WO7EdurIdU7tVhHpOrsA";

    onCreateMatch({
      title, sport, location, time, playersMax,
      playersJoined: 1,
      level,
      hostName: activeUser.name,
      hostAvatar: activeUser.avatar,
      hostId: String(Math.floor(1000000000 + Math.random() * 9000000000)),
      image,
      hasJoined: true
    });

    setTitle('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        <div className="px-6 py-5 bg-[#0059bb] text-white flex justify-between items-center bg-gradient-to-r from-[#0059bb] to-[#0070ea]">
          <div>
            <h3 className="text-xl font-bold font-display leading-tight">Host a New Match</h3>
            <p className="text-[11px] opacity-80 mt-0.5">Bring campus athletes together and kick things off.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-left">
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Match Title / Activity</label>
            <input
              type="text" required placeholder="e.g. 3v3 Half-Court Hoop, Futsal Friendly scrim!"
              value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Sport Type</label>
              <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer">
                {['Futsal', 'Basketball', 'Tennis', 'Badminton', 'E-Sports', 'Running'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Game Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer">
                <option value="Casual">Casual</option>
                <option value="Competitive">Competitive (Ranked)</option>
                <option value="All Levels">All Levels Welcome</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Time Interval</label>
              <input
                type="text" required placeholder="e.g. 16:30 - 18:00 (Today)"
                value={time} onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Max Players ({playersMax})</label>
              <input
                type="range" min="2" max="24"
                value={playersMax} onChange={(e) => setPlayersMax(Number(e.target.value))}
                className="w-full accent-[#fe6b00] h-2 bg-[#f1f4f9] rounded-lg cursor-pointer mt-4"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Location / Court Venue</label>
            
            {sport === 'E-Sports' ? (
              <div className="p-4 bg-[#f1f4f9] rounded-2xl border border-[#c1c6d7]/35 flex flex-col items-center justify-center text-center space-y-2 py-6">
                <span className="material-symbols-outlined text-[32px] text-[#0059bb]">laptop_mac</span>
                <div>
                  <h4 className="font-bold text-sm text-[#181c20]">Online Match Session</h4>
                  <p className="text-[10px] text-[#717786] mt-0.5">This E-Sports match is set to Online. No physical campus court booking required.</p>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center group/carousel">
                {/* Horizontal Sliding Carousel */}
                <div className="flex gap-3 overflow-x-auto py-1 scrollbar-none w-full px-0.5" id="modal-venue-carousel">
                  {filteredVenues.map((fac) => {
                    const isSelected = fac.title === location;
                    return (
                      <div
                        key={fac.id}
                        onClick={() => setLocation(fac.title)}
                        className={`w-36 shrink-0 bg-white rounded-xl overflow-hidden border transition-all cursor-pointer select-none flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#0059bb] ring-2 ring-[#0059bb]/10 scale-[1.01] shadow-xs'
                            : 'border-[#c1c6d7]/30 opacity-70 hover:opacity-100'
                        }`}
                      >
                        {/* Cover Image */}
                        <div className="h-16 relative bg-[#ebeef3] shrink-0">
                          <img src={fac.image} alt={fac.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          {isSelected && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-[#0059bb] rounded-full flex items-center justify-center text-white shadow-sm border border-white/20 animate-scale-in">
                              <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                            </div>
                          )}
                        </div>

                        {/* Title details */}
                        <div className="p-2 flex-grow flex flex-col justify-between">
                          <p className="text-[10px] font-bold text-[#181c20] line-clamp-1 leading-snug" title={fac.title}>
                            {fac.title}
                          </p>
                          <p className="text-[8px] text-[#717786] font-semibold mt-0.5 truncate">{fac.campus}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#f7f9ff] rounded-xl text-left border border-[#c1c6d7]/20">
            <p className="text-xs text-[#414754]/90 font-medium">
              🌟 You are hosting this match as <strong>{activeUser.name}</strong>. The schedule will automatically synchronize onto your personal calendar.
            </p>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {formError}
            </div>
          )}

          <div className="flex gap-3.5 pt-4">
            <button type="button" onClick={onClose} className="flex-1 border border-[#c1c6d7] hover:bg-[#f1f4f9] text-[#414754] font-bold py-3.5 rounded-xl transition-all cursor-pointer text-sm">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-sm active:scale-98">
              Host Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── StartDiscussionModal ────────────────────────────────────────────────────

interface StartDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onCreateThread: (newPost: Partial<ForumPost>) => void;
  onShowToast: (message: string, type?: Toast['type']) => void;
}

export function StartDiscussionModal({ isOpen, onClose, activeUser, onCreateThread, onShowToast }: StartDiscussionModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hobby Talks');
  const [tag, setTag] = useState('RANDOM');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      setFormError('Title and discussion content are required.');
      return;
    }
    setFormError('');

    onCreateThread({
      title, category, tag, body,
      image: imageUrl || undefined,
      author: activeUser.name,
      avatar: activeUser.avatar,
      timeAgo: 'Just now',
      replies: 0,
      upvotes: 1,
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
        <div className="px-6 py-5 bg-[#0059bb] text-white flex justify-between items-center bg-gradient-to-r from-[#0059bb] to-[#0070ea]">
          <div>
            <h3 className="text-xl font-bold font-display leading-tight">Start a Discussion</h3>
            <p className="text-[11px] opacity-80 mt-0.5">Share thoughts, seek athletic feedback, or find scrimmage teammates.</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-grow text-left">
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Discussion Title</label>
            <input
              type="text" required placeholder="Write a clear, catchy subject line..."
              value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Category Board</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer">
                <option value="Hobby Talks">Hobby Talks</option>
                <option value="Training Tips">Training Tips</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Tag Code</label>
              <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none cursor-pointer">
                <option value="RANDOM">RANDOM</option>
                <option value="ACTIVITIES">ACTIVITIES</option>
                <option value="NBA">NBA</option>
                <option value="QUESTION">QUESTION</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Discussion Content</label>
            <textarea
              rows={4} required placeholder="Provide ample context so other campus athletes can respond constructively..."
              value={body} onChange={(e) => setBody(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-1.5">Attach Image URL (Optional)</label>
            <input
              type="url" placeholder="e.g. https://images.unsplash.com/... or leave blank"
              value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#f1f4f9] border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0059bb]/10 outline-none"
            />
            <div
              className="mt-2 border-2 border-dashed border-[#c1c6d7]/40 rounded-xl p-4 text-center cursor-pointer hover:bg-[#f7f9ff] transition-all"
              onClick={() => {
                setImageUrl('https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=800&auto=format&fit=crop');
                onShowToast('Linked a sample campus sports image.', 'info');
              }}
            >
              <span className="material-symbols-outlined text-[#717786] text-3xl">upload_file</span>
              <p className="text-xs font-semibold text-[#414754] mt-1.5">Simulate File Drag-and-Drop or Upload</p>
              <p className="text-[10px] text-[#717786] mt-0.5">Accepts athletic action pictures or campus activity shots.</p>
            </div>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {formError}
            </div>
          )}

          <div className="flex gap-3.5 pt-4">
            <button type="button" onClick={onClose} className="flex-1 border border-[#c1c6d7] hover:bg-[#f1f4f9] text-[#414754] font-bold py-3.5 rounded-xl transition-all cursor-pointer text-sm">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-sm active:scale-98">
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── ForumDetailModal ────────────────────────────────────────────────────────

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

        <div className="px-6 py-4 border-b border-[#c1c6d7]/20 flex justify-between items-center bg-[#f7f9ff]">
          <div className="flex items-center gap-1.5 text-[#0059bb] font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-[18px]">forum</span>
            <span>Thread conversation</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[#f1f4f9] text-[#414754] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
          <div className="bg-[#f7f9ff] p-5 rounded-2xl border border-[#c1c6d7]/15">
            <div className="flex items-center gap-3 mb-4">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover shadow-xs border" referrerPolicy="no-referrer" />
              <div>
                <span className="font-bold text-sm text-[#181c20] block">{post.author}</span>
                <span className="text-[11px] text-[#717786]">{post.timeAgo} • category: <strong>{post.category}</strong></span>
              </div>
              <span className="ml-auto bg-[#ebeef3] text-[#414754] px-2.5 py-1 rounded text-[10px] font-bold tracking-wider">{post.tag}</span>
            </div>

            <h2 className="text-xl font-bold font-display text-[#181c20] mb-3 leading-snug">{post.title}</h2>
            <p className="text-sm text-[#414754] whitespace-pre-wrap leading-relaxed">{post.body}</p>

            {post.image && (
              <div className="mt-4 rounded-xl overflow-hidden max-h-64 bg-[#ebeef3]">
                <img src={post.image} alt="Attachment" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center gap-6 mt-4.5 pt-4 border-t border-[#c1c6d7]/20">
              <div className="flex items-center bg-white rounded-full px-2 py-0.5 border border-[#c1c6d7]/30 shadow-2xs">
                <button
                  onClick={() => onVotePost(post.id, 'up')}
                  className={`material-symbols-outlined p-1 text-sm rounded-full transition-colors cursor-pointer ${post.voted === 'up' ? 'text-[#0059bb] bg-[#f1f4f9]' : 'text-[#717786] hover:text-[#0059bb]'}`}
                >expand_less</button>
                <span className="text-xs font-bold px-1.5 text-[#181c20] min-w-4 text-center">{post.upvotes}</span>
                <button
                  onClick={() => onVotePost(post.id, 'down')}
                  className={`material-symbols-outlined p-1 text-sm rounded-full transition-colors cursor-pointer ${post.voted === 'down' ? 'text-[#ba1a1a] bg-[#f1f4f9]' : 'text-[#717786] hover:text-[#ba1a1a]'}`}
                >expand_more</button>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#717786] font-semibold">
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                <span>{post.comments.length} replies</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs text-[#414754] uppercase tracking-wider px-1">Replies / Comments ({post.comments.length})</h4>
            {post.comments.length > 0 ? (
              <div className="space-y-3 pl-2 border-l-2 border-[#f1f4f9]">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-4.5 rounded-xl border border-[#c1c6d7]/15 shadow-2xs space-y-2 flex gap-3">
                    <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full object-cover border shadow-2xs mt-0.5 shrink-0" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#181c20]">{comment.author}</span>
                        <span className="text-[10px] text-[#717786]">{comment.timeAgo}</span>
                      </div>
                      <p className="text-xs text-[#414754] mt-1 whitespace-pre-wrap leading-relaxed">{comment.body}</p>
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

        <form onSubmit={handleSendComment} className="p-4 border-t border-[#c1c6d7]/20 bg-[#f7f9ff] flex gap-2">
          <input
            type="text" required
            value={commentText} onChange={(e) => setCommentText(e.target.value)}
            placeholder={`Reply to ${post.author} as student...`}
            className="flex-1 bg-white border border-[#c1c6d7]/30 rounded-xl px-4 py-3 text-xs font-semibold focus:ring-1 focus:ring-[#0059bb]/40 outline-none"
          />
          <button type="submit" className="bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold px-5 rounded-xl transition-all cursor-pointer shadow-sm text-xs flex items-center justify-center gap-1.5 active:scale-95">
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── FacilityBookModal ───────────────────────────────────────────────────────

interface FacilityBookModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (facId: string, day: string, month: string, year: string, time: string, titleName: string) => void;
  onShowToast: (message: string, type?: Toast['type']) => void;
}

interface DayOption {
  dayNum: string;
  month: string;
  year: string;
  label: string;
}

function buildDaysList(): DayOption[] {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    return {
      dayNum: String(date.getDate()).padStart(2, '0'),
      month: String(date.getMonth() + 1).padStart(2, '0'),
      year: String(date.getFullYear()),
      label: `${dayNames[date.getDay()]} ${String(date.getDate()).padStart(2, '0')} ${monthNames[date.getMonth()]}`
    };
  });
}

const TIME_SLOTS = [
  '08:00 - 09:30', '10:00 - 11:30', '13:00 - 14:30',
  '15:00 - 16:30', '17:00 - 18:30', '19:00 - 20:30'
];

export function FacilityBookModal({ facility, isOpen, onClose, onConfirmBooking, onShowToast }: FacilityBookModalProps) {
  const daysList = buildDaysList();
  const [selectedDayObj, setSelectedDayObj] = useState<DayOption>(daysList[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [slotError, setSlotError] = useState(false);

  if (!isOpen || !facility) return null;

  const handleBookSubmit = () => {
    if (!selectedTimeSlot) {
      setSlotError(true);
      return;
    }
    setSlotError(false);

    onConfirmBooking(
      facility.id,
      selectedDayObj.dayNum,
      selectedDayObj.month,
      selectedDayObj.year,
      selectedTimeSlot,
      facility.title.replace('Court', '').replace('Hall', '').trim()
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col">

        <div className="h-40 relative bg-[#ebeef3]">
          <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="absolute bottom-4 left-4 text-white text-left">
            <span className="bg-[#fe6b00] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 inline-block">
              {facility.pricePerHour === 0 ? 'FREE / Open Play' : `Rp ${facility.pricePerHour.toLocaleString('id-ID')} / hr`}
            </span>
            <h3 className="text-lg font-bold font-display leading-tight">{facility.title}</h3>
            <p className="text-[10px] opacity-80 mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[10px]">location_on</span>{facility.location}
            </p>
          </div>
        </div>

        <div className="p-5 text-left space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-2">1. Choose Date</label>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {daysList.map((d) => (
                <button
                  key={`${d.dayNum}-${d.month}`} type="button"
                  onClick={() => setSelectedDayObj(d)}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                    selectedDayObj.dayNum === d.dayNum && selectedDayObj.month === d.month
                      ? 'bg-[#0059bb] border-[#0059bb] text-white shadow-xs'
                      : 'border-[#c1c6d7]/30 text-[#414754] bg-[#f1f4f9] hover:bg-[#ebeef3]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#414754] uppercase tracking-wider mb-2">2. Available Slots</label>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot} type="button"
                  onClick={() => { setSelectedTimeSlot(slot); setSlotError(false); }}
                  className={`p-2.5 text-xs font-semibold rounded-xl border transition-all text-center cursor-pointer ${
                    selectedTimeSlot === slot
                      ? 'bg-[#fe6b00]/10 border-[#fe6b00] text-[#fe6b00] font-bold ring-1 ring-[#fe6b00]/10'
                      : 'border-[#c1c6d7]/30 text-[#414754] bg-white hover:bg-[#f7f9ff]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {slotError && (
              <p className="text-xs text-red-600 font-semibold mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                Please select a time slot.
              </p>
            )}
          </div>

          <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#c1c6d7]/20 text-xs text-[#414754] space-y-1">
            <div className="flex justify-between font-bold text-[#181c20]">
              <span>Rental Charge (1 block - 1.5 hr)</span>
              <span>{facility.pricePerHour === 0 ? 'FREE' : `Rp ${(facility.pricePerHour * 1.5).toLocaleString('id-ID')}`}</span>
            </div>
            <p className="opacity-80 leading-snug">
              {facility.pricePerHour === 0 
                ? 'This public facility is free to play for all students. No billing required.' 
                : 'Billing gets automatically compiled and processed onto your Student ID invoice system.'}
            </p>
          </div>

          <button
            type="button" onClick={handleBookSubmit}
            className="w-full bg-[#fe6b00] hover:bg-[#fe6b00]/90 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-md text-sm text-center block active:scale-95"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SessionDetailModal ──────────────────────────────────────────────────────

const MOCK_ROSTER_POOL = [
  { name: "Michael Chandra", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", dept: "Information Systems" },
  { name: "Aditya Wijaya", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80", dept: "Computer Science" },
  { name: "Clara Setyawati", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", dept: "Business Law" },
  { name: "Rian Hidayat", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", dept: "Management" },
  { name: "Sarah Natasha", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80", dept: "Visual Communication Design" },
  { name: "David Setiawan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80", dept: "Cyber Security" },
  { name: "Gaby Anastasia", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", dept: "Accounting" }
];

function getRosterForSession(session: GameSession, activeUser: UserProfile) {
  const members: { name: string; avatar: string; department?: string; isHost?: boolean }[] = [];
  
  const isHostActiveUser = session.hostName === activeUser.name;
  members.push({
    name: session.hostName,
    avatar: session.hostAvatar,
    department: isHostActiveUser ? activeUser.department : "Host Student",
    isHost: true
  });

  if (session.hasJoined && !isHostActiveUser) {
    members.push({
      name: activeUser.name,
      avatar: activeUser.avatar,
      department: activeUser.department,
      isHost: false
    });
  }

  const targetCount = session.playersJoined;
  let poolIndex = 0;
  
  const filteredPool = MOCK_ROSTER_POOL.filter(
    p => p.name !== session.hostName && p.name !== activeUser.name
  );

  while (members.length < targetCount && poolIndex < filteredPool.length) {
    const candidate = filteredPool[poolIndex];
    members.push({
      name: candidate.name,
      avatar: candidate.avatar,
      department: candidate.dept,
      isHost: false
    });
    poolIndex++;
  }
  
  return members;
}

interface SessionDetailModalProps {
  session: GameSession | null;
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onJoinSession: (sessionId: string) => void;
  onShowToast: (message: string, type?: Toast['type']) => void;
  onDeleteSession?: (sessionId: string) => void;
}

export function SessionDetailModal({
  session,
  isOpen,
  onClose,
  activeUser,
  onJoinSession,
  onShowToast,
  onDeleteSession
}: SessionDetailModalProps) {
  if (!isOpen || !session) return null;

  const isUserJoined = session.hasJoined;
  const isCapacityFull = session.playersJoined >= session.playersMax;
  
  const roster = getRosterForSession(session, activeUser);

  const isHost = session.hostName === activeUser.name;
  const isAdmin = activeUser.department === 'Admin';
  const showDeleteBtn = isHost || isAdmin;

  const handleToggleJoin = () => {
    onJoinSession(session.id);
    onShowToast(
      isUserJoined 
        ? `Left match "${session.title}"` 
        : `Joined match "${session.title}"! Added to schedule & to-do list.`,
      isUserJoined ? 'info' : 'success'
    );
  };

  return (
    <div className="fixed inset-0 bg-[#181c20]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all animate-fade-in select-none">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        
        {/* Banner */}
        <div className="h-44 relative bg-[#ebeef3] shrink-0">
          <img src={session.image} alt={session.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          
          <div className="absolute bottom-4 left-4 text-white text-left">
            <div className="flex gap-1.5 mb-1.5">
              <span className="bg-[#fe6b00] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full select-none">
                {session.level}
              </span>
              <span className="bg-[#0059bb] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full select-none">
                {session.sport}
              </span>
            </div>
            <h3 className="text-xl font-bold font-display leading-tight">{session.title}</h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-left">
          
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-3 bg-[#f1f4f9] rounded-xl border border-[#c1c6d7]/10 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#0059bb]">schedule</span>
              <div>
                <span className="text-[9px] text-[#717786] uppercase tracking-wider block leading-none font-bold">Time Slot</span>
                <span className="text-xs font-bold text-[#181c20] mt-0.5 block">{session.time}</span>
              </div>
            </div>
            
            <div className="p-3 bg-[#f1f4f9] rounded-xl border border-[#c1c6d7]/10 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#0059bb]">location_on</span>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] text-[#717786] uppercase tracking-wider block leading-none font-bold">Location</span>
                <span className="text-xs font-bold text-[#181c20] mt-0.5 block truncate">{session.location}</span>
              </div>
            </div>
          </div>

          {/* Roster & Participant List */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h4 className="text-xs font-bold text-[#414754] uppercase tracking-wider">
                Lineup Roster ({session.playersJoined} / {session.playersMax})
              </h4>
              {isCapacityFull && !isUserJoined && (
                <span className="text-[10px] text-[#fe6b00] font-black uppercase tracking-wider">Lineup Full</span>
              )}
            </div>

            <div className="bg-[#f7f9ff] p-4 rounded-2xl border border-[#c1c6d7]/15 space-y-3">
              {roster.map((player, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-[#c1c6d7]/10 shadow-3xs">
                  <div className="flex items-center gap-3">
                    <img 
                      src={player.avatar} 
                      alt={player.name} 
                      className="w-8 h-8 rounded-full object-cover border" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#181c20] leading-none">{player.name}</p>
                      <p className="text-[9px] text-[#717786] font-semibold mt-0.5">{player.department}</p>
                    </div>
                  </div>
                  {player.isHost ? (
                    <span className="bg-[#fe6b00]/10 text-[#fe6b00] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-[#fe6b00]/15">
                      Host
                    </span>
                  ) : player.name === activeUser.name ? (
                    <span className="bg-[#0059bb]/10 text-[#0059bb] text-[9px] font-black uppercase px-2 py-0.5 rounded border border-[#0059bb]/15">
                      You
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Button Footer */}
        <div className="p-4 border-t border-[#c1c6d7]/20 bg-[#f7f9ff] flex flex-col sm:flex-row gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 border border-[#c1c6d7] hover:bg-[#ebeef3] text-[#414754] font-bold py-3 rounded-xl transition-all cursor-pointer text-xs uppercase"
          >
            Go Back
          </button>
          
          {showDeleteBtn && (
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel and delete this session completely? This will remove it from all schedules.')) {
                  onDeleteSession?.(session.id);
                  onClose();
                }
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-xs uppercase shadow-xs active:scale-97 text-center animate-fade-in"
            >
              Delete Session
            </button>
          )}

          <button 
            type="button" 
            onClick={handleToggleJoin}
            disabled={isCapacityFull && !isUserJoined}
            className={`flex-1 font-bold py-3 rounded-xl transition-all cursor-pointer text-xs uppercase shadow-xs active:scale-97 text-center ${
              isUserJoined 
                ? 'bg-[#e0e3e8] hover:bg-[#d7dadf] text-[#414754]' 
                : isCapacityFull
                ? 'bg-[#d7dadf] text-[#717786] cursor-not-allowed'
                : 'bg-[#0059bb] hover:bg-[#0070ea] text-white'
            }`}
          >
            {isUserJoined ? 'Leave Lineup' : isCapacityFull ? 'Lineup Full' : 'Join Session'}
          </button>
        </div>

      </div>
    </div>
  );
}
