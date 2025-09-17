import { useState } from "react";
import { Search, Plus, BarChart3, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ABTestFormModal } from "./ABTestFormModal";
import { ABTestAnalyticsModal } from "./ABTestAnalyticsModal";

interface ABTest {
  id: string;
  postTitle: string;
  brand: string;
  user: string;
  status: "active" | "completed" | "paused";
  ctr: number;
  engagementRate: number;
  conversionRate: number;
  createdAt: string;
  duration: number;
}

const mockTests: ABTest[] = [
  {
    id: "1",
    postTitle: "Summer Sale Campaign",
    brand: "TechCorp",
    user: "john@techcorp.com",
    status: "active",
    ctr: 2.3,
    engagementRate: 5.7,
    conversionRate: 1.2,
    createdAt: "2024-01-15",
    duration: 14,
  },
  {
    id: "2",
    postTitle: "Product Launch Announcement",
    brand: "StartupXYZ",
    user: "sarah@startupxyz.com",
    status: "completed",
    ctr: 3.1,
    engagementRate: 7.2,
    conversionRate: 2.1,
    createdAt: "2024-01-10",
    duration: 7,
  },
];

export function ABTestManagerTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);

  const filteredTests = mockTests.filter((test) => {
    const matchesSearch = 
      test.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || test.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      completed: "secondary",
      paused: "outline",
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const handleViewAnalytics = (test: ABTest) => {
    setSelectedTest(test);
    setShowAnalyticsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">A/B Test Manager</h2>
          <p className="text-muted-foreground mt-2">
            Monitor and manage A/B tests across all brands and users
          </p>
        </div>
        <Button onClick={() => setShowFormModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create A/B Test
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by post, brand, or user..."
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
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>A/B Tests ({filteredTests.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post Title</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.postTitle}</TableCell>
                  <TableCell>{test.brand}</TableCell>
                  <TableCell>{test.user}</TableCell>
                  <TableCell>{getStatusBadge(test.status)}</TableCell>
                  <TableCell>{test.ctr}%</TableCell>
                  <TableCell>{test.engagementRate}%</TableCell>
                  <TableCell>{test.conversionRate}%</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleViewAnalytics(test)}>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Test
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

      {/* Modals */}
      <ABTestFormModal
        open={showFormModal}
        onOpenChange={setShowFormModal}
      />
      
      <ABTestAnalyticsModal
        open={showAnalyticsModal}
        onOpenChange={setShowAnalyticsModal}
        test={selectedTest}
      />
    </div>
  );
}