// import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { React, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Completed from "../../component/Featured Courses/Completed";
// import logo from "../../utils/logo.png";
// import "../User Profile/Profile.css";
// import { useFormValidation } from "../../validators";
// import { ErrorMessage } from "../../component/error-message";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { mutations } from "../../api";
// import { useOverlayLoader } from "../../hooks";
// import { OverlayLoader } from "../../loaders";
// import { clearStorage, getStorage } from "../../utils";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { queries } from "@testing-library/react";

// // const profileTab = [
// //   { id: 0, label: "Profile" },
// //   { id: 1, label: "Completed Courses" },
// // ];

// const changePasswordFieldToValidate = ["oldPassword", "newPassword", "confirmPassword"];

// const ChangePass = () => {
//   const navigate = useNavigate();
//   const [userFirstName, setUserfirstName] = useState("");
//   const [userLastName, setUserLastName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [open, setOpen] = useState(false);
//   const { show, showing, hide } = useOverlayLoader();
//   const { changePassword } = mutations;
//   const { getUser } = queries;


//   const validateSchema = useFormValidation(changePasswordFieldToValidate);
//   const userId = getStorage("userId");
//   const {
//     data: userData,
//     isLoading: userLoading,
//     isError: userError,
//   } = useQuery(["profile-user"], () => getUser(userId), {
//     enabled: !!userId,
//     onSuccess: (userData) => {
//       const user = userData?.data?.resource;
//     },
//   });
//   const user = userData?.data?.resource;
//   console.log(user)


//   const handleClick = () => {
//     setOpen(!open);
//   };

//   const mutation = useMutation(changePassword, {
//     onMutate: () => show(),
//     onSuccess: () => hide(),
//     onError: () => hide(),
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validateSchema),
//     defaultValues: {
//       oldPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log({ data });
//     mutation.mutate(data);
//   };

//   const handleLogout = () => {
//     clearStorage();
//     navigate("/");
//   };

//   return (
//     <>
//       <div className="nav">
//         <div className="nav-container">
//           <div className="nav-logo">
//             <Link to="/">
//               <img src={logo} alt="logo" />
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="dashboard-menu">
//         <div
//           className={`menu-icon ${open ? "open" : ""}`}
//           onClick={handleClick}
//         >
//           <FontAwesomeIcon icon={faBars} />
//         </div>
//       </div>
//       <div className="profile-container">
//         {open && (
//           <div className="profile-id">
//             <div className="cancel-icon" onClick={() => setOpen(false)}>
//               <FontAwesomeIcon icon={faClose} />
//             </div>
//             <div className="user">
//               <span className="userprofile">
//               {userFirstName?.charAt(0)} {userLastName?.charAt(0)}
//               </span>
//             <p>{user?.fullName}</p>
//             </div>

//             <div className="objective" onClick={() => setOpen(false)}>
//               <div className="objective-container">
//                 <div className="Sidenav-tab">
//                   <div className="Menutabs">
//                     {/* {profileTab.map((menu) => ( */}
//                       <ul
//                         //className={activeTab === menu.id ? "active" : ""}
//                         // onClick={() => setActiveTab(menu.id)}
//                       >
//                         {/* <li key={menu.id}>{menu.label}</li> */}
//                         <Link to="/profile">
//                           <li>Profile</li>
//                         </Link>
//                         <li onClick={() => setActiveTab(1)}>Completed Courses</li>
//                       </ul>
//                     {/* ))} */}
//                   </div>
//                 </div>
//                 <div className="logoutbtn absolute bottom-0 left-24">
//                     <button onClick={handleLogout}>Log Out</button>
//                   </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="profile-edit">
//           {activeTab === 0 && (
//             <div className="changepass">
//               <h2>Change Password</h2>
//               <form onSubmit={handleSubmit(onSubmit)}>
               
//                 <div className="password">
//                 <input
//                   type={showPassword ? "text" : "password"} 
//                   className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
//                   {...register("oldPassword")}
//                   placeholder="Old Password"
//                 />  
//                 <div className="showPassword mr-8 mt-2">
//                 {showPassword ? (
//                   <FaEyeSlash onClick={() => setShowPassword(false)} />
//                 ) : (
//                   <FaEye onClick={() => setShowPassword(true)} />
//                 )}
//                 </div>
//                 </div>
//                 {errors.oldPassword && (
//                   <ErrorMessage message={errors.oldPassword.message} />
//                 )}

//                 <div className="password">
//                 <input
//                   type={showNewPassword ? "text" : "password"} 
//                   className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
//                   {...register("newPassword")}
//                   placeholder="New Password"
//                 />  
//                 <div className="showPassword mr-8 mt-2">
//                 {showNewPassword ? (
//                   <FaEyeSlash onClick={() => setShowNewPassword(false)} />
//                 ) : (
//                   <FaEye onClick={() => setShowNewPassword(true)} />
//                 )}
//                 </div>
//                 </div>
//                 {errors.newPassword && (
//                   <ErrorMessage message={errors.newPassword.message} />
//                 )}

//               <div className="password">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"} 
//                   className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
//                   {...register("confirmPassword")}
//                   placeholder="Confirm Password"
//                 />  
//                 <div className="showPassword mr-8 mt-2">
//                 {showConfirmPassword ? (
//                   <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
//                 ) : (
//                   <FaEye onClick={() => setShowConfirmPassword(true)} />
//                 )}
//                 </div>
//                 </div>
//                 {errors.confirmPassword && (
//                   <ErrorMessage message={errors.confirmPassword.message} />
//                 )}
//                 <div className="formButton">
//                   <input type="submit" value="Change Password" />
//                 </div>
//               </form>   
//             </div>
//           )}
//           {activeTab === 1 && (
//             <div className="completed-courses">
//               <Completed />
//             </div>
//           )}
//         </div>
//         <OverlayLoader showing={showing} />
//       </div>
//     </>
//   );
// };

// export default ChangePass;



import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Completed from "../../component/Featured Courses/Completed";
import logo from "../../utils/logo.png";
import "../User Profile/Profile.css";
import { useFormValidation } from "../../validators";
import { ErrorMessage } from "../../component/error-message";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { mutations } from "../../api";
import { useOverlayLoader } from "../../hooks";
import { OverlayLoader } from "../../loaders";
import { clearStorage, getStorage } from "../../utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { queries } from "@testing-library/react";
import { queryClient } from "../../index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mutations } from "../../api";

const profileTab = [
  { id: 0, label: "Profile" },
  { id: 1, label: "Completed Courses" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserfirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [userUniversity, setUseruniversity] = useState("");
  const [userPassword, setUserpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const { getUser, getUniversity } = queries;
  const changePasswordFieldToValidate = ["oldPassword", "newPassword", "confirmPassword"];
  const validateSchema = useFormValidation(changePasswordFieldToValidate);
  const userId = getStorage("userId");
  const { changePassword } = mutations;
  const { show, showing, hide } = useOverlayLoader();

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery(["profile-user"], () => getUser(userId), {
    enabled: !!userId,
    onSuccess: (userData) => {
      const user = userData?.data?.resource;
      if (user) {
        // Trigger the second query using the user's university ID
        queryClient.prefetchQuery(["profile-university", user.university], () =>
          getUniversity(user.university)
        );
      }
    },
  });

  const mutation = useMutation(changePassword, {
        onMutate: () => show(),
        onSuccess: () => hide(),
        onError: () => hide(),
      });

  const user = userData?.data?.resource;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    data: universityData,
    isLoading: universityLoading,
    isError: universityError,
  } = useQuery(
    ["profile-university", user?.university],
    () => getUniversity(user?.university),
    {
      enabled: !!user?.university,
    }
  );

  const university = universityData?.data?.resource;

  useEffect(() => {
    if (user) {
      setUserLastName(user?.fullName?.split(" ")[1]);
      setUserfirstName(user?.fullName?.split(" ")[0]);
      setUseremail(user?.email);
      setUseruniversity(user?.university);
    }
  }, [user]);

  if (userLoading || universityLoading) {
    return <OverlayLoader showing={true} />;
  }

  if (userError || universityError) {
    <OverlayLoader showing={false} />;
  }

  if (user || university) {
    <OverlayLoader showing={false} />;
  }

  const inputchangehandler = (event) => {
    setUserfirstName(event.target.value);
  };

  const handleClick = () => {
    setOpen(!open);
  };

    const onSubmit = (data) => {
    console.log({ data });
    mutation.mutate(data);
  };

  const handleLogout = () => {
    clearStorage();
    navigate("/");
  };

  return (
    <>
      <div className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard-menu">
        <div
          className={`menu-icon ${open ? "open" : ""}`}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="profile-container">
        {open && (
          <div className="profile-id">
            <div className="cancel-icon" onClick={() => setOpen(false)}>
              <FontAwesomeIcon icon={faClose} />
            </div>
            <div className="user">
              <span className="userprofile">
                {userFirstName?.charAt(0)} {userLastName?.charAt(0)}
              </span>
              <p> {user?.fullName}</p>
            </div>

            <div className="objective" onClick={() => setOpen(false)}>
              <div className="objective-container">
                <div className="Sidenav-tab">
                  <div className="profile-menutabs">
                    {profileTab.map((menu, index) => (
                      <ul
                        className={activeTab === menu.id ? "active-list" : ""}
                        onClick={() => setActiveTab(menu.id)}
                      >
                        <li key={menu.id + index}>{menu.label}</li>
                      </ul>
                    ))}
                  </div>
                  <div className="logoutbtn absolute bottom-0 left-24">
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="profile-edit">
          {activeTab === 0 && (
           <div className="changepass">
           <h2>Change Password</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
             <div className="password">
             <input
               type={showPassword ? "text" : "password"} 
               className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
               {...register("oldPassword")}
               placeholder="Old Password"
             />  
             <div className="showPassword mr-8 mt-2">
             {showPassword ? (
               <FaEyeSlash onClick={() => setShowPassword(false)} />
             ) : (
               <FaEye onClick={() => setShowPassword(true)} />
             )}
             </div>
             </div>
             {errors.oldPassword && (
               <ErrorMessage message={errors.oldPassword.message} />
             )}
           
             <div className="password">
             <input
               type={showNewPassword ? "text" : "password"} 
               className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
               {...register("newPassword")}
               placeholder="New Password"
             />  
             <div className="showPassword mr-8 mt-2">
             {showNewPassword ? (
               <FaEyeSlash onClick={() => setShowNewPassword(false)} />
             ) : (
               <FaEye onClick={() => setShowNewPassword(true)} />
             )}
             </div>
             </div>
             {errors.newPassword && (
               <ErrorMessage message={errors.newPassword.message} />
             )}
           
           <div className="password">
             <input
               type={showConfirmPassword ? "text" : "password"} 
               className="border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:border-blue-500 placeholder:text-sm"
               {...register("confirmPassword")}
               placeholder="Confirm Password"
             />  
             <div className="showPassword mr-8 mt-2">
             {showConfirmPassword ? (
               <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
             ) : (
               <FaEye onClick={() => setShowConfirmPassword(true)} />
             )}
             </div>
             </div>
             {errors.confirmPassword && (
               <ErrorMessage message={errors.confirmPassword.message} />
             )}
             <div className="formButton">
               <input type="submit" value="Change Password" />
             </div>
           </form>   
           </div> 
          )}
          {activeTab === 1 && (
            <div className="completed-courses">
              <Completed />
              {/* <OutlineCourse4/> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;









