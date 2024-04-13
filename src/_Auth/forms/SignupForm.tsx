import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl,FormField, FormItem,FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { useCreateUserAccountMutation, useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {

  const { toast } = useToast();
  const navigate = useNavigate();
  const {checkAuthUser, isLoading: isUseLoading} = useUserContext();
 
  // 1. Define your form.

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccountMutation();
  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  // 2. Define a submit handler.
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {

try {
  const newUser =await createUserAccount(user);

  if(!newUser){
   toast({
      title: "Sign up failed.Please try again",
    });
  return ;  
  }

  const session = await signInAccount({
    email: user.email,
    password: user.password
  });
  
  if(!session){
  toast({title: "Sign up failed.Please try again", });

  navigate("/sign-in");
        
  return;
  }
  const isLoggedIn= await checkAuthUser();

  if(isLoggedIn){
    form.reset();
    navigate("/")
  }else{
    toast({title: 'Sign up failed. Please try again.'})

    return ;
  }

} catch (error) {
  console.log({error})
}
};
  return (

    <Form {...form}>
    
      <div className=" sm:w-420 flex-center flex-col">
      <img src="/assets/Logo1.png" alt= "Logo" className="w-28"/>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12"> Create a New Account </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use SocialShutter Please enter your account Details</p>
     
    <form role="form" aria-label="Create a account form" onSubmit={form.handleSubmit(handleSignup)} className="flex flex-col gap-2 w-full max-w-md">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label" >Name</FormLabel>
            <FormControl>
            <Input type= "text" className="shad-input" aria-autocomplete="list" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem> 
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label" >Username</FormLabel>
            <FormControl>
            <Input type= "text" className="shad-input"  aria-autocomplete="list" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label" >Email</FormLabel>
            <FormControl>
            <Input type= "email" className="shad-input" aria-autocomplete="list" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label" >Password</FormLabel>
            <FormControl>
            <Input type= "password" className="shad-input" aria-autocomplete="list" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
          
        )}
      />
      <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
   {isCreatingAccount ? (
  <div className="flex-center gap-2"> 
  <Loader /> Loading....
  </div>
   ): ( "Sign up") }
      </Button>

      <p className="text-small-regular text-light-2 text-center mt-2">
      Already have an account?? 
      <Link to="/sign-in" className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-800 ml-3">Log In</Link>
    </p>
    </form>
    </div>
  </Form>
  
   
  )
}
export default SignupForm