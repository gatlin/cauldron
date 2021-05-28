import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { EditorRepository } from './repository/editor.repository';
import { EditorSagas } from './sagas/editor.sagas';
import { EditorGateway } from './editor.gateway';

@Module({
  imports: [CqrsModule],
  providers: [
    EditorGateway,
    EditorRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    EditorSagas,
  ],
})
class EditorModule {}

export { EditorModule };
