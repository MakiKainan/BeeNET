import React, { useState } from 'react';
import { ForumPost, UserProfile } from '../types';

interface ForumViewProps {
  activeUser: UserProfile;
  forumPosts: ForumPost[];
  searchQuery: string;
  onSelectPost: (post: ForumPost) => void;
  onOpenCreateDiscussion: () => void;
  onVotePost: (postId: string, direction: 'up' | 'down') => void;
}

export default function ForumView({
  activeUser,
  forumPosts,
  searchQuery,
  onSelectPost,
  onOpenCreateDiscussion,
  onVotePost
}: ForumViewProps) {
  
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Hobby Talks' | 'Training Tips'>('All');
  const [forumSort, setForumSort] = useState<'Latest' | 'Popular'>('Latest');

  // Filter posts based on search query, selected board category
  const filteredPosts = forumPosts
    .filter((post) => {
      const matchSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCat = selectedCategory === 'All' || post.category === selectedCategory;
      
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (forumSort === 'Popular') {
        return b.upvotes - a.upvotes;
      }
      // Simple fallback based on placeholder replies
      return b.replies - a.replies;
    });



  return (
    <div className="space-y-8 animate-fade-in select-none text-left">
      
      {/* Header Area */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181c20] tracking-tight font-display mb-1">
            Community Forum
          </h2>
          <p className="text-sm md:text-base text-[#414754] font-medium max-w-xl leading-relaxed">
            Share tips, find teammates, and stay updated with the latest in campus athletics and physical recreation.
          </p>
        </div>
        
        <button 
          onClick={onOpenCreateDiscussion}
          className="bg-[#a04100] hover:bg-[#a04100]/90 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer text-sm font-display select-none"
        >
          <span className="material-symbols-outlined text-[18px]">add_comment</span>
          Start Discussion
        </button>
      </section>

      {/* Bento Grid: Featured Category Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Large featured football campaign */}
        <div className="md:col-span-2 relative group overflow-hidden rounded-2xl h-64 shadow-md bg-slate-900">
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 select-none" 
            src="https://akcdn.detik.net.id/community/media/visual/2026/05/07/2274854188-1778100917865_169.jpeg?w=700&q=90"
            alt="Bayern Champions match cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white text-left">
            <span className="bg-[#fe6b00] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
              Trending Category
            </span>
            <h3 className="text-xl md:text-2xl font-black font-display mb-1.5">BAYERN MIRACULOUS</h3>
            <p className="text-white/85 text-xs max-w-md font-medium leading-relaxed">
              Bayern Vs PSG: Imbang 1-1, Les Parisiens Melaju ke Final.
            </p>
          </div>
        </div>

        {/* Categories togglers */}
        <div className="flex flex-col gap-4">
          
          <div 
            onClick={() => setSelectedCategory(selectedCategory === 'Hobby Talks' ? 'All' : 'Hobby Talks')}
            className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between flex-1 ${
              selectedCategory === 'Hobby Talks' 
                ? 'bg-[#d8e2ff] border-[#0059bb]/35 shadow-md' 
                : 'bg-white border-[#c1c6d7]/20 shadow-xs hover:border-[#0059bb]/30'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#d8e2ff] text-[#0059bb] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </div>
              <span className="text-[10px] text-[#717786] font-bold uppercase tracking-wider">42 Posts</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#181c20] mb-0.5">Hobby Talks</h4>
              <p className="text-[10px] text-[#414754]/85 leading-snug font-medium">Discover conversations around hobbies you like. Expand your Network, Find your Net.</p>
            </div>
          </div>

          <div 
            onClick={() => setSelectedCategory(selectedCategory === 'Training Tips' ? 'All' : 'Training Tips')}
            className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between flex-1 ${
              selectedCategory === 'Training Tips' 
                ? 'bg-[#ffdbcc] border-[#a04100]/30 shadow-md' 
                : 'bg-white border-[#c1c6d7]/20 shadow-xs hover:border-[#a04100]/30'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#ffdbcc] text-[#a04100] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">fitness_center</span>
              </div>
              <span className="text-[10px] text-[#717786] font-bold uppercase tracking-wider">18 New Today</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#181c20] mb-0.5">Training Tips</h4>
              <p className="text-[10px] text-[#414754]/85 leading-snug font-medium">Nutritional advice and workouts customized for athletes. Track your limits.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Discussions symmetric feed */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Discussion threads list */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[#181c20] font-display">
              {selectedCategory === 'All' ? 'Recent Discussions' : `${selectedCategory} Board`}
            </h3>
            
            <div className="flex bg-[#e5e8ee] p-1 rounded-full text-xs font-bold. border border-[#c1c6d7]/10">
              <button 
                onClick={() => setForumSort('Latest')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  forumSort === 'Latest' ? 'bg-white text-[#181c20] shadow-2xs' : 'text-[#414754] hover:text-[#181c20]'
                }`}
              >
                Latest
              </button>
              <button 
                onClick={() => setForumSort('Popular')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  forumSort === 'Popular' ? 'bg-white text-[#181c20] shadow-2xs' : 'text-[#414754] hover:text-[#181c20]'
                }`}
              >
                Popular
              </button>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white p-5 rounded-2xl border border-[#c1c6d7]/20 hover:border-[#0059bb]/35 transition-all shadow-2xs flex gap-5 group cursor-pointer text-left"
                >
                  {/* Upvote side widget */}
                  <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onVotePost(post.id, 'up');
                      }}
                      className={`material-symbols-outlined text-[20px] transition-colors rounded-full p-1 cursor-pointer ${
                        post.voted === 'up' ? 'text-[#0059bb] bg-[#f1f4f9] font-bold' : 'text-[#717786] hover:text-[#0059bb]'
                      }`}
                    >
                      expand_less
                    </button>
                    <span className="text-xs font-bold text-[#181c20]">{post.upvotes}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onVotePost(post.id, 'down');
                      }}
                      className={`material-symbols-outlined text-[20px] transition-colors rounded-full p-1 cursor-pointer ${
                        post.voted === 'down' ? 'text-[#ba1a1a] bg-[#f1f4f9] font-bold' : 'text-[#717786] hover:text-[#ba1a1a]'
                      }`}
                    >
                      expand_more
                    </button>
                  </div>

                  {/* Post details */}
                  <div className="flex-grow space-y-2.5" onClick={() => onSelectPost(post)}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-[#ebeef3] shrink-0 border">
                        <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-xs font-bold text-[#414754]">{post.author}</span>
                      <span className="text-[10px] text-[#717786]">{post.timeAgo}</span>
                      <span className="ml-auto bg-[#f1f4f9] text-[#717786] px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">
                        {post.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#181c20] group-hover:text-[#0059bb] transition-colors line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-xs text-[#575e71] line-clamp-3 leading-relaxed">
                      {post.body}
                    </p>

                    {/* Image thumbnail previews */}
                    {post.image && (
                      <div className="h-40 rounded-xl overflow-hidden mt-3 max-w-lg bg-[#ebeef3]">
                        <img src={post.image} alt="Preview attachment" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="flex items-center gap-5 pt-3 border-t border-[#f1f4f9] text-xs font-semibold text-[#717786]">
                      <div className="flex items-center gap-1.5 hover:text-[#0059bb] transition-colors">
                        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                        <span>{post.comments.length} replies</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(`BeeNET forum post: ${post.title}`);
                          alert("Link discussion copied!");
                        }}
                        className="flex items-center gap-1.5 hover:text-[#0059bb] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">share</span>
                        <span>Share</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Saved discussion to your offline library.");
                        }}
                        className="flex items-center gap-1.5 hover:text-[#a04100] transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">bookmark</span>
                        <span>Save</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#c1c6d7]/30 p-8">
              <span className="material-symbols-outlined text-[#717786] text-4xl mb-2">upcoming</span>
              <p className="text-sm text-[#414754] font-bold">No threads matching search filters.</p>
              <p className="text-xs text-[#717786] mt-0.5">Start a fresh conversation board above!</p>
            </div>
          )}
        </div>

        {/* Sidebar right instructions widgets */}
        <aside className="w-full lg:w-80 space-y-6">
          
          {/* Forum guidelines list */}
          <div className="bg-[#0059bb] text-white p-5 rounded-2xl shadow-md relative overflow-hidden bg-gradient-to-br from-[#0059bb] to-[#0070ea]">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <h4 className="font-bold text-lg font-display mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined">rule_folder</span>
              Forum Rules
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-white/95">
              <li className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-sm text-[#ffdbcc]">verified</span>
                <span>Be supportive, respectful, and inclusive of all skills.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-sm text-[#ffdbcc]">verified</span>
                <span>No commercial ads, spamming, or explicit self-promo.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-sm text-[#ffdbcc]">verified</span>
                <span>Keep posts tightly related to university athletics.</span>
              </li>
            </ul>
          </div>



          {/* Tag cloud widgets */}
          <div className="bg-white p-5 rounded-2xl border border-[#c1c6d7]/20 shadow-2xs text-left">
            <h4 className="font-bold text-xs text-[#414754] uppercase tracking-wider mb-4">Popular Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {["#Basketball", "#SummerTraining", "#Yoga", "#FreshmanSports", "#Diet"].map((tag) => (
                <span 
                  key={tag}
                  onClick={() => alert(`filtering posts tagged ${tag}`)}
                  className="px-3 py-1 bg-[#f1f4f9] text-[#414754] rounded-full text-xs font-semibold hover:bg-[#0059bb] hover:text-white transition-all cursor-pointer border border-[#c1c6d7]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}
