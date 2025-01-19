import React, { useState, useContext } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getUserCampaigns } from "../services/campaign/queries";
import { useUpdateCampaign, useDeleteCampaign } from "../services/campaign/mutations";
import { FaTrash, FaEdit } from "react-icons/fa"; // Icons for update and delete
import { DialogTitle } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { SideBarContext } from "../contexts/sideBarContext";

interface campaignData {
  name: string;
  description: string;
  status: "draft" | "complete";
}

interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: "draft" | "complete";
  updatedAt: string;
}

interface UpdateCampaignInput {
  id: string;
  data: campaignData;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  status: z.enum(["draft", "complete"], { required_error: "Select a status" }),
});

const CreatedCampaign: React.FC = () => {
  const sidebarContext = useContext(SideBarContext);

  // Check if sidebarContext is undefined and handle the error or fallback
  if (!sidebarContext) {
    throw new Error("SideBarContext must be used within a SideBarProvider");
  }

  const { selectedItem, setSelectedItem } = sidebarContext;
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    localStorage.getItem("selectedCampaignId") || null
  );
  const { data, isLoading, isError } = getUserCampaigns();
  const { mutate: updateCampaign } = useUpdateCampaign();
  const { mutate: deleteCampaign } = useDeleteCampaign();
  const navigate = useNavigate(); // useNavigate hook for routing

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "draft",
    },
  });

  const campaigns: Campaign[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  const handleUpdate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    form.reset({
      name: campaign.name,
      description: campaign.description,
      status: campaign.status,
    });
  };

  const handleDelete = (campaignId: string) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      deleteCampaign(campaignId);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (selectedCampaign) {
      const updatePayload = {
        campaignId: selectedCampaign._id, // Adjusted to match expected type
        data: values,
      };
      updateCampaign(updatePayload);
      setSelectedCampaign(null); // Close dialog
    }
  };

  const handleCheckboxChange = (campaignId: string) => {
    if (selectedCampaignId === campaignId) {
      setSelectedCampaignId(null);
      localStorage.removeItem("selectedCampaignId");
    } else {
      setSelectedCampaignId(campaignId);
      localStorage.setItem("selectedCampaignId", campaignId);
    }
  };

  const handleSendEmails = () => {
    setSelectedItem("SendEmail"); // Update sidebar item in context
    navigate("/user/dashboard/sendEmail"); // Navigate to send email page
  };

  if (isLoading) {
    return <p className="text-blue-500">Loading campaigns...</p>;
  }

  if (isError || !data?.data?.success) {
    return (
      <p className="text-red-500">Failed to load campaigns. Please try again.</p>
    );
  }

  return (
    <div className="relative p-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 mt-8 md:mt-2">
        Created Campaigns
      </h2>
      <Table className="border border-blue-500">
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="sr-only">Select</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign._id} className="hover:bg-blue-100">
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedCampaignId === campaign._id}
                  onChange={() => handleCheckboxChange(campaign._id)}
                />
              </TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.description}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>
                {new Date(campaign.updatedAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => handleUpdate(campaign)}
                        className="text-blue-500"
                      >
                        <FaEdit />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogTitle>
                        <h2 className="text-xl font-bold">Update Campaign</h2>
                      </DialogTitle>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium">
                            Name
                          </label>
                          <Input
                            {...form.register("name")}
                            placeholder="Enter campaign name"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            Description
                          </label>
                          <Input
                            {...form.register("description")}
                            placeholder="Enter campaign description"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            Status
                          </label>
                          <Select
                            onValueChange={(value) =>
                              form.setValue("status", value as "draft" | "complete")
                            }
                            value={form.watch("status")}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="complete">Complete</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white"
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(campaign._id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Fixed Button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full bg-blue-600 text-white hover:bg-black"
        onClick={handleSendEmails}
      >
        Send Emails
      </Button>
    </div>
  );
};


export default CreatedCampaign;
