import { Route, Routes } from "react-router-dom";
import AllUsers from "../src/_root/pages/AllUsers";
import CreatePost from "../src/_root/pages/CreatePost";
import EditPost from "../src/_root/pages/EditPost";
import Explore from "../src/_root/pages/Explore";
import Home from "../src/_root/pages/Home";
import Pocket from "../src/_root/pages/Pocket";
import PostDetails from "../src/_root/pages/PostDetails";
import UpdateProfile from "../src/_root/pages/UpdateProfile";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import Profile from "./_root/pages/Profile";
import { Toaster } from "./components/ui/toaster";
import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/pocket" element={<Pocket />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;