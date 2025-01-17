import React, { useEffect, useState } from "react";
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
import Notify from "@/lib/notify";
import { useRecipentData } from "@/services/recipients/mutations";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUserCampaigns } from "@/services/campaign/queries";
import { Link } from "react-router-dom";

// Validation schemas
const formSchema = z.object({
  file: z
    .instanceof(File, { message: "Please upload a valid file." })
    .optional(),
});

interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: "draft" | "complete";
  updatedAt: string;
}


const recipientSchema = z.object({
  campaignId: z.string().nonempty("Campaign ID is required"),
  companyName: z.string().nonempty("Company Name is required"),
  description: z.string().nonempty("Description is required"),
  email: z.string().email("Invalid email address"),
});


const selRecipients = typeof window !== "undefined" ? localStorage.getItem("selectedRecipients") : null;




type FormValues = z.infer<typeof formSchema>;
type RecipientValues = z.infer<typeof recipientSchema>;


// Other imports remain the same

const SendEmail: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  });

  const addRecipientForm = useForm<RecipientValues>({
    resolver: zodResolver(recipientSchema),
    defaultValues: {
      campaignId: "",
      companyName: "",
      description: "",
      email: "",
    },
  });

  const mutation = useRecipentData();
  const [extractedData, setExtractedData] = useState<RecipientValues[]>(() => {
    const storedData = localStorage.getItem("extractedData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [selectedRecipients, setSelectedRecipients] = useState<RecipientValues[]>(() => {
    const storedSelected = localStorage.getItem("selectedRecipients");
    return storedSelected ? JSON.parse(storedSelected) : [];
  });

  const [isTableVisible, setIsTableVisible] = useState(false);

  const { data, isLoading, isError } = getUserCampaigns();
  const campaigns: Campaign[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  // Save to localStorage whenever extractedData or selectedRecipients updates
  useEffect(() => {
    localStorage.setItem("extractedData", JSON.stringify(extractedData));
  }, [extractedData]);

  useEffect(() => {
    localStorage.setItem("selectedRecipients", JSON.stringify(selectedRecipients));
  }, [selectedRecipients]);

  const onSubmit = (values: FormValues) => {
    if (!values.file) {
      Notify("error", "File is required before extracting.");
      return;
    }

    const campaignId = localStorage.getItem("selectedCampaignId") as string;
    const data = { file: values.file };

    mutation.mutate(
      { campaignId, data },
      {
        onSuccess: (response) => {
          const extracted = response?.data ?? [];
          setExtractedData(extracted);
          setSelectedRecipients(extracted);
          setIsTableVisible(true);
          Notify("success", "File extracted successfully.");
        },
        onError: (error) => {
          console.error("Error extracting file:", error);
          Notify("error", "Failed to extract the file.");
        },
      }
    );
  };

  const handleCheckboxChange = (item: RecipientValues, checked: boolean) => {
    if (checked) {
      setSelectedRecipients((prev) => [...prev, item]);
    } else {
      setSelectedRecipients((prev) =>
        prev.filter((recipient) => recipient.email !== item.email)
      );
    }
  };

  const handleAddRecipient = (values: RecipientValues) => {
    setExtractedData((prev) => [...prev, values]);
    setSelectedRecipients((prev) => [...prev, values]);
    Notify("success", "Recipient added successfully.");
    addRecipientForm.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-5xl font-bold text-blue-500 mb-8">Send Email</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          {/* File Input Field */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".json,.csv,.xlsx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Extract Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Extract
          </Button>
        </form>
      </Form>

      {/* Table to Display Extracted Data */}
      {extractedData.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Extracted Data</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>Campaign ID</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {extractedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                      defaultChecked
                    />
                  </TableCell>
                  <TableCell>{item.campaignId}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add More Recipient Button and Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 bg-green-600 text-white py-2 my-1 px-4 rounded-full hover:bg-green-700">
            Add More Recipient
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add Recipient</DialogTitle>
          </DialogHeader>
          <Form {...addRecipientForm}>
            <form
              onSubmit={addRecipientForm.handleSubmit(handleAddRecipient)}
              className="space-y-4"
            >
              {/* Campaign ID */}
              <FormField
                control={addRecipientForm.control}
                name="campaignId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign ID</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a campaign" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {campaigns.map((campaign) => (
                            <SelectItem key={campaign._id} value={campaign.name}>
                              {campaign.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Name */}
              <FormField
                control={addRecipientForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter company name"
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={addRecipientForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter description"
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={addRecipientForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter email"
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                  Add Recipient
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Button  className="bg-blue-500 text-white rounded-full hover:bg-blue-700">
        <Link to={'/user/dashboard/emailSlider'}>
  Generate Emails
  </Link>
</Button>

    </div>
  );
};

export default SendEmail;



