import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../user/dto/user.dto';

const rootPath = '';

@Controller('file-manager')
export class FileManagerController {
  @Post('/')
  async Controller(@Body() body) {
    switch (body.action) {
      case 'details':
        this.getFileDetails(rootPath + body.path);
        break;
      case 'copy':
        this.copyFiles(rootPath);
        break;
      case 'move':
        this.moveFiles(rootPath);
        break;
      case 'create':
        this.createFolder(rootPath + body.path);
        break;
      case 'delete':
        this.deleteFolder(rootPath + body.path);
        break;
      case 'rename':
        this.renameFolder(rootPath + body.path);
        break;
      case 'read':
        break;
    }
  }

  private renameFolder(s: string) {}

  private deleteFolder(s: string) {}

  private createFolder(s: string) {}

  private moveFiles(rootPath: string) {}

  private copyFiles(rootPath: string) {}

  private getFileDetails(s: string) {}
}
