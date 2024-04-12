import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import UserListTable from "@/pages/userList/UserListTable";

const UsersList = () => {
  return (
    <NavbarSidebarLayout>
      <UserListTable />
    </NavbarSidebarLayout>
  );
};

export default UsersList;
