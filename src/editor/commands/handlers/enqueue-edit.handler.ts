import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EnqueueEditCommand } from '../impl/enqueue-edit.command';
import { Logger } from '@nestjs/common';

@CommandHandler(EnqueueEditCommand)
class EnqueueEditHandler implements ICommandHandler<EnqueueEditCommand> {
  private logger: Logger = new Logger('SubmitEditHandler');
  constructor(
//    private readonly repository: EditorRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: EnqueueEditCommand) {
    this.logger.log(`EnqueueEditCommand ...`);

    const { document_id, operation, base_revision, sender_id } = command;
    this.logger.log(`enqueuing operation from ${sender_id} on doc ${document_id} [rev: ${base_revision}]
 op = ${JSON.stringify(operation)}`);
  }
}

export { EnqueueEditHandler };
