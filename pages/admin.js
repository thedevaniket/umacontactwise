import { isAdmin } from '../middleware/auth';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin-only content */}
    </div>
  );
}

export async function getServerSideProps(context) {
  await isAdmin(context.req, context.res);
  // Fetch data for the admin page
  return {
    props: {}, // Data to pass to the component
  };
}