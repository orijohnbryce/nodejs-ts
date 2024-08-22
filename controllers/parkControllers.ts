import express, { Request, Response, NextFunction } from "express";
import { getAllParks, updateParkIsTaken } from "../src/services/parkService";

export const parkRouter = express.Router();

parkRouter.patch(
  "/park/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { isTaken } = req.body;
    const { id } = req.params;

    try {
      await updateParkIsTaken(Number(id), isTaken);
      res.status(200).json({ message: "Park status updated successfully" });
    } catch (err) {
      next(err);
    }
  }
);

parkRouter.get("/park", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parks = await getAllParks();
        res.status(200).json(parks);
    } catch (err) {
        next(err);
    }
})