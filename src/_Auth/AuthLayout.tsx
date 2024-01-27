
import { Outlet, Navigate } from 'react-router'

const AuthLayout = () => {
    const isAuthenticated = false;
    return (
     
    <>
    {isAuthenticated ? (
        <Navigate to="/" />
    ): (
        <>
<section className='flex flex-1 justify-center items-center flex-col py-10'>
    <Outlet />
</section>
<img src="/assets/side-img.jpg" alt='' className='hidden xl:block w-1/2 object-cover bg-no-repeat h-full' />

        </>
    )}
    </>
    )
  }

export default AuthLayout