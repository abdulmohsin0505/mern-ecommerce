import { UserType } from "../../types/users";
import User from "./User";

function UserList({ users }: { users: UserType[] }) {
  return (
    <>{users && users.map((user) => <User key={user._id} user={user} />)}</>
  );
}

export default UserList;
