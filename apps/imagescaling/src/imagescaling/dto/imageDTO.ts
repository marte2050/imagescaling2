import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class ImageMetadataDTO {
  @IsString()
  key!: string;

  @Type(() => Number)
  @IsNumber()
  width!: number;

  @Type(() => Number)
  @IsNumber()
  height!: number;
}

export class imageDTO {
  @ValidateNested()
  @Type(() => ImageMetadataDTO)
  metadata!: ImageMetadataDTO;
}

export class notificationDTO {
  @IsString()
  key!: string;

  @IsString()
  email!: string;
}
