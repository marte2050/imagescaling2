import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class ImageMetadataDTO {
  @IsString()
  key!: string;
}

export class imageDTO {
  @ValidateNested()
  @Type(() => ImageMetadataDTO)
  metadata!: ImageMetadataDTO;
}

export class mailDTO {
  @IsString()
  to!: string;

  @IsString()
  subject!: string;

  @IsString()
  html!: string;

  buffer!: Uint8Array | undefined;
}
