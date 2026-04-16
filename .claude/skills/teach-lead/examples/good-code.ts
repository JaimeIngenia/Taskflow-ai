export {};

type TaskStatus = "todo" | "in_progress" | "done";
type TaskPriority = "low" | "medium" | "high";

type TaskEntity = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};

type CreateTaskInput = {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};

interface TaskRepository {
  save(task: TaskEntity): Promise<void>;
  update(task: TaskEntity): Promise<void>;
  findById(id: string): Promise<TaskEntity | null>;
}

interface Notifier {
  notify(message: string): Promise<void>;
}

interface Analytics {
  track(event: string, payload?: Record<string, string>): void;
}

interface IdGenerator {
  generate(): string;
}

class TaskValidator {
  validate(input: CreateTaskInput): void {
    if (!input.title || input.title.trim().length < 3) {
      throw new Error("Title must have at least 3 characters");
    }
  }
}

class TaskFactory {
  constructor(private readonly idGenerator: IdGenerator) {}

  create(input: CreateTaskInput): TaskEntity {
    return {
      id: this.idGenerator.generate(),
      title: input.title.trim(),
      status: input.status,
      priority: input.priority,
    };
  }
}

class TaskService {
  constructor(
    private readonly repository: TaskRepository,
    private readonly validator: TaskValidator,
    private readonly factory: TaskFactory,
    private readonly notifier: Notifier,
    private readonly analytics: Analytics
  ) {}

  async createTask(input: CreateTaskInput): Promise<TaskEntity> {
    this.validator.validate(input);

    const task = this.factory.create(input);

    await this.repository.save(task);
    await this.notifier.notify(`Task created: ${task.title}`);
    this.analytics.track("task_created", { taskId: task.id });

    return task;
  }

  async moveTask(taskId: string, targetStatus: TaskStatus): Promise<TaskEntity> {
    const task = await this.repository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    const updatedTask: TaskEntity = {
      ...task,
      status: targetStatus,
    };

    await this.repository.update(updatedTask);
    this.analytics.track("task_moved", {
      taskId,
      targetStatus,
    });

    return updatedTask;
  }
}

// Example adapter implementations

class BrowserIdGenerator implements IdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}

class ConsoleAnalytics implements Analytics {
  track(event: string, payload?: Record<string, string>) {
    console.log("[analytics]", event, payload ?? {});
  }
}