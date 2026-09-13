import { Request, Response } from "express";
declare const create: (req: Request, res: Response) => Promise<void>;
declare const getAll: (req: Request, res: Response) => Promise<void>;
declare const getExpenseByCategory: (req: Request, res: Response) => Promise<void>;
declare const getById: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
declare const update: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
declare const remove: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
declare const summary: (req: Request, res: Response) => Promise<void>;
export { create, getAll, getExpenseByCategory, getById, update, remove, summary };
//# sourceMappingURL=transactionController.d.ts.map