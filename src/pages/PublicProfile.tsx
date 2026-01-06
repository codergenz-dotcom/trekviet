import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, MapPin, Calendar, Award, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockAdminUsers } from '@/data/mockUsers';

const PublicProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const user = mockAdminUsers.find(u => u.id === userId);

  // Try to get saved profile from localStorage
  const savedProfile = userId ? localStorage.getItem(`userProfile_${userId}`) : null;
  const profileData = savedProfile ? JSON.parse(savedProfile) : null;

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy người dùng</h2>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>
      </div>
    );
  }

  const displayName = profileData?.displayName || profileData?.name || user.name;
  const bio = profileData?.bio || 'Chưa có thông tin giới thiệu.';
  const location = profileData?.location || 'Việt Nam';
  const facebook = profileData?.facebook || '';
  const instagram = profileData?.instagram || '';

  const stats = [
    { label: 'Chuyến đi', value: user.tripsJoined + user.tripsCreated },
    { label: 'Đã tạo', value: user.tripsCreated },
    { label: 'Tham gia', value: user.createdAt ? new Date(user.createdAt).getFullYear() : '2024' },
  ];

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại
      </Button>

      {/* Header Card */}
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
              <AvatarImage src={profileData?.avatar || "/placeholder.svg"} alt={displayName} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {displayName ? displayName.split(' ').map((n: string) => n[0]).join('') : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{displayName}</h1>
                {user.role === 'porter' && (
                  <Badge className="bg-primary text-primary-foreground">
                    <Award className="h-3 w-3 mr-1" />
                    Porter
                  </Badge>
                )}
                {user.role === 'admin' && (
                  <Badge variant="destructive">
                    Admin
                  </Badge>
                )}
                {user.role === 'user' && (
                  <Badge variant="secondary">Thành viên</Badge>
                )}
              </div>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {location}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thông tin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{user.name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{location}</span>
            </div>

            <Separator />

            {/* Social Links */}
            {(facebook || instagram) && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Liên lạc</p>
                {facebook && (
                  <div className="flex items-center gap-2 text-sm">
                    <Facebook className="h-4 w-4 text-muted-foreground" />
                    <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Facebook
                    </a>
                  </div>
                )}
                {instagram && (
                  <div className="flex items-center gap-2 text-sm">
                    <Instagram className="h-4 w-4 text-muted-foreground" />
                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Instagram
                    </a>
                  </div>
                )}
              </div>
            )}

            {!facebook && !instagram && (
              <p className="text-sm text-muted-foreground italic">Chưa có thông tin liên lạc</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Giới thiệu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{bio}</p>

            <Separator />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Tham gia từ {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }) : 'tháng 1/2024'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicProfile;
