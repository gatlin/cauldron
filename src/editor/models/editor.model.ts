import { AggregateRoot } from '@nestjs/cqrs';
import { Value, represent } from 'otis';

class Editor extends AggregateRoot {
  protected document: Value = represent({
    a: 2,
    b: ['cool', false],
  });

  constructor(private readonly id: string) {
    super();
  }
}

export { Editor };
