export type StoryState = "todo" | "doing" | "done";
export type Priority = "niski" | "średni" | "wysoki";

export interface Story {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  projectId: string;
  createdAt: string;
  state: StoryState;
  ownerId: string;
}