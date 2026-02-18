
'use client';

import { useState, useEffect, useRef } from 'react';
import { Post } from '@/lib/store';

export default function PostCard({ post }: { post: Post }) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);
    const cardRef = useRef<HTMLDivElement>(null);
    const viewRecorded = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !viewRecorded.current) {
                        // Record view after 1 second of visibility
                        setTimeout(() => {
                            if (entry.isIntersecting && !viewRecorded.current) {
                                recordInteraction('view');
                                viewRecorded.current = true;
                            }
                        }, 1000);
                    }
                });
            },
            { threshold: 0.7 } // 70% of the card must be visible
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const recordInteraction = async (type: 'like' | 'view') => {
        try {
            await fetch('/api/interact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId: post.id, type }),
            });
        } catch (err) {
            console.error('Failed to record interaction:', err);
        }
    };

    const handleLike = () => {
        if (liked) return; // Prevent double likes for this demo
        setLiked(true);
        setLikesCount((prev) => prev + 1);
        recordInteraction('like');
    };

    return (
        <div ref={cardRef} className="border-b border-gray-800 p-4 hover:bg-gray-900/30 transition-colors cursor-pointer">
            <div className="flex space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0" /> {/* Avatar placeholder */}
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-white hover:underline">{post.author}</span>
                        <span className="text-gray-500">{post.handle}</span>
                        <span className="text-gray-500">· 2h</span>
                    </div>
                    <div className="mt-1 text-white text-[15px] leading-normal">
                        {post.content}
                    </div>

                    {/* Post Stats / Actions */}
                    <div className="flex justify-between mt-3 text-gray-500 max-w-md">
                        <button className="flex items-center space-x-2 hover:text-blue-400 group">
                            <span className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </span>
                            <span>24</span>
                        </button>

                        <button className="flex items-center space-x-2 hover:text-green-400 group">
                            <span className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </span>
                            <span>12</span>
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleLike(); }}
                            className={`flex items-center space-x-2 group ${liked ? 'text-pink-600' : 'hover:text-pink-600'}`}
                        >
                            <span className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
                                {liked ? (
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                )}
                            </span>
                            <span>{likesCount}</span>
                        </button>

                        <button className="flex items-center space-x-2 hover:text-blue-400 group">
                            <span className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
