"use server";

import { searchTasks } from "./search";
import { chatWithOllama } from "@/lib/ollama";

type TaskSearchResult = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
};

type ChatActionResult = {
  answer: string;
  relatedTasks: TaskSearchResult[];
};

function validateMessage(message: string): string {
  const cleanMessage = message.trim();

  if (!cleanMessage) {
    throw new Error("Message is required");
  }

  return cleanMessage;
}

function buildTaskContext(tasks: TaskSearchResult[]): string {
  if (tasks.length === 0) {
    return "No related tasks were found.";
  }

  return tasks
    .map(
      (task) =>
        [
          `- Title: ${task.title}`,
          `  Description: ${task.description ?? "No description"}`,
          `  Status: ${task.status}`,
          `  Priority: ${task.priority}`,
        ].join("\n")
    )
    .join("\n");
}

function buildPrompt(message: string, taskContext: string): string {
  return `
You are TaskFlow AI, an assistant that helps users manage and understand their tasks.

Answer the user's question using the provided task context when relevant.
Be concise, clear, and helpful.

User message:
${message}

Task context:
${taskContext}
  `.trim();
}

export async function chatAction(message: string): Promise<ChatActionResult> {
  const cleanMessage = validateMessage(message);

  const relatedTasks = await searchTasks(cleanMessage);
  const taskContext = buildTaskContext(relatedTasks);
  const prompt = buildPrompt(cleanMessage, taskContext);
  const answer = await chatWithOllama(prompt);

  return {
    answer,
    relatedTasks,
  };
}