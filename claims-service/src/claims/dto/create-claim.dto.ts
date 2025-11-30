import { IsString, IsNumber, IsDateString, IsEnum, Min } from 'class-validator';

export enum ClaimType {
    ACCIDENT = "ACCIDENT",
    HEALTH = 'HEALTH',
    PROPERTY = 'PROPERTY',
}

export class CreateClaimDto {
    @IsString()
    policyNumber: string;

    @IsEnum(ClaimType)
    claimType: ClaimType;

    @IsNumber()
    @Min(1)
    amount: number;

    @IsString()
    customerId: string;

    @IsDateString()
    incidentDate: string;

    @IsString()
    description: string;

}