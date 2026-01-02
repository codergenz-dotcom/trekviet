import { Link } from "react-router-dom";

const destinations = [
  {
    name: "Sapa",
    routes: "15 cung đường",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800"
  },
  {
    name: "Hà Giang",
    routes: "12 cung đường",
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800"
  },
  {
    name: "Tây Bắc",
    routes: "18 cung đường",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  },
  {
    name: "Tây Nguyên",
    routes: "8 cung đường",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
  }
];

export const PopularDestinations = () => {
  return (
    <section className="py-20 bg-slate-800" id="destinations">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Điểm đến <span className="text-primary">phổ biến</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Khám phá những vùng đất tuyệt đẹp của Việt Nam, nơi thiên nhiên và văn hóa hòa quyện tạo nên những trải nghiệm khó quên.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Link 
              key={index}
              to={`/trips?location=${destination.name}`}
              className="group relative h-80 rounded-2xl overflow-hidden"
            >
              <img 
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                <p className="text-sm text-white/80">{destination.routes}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
