import { 
  IsString, 
  IsNotEmpty, 
  IsEmail, 
  IsOptional, 
  IsBoolean, 
  IsUUID, 
  IsArray 
} from 'class-validator';

export class CreateGuestDto {
  @IsUUID()
  @IsNotEmpty()
  weddingId: string;

  @IsUUID()
  @IsNotEmpty()
  sideId: string;

  @IsUUID()
  @IsOptional()
  groupId?: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  relationship?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}
