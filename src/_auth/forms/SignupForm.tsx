// imports
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
// form
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/shared/Loader"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
// validation Schemas
import { SignupValidation } from "@/lib/validation";
import { Link } from "react-router-dom"
// appwrite
import { createUserAccount } from "@/lib/appwrite/api"


const SignupForm = () => {
  const isLoading = false;
  
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
  
   // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create the user => async action that takes time
    const newUser = await createUserAccount(values);
    console.log(newUser)
  }
 
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create A New Account</h2>
        <p className="text-light-3 small-medium md:base-regular">
          To use meetcute, please create an account.
        </p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" placeholder="Full Name" {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" placeholder="Username" {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" placeholder="Email" {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" placeholder="Password" {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Sign Up Button */}
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ): "Sign Up"}
          </Button>
          {/* Already Have An account */}
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already Have An Account?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log In</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm