import { useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/api/usersApiSlice";
import { UserType } from "../../types/users";

function User({ user }: { user: UserType }) {
  const [toggleEdit, setToggleEdit] = useState<Boolean>(false);
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  //rtk query
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const updateHandler = async (id: string) => {
    try {
      await updateUser({
        userId: id,
        username: username,
        email: email,
      });
      setToggleEdit(!toggleEdit);
    } catch (err) {
      // toast.error(err?.data?.message || err.error);
      console.log(err);
    }
  };

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
      } catch (err) {
        //   toast.error(err?.data?.message || err.error);
        console.log(err);
      }
    }
  };
  return (
    <tr key={user._id}>
      <td className="px-4 py-2">{user._id}</td>
      <td className="px-4 py-2">
        {toggleEdit ? (
          <div className="flex items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={() => updateHandler(user._id)}
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              <FaCheck />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {user.username}{" "}
            <button onClick={() => setToggleEdit(!toggleEdit)}>
              <FaEdit className="ml-[1rem]" />
            </button>
          </div>
        )}
      </td>
      <td className="px-4 py-2">
        {toggleEdit ? (
          <div className="flex items-center">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={() => updateHandler(user._id)}
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              <FaCheck />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
            <button onClick={() => setToggleEdit(!toggleEdit)}>
              <FaEdit className="ml-[1rem]" />
            </button>
          </div>
        )}
      </td>
      <td className="px-4 py-2">
        {user.isAdmin ? (
          <FaCheck style={{ color: "green" }} />
        ) : (
          <FaTimes style={{ color: "red" }} />
        )}
      </td>
      <td className="px-4 py-2">
        {!user.isAdmin && (
          <div className="flex">
            <button
              onClick={() => deleteHandler(user._id)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default User;
