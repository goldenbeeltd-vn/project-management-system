"use client";

import Board from "@/components/features/board";

export function ProjectTasksTab() {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div className="border-b pb-2">
        <h3 className="text-lg font-semibold">Tasks</h3>
      </div>
      <div className="flex flex-col h-[calc(100vh-250px)] min-h-[600px]">
        <Board />
      </div>
    </div>
  );
}
