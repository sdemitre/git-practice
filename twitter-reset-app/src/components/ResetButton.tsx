
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!confirm('Are you sure you want to perform a HARD RESET? This will wipe all your history and personalization.')) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/reset', { method: 'POST' });
            if (res.ok) {
                // Force a hard reload to ensure all state is cleared and feed is fresh
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Reset failed:', error);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleReset}
            disabled={loading}
            className={`
        w-full py-3 px-4 rounded-full font-bold text-white transition-all
        ${loading ? 'bg-gray-600 cursor-wait' : 'bg-red-600 hover:bg-red-700 hover:scale-105 shadow-lg shadow-red-900/20'}
      `}
        >
            {loading ? 'RESETTING...' : 'HARD RESET'}
        </button>
    );
}
