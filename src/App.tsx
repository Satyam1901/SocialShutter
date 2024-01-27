import { Route,Routes } from "react-router"
import SigninForm from "./_Auth/forms/SigninForm";
import SignupForm from "./_Auth/forms/SignupForm";
import AuthLayout from "./_Auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/Pages";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "./components/ui/toaster";

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
        </Route>
    </Routes>

    <Toaster />
   </main>
    </>
  )
}

export default App
