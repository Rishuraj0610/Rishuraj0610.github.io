import React, { useState } from 'react';
import { PORTFOLIO_DATA, BlogPost } from '../data/portfolioData';
import {
  Clock,
  ArrowRight,
  X,
  Share2,
  Check,
} from 'lucide-react';

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="blog" className="py-24 relative border-t-2 border-[#111111] bg-[#ebebea] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>08</b> ENGINEERING LOG
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              WRITING &bull; DEEP DIVES @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            TECHNICAL NOTES &amp; SYSTEM INSIGHTS*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            Documenting architectural decisions in RAG pipelines, stateless JWT middleware, and vector vs relational databases.
          </p>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.blogPosts.map((post) => (
            <article
              key={post.id}
              className="neo-box p-6 rounded-xl bg-white flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono-code font-bold text-[#555555] mb-3 pb-2 border-b border-[#111111]">
                  <span className="px-2 py-0.5 rounded bg-[#5fb57a] text-[#111111]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#111111]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg uppercase text-[#111111] tracking-tight leading-snug mb-2 group-hover:text-[#5fb57a] transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-[#444444] font-medium leading-relaxed line-clamp-3 mb-5">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t-[1.5px] border-[#111111] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111111]">
                <span className="group-hover:underline">Read Full Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />

          <div className="relative w-full max-w-3xl bg-[#ebebea] border-2 border-[#111111] shadow-[8px_8px_0px_#111111] rounded-2xl overflow-hidden z-10 max-h-[88vh] flex flex-col my-auto text-[#111111]">
            {/* Modal Header */}
            <div className="p-6 bg-white border-b-2 border-[#111111] flex items-start justify-between gap-4 sticky top-0 z-20">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-[#555555] mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#5fb57a] text-[#111111]">
                    {selectedPost.category}
                  </span>
                  <span>&bull;</span>
                  <span>{selectedPost.date}</span>
                  <span>&bull;</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#111111]">
                  {selectedPost.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-lg bg-[#f0f0ee] border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto text-sm leading-relaxed">
              <div className="p-4 rounded-xl bg-white border-[1.5px] border-[#111111] italic font-medium text-[#222222] shadow-[2px_2px_0px_#111111]">
                "{selectedPost.summary}"
              </div>

              <div className="space-y-4 pt-2 text-[#333333] font-medium leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t-2 border-[#111111] flex items-center justify-between text-xs font-mono-code font-bold text-[#555555]">
              <div className="flex items-center gap-2">
                <span>AUTHOR: Rishu Raj</span>
                <span>&bull;</span>
                <span>CS Engineering @ NIET</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="neo-btn px-3 py-1.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] transition-colors flex items-center gap-1.5 uppercase font-bold text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#5fb57a]" /> : <Share2 className="w-3.5 h-3.5 text-[#111111]" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="neo-btn px-4 py-1.5 rounded-full bg-[#111111] text-white uppercase font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
