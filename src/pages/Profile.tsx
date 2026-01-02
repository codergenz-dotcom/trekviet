import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    location: 'Hà Nội, Việt Nam',
    bio: 'Yêu thích khám phá thiên nhiên và leo núi. Đã chinh phục nhiều đỉnh núi cao tại Việt Nam.',
    joinDate: '01/2024',
  });

  const stats = [
    { label: 'Chuyến đi', value: 12 },
    { label: 'Km đã đi', value: '234' },
    { label: 'Đỉnh núi', value: 5 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save profile to backend
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* Header Card */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/80 to-primary" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end -mt-16">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src="/placeholder.svg" alt={profile.name} />
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <Badge variant="secondary">Thành viên</Badge>
              </div>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </p>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="shrink-0"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </>
              )}
            </Button>
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
            <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {profile.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {profile.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {profile.phone}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Địa điểm</Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {profile.location}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Giới thiệu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Tiểu sử</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              )}
            </div>

            <Separator />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Tham gia từ tháng {profile.joinDate}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
