import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  RefreshCw, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Key,
  Eye,
  EyeOff
} from "lucide-react";
import { APITokenRefreshModal } from "./APITokenRefreshModal";
import { useToast } from "@/hooks/use-toast";

interface APIToken {
  id: string;
  apiName: string;
  status: "valid" | "expired" | "expiring_soon";
  lastRefreshed: string;
  maskedKey: string;
  autoRefresh: boolean;
  expiresAt: string;
  platform: string;
}

const mockTokens: APIToken[] = [
  {
    id: "1",
    apiName: "Meta (Facebook/Instagram)",
    status: "valid",
    lastRefreshed: "2024-01-15",
    maskedKey: "EAAG...4x2z",
    autoRefresh: true,
    expiresAt: "2024-04-15",
    platform: "social"
  },
  {
    id: "2",
    apiName: "X (Twitter) API",
    status: "expiring_soon",
    lastRefreshed: "2024-01-10",
    maskedKey: "AAAb...9k1m",
    autoRefresh: false,
    expiresAt: "2024-01-25",
    platform: "social"
  },
  {
    id: "3",
    apiName: "LinkedIn API",
    status: "valid",
    lastRefreshed: "2024-01-12",
    maskedKey: "AQV...8n3p",
    autoRefresh: true,
    expiresAt: "2024-03-12",
    platform: "social"
  },
  {
    id: "4",
    apiName: "OpenAI API",
    status: "valid",
    lastRefreshed: "2024-01-14",
    maskedKey: "sk-...j8K2",
    autoRefresh: true,
    expiresAt: "Never",
    platform: "ai"
  },
  {
    id: "5",
    apiName: "Stripe API",
    status: "expired",
    lastRefreshed: "2024-01-01",
    maskedKey: "sk_live_...z9X4",
    autoRefresh: false,
    expiresAt: "2024-01-10",
    platform: "payment"
  }
];

export function APIManagerTable() {
  const [tokens, setTokens] = useState<APIToken[]>(mockTokens);
  const [selectedToken, setSelectedToken] = useState<APIToken | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const filteredTokens = tokens.filter(token => {
    const matchesStatus = statusFilter === "all" || token.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || token.platform === platformFilter;
    return matchesStatus && matchesPlatform;
  });

  const handleRefreshToken = (token: APIToken) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  const handleToggleAutoRefresh = (tokenId: string) => {
    setTokens(prev => prev.map(token => 
      token.id === tokenId 
        ? { ...token, autoRefresh: !token.autoRefresh }
        : token
    ));
    toast({
      title: "Auto-refresh updated",
      description: "Auto-refresh setting has been updated successfully.",
    });
  };

  const toggleKeyVisibility = (tokenId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tokenId)) {
        newSet.delete(tokenId);
      } else {
        newSet.add(tokenId);
      }
      return newSet;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "expired":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "expiring_soon":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "valid":
        return "default" as const;
      case "expired":
        return "destructive" as const;
      case "expiring_soon":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  const platforms = Array.from(new Set(tokens.map(t => t.platform)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Key className="w-5 h-5" />
            API Integration Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="valid">Valid</SelectItem>
                <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>API Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Refreshed</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Credentials</TableHead>
                  <TableHead>Auto-Refresh</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTokens.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell>
                      <div className="font-medium">{token.apiName}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {token.platform}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStatusVariant(token.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {getStatusIcon(token.status)}
                        {token.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{token.lastRefreshed}</TableCell>
                    <TableCell>{token.expiresAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {visibleKeys.has(token.id) 
                            ? `${token.maskedKey.split('...')[0]}***FULL_KEY***${token.maskedKey.split('...')[1]}`
                            : token.maskedKey
                          }
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(token.id)}
                        >
                          {visibleKeys.has(token.id) ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={token.autoRefresh}
                        onCheckedChange={() => handleToggleAutoRefresh(token.id)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRefreshToken(token)}
                          className="flex items-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Refresh
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <APITokenRefreshModal 
        token={selectedToken}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={(tokenId) => {
          setTokens(prev => prev.map(token => 
            token.id === tokenId 
              ? { ...token, status: "valid" as const, lastRefreshed: new Date().toISOString().split('T')[0] }
              : token
          ));
        }}
      />
    </div>
  );
}