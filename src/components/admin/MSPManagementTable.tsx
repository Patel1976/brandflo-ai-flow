import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Pause, 
  Play, 
  Trash2, 
  Share,
  Building,
  Users,
  Calendar,
  DollarSign,
  Globe,
  Palette,
  Key,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MSP {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: string;
  usersCount: number;
  createdAt: string;
  logo?: string;
  primaryColor: string;
  contactEmail: string;
  adminName: string;
  features: string[];
  revenue: number;
}

const mockMSPs: MSP[] = [
  {
    id: "1",
    name: "Digital Marketing Pro",
    domain: "digitalmarketingpro.com",
    status: "active",
    plan: "Professional",
    usersCount: 45,
    createdAt: "2024-01-15",
    primaryColor: "#3B82F6",
    contactEmail: "admin@digitalmarketingpro.com",
    adminName: "Sarah Johnson",
    features: ["Posts", "Calendar", "Analytics", "A/B Tests"],
    revenue: 3550
  },
  {
    id: "2",
    name: "Creative Solutions Hub",
    domain: "creativehub.io",
    status: "active",
    plan: "Enterprise",
    usersCount: 128,
    createdAt: "2024-02-03",
    primaryColor: "#8B5CF6",
    contactEmail: "admin@creativehub.io",
    adminName: "Mike Chen",
    features: ["Posts", "Calendar", "Analytics", "AI Tools"],
    revenue: 9950
  },
  {
    id: "3",
    name: "Local Business Network",
    domain: "localbiznet.com",
    status: "suspended",
    plan: "Starter",
    usersCount: 12,
    createdAt: "2024-01-28",
    primaryColor: "#EF4444",
    contactEmail: "admin@localbiznet.com",
    adminName: "Jennifer Davis",
    features: ["Posts", "Calendar"],
    revenue: 290
  },
  {
    id: "4",
    name: "Enterprise Marketing Suite",
    domain: "ems-platform.com",
    status: "active",
    plan: "Enterprise",
    usersCount: 256,
    createdAt: "2023-12-10",
    primaryColor: "#10B981",
    contactEmail: "admin@ems-platform.com",
    adminName: "Robert Kim",
    features: ["Posts", "Calendar", "Analytics", "A/B Tests", "AI Tools"],
    revenue: 19900
  }
];

export function MSPManagementTable() {
  const [msps] = useState<MSP[]>(mockMSPs);
  const [filteredMSPs, setFilteredMSPs] = useState<MSP[]>(mockMSPs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMSP, setSelectedMSP] = useState<MSP | null>(null);
  const { toast } = useToast();

  // Filter MSPs based on search and status
  const filterMSPs = () => {
    let filtered = msps;

    if (searchTerm) {
      filtered = filtered.filter(msp => 
        msp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msp.domain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(msp => msp.status === statusFilter);
    }

    setFilteredMSPs(filtered);
  };

  // Apply filters when search or status changes
  useState(() => {
    filterMSPs();
  });

  const handleStatusChange = (mspId: string, newStatus: 'active' | 'suspended') => {
    const action = newStatus === 'active' ? 'activated' : 'suspended';
    toast({
      title: `MSP ${action}`,
      description: `MSP has been ${action} successfully.`,
    });
  };

  const handleDelete = (mspId: string, mspName: string) => {
    toast({
      title: "MSP Deleted",
      description: `${mspName} has been permanently deleted.`,
      variant: "destructive",
    });
  };

  const handleShareCredentials = (msp: MSP) => {
    toast({
      title: "Credentials Shared",
      description: `Login credentials sent to ${msp.contactEmail}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-destructive text-destructive-foreground">Suspended</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalMSPs = msps.length;
  const activeMSPs = msps.filter(msp => msp.status === 'active').length;
  const suspendedMSPs = msps.filter(msp => msp.status === 'suspended').length;
  const totalRevenue = msps.reduce((sum, msp) => sum + msp.revenue, 0);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-soft rounded-lg">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total MSPs</p>
                <p className="text-2xl font-bold">{totalMSPs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-soft rounded-lg">
                <Play className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active MSPs</p>
                <p className="text-2xl font-bold">{activeMSPs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive-soft rounded-lg">
                <Pause className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">{suspendedMSPs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-soft rounded-lg">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>MSP Management</CardTitle>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New MSP
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search MSPs by name or domain..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  filterMSPs();
                }}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => {
              setStatusFilter(value);
              filterMSPs();
            }}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* MSP Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>MSP</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMSPs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-3">
                        <Building className="w-12 h-12 text-gray-400" />
                        <div>
                          <h3 className="font-semibold">No MSPs found</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchTerm || statusFilter !== "all" 
                              ? "Try adjusting your filters" 
                              : "Create your first MSP to get started"
                            }
                          </p>
                        </div>
                        {!searchTerm && statusFilter === "all" && (
                          <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add New MSP
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMSPs.map((msp) => (
                    <TableRow key={msp.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: msp.primaryColor }}
                          >
                            {msp.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium">{msp.name}</p>
                            <p className="text-sm text-muted-foreground">{msp.contactEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="font-mono text-sm">{msp.domain}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(msp.status)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{msp.plan}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          {msp.usersCount}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(msp.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedMSP(msp)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(msp.id, msp.status === 'active' ? 'suspended' : 'active')}>
                              {msp.status === 'active' ? (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Suspend
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareCredentials(msp)}>
                              <Share className="w-4 h-4 mr-2" />
                              Share Credentials
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(msp.id, msp.name)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* MSP Details Dialog */}
      <Dialog open={!!selectedMSP} onOpenChange={() => setSelectedMSP(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedMSP && (
                <>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: selectedMSP.primaryColor }}
                  >
                    {selectedMSP.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </div>
                  {selectedMSP.name} - Details
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedMSP && (
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>MSP Name</Label>
                    <Input value={selectedMSP.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Domain</Label>
                    <Input value={selectedMSP.domain} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Plan</Label>
                    <Input value={selectedMSP.plan} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center h-10">
                      {getStatusBadge(selectedMSP.status)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Admin Name</Label>
                    <Input value={selectedMSP.adminName} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input value={selectedMSP.contactEmail} readOnly />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="branding" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: selectedMSP.primaryColor }}
                    >
                      {selectedMSP.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-semibold">Brand Identity</h4>
                      <p className="text-sm text-muted-foreground">Logo and color scheme</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: selectedMSP.primaryColor }}
                        />
                        <Input value={selectedMSP.primaryColor} readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedMSP.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        <div>
                          <p className="font-semibold">{selectedMSP.usersCount}</p>
                          <p className="text-sm text-muted-foreground">Total Users</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-success" />
                        <div>
                          <p className="font-semibold">${selectedMSP.revenue}</p>
                          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}