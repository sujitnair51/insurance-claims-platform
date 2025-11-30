import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Controller('api/v1/claims')
export class ClaimsController {
    constructor(private readonly claimsService: ClaimsService) {}

    @Post()
    create(@Body() dto: CreateClaimDto) {
        return this.claimsService.create(dto);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.claimsService.findById(id);
    }

    @Get()
    findAll() {
        return this.claimsService.findAll();
    }

    // add Put method later for Claims update
}
