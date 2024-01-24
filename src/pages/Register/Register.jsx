import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // on submit register the user to mongodb database
  const onSubmit = async (data) => {
    const { name, email, phone, role, password } = data;
    const user = {
      name,
      email,
      phone,
      role,
      password,
    };

    try {
      // Make a POST request to the registration endpoint
      const response = await axiosPublic.post("/register", user);
      const email = response.data.email;
      console.log(email);
      setRegistrationStatus(response.data.message);

      if (response.status === 201) {
        setUser(email);
        localStorage.setItem("user", JSON.stringify(email));
        axiosPublic.post("/jwt", email).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
        navigate("/login");
        Swal.fire({
          title: "Success!",
          text: "Registration successful",
          icon: "success",
          confirmButtonText: "OKAY",
        });
      }
    } catch (error) {
      console.error(error.response.data.message);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OKAY",
      });
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Welcome to House Hunter, Find and Register your house. House
              Hunter is your ultimate solution to find your dream house.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control w-full input input-bordered"
                  id="name"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && <span className="error">Name is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control w-full input input-bordered"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="error">Email is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  id="phone"
                  className="form-control w-full input input-bordered"
                  placeholder="Enter your phone number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="error">Phone is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="Role">Role</label>
                <select
                  className="form-control w-full border p-3 rounded-lg"
                  id="role"
                  {...register("role", { required: true })}
                >
                  <option value="">Select your role</option>
                  <option value="house-owner">House Owner</option>
                  <option value="renter">Renter</option>
                </select>
                {errors.role && <span className="error">Role is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control w-full input input-bordered"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && (
                  <span className="error">
                    Password is required and must be at least 6 characters long
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  className={`bg-primary inline-flex justify-center items-center gap-2 text-white py-2 w-full rounded-lg cursor-pointer`}
                  type="submit"
                >
                  Register
                </button>
              </div>

              <label className="label">
                <Link to={"/login"} className="label-text-alt link link-hover">
                  Already have an account? <strong>Login here</strong>
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
