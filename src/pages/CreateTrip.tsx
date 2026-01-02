import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, MapPin, ShieldAlert } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CreateTrip = () => {
  const navigate = useNavigate();
  const { isPorter, isLoggedIn } = useAuth();

  // Redirect non-porters
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isPorter) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md text-center">
          <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto mb-4">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Không có quyền truy cập
          </h1>
          <p className="text-muted-foreground mb-6">
            Chỉ Porter mới có thể tạo chuyến đi. Vui lòng đăng ký trở thành Porter tại trang Hồ sơ.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/trips")}>
              Về trang chủ
            </Button>
            <Button onClick={() => navigate("/profile")}>
              Đăng ký Porter
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
