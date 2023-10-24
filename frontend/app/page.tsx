import { CalendarIcon } from '@heroicons/react/24/solid';
import CalendarButton from './CalendarButton';
import SignInButton from './components/signin-btn';

export default function Home() {
  const ACCESS_TOKEN = "ya29.a0AfB_byDkgMdygtElsnAD2HcqqVlrgSrlK6ckCXYi1TyMJsr-Hi1TuDV7Ic2wmcWZbDNSN61-fu7D2jdd_ibwL1PeECM1bSQ44xjdgEqM63hYvTiSWG6ret_ZfoY-u2lLVQ-1mTjjLptiDPc2dBvxglZ4kEiCqudk9RhRaCgYKAa0SARISFQGOcNnCFSfxdffpbbp9B__xXjhDPA0171";

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <CalendarIcon className="h-8 w-8 text-white" />
          <h1 className="ml-2 text-2xl">Google Calendar Assistant</h1>
        </div>
        <SignInButton />
      </header>

      <main>
        <div className="text-center mt-64">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Google Calendar Assistant</h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Your own personal AI assistant for managing your Google Calendar.</p>
        </div>
      </main>
    </div>
  );
}