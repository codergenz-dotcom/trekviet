import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Mountain, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { FilterSidebar, type Filters } from '@/components/FilterSidebar';
import { TripCard } from '@/components/TripCard';
import { CompletedTripCard } from '@/components/CompletedTripCard';
import { mockTrips, mockCompletedTrips, type Trip } from '@/data/mockTrips';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

const initialFilters: Filters = {
  locations: [],
  difficulties: [],
  dateFrom: '',
  dateTo: '',
};

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Apply URL search params on mount
  useEffect(() => {
    const location = searchParams.get('location');
    const difficulty = searchParams.get('difficulty');
    
    setFilters(prev => ({
      ...prev,
      locations: location ? [location] : prev.locations,
      difficulties: difficulty ? [difficulty as Filters['difficulties'][0]] : prev.difficulties,
    }));
  }, [searchParams]);

  const handleReview = (tripId: string) => {
    toast({
      title: "Đánh giá chuyến đi",
      description: "Chức năng đánh giá sẽ được cập nhật sớm!",
    });
  };

  const filteredTrips = useMemo(() => {
    let result = [...mockTrips];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (trip) =>
          trip.name.toLowerCase().includes(query) ||
          trip.location.toLowerCase().includes(query) ||
          trip.description.toLowerCase().includes(query)
      );
    }

    // Location filter
    if (filters.locations.length > 0) {
      result = result.filter((trip) => filters.locations.includes(trip.location));
    }

    // Difficulty filter
    if (filters.difficulties.length > 0) {
      result = result.filter((trip) =>
        filters.difficulties.includes(trip.difficulty)
      );
    }

    // Date range filter
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter((trip) => new Date(trip.departureDate) >= fromDate);
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      result = result.filter((trip) => new Date(trip.departureDate) <= toDate);
    }

    // Sort by departure date (nearest first)
    result.sort(
      (a, b) =>
        new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
    );

    return result;
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const activeFilterCount =
    filters.locations.length +
    filters.difficulties.length +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0);

  return (
    <div className="bg-background">
      {/* Page Header */}
      <div className="border-b border-border/60 bg-background/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  Danh sách chuyến đi hiện tại
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Tìm và tham gia các chuyến leo núi phù hợp với bạn
                </p>
              </div>
              <Button 
                onClick={() => navigate('/create-trip')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Tạo chuyến đi mới</span>
                <span className="sm:hidden">Tạo mới</span>
              </Button>
            </div>

            {/* Search Row */}
            <div className="flex items-center gap-3">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              {/* Mobile Filter Toggle */}
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden shrink-0 h-12 w-12 relative"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-4">
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClear={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClear={clearFilters}
            />
          </div>

          {/* Trip List */}
          <div className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Tìm thấy{' '}
                <span className="font-semibold text-foreground">
                  {filteredTrips.length}
                </span>{' '}
                chuyến đi
              </p>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                  Xóa bộ lọc ({activeFilterCount})
                </Button>
              )}
            </div>

            {/* Trip Cards */}
            {filteredTrips.length > 0 ? (
              <div className="space-y-4">
                {filteredTrips.map((trip, index) => (
                  <TripCard key={trip.id} trip={trip} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Mountain className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Không tìm thấy chuyến đi
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc để xem thêm
                  các chuyến đi khác.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    clearFilters();
                  }}
                >
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}

            {/* Completed Trips Section */}
            {mockCompletedTrips.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Chuyến đi đã hoàn thành ({mockCompletedTrips.length})
                </h2>
                <div className="space-y-4">
                  {mockCompletedTrips.map((trip, index) => (
                    <CompletedTripCard 
                      key={trip.id} 
                      trip={trip} 
                      index={index} 
                      onReview={handleReview}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
