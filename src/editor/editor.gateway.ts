import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  /* WsResponse, */
} from '@nestjs/websockets';
import { CommandBus } from "@nestjs/cqrs";
import { EnqueueEditCommand } from "./commands/impl/enqueue-edit.command";
import { Logger } from '@nestjs/common';
/*
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
*/
import { Socket, Server } from 'socket.io';
import { SubmitEditDto } from './interfaces/submit-edit-dto.interface';
import { LoadInitialDataDto } from "./interfaces/load-initial-data-dto.interface";
import { Value, represent, Operation, NoOp, deserialize } from 'otis';

/**
 * Mediates between WebSocket clients and our document editing services.
 * Provides the ability to broadcast messages to all clients.
 * @class
 */
@WebSocketGateway()
class EditorGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly commandBus: CommandBus
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EditorGateway');
  private clients: Record<string, { client: Socket; args: any[] }> = {};

  afterInit(server: Server) {
    this.logger.log(`Init ${server}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    delete this.clients[client.id];
    this.logger.log(`clients: ${JSON.stringify(Object.keys(this.clients))}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`...args: ${JSON.stringify(args)}`);
    this.clients[client.id] = { client, args };
    this.logger.log(`clients: ${JSON.stringify(Object.keys(this.clients))}`);
    this.broadcast(`New client! Welcome ${client.id}`);
  }

  @SubscribeMessage('submit-edit')
  async handleSubmitEdit(@MessageBody() data: SubmitEditDto): Promise<boolean> {
    const serialized = data.operation;
    const op = deserialize(JSON.parse(serialized));
    this.logger.log(`Op = ${op}`);
    this.commandBus.execute(
      new EnqueueEditCommand(
        data.document_id,
        op,
        data.base_revision,
        data.sender_id
      )
    );
    return true;
  }

  @SubscribeMessage('load-initial')
  async handleLoadInitial(@MessageBody() data: LoadInitialDataDto): Promise<Value> {
    this.logger.log(`[load-initial] data: ${data}`);
    return represent({
      a: 2,
      b: ["cool", true],
      c: null
    });
  }

  broadcast(message: string) {
    for (const [k, v] of Object.entries(this.clients)) {
      this.logger.log(`emitting to ${k}`);
      v.client.emit('broadcast', message);
    }
  }
}

export { EditorGateway };
