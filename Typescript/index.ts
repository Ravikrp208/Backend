import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

// Core Types & Type Inference
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user"; // Union type
}

interface Admin extends User {
  permissions: string[]; // Intersection concept
}

// Generics
class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  getAll(): T[] {
    return this.data;
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.data.find(predicate);
  }
}

// Function with type inference and unions
function createUser(
  id: number,
  name: string,
  email: string,
  role: "admin" | "user" = "user",
): User | Admin {
  const baseUser: User = { id, name, email, role };

  if (role === "admin") {
    return {
      ...baseUser,
      permissions: ["read", "write", "delete"],
    } as Admin;
  }

  return baseUser;
}

// Narrowing with type guards
function isAdmin(user: User | Admin): user is Admin {
  return "permissions" in user;
}

// Utility Types
type UserResponse = Omit<User, "email">;
type PartialUser = Partial<User>;

// Express middleware
app.use(express.json());

// Routes demonstrating TypeScript features
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "TypeScript Express Server Running!" });
});

// Generic datastore usage
const userStore = new DataStore<User | Admin>();

// Create some sample data
const user1 = createUser(1, "John Doe", "john@example.com", "user");
const admin1 = createUser(2, "Admin User", "admin@example.com", "admin");

userStore.add(user1);
userStore.add(admin1);

app.get("/users", (req: Request, res: Response) => {
  const users = userStore.getAll().map((user) => {
    // Using utility type to exclude email
    const { email, ...userResponse } = user;
    return userResponse as UserResponse;
  });
  res.json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const user = userStore.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Narrowing example
  if (isAdmin(user)) {
    res.json({
      ...user,
      adminInfo: `Has ${user.permissions.length} permissions`,
    });
  } else {
    res.json(user);
  }
});

// Error handling with proper typing
app.use(
  (err: Error, req: Request, res: Response, next: express.NextFunction) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  },
);

app.listen(port, () => {
  console.log(`TypeScript Express server running at http://localhost:${port}`);
  console.log("Features demonstrated:");
  console.log("- Core Types & Interfaces");
  console.log("- Union & Intersection Types");
  console.log("- Generics");
  console.log("- Type Guards & Narrowing");
  console.log("- Utility Types");
  console.log("- Express with TypeScript");
});
