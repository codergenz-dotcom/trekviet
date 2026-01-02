import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";

export const LandingHeader = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Mountain className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">BKTreking</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/90 hover:text-white transition-colors">
            Trang chủ
          </Link>
          <Link to="/trips" className="text-white/90 hover:text-white transition-colors">
            Trekking
          </Link>
          <Link to="#destinations" className="text-white/90 hover:text-white transition-colors">
            Điểm đến
          </Link>
          <Link to="#about" className="text-white/90 hover:text-white transition-colors">
            Về chúng tôi
          </Link>
          <Link to="#contact" className="text-white/90 hover:text-white transition-colors">
            Liên hệ
          </Link>
        </nav>

        <Link to="/login">
          <Button variant="ghost" className="text-white hover:bg-white/20">
            Đăng nhập
          </Button>
        </Link>
      </div>
    </header>
  );
};
