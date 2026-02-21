import type { User } from "@prisma/client";

export type OnBoardUserResult = 
  | { success: true; user: User; message: string }
  | { success: false; error: string };

export type CurrentUserResult = Pick<User, "id" | "email" | "name" | "image" | "clerkId"> | null;