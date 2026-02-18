
'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { Post } from '@/lib/store';

export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFeed = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/feed');
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error('Failed to fetch feed:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-800">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

            <div className="p-8 text-center text-gray-500">
                <p>No more posts to load.</p>
                <button
                    onClick={fetchFeed}
                    className="mt-4 text-blue-400 hover:underline"
                >
                    Refresh Feed
                </button>
            </div>
        </div>
    );
}
