import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Redirect to prompt questions page for immediate user engagement
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/prompt-questions');
  }, [router]);

  return null; // Return null since we're redirecting
} 