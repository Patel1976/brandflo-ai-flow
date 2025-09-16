import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, ChevronDown, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function UserHeader() {
    const [brand, setBrand] = useState("techcorp");

    return (
        <header className="border-b border-sidebar-border bg-background sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-4">
                {/* Left - Brand Dropdown */}
                <div className="flex items-center gap-4">
                    {/* Sidebar Toggle Button */}
                    <SidebarTrigger className="shrink-0" />
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Brand:</span>
                        <Select value={brand} onValueChange={setBrand}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="techcorp">TechCorp</SelectItem>
                                <SelectItem value="brandx">BrandX</SelectItem>
                                <SelectItem value="brandz">BrandZ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Center - Create Post Button */}
                {/* <div className="flex-1 flex justify-center">
                    <Button size="sm" className="gap-2">
                        <Plus className="w-4 h-4" />
                        Create Post
                    </Button>
                </div> */}

                {/* Right - Notifications + Profile */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative">
                        <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                            3
                        </span>
                    </button>

                    {/* Profile */}
                    <Link to="/profile" className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="/images/user-avatar.jpg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className="hidden sm:block text-sm font-medium">John Doe</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}