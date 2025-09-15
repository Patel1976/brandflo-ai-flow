import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Pause, 
  Play, 
  Trash2, 
  Share, 
  Building2,
  Users,
  Globe,
  Calendar,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import { KPICard } from "../KPICard";

interface MSP {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  status: "active" | "inactive" | "suspended";
  plan: string;
  totalUsers: number;
  monthlyRevenue: number;
  createdAt: string;
  lastActive: string;
  contactPerson: string;
  email: string;
}

const mockMSPs: MSP[] = [
  {
    id: "1",
    name: "TechAgency Pro",
    domain: "techagency.brandflo.com",
    status: "active",
    plan: "Professional",
    totalUsers: 45,
    monthlyRevenue: 99,
    createdAt: "2024-01-15",
    lastActive: "2024-03-14",
    contactPerson: "John Smith",
    email: "john@techagency.com"
  },
  {
    id: "2",
    name: "Creative Digital",
    domain: "creative.brandflo.com",
    status: "active",
    plan: "Enterprise",
    totalUsers: 78,
    monthlyRevenue: 199,
    createdAt: "2024-02-01",
    lastActive: "2024-03-13",
    contactPerson: "Sarah Johnson",
    email: "sarah@creativedigital.com"
  },
  {
    id: "3",
    name: "Marketing Hub",
    domain: "marketinghub.brandflo.com",
    status: "suspended",
    plan: "Starter",
    totalUsers: 12,
    monthlyRevenue: 49,
    createdAt: "2024-01-20",
    lastActive: "2024-02-28",
    contactPerson: "Mike Wilson",
    email: "mike@marketinghub.com"
  }
];

const kpiData = [
  {
    title: "Total MSPs",
    value: "3",
    change: "+1 this month",
    changeType: "positive" as const,
    icon: Building2,
  },
  {
    title: "Active MSPs",
    value: "2",
    change: "66% active rate",
    changeType: "positive" as const,
    icon: Globe,
  },
  {
    title: "Total Users",
    value: "135",
    change: "+23 this month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Monthly Revenue",
    value: "$347",
    change: "+12% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
  },
];

export function MSPManagementTable() {
  const [msps, setMsps] = useState(mockMSPs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMSP, setSelectedMSP] = useState<MSP | null>(null);

  const filteredMSPs = msps.filter(msp => {
    const matchesSearch = msp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msp.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || msp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: MSP["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-500 text-white">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleStatusToggle = (mspId: string, currentStatus: MSP["status"]) => {
    setMsps(prev => prev.map(msp => 
      msp.id === mspId 
        ? { ...msp, status: currentStatus === "active" ? "suspended" : "active" }
        : msp
    ));
  };

  const handleDelete = (mspId: string) => {
    setMsps(prev => prev.filter(msp => msp.id !== mspId));
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            variant="admin"
            {...kpi}
          />
        ))}
      </div>

      {/* Management Table */}
      <Card className="bg-admin-surface border-admin-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-admin-primary">MSP Management</CardTitle>
            <Button className="bg-admin-primary hover:bg-admin-primary/90 text-white">
              <Building2 className="w-4 h-4 mr-2" />
              Create New MSP
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search MSPs by name or domain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-admin-secondary/50 border-admin-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-admin-secondary/50 border-admin-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredMSPs.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-admin-primary mb-2">No MSPs Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "No MSPs match your current filters."
                  : "Get started by creating your first MSP."
                }
              </p>
              <Button className="bg-admin-primary hover:bg-admin-primary/90 text-white">
                <Building2 className="w-4 h-4 mr-2" />
                Create New MSP
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-admin-border">
                  <TableHead className="text-admin-primary">MSP Name</TableHead>
                  <TableHead className="text-admin-primary">Domain</TableHead>
                  <TableHead className="text-admin-primary">Status</TableHead>
                  <TableHead className="text-admin-primary">Plan</TableHead>
                  <TableHead className="text-admin-primary">Users</TableHead>
                  <TableHead className="text-admin-primary">Revenue</TableHead>
                  <TableHead className="text-admin-primary">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMSPs.map((msp) => (
                  <TableRow key={msp.id} className="border-admin-border hover:bg-admin-secondary/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-admin-primary rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-admin-primary">{msp.name}</div>
                          <div className="text-sm text-muted-foreground">{msp.contactPerson}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{msp.domain}</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(msp.status)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-admin-border">
                        {msp.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{msp.totalUsers}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">${msp.monthlyRevenue}/mo</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="hover:bg-admin-secondary/50"
                              onClick={() => setSelectedMSP(msp)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl bg-admin-surface border-admin-border">
                            <DialogHeader>
                              <DialogTitle className="text-admin-primary">MSP Details</DialogTitle>
                            </DialogHeader>
                            {selectedMSP && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold text-admin-primary mb-3">General Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><span className="text-muted-foreground">Name:</span> {selectedMSP.name}</div>
                                      <div><span className="text-muted-foreground">Domain:</span> {selectedMSP.domain}</div>
                                      <div><span className="text-muted-foreground">Status:</span> {getStatusBadge(selectedMSP.status)}</div>
                                      <div><span className="text-muted-foreground">Plan:</span> {selectedMSP.plan}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-admin-primary mb-3">Contact & Metrics</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><span className="text-muted-foreground">Contact:</span> {selectedMSP.contactPerson}</div>
                                      <div><span className="text-muted-foreground">Email:</span> {selectedMSP.email}</div>
                                      <div><span className="text-muted-foreground">Users:</span> {selectedMSP.totalUsers}</div>
                                      <div><span className="text-muted-foreground">Revenue:</span> ${selectedMSP.monthlyRevenue}/mo</div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-admin-primary mb-3">Timeline</h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-muted-foreground">Created:</span> {new Date(selectedMSP.createdAt).toLocaleDateString()}</div>
                                    <div><span className="text-muted-foreground">Last Active:</span> {new Date(selectedMSP.lastActive).toLocaleDateString()}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-admin-secondary/50"
                          onClick={() => handleStatusToggle(msp.id, msp.status)}
                        >
                          {msp.status === "active" ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="hover:bg-admin-secondary/50"
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-destructive/20 text-destructive"
                          onClick={() => handleDelete(msp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}