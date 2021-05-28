import { Operation } from "otis";

class EnqueueEditCommand {
  constructor(
    public readonly document_id: string,
    public readonly operation: Operation,
    public readonly base_revision: number,
    public readonly sender_id: string
  ) {}
}

export { EnqueueEditCommand };
