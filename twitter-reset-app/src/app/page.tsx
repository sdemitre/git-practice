
import Feed from '@/components/Feed';
import DebugView from '@/components/DebugView';

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
        <h2 className="text-xl font-bold">For You</h2>
      </header>

      <Feed />

      <DebugView />
    </div>
  );
}
