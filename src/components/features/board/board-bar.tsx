import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/types/common";

interface BoardBarProps {
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (project: Project) => void;
}

const BoardBar = ({
  projects,
  activeProject,
  setActiveProject,
}: BoardBarProps) => {
  const users = activeProject?.users || [];

  return (
    <div className="flex items-center justify-between py-2">
      {/* Left side */}
      <div className="flex items-center bg-white border border-input rounded-md shadow-xs">
        <span className="text-sm text-gray-700 px-3 py-2 border-r border-input">
          Project
        </span>
        <Select
          value={activeProject?.id}
          onValueChange={(id) => {
            const found = projects.find((p) => p.id === id);
            if (found) setActiveProject(found);
          }}
        >
          <SelectTrigger className="min-w-[160px] rounded-s-none border-0 shadow-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Select project">
              <div className="flex items-center gap-2">
                {activeProject && (
                  <>
                    <Avatar className="h-6 w-6 border">
                      <AvatarImage src={activeProject.users[0]?.avatar} />
                      <AvatarFallback>{activeProject.title[0]}</AvatarFallback>
                    </Avatar>
                    <span>{activeProject.title}</span>
                  </>
                )}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border">
                    <AvatarImage src={p.users[0]?.avatar} />
                    <AvatarFallback>{p.title[0]}</AvatarFallback>
                  </Avatar>
                  <span>{p.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right side */}
      <div className="flex items-center -space-x-2">
        {users.slice(0, 6).map((u) => (
          <Avatar key={u.id} className="size-8 border-2 border-white">
            <AvatarImage src={u.avatar} />
            <AvatarFallback>{u.displayName[0]}</AvatarFallback>
          </Avatar>
        ))}
        {users.length > 6 && (
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-full pointer-events-none select-none"
            tabIndex={-1}
          >
            +{users.length - 6}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardBar;
