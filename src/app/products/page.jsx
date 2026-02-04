'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootProductsRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the public collections page instead of the admin dashboard
    router.replace('/collections');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
