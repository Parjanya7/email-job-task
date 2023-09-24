import { Hash } from "crypto";

  export interface EmailStats {
    jobId: Hash,
    timestamp: Date,
    amount: number,
    status: string,
  }