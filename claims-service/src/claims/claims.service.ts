import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Injectable()
export class ClaimsService {
    constructor(private readonly prisma: PrismaService) {}

    create(dto: CreateClaimDto) {
        return this.prisma.claim.create({
            data: {
                policyNumber: dto.policyNumber,
                claimType: dto.claimType,
                amount: dto.amount,
                customerId: dto.customerId,
                incidentDate: new Date(dto.incidentDate),
                description: dto.description,
                status: 'PENDING',
            }
        });
    }

    findById(id: string){
        return this.prisma.claim.findUnique({ where: { id } });
    }

    findAll() {
        return this.prisma.claim.findMany();
    }

    // have to add updateClaim logic here
}
