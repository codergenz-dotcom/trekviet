import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export const Newsletter = () => {
  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng cho chuyến phiêu lưu tiếp theo?
          </h2>
          <p className="text-muted-foreground mb-8">
            Đăng ký nhận thông tin về các tour mới, ưu đãi đặc biệt, và mẹo trekking hữu ích từ TrekViet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Nhập email của bạn"
              className="flex-1 bg-background"
            />
            <Button className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4 mr-2" />
              Đăng ký
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Chúng tôi cam kết bảo mật thông tin của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
          </p>
        </div>
      </div>
    </section>
  );
};
