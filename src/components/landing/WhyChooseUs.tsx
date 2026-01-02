import { Shield, Award, Headphones, UserCheck } from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Hướng dẫn viên chuyên nghiệp",
    description: "Đội ngũ hướng dẫn viên giàu kinh nghiệm, am hiểu địa hình và văn hóa địa phương."
  },
  {
    icon: Shield,
    title: "An toàn là trên hết",
    description: "Trang bị đầy đủ thiết bị an toàn, bảo hiểm và quy trình xử lý tình huống khẩn cấp."
  },
  {
    icon: Award,
    title: "Chất lượng hàng đầu",
    description: "Cam kết mang đến trải nghiệm tốt nhất với dịch vụ chuyên nghiệp và tận tâm."
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Luôn sẵn sàng hỗ trợ bạn mọi lúc, từ lúc đặt tour đến khi hoàn thành hành trình."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tại sao chọn <span className="text-primary">TrekViet</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Với hơn 10 năm kinh nghiệm, chúng tôi tự hào là đơn vị hàng đầu trong lĩnh vực trekking và du lịch mạo hiểm tại Việt Nam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
