import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mockFeaturedTrips, getDifficultyColor } from "@/data/mockFeaturedTrips";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const FeaturedTrips = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cung đường <span className="text-primary">nổi bật</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá những cung trekking được yêu thích nhất, từ những đỉnh núi hùng vĩ đến các thung lũng xanh mướt.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockFeaturedTrips.map((trip) => (
            <motion.div
              key={trip.id}
              variants={itemVariants}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border"
            >
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link to="/trips">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Xem tất cả cung đường
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
