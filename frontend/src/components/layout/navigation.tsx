"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  IconApps,
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, User, Bell, Search, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function Navigation({
  onSidebarToggle,
  sidebarCollapsed,
  pageName = "Dashboard",
}: {
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
  pageName?: string;
}) {
  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Icons, Logo - Fixed width to match sidebar */}
          <div className="flex items-center w-64 shrink-0">
            {/* Sidebar collapse icon */}
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5"
              onClick={onSidebarToggle}
            >
              <IconLayoutSidebarLeftCollapse
                size={16}
                className={`text-gray-600 transition-transform ${
                  sidebarCollapsed ? "rotate-180" : ""
                }`}
              />
            </Button>

            {/* Menu grid icon */}
            <Button variant="ghost" size="sm" className="p-1.5">
              <IconApps size={16} className="text-gray-600" />
            </Button>

            {/* Jira Logo */}
            <Link href="/" className="flex items-center p-1.5">
              <div className="size-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 ml-2">
                GBM
              </span>
            </Link>
          </div>

          {/* Center - Page Name - Starts right after sidebar */}
          <div className="flex-1 flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 ml-4">
              {pageName}
            </h1>
          </div>

          {/* Right side - Search, Actions and User */}
          <div className="flex items-center justify-end shrink-0">
            {/* Search */}
            <div className="max-w-xs mr-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="size-4 text-gray-600" />
            </Button>

            {/* Help */}
            <Button variant="ghost" size="sm" className="p-2">
              <HelpCircle className="size-4 text-gray-600" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="size-4 text-gray-600" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative rounded-full p-1 mx-0.5 size-8"
                >
                  <Avatar className="size-6">
                    <AvatarImage src="/api/placeholder/32/32" alt="User" />
                    <AvatarFallback className="bg-orange-500 text-white text-sm">
                      A
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">Admin User</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      admin@company.com
                    </p>
                  </div>
                </div>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
