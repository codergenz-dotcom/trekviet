import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Nguyễn Minh Tuấn",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    tour: "Tour Fansipan",
    date: "15 tháng 1, 2024",
    rating: 5,
    content: "Trải nghiệm tuyệt vời! Hướng dẫn viên rất chuyên nghiệp và nhiệt tình. Cảnh đẹp ngoài sức tưởng tượng. Chắc chắn sẽ quay lại!"
  },
  {
    name: "Trần Thị Hương",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    tour: "Tour Tà Xùa",
    date: "18 tháng 3, 2024",
    rating: 5,
    content: "Lần đầu đi trekking và tôi có thể nói là hoàn toàn khổng thể nào quên. Team TrekViet rất chu đáo, tự chuẩn bị tỉ mỉ đặc biệt hỗ trợ trên đường đi."
  },
  {
    name: "Phạm Văn Đức",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    tour: "Tour Lảo Thẩn",
    date: "2 tháng 1, 2024",
    rating: 5,
    content: "Đã trải nghiệm nhiều tour trekking nhưng đây là ấn tượng nhất. Lịch trình hợp lý, đồ ăn ngon, và đặc biệt là vibe cảm của đoàn siêu thân thiện."
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Khách hàng <span className="text-primary">nói gì</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những chia sẻ chân thực từ những người đã trải nghiệm cùng TrekViet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6">
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.tour} • {testimonial.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
