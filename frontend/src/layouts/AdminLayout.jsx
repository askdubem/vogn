// Admin layout — wraps all admin pages
// Will include: Sidebar + Header + children
const AdminLayout = ({ children }) => {
  return <div className="admin-layout">{children}</div>;
};
export default AdminLayout;
