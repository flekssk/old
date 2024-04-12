import { Link, useParams } from "react-router-dom";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import UserDescription from "@/pages/userInfo/UserDescription";
import { ROUTES } from "@/constants/routes";
import { HiArrowLeft } from "react-icons/hi";

type Params = {
  id: string;
};

const UserInfo = () => {
  const { id } = useParams<Params>();
  if (!id) {
    return <div>Loading ....</div>;
  }
  return (
    <NavbarSidebarLayout>
      <Link to={ROUTES.usersList} className="my-3 flex items-center text-xl">
        <HiArrowLeft className="m-2" /> Назад
      </Link>
      <UserDescription id={id} />
    </NavbarSidebarLayout>
  );
};

export default UserInfo;
