import CreatePost from "./components/Posts/CreatePost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import UpdatePost from "./components/Posts/UpdatePost";
import PostsList from "./components/Posts/PostsList";
import Home from "./components/Home/Home";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatusAPI } from "./APIServices/users/usersAPI";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "./redux/slices/authSlices";
import { useEffect } from "react";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import UserDashbaord from "./components/User/UserDashboard";
import AccountSummaryDashboard from "./components/User/AccountSummary";
import AddCategory from "./components/Category/AddCategory";
import CreatePlan from "./components/Plans/CreatePlan";
import Pricing from "./components/Plans/Pricing";
import CheckoutForm from "./components/Plans/CheckoutForm";
import PaymentSuccess from "./components/Plans/PaymentSuccess";
import PayingFreePlan from "./components/Plans/PayingFreePlan";


function App() {
  // ! use query
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });

  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  //Get the login user from store
  const { userAuth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {/* Navbar */}
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        {/* create post */}
        <Route element={<Home />} path="/" />
        {/* User dashboard */}
        <Route element={<UserDashbaord />} path="/dashboard">
          {/* Account summary  */}
          <Route
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
            path=""
          />
          {/* Create posts */}
          <Route
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
            path="create-post"
          />
          {/* Create plan */}
          <Route
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
            path="create-plan"
          />
          {/* Create category */}
          <Route
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
            path="add-category"
          />
        </Route>
        {/* public links */}
        <Route element={<PostsList />} path="/posts" />
        <Route element={<PostDetails />} path="/posts/:postId" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Pricing />} path="/pricing" />
        <Route element={<CheckoutForm />} path="/checkout/:planId" />
        <Route
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
          path="/profile"
        />
        <Route
          element={
            <AuthRoute>
              <PaymentSuccess />
            </AuthRoute>
          }
          path="/success"
        />
        <Route
          element={
            <AuthRoute>
              <PayingFreePlan />
            </AuthRoute>
          }
          path="/free-subscription"
        />
        {/* <Route element={<UpdatePost />} path="/posts/:postId" /> */}
        {/* <CreatePost />
        <PostsList /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;