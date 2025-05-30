export type Priority = "low" | "medium" | "high";
export type TaskState = "todo" | "doing" | "done";

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  storyId: string;
  estimatedHours: number;
  state: TaskState;
  createdAt: string;         
  startedAt?: string;        
  completedAt?: string;      
  assignedUserId?: string;   
  spentHours?: number;       
}
