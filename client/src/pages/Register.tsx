import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { NavLink } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
// import GoogleLogin from "@/components/custom/googleLogin";

import { useRegister } from "@/services/user/mutations";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
  .string()
  .min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "Required" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(1, { message: "Required" })
    .min(8, { message: "Password must be of min 8 characters." }),
});

const Register = () => {
 
 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    },
  });

 
  

  const register = useRegister();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    register.mutate({...values});
  }
  return (
    <div className="flex justify-center items-center my-3 min-h-screen bg-white">
      <Card className="w-[450px] h-full p-8 rounded-3xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-blue-700">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around mb-4">
            {/* <Button className="flex items-center justify-center w-1/2 mr-2 py-2 px-4 bg-white text-blue-700 border border-gray-300 rounded-md shadow hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn"
                className="w-5 h-5 mr-2"
              />
              Continue with LinkedIn
            </Button> */}
            {/* <GoogleLogin /> */}
          </div>

         
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={register.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={register.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        disabled={register.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Terms and Conditions Checkbox */}
              
              <Button
                type="submit"
                className={`w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
                disabled={register.isPending}
              >
                {register.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin mr-3" />
                )}
                Sign Up Now
              </Button>
            </form>
          </Form>
          {/* <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Email Id"
              className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div> */}

          {/* Terms and Conditions Checkbox */}
          {/* <div className="flex items-center mb-4">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <NavLink to="/terms" className="text-blue-600">
                Terms and Conditions
              </NavLink>{" "}
              and{" "}
              <NavLink to="/policy" className="text-blue-600">
                Privacy Policy
              </NavLink>
            </label>
          </div> */}
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-600">
              Sign in
            </NavLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
