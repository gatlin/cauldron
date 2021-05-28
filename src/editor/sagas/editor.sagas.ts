import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
//import { SomeCommand } from "../commands/impl/some.command";
//import { SomeEvent } from "../events/impl/some-event.event";
import { Logger } from "@nestjs/common";

@Injectable()
class EditorSagas {
  private logger: Logger = new Logger("EditorSagas");
 // @Saga()
 // submitEditSaga = (events$: Observable<any>): Observable<ICommand> => {
 //   return events$.pipe(
 //     ofType(SomeEvent),
 //     delay(1000),
 //     map(event => {
 //       this.logger.log(`[submitEditSaga] ${JSON.stringify(event)}`)
 //       return new SomeCommand("foobarbaz");
 //     })
 //   );
 // };
}

export {
  EditorSagas
};
