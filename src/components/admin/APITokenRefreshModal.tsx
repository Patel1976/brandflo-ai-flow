import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
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

interface APITokenRefreshModalProps {
  token: APIToken | null;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: (tokenId: string) => void;
}

export function APITokenRefreshModal({ token, isOpen, onClose, onRefresh }: APITokenRefreshModalProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newToken, setNewToken] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  if (!token) return null;

  const handleRefresh = async () => {
    if (!newToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid token",
        variant: "destructive",
      });
      return;
    }

    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onRefresh(token.id);
    
    toast({
      title: "Token refreshed successfully",
      description: `${token.apiName} token has been updated and validated.`,
    });
    
    setIsRefreshing(false);
    setNewToken("");
    setClientId("");
    setClientSecret("");
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "text-green-600 dark:text-green-400";
      case "expired":
        return "text-red-600 dark:text-red-400";
      case "expiring_soon":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-4 h-4" />;
      case "expired":
      case "expiring_soon":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <RefreshCw className="w-5 h-5" />
            Refresh API Token
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Token Status */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{token.apiName}</h3>
                  <Badge variant="outline" className={`${getStatusColor(token.status)} flex items-center gap-1`}>
                    {getStatusIcon(token.status)}
                    {token.status.replace("_", " ")}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Last Refreshed:</span>
                    <div className="font-medium">{token.lastRefreshed}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expires:</span>
                    <div className="font-medium">{token.expiresAt}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Current Token:</span>
                    <div className="font-mono text-xs bg-muted px-2 py-1 rounded">
                      {token.maskedKey}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Auto-refresh:</span>
                    <div className="font-medium">{token.autoRefresh ? "Enabled" : "Disabled"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refresh Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newToken">New Access Token *</Label>
              <Textarea
                id="newToken"
                placeholder="Enter your new access token..."
                value={newToken}
                onChange={(e) => setNewToken(e.target.value)}
                className="min-h-[100px] font-mono text-sm"
              />
            </div>

            {token.platform === "social" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="clientId">Client ID (Optional)</Label>
                  <Input
                    id="clientId"
                    placeholder="Enter client ID if required..."
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientSecret">Client Secret (Optional)</Label>
                  <Input
                    id="clientSecret"
                    type="password"
                    placeholder="Enter client secret if required..."
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Note:</strong> Refreshing this token will immediately update the API credentials 
                for all services using this integration. Make sure the new token has the required permissions.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isRefreshing}>
            Cancel
          </Button>
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing || !newToken.trim()}
            className="flex items-center gap-2"
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Refresh Token
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}