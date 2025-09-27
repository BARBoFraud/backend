import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@ApiTags('Modulo de carga de imagenes')
@Controller({ version: '1', path: 'images' })
export class ImagesController {
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: join(__dirname, '../../public/uploads'),
                filename: (_req, file, cb) => {
                    const ext = extname(file.originalname);
                    const baseName = Date.now();
                    cb(null, `${baseName}${ext}`);
                }
            })
        })
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            fileKey: `${file.filename}`,
            url: `http://localhost:3000/public/uploads/${file.filename}`
        };
    }
}
