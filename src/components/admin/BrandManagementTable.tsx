import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandFormModal } from "./BrandFormModal";
import { useToast } from "@/hooks/use-toast";

interface Brand {
  id: string;
  name: string;
  owner: string;
  socialAccounts: number;
  lastActivity: string;
  status: 'active' | 'inactive';
}

const mockBrands: Brand[] = [
  {
    id: "1",
    name: "TechStartup Inc",
    owner: "John Smith",
    socialAccounts: 4,
    lastActivity: "2 hours ago",
    status: "active"
  },
  {
    id: "2",
    name: "Fashion Boutique",
    owner: "Sarah Johnson",
    socialAccounts: 6,
    lastActivity: "1 day ago", 
    status: "active"
  },
  {
    id: "3",
    name: "Local Restaurant",
    owner: "Mike Wilson",
    socialAccounts: 3,
    lastActivity: "1 week ago",
    status: "inactive"
  }
];

export function BrandManagementTable() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | undefined>();
  const { toast } = useToast();

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleDelete = (brand: Brand) => {
    if (confirm(`Are you sure you want to delete ${brand.name}? This will remove all associated content and data.`)) {
      setBrands(brands.filter(b => b.id !== brand.id));
      toast({
        title: "Brand deleted",
        description: `${brand.name} has been permanently removed.`
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brand Management</h1>
          <p className="text-muted-foreground">Manage all brands across the platform</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Brand
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Brands</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Social Accounts</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>{brand.owner}</TableCell>
                  <TableCell>{brand.socialAccounts}</TableCell>
                  <TableCell>{brand.lastActivity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(brand.status)}>
                      {brand.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(brand)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(brand)}
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

      <BrandFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBrand(undefined);
        }}
        brand={editingBrand}
        onSave={(brandData) => {
          if (editingBrand) {
            setBrands(brands.map(b => b.id === editingBrand.id ? { ...b, ...brandData } : b));
            toast({
              title: "Brand updated",
              description: "Brand information has been successfully updated."
            });
          } else {
            const newBrand: Brand = {
              id: Date.now().toString(),
              ...brandData,
              lastActivity: "Just now",
              socialAccounts: 0,
              status: "active"
            };
            setBrands([...brands, newBrand]);
            toast({
              title: "Brand created",
              description: "New brand has been successfully created."
            });
          }
          setIsModalOpen(false);
          setEditingBrand(undefined);
        }}
      />
    </div>
  );
}