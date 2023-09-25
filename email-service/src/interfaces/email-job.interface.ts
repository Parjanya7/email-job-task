import { Hash } from "crypto";

export interface EmailJob {
  id: Hash;
  amount: number;
}
