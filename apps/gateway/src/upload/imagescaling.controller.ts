import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { uploadDTO } from './dto/uploadDTO';

@Controller('imagescaling')
export class ImagescalingController {
  constructor(private readonly imagescalingService: ImagescalingService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() information: uploadDTO) {
    return this.imagescalingService.uploadImage(file, information);
  }
}
