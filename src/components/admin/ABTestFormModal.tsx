import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ABTestFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ABTestFormModal({ open, onOpenChange }: ABTestFormModalProps) {
  const [formData, setFormData] = useState({
    selectedPost: "",
    variantA: "",
    variantB: "",
    duration: 7,
    audienceSplit: 50,
    platforms: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Creating A/B test:", formData);
    onOpenChange(false);
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New A/B Test</DialogTitle>
          <DialogDescription>
            Set up a new A/B test to compare different versions of your content
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Selection */}
          <div className="space-y-2">
            <Label htmlFor="selectedPost">Select Post</Label>
            <Select value={formData.selectedPost} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, selectedPost: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Search and select a post..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="post1">TechCorp - Summer Sale Campaign</SelectItem>
                <SelectItem value="post2">StartupXYZ - Product Launch</SelectItem>
                <SelectItem value="post3">BrandABC - Brand Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Variants */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Variant A (Control)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter variant A content..."
                  value={formData.variantA}
                  onChange={(e) => setFormData(prev => ({ ...prev, variantA: e.target.value }))}
                  rows={4}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Variant B (Test)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter variant B content..."
                  value={formData.variantB}
                  onChange={(e) => setFormData(prev => ({ ...prev, variantB: e.target.value }))}
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Test Parameters */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Test Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                min={1}
                max={30}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audienceSplit">Audience Split (%)</Label>
              <Input
                id="audienceSplit"
                type="number"
                value={formData.audienceSplit}
                onChange={(e) => setFormData(prev => ({ ...prev, audienceSplit: parseInt(e.target.value) }))}
                min={10}
                max={90}
                placeholder="50"
              />
              <p className="text-xs text-muted-foreground">
                Percentage of audience for Variant A (rest goes to Variant B)
              </p>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <Label>Target Platforms</Label>
            <div className="grid grid-cols-2 gap-3">
              {["Facebook", "Instagram", "Twitter", "LinkedIn", "TikTok", "YouTube"].map(platform => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={formData.platforms.includes(platform)}
                    onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                  />
                  <Label htmlFor={platform} className="text-sm font-normal">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Launch A/B Test
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}