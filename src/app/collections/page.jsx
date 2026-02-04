'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * The /collections page has been deprecated in favor of /products.
 * This redirect ensures legacy links still work.
 */
export default function CollectionsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/products');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
