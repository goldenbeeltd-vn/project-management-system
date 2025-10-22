"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Star,
  GitFork,
  AlertCircle,
  Plus,
  Book,
  Lock,
  Globe,
  Activity,
  ArrowUpDown,
  X,
} from "lucide-react";

interface Repository {
  id: string;
  name: string;
  url: string;
  branch: string;
  provider: "github" | "gitlab" | "bitbucket" | "custom";
  isPrivate: boolean;
  description?: string;
  status: "connected" | "disconnected" | "error" | "creating";
  lastSync?: Date;
  language?: string;
  stars?: number;
  forks?: number;
  issues?: number;
  size?: string;
}

interface SourceCodeTabProps {
  sourceSettings: {
    repositories: Repository[];
    globalAccessToken: string | undefined;
  };
  setSourceSettings: React.Dispatch<
    React.SetStateAction<{
      repositories: Repository[];
      globalAccessToken: string | undefined;
    }>
  >;
}

export function SourceCodeTab({
  sourceSettings,
  setSourceSettings,
}: SourceCodeTabProps) {
  const [isCreating, setIsCreating] = React.useState(false);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [languageFilter, setLanguageFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("updated");

  const [newRepo, setNewRepo] = React.useState<{
    name: string;
    description: string;
    provider: "github" | "gitlab" | "bitbucket";
    isPrivate: boolean;
    language: string;
  }>({
    name: "",
    description: "",
    provider: "github",
    isPrivate: false,
    language: "TypeScript",
  });

  const mockRepos: Repository[] = [
    {
      id: "1",
      name: "project-management-system",
      url: "https://github.com/username/project-management-system.git",
      branch: "main",
      provider: "github",
      isPrivate: false,
      description:
        "A comprehensive project management system built with Next.js and TypeScript",
      status: "connected",
      lastSync: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      language: "TypeScript",
      stars: 24,
      forks: 8,
      issues: 5,
      size: "2.1 MB",
    },
    {
      id: "2",
      name: "nhakhoakienhuy",
      url: "https://github.com/username/nhakhoakienhuy.git",
      branch: "main",
      provider: "github",
      isPrivate: true,
      description: "Private dental clinic management system",
      status: "connected",
      lastSync: new Date(Date.now() - 60 * 60 * 1000),
      language: "PHP",
      stars: 0,
      forks: 0,
      issues: 0,
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "window-green",
      url: "https://github.com/username/window-green.git",
      branch: "main",
      provider: "github",
      isPrivate: true,
      description: "Green window management application",
      status: "error",
      lastSync: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      language: "PHP",
      stars: 0,
      forks: 0,
      issues: 3,
      size: "956 KB",
    },
  ];

  const allRepos = [...mockRepos, ...sourceSettings.repositories];

  const handleAddRepository = () => {
    setShowAddForm(true);
  };

  const handleCreateRepository = async () => {
    if (!newRepo.name) return;

    setIsCreating(true);

    setTimeout(() => {
      const repository: Repository = {
        id: Date.now().toString(),
        name: newRepo.name,
        url: `https://${newRepo.provider}.com/username/${newRepo.name}.git`,
        branch: "main",
        provider: newRepo.provider,
        isPrivate: newRepo.isPrivate,
        description: newRepo.description,
        status: "connected",
        lastSync: new Date(),
        language: newRepo.language,
        stars: 0,
        forks: 0,
        issues: 0,
        size: "0 KB",
      };

      setSourceSettings((prev) => ({
        ...prev,
        repositories: [...prev.repositories, repository],
      }));

      setNewRepo({
        name: "",
        description: "",
        provider: "github",
        isPrivate: false,
        language: "TypeScript",
      });
      setShowAddForm(false);
      setIsCreating(false);
    }, 2000);
  };

  const handleDeleteRepository = (id: string) => {
    setSourceSettings((prev) => ({
      ...prev,
      repositories: prev.repositories.filter((repo) => repo.id !== id),
    }));
  };

  const handleSyncRepository = (id: string) => {
    setSourceSettings((prev) => ({
      ...prev,
      repositories: prev.repositories.map((repo) =>
        repo.id === id
          ? { ...repo, lastSync: new Date(), status: "connected" }
          : repo,
      ),
    }));
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      PHP: "#4F5D95",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#1572B6",
    };
    return colors[language] || "#8b5cf6";
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  const filteredRepos = allRepos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === "all" ||
      (typeFilter === "private" && repo.isPrivate) ||
      (typeFilter === "public" && !repo.isPrivate);
    const matchesLanguage =
      languageFilter === "all" || repo.language === languageFilter;

    return matchesSearch && matchesType && matchesLanguage;
  });

  const languages = [
    ...new Set(allRepos.map((repo) => repo.language).filter(Boolean)),
  ];

  const getStatusBadge = (status: Repository["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
            Connected
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-300 text-xs">
            Error
          </Badge>
        );
      case "creating":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
            Creating...
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-600 border-gray-300 text-xs">
            Disconnected
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Quản lý mã nguồn
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                Kết nối và quản lý kho lưu trữ mã nguồn của dự án
              </p>
            </div>
          </div>
          <Button onClick={handleAddRepository}>
            <Plus className="size-4 mr-2" />
            Thêm kho lưu trữ
          </Button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm kho lưu trữ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32 bg-white border-gray-300 text-gray-900">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>

          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-40 bg-white border-gray-300 text-gray-900">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all">Tất cả ngôn ngữ</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang!}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 bg-white border-gray-300 text-gray-900">
              <ArrowUpDown className="size-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="updated">Cập nhật gần nhất</SelectItem>
              <SelectItem value="name">Tên</SelectItem>
              <SelectItem value="stars">Sao</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Repository Form */}
        {showAddForm && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Tạo kho lưu trữ mới
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="size-4 mr-2"></X>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Tên kho lưu trữ *</Label>
                <Input
                  placeholder="my-awesome-project"
                  value={newRepo.name}
                  onChange={(e) =>
                    setNewRepo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Ngôn ngữ *</Label>
                <Select
                  value={newRepo.language}
                  onValueChange={(value) =>
                    setNewRepo((prev) => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label className="text-gray-700">Mô tả (tùy chọn)</Label>
                <Input
                  placeholder="A short description of this repository"
                  value={newRepo.description}
                  onChange={(e) =>
                    setNewRepo((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="private-checkbox"
                  checked={newRepo.isPrivate}
                  onChange={(e) =>
                    setNewRepo((prev) => ({
                      ...prev,
                      isPrivate: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300"
                />
                <Label
                  htmlFor="private-checkbox"
                  className="text-gray-700 flex items-center gap-2"
                >
                  Tạo kho lưu trữ riêng tư
                </Label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleCreateRepository}
                disabled={!newRepo.name || isCreating}
              >
                {isCreating ? "Đang tạo..." : "Tạo kho lưu trữ"}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Hủy
              </Button>
            </div>
          </div>
        )}

        {/* Repository List */}
        {filteredRepos.length === 0 ? (
          <div className="text-center py-12 border border-gray-300 border-dashed rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              <Book className="size-14 text-gray-400" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">
                  Không có kho lưu trữ nào được tìm thấy
                </h3>
                <p className="text-gray-500">
                  Bắt đầu bằng cách tạo kho lưu trữ đầu tiên của bạn
                </p>
              </div>
              <Button
                onClick={handleAddRepository}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                <Plus className="size-4 mr-2" />
                Tạo kho lưu trữ
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-primar cursor-pointer">
                        {repo.name}
                      </h3>
                      {repo.isPrivate ? (
                        <Badge className="bg-gray-100 text-gray-700 border-gray-300 text-xs">
                          <Lock className="h-3 mr-1" />
                          Private
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                          <Globe className="h-3 mr-1" />
                          Public
                        </Badge>
                      )}
                      {getStatusBadge(repo.status)}
                    </div>

                    {repo.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {repo.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {repo.language && (
                        <div className="flex items-center gap-2">
                          <div
                            className="size-3 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(repo.language),
                            }}
                          />
                          <span>{repo.language}</span>
                        </div>
                      )}

                      {repo.stars !== undefined && (
                        <div className="flex items-center gap-1">
                          <Star className="size-4" />
                          <span>{repo.stars}</span>
                        </div>
                      )}

                      {repo.forks !== undefined && (
                        <div className="flex items-center gap-1">
                          <GitFork className="size-4" />
                          <span>{repo.forks}</span>
                        </div>
                      )}

                      {repo.issues !== undefined && repo.issues > 0 && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="size-4" />
                          <span>
                            {repo.issues} issue{repo.issues !== 1 ? "s" : ""}
                          </span>
                        </div>
                      )}

                      {repo.lastSync && (
                        <div className="flex items-center gap-1">
                          <Activity className="size-4" />
                          <span>Updated {getTimeAgo(repo.lastSync)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(repo.url.replace(".git", ""), "_blank")
                      }
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
                    >
                      Xem
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSyncRepository(repo.id)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
                    >
                      Đồng bộ
                    </Button>
                    {!mockRepos.find((m) => m.id === repo.id) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRepository(repo.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50 text-xs"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
