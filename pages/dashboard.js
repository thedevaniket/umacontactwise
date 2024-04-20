import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return <div>You need to be logged in to access this page.</div>;
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default Dashboard;
