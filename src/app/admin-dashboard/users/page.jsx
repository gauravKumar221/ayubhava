'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  Calendar,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200"><Shield className="w-3 h-3 mr-1" /> {role}</Badge>;
      case 'Doctor':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">{role}</Badge>;
      case 'Staff':
        return <Badge className="bg-green-100 text-green-700 border-green-200">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-accent text-accent-foreground"><CheckCircle2 className="w-3 h-3 mr-1" /> {status}</Badge>;
      case 'Inactive':
        return <Badge variant="secondary"><XCircle className="w-3 h-3 mr-1" /> {status}</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50"><Clock className="w-3 h-3 mr-1" /> {status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="User Management" 
        description="Manage system access, roles, and account statuses for clinical staff and patients."
      />

      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email or role..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const avatar = getPlaceholderImage(user.avatarId);
                return (
                  <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border">
                          {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
                          <AvatarFallback className="bg-primary/5 text-primary font-bold">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{user.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 text-primary" />
                        {user.joinedDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" /> Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground opacity-50">
                      <Shield className="h-10 w-10 mb-2" />
                      <p>No users found matching your search.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}