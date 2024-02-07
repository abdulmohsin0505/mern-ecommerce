import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import UserList from "../../components/users/UserList";
// import { toast } from "react-toastify";
import AdminMenu from "../../components/common/AdminMenu";

const Users = () => {
  const { data: users, isLoading, error } = useGetUsersQuery("");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {/* {error?.data?.message || error.error} */} Something went wrong
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>{users && <UserList users={users} />}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
