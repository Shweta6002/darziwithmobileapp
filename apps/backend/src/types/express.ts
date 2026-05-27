import type { Role } from "../modules/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
        email: string;
      };
      requestId?: string;
    }
  }
}
