import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Eye, Trash2, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserFormModal } from "./UserFormModal";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'active' | 'suspended' | 'cancelled';
  lastActivity: string;
  associatedBrands: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    plan: "Professional",
    status: "active",
    lastActivity: "2 hours ago",
    associatedBrands: 3
  },
  {
    id: "2", 
    name: "Sarah Johnson",
    email: "sarah@agency.com",
    plan: "Enterprise",
    status: "active",
    lastActivity: "1 day ago",
    associatedBrands: 12
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@startup.com", 
    plan: "Basic",
    status: "suspended",
    lastActivity: "1 week ago",
    associatedBrands: 1
  }
];

export function UserManagementTable() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      setUsers(users.filter(u => u.id !== user.id));
      toast({
        title: "User deleted",
        description: `${user.name} has been permanently removed.`
      });
    }
  };

  const handleDisable = (user: User) => {
    if (confirm(`Are you sure you want to disable ${user.name}?`)) {
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, status: 'suspended' as const } : u
      ));
      toast({
        title: "User disabled",
        description: `${user.name} has been deactivated.`
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'suspended': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all platform users and their subscriptions</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Brands</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.plan}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActivity}</TableCell>
                  <TableCell>{user.associatedBrands}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View/Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDisable(user)}>
                          <UserX className="w-4 h-4 mr-2" />
                          Disable
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(user)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(undefined);
        }}
        user={editingUser}
        onSave={(userData) => {
          if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
            toast({
              title: "User updated",
              description: "User information has been successfully updated."
            });
          } else {
            const newUser: User = {
              id: Date.now().toString(),
              ...userData,
              lastActivity: "Just now",
              associatedBrands: 0
            };
            setUsers([...users, newUser]);
            toast({
              title: "User created",
              description: "New user has been successfully created."
            });
          }
          setIsModalOpen(false);
          setEditingUser(undefined);
        }}
      />
    </div>
  );
}