import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoTab } from "@/components/create-trip/BasicInfoTab";
import { ScheduleTab } from "@/components/create-trip/ScheduleTab";
import { CostTab } from "@/components/create-trip/CostTab";
import { PreparationTab } from "@/components/create-trip/PreparationTab";

export interface TripFormData {
  // Basic info
  name: string;
  location: string;
  difficulty: string;
  departureDate: Date | undefined;
  registrationDeadline: Date | undefined;
  contactEmail: string;
  contactPhone: string;
  discussionLink: string;
  images: string[];
  
  // Schedule
  durationType: "multi-day" | "single-day";
  durationDays: number;
  schedule: { time: string; content: string }[];
  
  // Cost
  includedCosts: { content: string; cost: string }[];
  additionalCosts: { content: string; cost: string }[];
  costNotes: string;
  
  // Preparation
  preparations: string[];
}

const initialFormData: TripFormData = {
  name: "",
  location: "",
  difficulty: "",
  departureDate: undefined,
  registrationDeadline: undefined,
  contactEmail: "",
  contactPhone: "",
  discussionLink: "",
  images: [],
  durationType: "multi-day",
  durationDays: 2,
  schedule: [{ time: "", content: "" }],
  includedCosts: [{ content: "", cost: "" }],
  additionalCosts: [{ content: "", cost: "" }],
  costNotes: "",
  preparations: [""],
};

const CreateTripSelfOrganize = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [formData, setFormData] = useState<TripFormData>(initialFormData);

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    // TODO: Save to database
  };

  const handleSubmit = () => {
    console.log("Submitting for review:", formData);
    // TODO: Submit for review
  };

  const updateFormData = (updates: Partial<TripFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <h1 className="text-2xl font-bold text-center text-foreground mb-6">
          Tạo chuyến
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="basic-info">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
            <TabsTrigger value="cost">Chi phí</TabsTrigger>
            <TabsTrigger value="preparation">Lưu ý chuẩn bị</TabsTrigger>
          </TabsList>

          <div className="border border-border rounded-xl bg-card p-6 min-h-[500px]">
            <TabsContent value="basic-info" className="mt-0">
              <BasicInfoTab formData={formData} updateFormData={updateFormData} />
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <ScheduleTab formData={formData} updateFormData={updateFormData} />
            </TabsContent>

            <TabsContent value="cost" className="mt-0">
              <CostTab formData={formData} updateFormData={updateFormData} />
            </TabsContent>

            <TabsContent value="preparation" className="mt-0">
              <PreparationTab formData={formData} updateFormData={updateFormData} />
            </TabsContent>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={handleSaveDraft}>
              Nháp
            </Button>
            <Button onClick={handleSubmit}>
              Gửi duyệt
            </Button>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateTripSelfOrganize;
