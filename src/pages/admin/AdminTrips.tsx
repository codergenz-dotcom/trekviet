import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  Mountain, 
  Calendar, 
  MapPin, 
  Users, 
  Eye, 
  Check, 
  X, 
  Search,
  Clock
} from 'lucide-react';

type TripStatus = 'pending' | 'approved' | 'rejected';

interface PendingTrip {
  id: string;
  name: string;
  location: string;
  difficulty: string;
  departureDate: string;
  estimatedPrice: number;
  maxParticipants: number;
  description: string;
  organizerId: string;
  organizerName: string;
  createdAt: string;
  status: TripStatus;
  rejectReason?: string;
  images?: string[];
}

const difficultyLabels: Record<string, string> = {
  easy: 'Dễ',
  moderate: 'Trung bình',
  hard: 'Khó',
  extreme: 'Cực khó',
};

// Mock data for demo
const mockPendingTrips: PendingTrip[] = [
  {
    id: 'trip-pending-1',
    name: 'Chinh phục Fansipan 2N1Đ',
    location: 'Lào Cai',
    difficulty: 'hard',
    departureDate: '2026-02-15',
    estimatedPrice: 2500000,
    maxParticipants: 15,
    description: 'Hành trình chinh phục nóc nhà Đông Dương với cung đường trekking cổ điển qua Y Tý. Trải nghiệm ngủ lều trên độ cao 2800m.',
    organizerId: 'porter-1',
    organizerName: 'Trần Văn Porter',
    createdAt: '2026-01-03T10:00:00Z',
    status: 'pending',
    images: ['/fansipan.jpg'],
  },
  {
    id: 'trip-pending-2',
    name: 'Tà Xùa săn mây cuối tuần',
    location: 'Sơn La',
    difficulty: 'moderate',
    departureDate: '2026-01-25',
    estimatedPrice: 1800000,
    maxParticipants: 20,
    description: 'Tour săn mây Tà Xùa 2 ngày 1 đêm, check-in sống lưng khủng long, ngắm bình minh trên biển mây.',
    organizerId: 'porter-2',
    organizerName: 'Lê Minh Trekker',
    createdAt: '2026-01-02T14:30:00Z',
    status: 'pending',
    images: ['/ta-xua.png'],
  },
  {
    id: 'trip-pending-3',
    name: 'Lảo Thẩn - Đỉnh núi thiêng',
    location: 'Lào Cai',
    difficulty: 'hard',
    departureDate: '2026-02-20',
    estimatedPrice: 2200000,
    maxParticipants: 12,
    description: 'Khám phá đỉnh Lảo Thẩn cao 2860m, một trong những đỉnh núi đẹp nhất vùng Tây Bắc với cung trekking hoang sơ.',
    organizerId: 'porter-1',
    organizerName: 'Trần Văn Porter',
    createdAt: '2026-01-04T09:15:00Z',
    status: 'pending',
    images: ['/lao-than.jpg'],
  },
  {
    id: 'trip-approved-1',
    name: 'Núi Bà Đen - Tây Ninh',
    location: 'Tây Ninh',
    difficulty: 'easy',
    departureDate: '2026-01-20',
    estimatedPrice: 800000,
    maxParticipants: 30,
    description: 'Tour leo núi Bà Đen phù hợp cho người mới bắt đầu, có thể đi cáp treo hoặc trekking.',
    organizerId: 'porter-3',
    organizerName: 'Nguyễn Hải Mountain',
    createdAt: '2025-12-28T08:00:00Z',
    status: 'approved',
    images: ['/trekking-ba-den-5-600x450.jpg'],
  },
  {
    id: 'trip-rejected-1',
    name: 'Putaleng mùa đông',
    location: 'Lai Châu',
    difficulty: 'extreme',
    departureDate: '2026-01-10',
    estimatedPrice: 3500000,
    maxParticipants: 8,
    description: 'Chinh phục đỉnh Putaleng trong điều kiện thời tiết khắc nghiệt.',
    organizerId: 'porter-2',
    organizerName: 'Lê Minh Trekker',
    createdAt: '2025-12-25T16:00:00Z',
    status: 'rejected',
    rejectReason: 'Thời tiết mùa đông quá khắc nghiệt, cần đợi đến mùa xuân để đảm bảo an toàn cho người tham gia.',
    images: ['/putaleng.png'],
  },
];

const AdminTrips = () => {
  const [trips, setTrips] = useState<PendingTrip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<PendingTrip | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TripStatus | 'all'>('pending');

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = () => {
    try {
      const storedTrips = JSON.parse(localStorage.getItem('pendingTrips') || '[]');
      // Use mock data if localStorage is empty
      if (storedTrips.length === 0) {
        setTrips(mockPendingTrips);
        localStorage.setItem('pendingTrips', JSON.stringify(mockPendingTrips));
      } else {
        setTrips(storedTrips);
      }
    } catch {
      setTrips(mockPendingTrips);
    }
  };

  const handleApprove = (trip: PendingTrip) => {
    const updatedTrips = trips.map((t) =>
      t.id === trip.id ? { ...t, status: 'approved' as TripStatus } : t
    );
    localStorage.setItem('pendingTrips', JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    toast.success(`Đã duyệt chuyến đi "${trip.name}"`);
    setIsDetailOpen(false);
  };

  const handleReject = () => {
    if (!selectedTrip || !rejectReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối');
      return;
    }

    const updatedTrips = trips.map((t) =>
      t.id === selectedTrip.id
        ? { ...t, status: 'rejected' as TripStatus, rejectReason }
        : t
    );
    localStorage.setItem('pendingTrips', JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    toast.success(`Đã từ chối chuyến đi "${selectedTrip.name}"`);
    setIsRejectOpen(false);
    setIsDetailOpen(false);
    setRejectReason('');
  };

  const openRejectModal = (trip: PendingTrip) => {
    setSelectedTrip(trip);
    setIsRejectOpen(true);
  };

  const openDetailModal = (trip: PendingTrip) => {
    setSelectedTrip(trip);
    setIsDetailOpen(true);
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.organizerName?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && trip.status === activeTab;
  });

  const pendingCount = trips.filter((t) => t.status === 'pending').length;
  const approvedCount = trips.filter((t) => t.status === 'approved').length;
  const rejectedCount = trips.filter((t) => t.status === 'rejected').length;

  const getStatusBadge = (status: TripStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Chờ duyệt</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">Đã duyệt</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">Từ chối</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý chuyến đi</h1>
          <p className="text-muted-foreground">
            Duyệt và quản lý các chuyến đi được tạo bởi Porter
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Mountain className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{trips.length}</p>
                  <p className="text-sm text-muted-foreground">Tổng số</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Chờ duyệt</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">Đã duyệt</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <X className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{rejectedCount}</p>
                  <p className="text-sm text-muted-foreground">Từ chối</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Danh sách chuyến đi</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList>
                <TabsTrigger value="all">Tất cả ({trips.length})</TabsTrigger>
                <TabsTrigger value="pending">Chờ duyệt ({pendingCount})</TabsTrigger>
                <TabsTrigger value="approved">Đã duyệt ({approvedCount})</TabsTrigger>
                <TabsTrigger value="rejected">Từ chối ({rejectedCount})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                {filteredTrips.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mountain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Không có chuyến đi nào</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Chuyến đi</TableHead>
                        <TableHead>Địa điểm</TableHead>
                        <TableHead>Ngày khởi hành</TableHead>
                        <TableHead>Người tạo</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTrips.map((trip) => (
                        <TableRow key={trip.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Mountain className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{trip.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {difficultyLabels[trip.difficulty] || trip.difficulty}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {trip.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {trip.departureDate
                                ? format(new Date(trip.departureDate), 'dd/MM/yyyy', { locale: vi })
                                : 'Chưa xác định'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {trip.organizerName || 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(trip.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDetailModal(trip)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {trip.status === 'pending' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => handleApprove(trip)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => openRejectModal(trip)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedTrip && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-primary" />
                  {selectedTrip.name}
                </DialogTitle>
                <DialogDescription>
                  Chi tiết chuyến đi chờ duyệt
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedTrip.images && selectedTrip.images.length > 0 && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={selectedTrip.images[0]}
                      alt={selectedTrip.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Địa điểm</p>
                    <p className="font-medium flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      {selectedTrip.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Độ khó</p>
                    <p className="font-medium">
                      {difficultyLabels[selectedTrip.difficulty] || selectedTrip.difficulty}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Ngày khởi hành</p>
                    <p className="font-medium flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {selectedTrip.departureDate
                        ? format(new Date(selectedTrip.departureDate), 'dd/MM/yyyy', { locale: vi })
                        : 'Chưa xác định'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Số người tối đa</p>
                    <p className="font-medium flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-primary" />
                      {selectedTrip.maxParticipants || 'Không giới hạn'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Giá ước tính</p>
                    <p className="font-medium text-primary">
                      {selectedTrip.estimatedPrice?.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Người tạo</p>
                    <p className="font-medium">{selectedTrip.organizerName || 'N/A'}</p>
                  </div>
                </div>

                {selectedTrip.description && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Mô tả</p>
                    <p className="text-sm">{selectedTrip.description}</p>
                  </div>
                )}

                {selectedTrip.status === 'rejected' && selectedTrip.rejectReason && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm font-medium text-red-800">Lý do từ chối:</p>
                    <p className="text-sm text-red-700 mt-1">{selectedTrip.rejectReason}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                {selectedTrip.status === 'pending' && (
                  <>
                    <Button variant="outline" onClick={() => openRejectModal(selectedTrip)}>
                      <X className="h-4 w-4 mr-2" />
                      Từ chối
                    </Button>
                    <Button onClick={() => handleApprove(selectedTrip)}>
                      <Check className="h-4 w-4 mr-2" />
                      Duyệt chuyến đi
                    </Button>
                  </>
                )}
                {selectedTrip.status !== 'pending' && (
                  <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                    Đóng
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối chuyến đi</DialogTitle>
            <DialogDescription>
              Nhập lý do từ chối chuyến đi "{selectedTrip?.name}"
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Nhập lý do từ chối..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminTrips;
