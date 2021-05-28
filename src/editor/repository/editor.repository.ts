import { Injectable } from '@nestjs/common';
import { Editor } from '../models/editor.model';
/* import { Value, represent } from 'otis'; */

@Injectable()
class EditorRepository {
  async findOneById(id: string): Promise<Editor> {
    return new Editor(id);
  }

  async findAll(): Promise<Editor[]> {
    return [];
  }
}

export { EditorRepository };
