import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, User, Backpack, Phone, Mail, ExternalLink, CheckCircle, Check, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockTrips, difficultyLabels, tripTypeLabels, type Trip } from "@/data/mockTrips";

type RegistrationStatus = "pending" | "approved" | "rejected";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: RegistrationStatus;
  registeredAt: string;
}

// Mock registration data
const mockRegistrations: Registration[] = [
  { id: "1", name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0901234567", status: "pending", registeredAt: "2026-01-05" },
  { id: "2", name: "Trần Thị B", email: "tranthib@gmail.com", phone: "0912345678", status: "pending", registeredAt: "2026-01-06" },
  { id: "3", name: "Lê Văn C", email: "levanc@gmail.com", phone: "0923456789", status: "approved", registeredAt: "2026-01-04" },
  { id: "4", name: "Phạm Thị D", email: "phamthid@gmail.com", phone: "0934567890", status: "approved", registeredAt: "2026-01-03" },
  { id: "5", name: "Hoàng Văn E", email: "hoangvane@gmail.com", phone: "0945678901", status: "rejected", registeredAt: "2026-01-02" },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getDifficultyClass = (difficulty: Trip["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "bg-difficulty-easy/15 text-difficulty-easy border-difficulty-easy/30";
    case "medium":
      return "bg-difficulty-medium/15 text-difficulty-medium border-difficulty-medium/30";
    case "hard":
      return "bg-difficulty-hard/15 text-difficulty-hard border-difficulty-hard/30";
    case "extreme":
      return "bg-difficulty-extreme/15 text-difficulty-extreme border-difficulty-extreme/30";
  }
};

const TripDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);

  const trip = mockTrips.find((t) => t.id === id);

  // Check if current user is the trip organizer (mock - would be based on auth)
  const isOrganizer = true;

  if (!trip) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy chuyến đi</h2>
          <Button onClick={() => navigate("/")}>Về trang chủ</Button>
        </div>
      </div>
    );
  }

  const handleJoin = () => {
    setShowSuccessModal(true);
  };

  const handleApprove = (registrationId: string) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, status: "approved" as RegistrationStatus } : r))
    );
  };

  const handleReject = (registrationId: string) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === registrationId ? { ...r, status: "rejected" as RegistrationStatus } : r))
    );
  };

  const pendingRegistrations = registrations.filter((r) => r.status === "pending");
  const approvedRegistrations = registrations.filter((r) => r.status === "approved");
  const rejectedRegistrations = registrations.filter((r) => r.status === "rejected");

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>

        <h1 className="text-2xl font-bold text-foreground mb-6">
          Chi tiết chuyến đi
        </h1>

        <div className="border border-border rounded-xl bg-card overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border px-6 pt-4 overflow-x-auto">
              <TabsList className={`w-full grid ${isOrganizer ? "grid-cols-5" : "grid-cols-4"} bg-transparent h-auto p-0 gap-0 min-w-max`}>
                <TabsTrigger
                  value="basic-info"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 whitespace-nowrap"
                >
                  Thông tin cơ bản
                </TabsTrigger>
                <TabsTrigger
                  value="schedule"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 whitespace-nowrap"
                >
                  Lịch trình
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 whitespace-nowrap"
                >
                  Dịch vụ
                </TabsTrigger>
                <TabsTrigger
                  value="preparation"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 whitespace-nowrap"
                >
                  Lưu ý chuẩn bị
                </TabsTrigger>
                {isOrganizer && (
                  <TabsTrigger
                    value="members"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 whitespace-nowrap"
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Thành viên
                    {pendingRegistrations.length > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {pendingRegistrations.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="basic-info" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left - Trip Info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">
                        {trip.name}
                      </h2>
                      <p className="text-muted-foreground">{trip.description}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-foreground">
                          <span className="text-muted-foreground">Địa điểm:</span>{" "}
                          {trip.location}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">Độ khó:</span>
                        <Badge className={`${getDifficultyClass(trip.difficulty)} border`}>
                          {difficultyLabels[trip.difficulty]}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-foreground">
                          <span className="text-muted-foreground">Khởi hành:</span>{" "}
                          {formatDate(trip.departureDate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-foreground">
                          <span className="text-muted-foreground">Thời hạn đăng ký:</span>{" "}
                          Trước 3 ngày khởi hành
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <span className="text-foreground">
                          <span className="text-muted-foreground">Leader:</span>{" "}
                          {trip.leaders} người
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Backpack className="h-5 w-5 text-primary" />
                        <span className="text-foreground">
                          <span className="text-muted-foreground">Porter:</span>{" "}
                          {trip.portersAvailable}/{trip.portersNeeded} người
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border space-y-3">
                      <h3 className="font-medium text-foreground">Liên hệ:</h3>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>contact@trekviet.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>0123 456 789 (Zalo)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <a href="#" className="text-primary hover:underline">
                          Link nhóm thảo luận
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right - Image & Price */}
                  <div className="space-y-4">
                    <div className="aspect-[4/3] rounded-xl bg-muted flex items-center justify-center border border-border">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <span className="text-sm">Ảnh chuyến đi</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Giá ước tính</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(trip.estimatedPrice)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Còn {trip.spotsRemaining}/{trip.totalSpots} chỗ
                      </p>
                    </div>

                    {!isOrganizer && (
                      <Button
                        onClick={handleJoin}
                        className="w-full h-12 text-base font-semibold"
                      >
                        Tham gia
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Lịch trình chi tiết</h3>
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3">Ngày 1</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• 5:00 - Tập trung xuất phát</li>
                        <li>• 8:00 - Đến điểm leo núi, ăn sáng</li>
                        <li>• 9:00 - Bắt đầu hành trình</li>
                        <li>• 12:00 - Nghỉ trưa</li>
                        <li>• 17:00 - Đến điểm cắm trại</li>
                      </ul>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-3">Ngày 2</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• 4:00 - Thức dậy, săn mây</li>
                        <li>• 6:00 - Ăn sáng</li>
                        <li>• 7:00 - Xuống núi</li>
                        <li>• 12:00 - Về đến điểm xuất phát</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Chi phí bao gồm</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Xe đưa đón từ Hà Nội</li>
                      <li>• Leader dẫn đường</li>
                      <li>• Lều trại, túi ngủ</li>
                      <li>• Bảo hiểm du lịch</li>
                      <li>• Các bữa ăn theo chương trình</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Chi phí chưa bao gồm</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Porter (nếu cần)</li>
                      <li>• Đồ uống riêng</li>
                      <li>• Chi phí cá nhân khác</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preparation" className="mt-0">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Cần chuẩn bị</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Giày leo núi chuyên dụng</li>
                    <li>• Áo khoác chống nước, giữ ấm</li>
                    <li>• Đèn pin/đèn đội đầu</li>
                    <li>• Bình nước cá nhân (ít nhất 1.5L)</li>
                    <li>• Đồ dùng cá nhân (khăn, kem chống nắng...)</li>
                    <li>• Thuốc cá nhân (nếu có)</li>
                    <li>• Găng tay, mũ/nón</li>
                    <li>• Gậy leo núi (nếu có)</li>
                  </ul>
                </div>
              </TabsContent>

              {isOrganizer && (
                <TabsContent value="members" className="mt-0">
                  <div className="space-y-6">
                    {/* Pending registrations */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        Đơn đăng ký chờ duyệt
                        {pendingRegistrations.length > 0 && (
                          <Badge variant="secondary">{pendingRegistrations.length}</Badge>
                        )}
                      </h3>
                      {pendingRegistrations.length > 0 ? (
                        <div className="space-y-3">
                          {pendingRegistrations.map((reg, index) => (
                            <div
                              key={reg.id}
                              className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-muted-foreground w-6">{index + 1}.</span>
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {reg.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-foreground">{reg.name}</p>
                                  <p className="text-sm text-muted-foreground">{reg.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(reg.id)}
                                  className="gap-1"
                                >
                                  <Check className="h-4 w-4" />
                                  Duyệt
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReject(reg.id)}
                                  className="gap-1"
                                >
                                  <X className="h-4 w-4" />
                                  Từ chối
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">Không có đơn đăng ký nào đang chờ duyệt.</p>
                      )}
                    </div>

                    {/* Approved members */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        Danh sách thành viên
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {approvedRegistrations.length}
                        </Badge>
                      </h3>
                      {approvedRegistrations.length > 0 ? (
                        <div className="space-y-2">
                          {approvedRegistrations.map((reg, index) => (
                            <div
                              key={reg.id}
                              className="flex items-center justify-between p-3 border border-border rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-muted-foreground w-6">{index + 1}.</span>
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-green-100 text-green-800 text-sm">
                                    {reg.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-foreground">{reg.name}</p>
                                  <p className="text-xs text-muted-foreground">{reg.email} • {reg.phone}</p>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-800 border-0">
                                Đã duyệt
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">Chưa có thành viên nào.</p>
                      )}
                    </div>

                    {/* Rejected registrations */}
                    {rejectedRegistrations.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          Đã từ chối
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            {rejectedRegistrations.length}
                          </Badge>
                        </h3>
                        <div className="space-y-2">
                          {rejectedRegistrations.map((reg, index) => (
                            <div
                              key={reg.id}
                              className="flex items-center justify-between p-3 border border-border rounded-lg opacity-60"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-muted-foreground w-6">{index + 1}.</span>
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-red-100 text-red-800 text-sm">
                                    {reg.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="font-medium text-foreground">{reg.name}</p>
                              </div>
                              <Badge variant="outline" className="text-red-600 border-red-200">
                                Từ chối
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Thông báo thành công</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-8">
            <CheckCircle className="h-16 w-16 text-primary mb-4" />
            <p className="text-lg font-medium text-foreground text-center">
              Đăng ký tham gia thành công
            </p>
            <p className="text-muted-foreground text-center mt-2">
              Chúng tôi sẽ liên hệ với bạn sớm nhất.
            </p>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => setShowSuccessModal(false)}>
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripDetail;
