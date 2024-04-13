import { Route,Routes } from "react-router"
import SigninForm from "./_Auth/forms/SigninForm";
import SignupForm from "./_Auth/forms/SignupForm";
import AuthLayout from "./_Auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Saved, UpdateProfile } from "./_root/Pages";
import { Toaster } from "./components/ui/toaster";
import UserProfile from "./_root/Pages/UserProfile";

function App() {


  return (
    <>
     <main className='flex h-screen'>
    <Routes>

        {/*Public Routes*/}
        <Route element = {<AuthLayout />}>
        <Route path='/sign-in' element= {<SigninForm />} />
        <Route path='/sign-up' element= {<SignupForm />} />
        </Route>

        {/*Private Routes*/}
        <Route element = {<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />}></Route>
        <Route path="/saved" element={<Saved />}></Route>
        <Route path="/all-users" element={<AllUsers />}></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/update-post/:id" element={<EditPost />}></Route>
        <Route path="/posts/:id" element={<PostDetails />}></Route>
        <Route path="/userprofile/:id/*" element={<UserProfile />}></Route>
        <Route path="/update-profile/:id" element={<UpdateProfile/>}></Route>
        </Route>
    </Routes>

    <Toaster />
   </main>
    </>
  )
}

export default App
