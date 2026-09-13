import { Request, Response } from "express";
declare const authChecking: (req: Request, res: Response) => Promise<void>;
declare const loginChecking: (req: Request, res: Response) => Promise<void>;
declare const profile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const idUser: (req: Request, res: Response) => Promise<void>;
declare const updateUser: (req: Request, res: Response) => Promise<void>;
declare const deleteUser: (req: Request, res: Response) => Promise<void>;
export { authChecking, loginChecking, profile, idUser, updateUser, deleteUser };
//# sourceMappingURL=authController.d.ts.map