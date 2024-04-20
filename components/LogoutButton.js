import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out without redirect
    router.push('/login'); // Redirect to login page
  };

  if (!session) {
    return null; // If user is not logged in, don't display the logout button
  }

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
