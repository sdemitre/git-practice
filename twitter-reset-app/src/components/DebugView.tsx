
'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/store';

export default function DebugView() {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/user');
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error('Failed to fetch user:', err);
        }
    };

    useEffect(() => {
        fetchUser();
        // Poll for updates every 2 seconds to show real-time changes
        const interval = setInterval(fetchUser, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!user) return null;

    const interests = Object.entries(user.interests).sort((a, b) => b[1] - a[1]);

    return (
        <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-2xl max-w-xs w-full z-50">
            <h3 className="font-bold text-sm mb-2 text-green-400 font-mono">
                ALGORITHM_DEBUG_VIEW
            </h3>
            <div className="text-xs text-gray-400 mb-2">
                Real-time view of your interest graph.
            </div>

            {interests.length === 0 ? (
                <div className="text-gray-500 italic text-sm py-4 text-center border border-dashed border-gray-700 rounded">
                    No data recorded.
                    <br />
                    Algorithm is neutral.
                </div>
            ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {interests.map(([topic, score]) => (
                        <div key={topic} className="flex items-center justify-between">
                            <span className="capitalize text-gray-300">{topic}</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-500"
                                        style={{ width: `${Math.min(score * 5, 100)}%` }}
                                    />
                                </div>
                                <span className="font-mono text-blue-400">{score}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
