import { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import login from "../../assets/login.gif";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const { user, setUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState({});
 
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

 

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        axiosPublic.post("/users", { userName: user.displayName, userEmail: user.email})
          .then(() => {
            Swal.fire({ title: `Welcome, ${user.displayName}!`, icon: "success" });
            navigate("/");
          });
      })
      .catch((error) => {
        setError({ ...error, register: error.code });
      });
  };

  return (
    <div className=" w-[90%] mx-auto">
      <div className="justify-center items-center my-10 dark:text-black">
        <h2 className="text-2xl font-semibold text-center text-red-500 mb-6">Welcome To TaskFlow!</h2>
        <div className="grid grid-cols-1  justify-center items-center">
        <div className="card card-compact  shadow-xl bg-zinc-100  w-[70%] max-sm:mx-auto shrink-0 p-6 mx-auto">
            
            <h2 className="text-2xl max-md:text-base font-semibold text-center mb-6">To Continue Please Login To Your Account: </h2>
  
              <button onClick={handleGoogleSignIn} className="btn dark:text-black bg-gradient-to-r from-[#CBF1F5] to-[#A6E3E9] hover:from-[#b9dcdf] hover:to-[#87b9bd] max-md:text-xs text-white w-[95%] mx-auto my-4">Sign In With Google</button>
              
            </div>
          <img src={login} className="w-[60%] relative my-6 max-sm:w-[50%] mx-auto" alt="login" />
          
        </div>
      </div>
    </div>
  );
};

export default Login;
