
import Link from 'next/link';
import ResetButton from './ResetButton';

export default function Sidebar() {
    return (
        <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-gray-800 bg-black text-white p-4">
            <div className="mb-8 p-2">
                <h1 className="text-2xl font-bold tracking-wider">TwitterClone</h1>
            </div>

            <nav className="flex-1 space-y-4">
                <Link href="/" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full transition-colors">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    <span className="text-xl font-medium">Home</span>
                </Link>

                <Link href="#" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full transition-colors text-gray-400 cursor-not-allowed">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    <span className="text-xl font-medium">Notifications</span>
                </Link>

                <Link href="#" className="flex items-center space-x-4 p-3 hover:bg-gray-900 rounded-full transition-colors text-gray-400 cursor-not-allowed">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <span className="text-xl font-medium">Profile</span>
                </Link>
            </nav>

            <div className="mt-auto">
                <ResetButton />
            </div>
        </div>
    );
}
