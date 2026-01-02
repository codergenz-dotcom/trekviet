import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, MapPin } from "lucide-react";

const CreateTrip = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-foreground mb-8">
          Tạo chuyến
        </h1>

        <div className="border border-border rounded-2xl p-2 bg-card">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              className="h-20 flex flex-col gap-2 hover:bg-muted rounded-xl text-base font-medium"
              onClick={() => navigate("/create-trip/self-organize")}
            >
              <Users className="h-6 w-6 text-primary" />
              Tự tổ chức
            </Button>
            
            <Button
              variant="ghost"
              className="h-20 flex flex-col gap-2 hover:bg-muted rounded-xl text-base font-medium border-l border-border"
              onClick={() => navigate("/create-trip/tour")}
            >
              <MapPin className="h-6 w-6 text-primary" />
              Đi theo tour
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
