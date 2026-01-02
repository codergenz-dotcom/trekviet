import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const featuredTrips = [
  {
    id: 1,
    title: "Fansipan - Nóc nhà Đông Dương",
    location: "Sapa, Lào Cai",
    description: "Chinh phục đỉnh núi cao nhất Việt Nam với đội ngũ HDV chuyên nghiệp",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    duration: "3 ngày",
    groupSize: "2-6 người",
    price: "2.500.000",
    originalPrice: "3.000.000",
    rating: 4.9,
    difficulty: "Khó"
  },
  {
    id: 2,
    title: "Tà Xùa - Săn mây",
    location: "Bắc Yên, Sơn La",
    description: "Trải nghiệm thiên đường săn mây nổi tiếng nhất Tây Bắc",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    duration: "2 ngày",
    groupSize: "4-8 người",
    price: "1.800.000",
    rating: 4.8,
    difficulty: "Trung bình"
  },
  {
    id: 3,
    title: "Pù Luông - Thung lũng xanh",
    location: "Bá Thước, Thanh Hóa",
    description: "Khám phục vùng đất hoang sơ đẹp mượt mà như tranh vẽ đẹp",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    duration: "3 ngày",
    groupSize: "4-10 người",
    price: "2.200.000",
    rating: 4.7,
    difficulty: "Dễ"
  },
  {
    id: 4,
    title: "Lảo Thẩn - Bản làng trên mây",
    location: "Y Tý, Lào Cai",
    description: "Khám phá vẻ đẹp nguyên sơ của Y Tý với những cánh đồng terraces",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    duration: "4 ngày",
    groupSize: "2-6 người",
    price: "1.900.000",
    rating: 4.8,
    difficulty: "Khó"
  },
  {
    id: 5,
    title: "Bạch Mộc Lương Tử",
    location: "Bát Xát, Lào Cai",
    description: "Chinh phục đỉnh núi cao thứ 4 Việt Nam",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800",
    duration: "3 ngày",
    groupSize: "4-8 người",
    price: "3.200.000",
    rating: 4.7,
    difficulty: "Rất khó"
  },
  {
    id: 6,
    title: "Hà Giang Loop",
    location: "Đồng Văn, Hà Giang",
    description: "Hành trình cao nguyên đá Đồng Văn",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
    duration: "4 ngày",
    groupSize: "4-10 người",
    price: "2.800.000",
    rating: 4.6,
    difficulty: "Trung bình"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Dễ":
      return "bg-green-100 text-green-700";
    case "Trung bình":
      return "bg-yellow-100 text-yellow-700";
    case "Khó":
      return "bg-orange-100 text-orange-700";
    case "Rất khó":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const FeaturedTrips = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cung đường <span className="text-primary">nổi bật</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá những cung trekking được yêu thích nhất, từ những đỉnh núi hùng vĩ đến các thung lũng xanh mướt.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrips.map((trip) => (
            <div key={trip.id} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border">
              <div className="relative">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className={`absolute top-3 left-3 ${getDifficultyColor(trip.difficulty)}`}>
                  {trip.difficulty}
                </Badge>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{trip.rating}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {trip.location}
                </div>
                
                <h3 className="font-semibold text-lg mb-2 text-foreground">{trip.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trip.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {trip.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {trip.groupSize}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    {trip.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through mr-2">
                        {trip.originalPrice}đ
                      </span>
                    )}
                    <span className="text-lg font-bold text-primary">{trip.price}đ</span>
                  </div>
                  <Link to={`/trip/${trip.id}`}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/trips">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Xem tất cả cung đường
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
