import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const { username, password, email, confirmPassword } = user;

  useEffect(() => {
    if (username && email && password && confirmPassword) {
      setDisabled(false);
    }
  }, [user]);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        navigate("/login");
        console.log(res);
        toast.success("User successfully registered");
      } catch (err: any) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[3rem]">
        <h1 className="text-2xl font-semibold mb-3">Register</h1>

        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[1.5rem]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter username"
              value={user.username}
              onChange={changeHandler}
            />
          </div>

          <div className="my-[1.5rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={user.email}
              onChange={changeHandler}
            />
          </div>

          <div className="my-[1.5rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={user.password}
              onChange={changeHandler}
            />
          </div>

          <div className="my-[1.5rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm password"
              value={user.confirmPassword}
              onChange={changeHandler}
            />
          </div>

          <button
            disabled={disabled}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* {isLoading && <Loader />} */}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link to={"/login"} className="text-pink-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      /> */}
    </section>
  );
};

export default Register;
