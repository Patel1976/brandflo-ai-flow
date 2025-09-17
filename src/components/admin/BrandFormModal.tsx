import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Brand {
  id: string;
  name: string;
  owner: string;
  socialAccounts: number;
  lastActivity: string;
  status: 'active' | 'inactive';
}

interface BrandFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: Brand;
  onSave: (brandData: Omit<Brand, 'id' | 'lastActivity' | 'socialAccounts' | 'status'>) => void;
}

export function BrandFormModal({ isOpen, onClose, brand, onSave }: BrandFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    tone: "",
    contentGoals: "",
    hashtags: ""
  });

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        owner: brand.owner,
        tone: "",
        contentGoals: "",
        hashtags: ""
      });
    } else {
      setFormData({
        name: "",
        owner: "",
        tone: "",
        contentGoals: "",
        hashtags: ""
      });
    }
  }, [brand, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      owner: formData.owner
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {brand ? "Edit Brand" : "Add New Brand"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Brand Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <Select value={formData.owner} onValueChange={(value) => setFormData({ ...formData, owner: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Smith">John Smith</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Brand Tone</Label>
            <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
                <SelectItem value="playful">Playful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentGoals">Content Goals</Label>
            <Textarea
              id="contentGoals"
              value={formData.contentGoals}
              onChange={(e) => setFormData({ ...formData, contentGoals: e.target.value })}
              placeholder="Describe the brand's content goals..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hashtags">Hashtags</Label>
            <Input
              id="hashtags"
              value={formData.hashtags}
              onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
              placeholder="#brand #marketing #social"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {brand ? "Update" : "Create"} Brand
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}