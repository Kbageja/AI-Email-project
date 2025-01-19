import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCampaign } from "@/services/campaign/mutations";

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }), // Updated from 'title' to 'name'
  description: z.string().min(1, { message: "Required" }),
  status: z.enum(["draft", "complete"], { required_error: "Select a status" }),
});

const CreateCampaign = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", // Updated from 'title' to 'name'
      description: "",
      status: "draft",
    },
  });

  const { mutate } = useCreateCampaign();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Log the form values
  
    // Call the mutation with the updated form data
    mutate(values, {
      onSuccess: () => {
        // Set 'selectedSidebarItem' to 'SendEmail' in localStorage on success
        localStorage.setItem("selectedSidebarItem", "SendEmail");
  
        // Set 'Name' in localStorage with the value from the form's name field
        localStorage.setItem("Name", values.name);
  
        console.log("Form submitted successfully and localStorage updated!");
      },
      onError: (error) => {
        console.error("An error occurred while submitting the form:", error);
      },
    });
  }
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-5xl font-bold text-blue-500 mb-8">Create Campaign</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name" // Updated from 'title' to 'name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel> {/* Updated label */}
                <FormControl>
                  <Input
                    placeholder="Enter campaign name" // Updated placeholder
                    {...field}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter campaign description"
                    {...field}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Field */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem className="text-black font-bold" value="draft">
                        Draft
                      </SelectItem>
                      <SelectItem
                        className="text-black font-bold"
                        value="complete"
                      >
                        Complete
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCampaign;
