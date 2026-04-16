export {};

type TaskStatus = "todo" | "in_progress" | "done";

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
};

class EmailService {
  send(message: string) {
    console.log("sending email...", message);
  }
}

class AnalyticsService {
  track(event: string) {
    console.log("tracking...", event);
  }
}

class TaskManager {
  private tasks: Task[] = [];
  private emailService = new EmailService(); // DIP violation
  private analytics = new AnalyticsService(); // DIP violation

  // SRP violation: valida, persiste, notifica, renderiza, trackea
  createTask(title: string, status: string, priority: string): string {
    if (!title || title.length < 3) {
      throw new Error("Invalid title");
    }

    if (
      status !== "todo" &&
      status !== "in_progress" &&
      status !== "done"
    ) {
      throw new Error("Invalid status");
    }

    if (
      priority !== "low" &&
      priority !== "medium" &&
      priority !== "high"
    ) {
      throw new Error("Invalid priority");
    }

    const task: Task = {
      id: Date.now().toString(),
      title,
      status: status as TaskStatus,
      priority: priority as "low" | "medium" | "high",
    };

    this.tasks.push(task);

    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    this.emailService.send(`Task created: ${title}`);
    this.analytics.track("task_created");

    return `
      <div class="task ${task.status}">
        <h3>${task.title}</h3>
        <span>${task.priority}</span>
      </div>
    `;
  }

  // OCP violation: switch rígido
  moveTask(taskId: string, targetStatus: TaskStatus): void {
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    switch (targetStatus) {
      case "todo":
        task.status = "todo";
        break;
      case "in_progress":
        task.status = "in_progress";
        break;
      case "done":
        task.status = "done";
        break;
      default:
        throw new Error("Unsupported status");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    this.analytics.track("task_moved");
  }

  // SRP violation: lógica de UI dentro de clase de dominio
  renderKanbanBoard(): string {
    return `
      <section>
        <h1>Kanban Board</h1>
        <div>${this.tasks
          .map(
            (task) => `
            <article>
              <strong>${task.title}</strong>
              <p>${task.status}</p>
              <small>${task.priority}</small>
            </article>
          `
          )
          .join("")}
        </div>
      </section>
    `;
  }

  // ISP violation: devuelve demasiada información acoplada
  getDashboardData(): {
    tasks: Task[];
    total: number;
    completed: number;
    html: string;
    exportedJson: string;
    lastSyncAt: string;
  } {
    return {
      tasks: this.tasks,
      total: this.tasks.length,
      completed: this.tasks.filter((t) => t.status === "done").length,
      html: this.renderKanbanBoard(),
      exportedJson: JSON.stringify(this.tasks),
      lastSyncAt: new Date().toISOString(),
    };
  }
}

// LSP violation example
class ReadOnlyTaskManager extends TaskManager {
  override createTask(title: string, status: string, priority: string): string {
    throw new Error("This manager cannot create tasks");
  }
}