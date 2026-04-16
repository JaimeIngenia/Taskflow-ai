"use server";

export type TaskSearchResult = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
};

export async function searchTasks(_query: string): Promise<TaskSearchResult[]> {
  return [];
}