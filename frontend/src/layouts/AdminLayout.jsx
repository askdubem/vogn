import { Outlet } from 'react-router-dom';

// Admin layout built in Phase 25
// Will wrap: Sidebar + Header + <Outlet />
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
