import AdminNav from "../components/Admin/AdminNav";

export const metadata = {
    title: "Admin Zivana",
    description: "",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (  
        <div>
            <AdminNav />
            {children}
        </div>
    );
}
 
export default AdminLayout;