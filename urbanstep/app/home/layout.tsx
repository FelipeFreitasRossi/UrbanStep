'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem('isLoggedIn');
    if (logged !== 'true') {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
}