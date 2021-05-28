import { Module } from '@nestjs/common';
import { EditorModule } from './editor/editor.module';

@Module({
  imports: [EditorModule],
})
class AppModule {}

export { AppModule };
