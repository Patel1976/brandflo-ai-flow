import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserHeader() {
    const [brand, setBrand] = useState("techcorp");

    return (
        <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="flex h-16 items-center justify-between px-4">
                {/* Left - Brand Dropdown */}
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="shrink-0" />
                    <Select value={brand} onValueChange={setBrand}>
                        <SelectTrigger className="w-[150px] rounded-xl bg-muted/40">
                            <SelectValue placeholder="Select Brand" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="techcorp">TechCorp</SelectItem>
                            <SelectItem value="brandx">BrandX</SelectItem>
                            <SelectItem value="brandz">BrandZ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Right - Notifications + Profile */}
                <div className="flex items-center gap-3">
                    {/* Notifications */}
                    <button className="relative rounded-full p-2 hover:bg-muted transition">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
                            3
                        </span>
                    </button>

                    {/* Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 rounded-full hover:bg-muted px-2 py-1 transition">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/images/user-avatar.jpg" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <span className="hidden sm:block text-sm font-medium">John Doe</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}