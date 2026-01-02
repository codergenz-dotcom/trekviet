import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

export const PopularDestinations = () => {
  return (
    <section className="py-20 bg-slate-800" id="destinations">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Điểm đến <span className="text-primary">phổ biến</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Khám phá những vùng đất tuyệt đẹp của Việt Nam, nơi thiên nhiên và văn hóa hòa quyện tạo nên những trải nghiệm khó quên.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                to={`/trips?location=${destination.name}`}
                className="group relative h-80 rounded-2xl overflow-hidden block"
              >
                <img 
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute bottom-6 left-6 text-white"
                >
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm text-white/80 group-hover:hidden">{destination.routes}</p>
                  <p className="text-sm text-primary font-semibold hidden group-hover:block">Khám phá ngay →</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
