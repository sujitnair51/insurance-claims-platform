import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { Logger } from 'nestjs-pino';

@Controller('api/v1/claims')
export class ClaimsController {
    constructor(
                private readonly claimsService: ClaimsService, 
                private readonly logger: Logger
            ) {}

    @Post()
    create(@Body() dto: CreateClaimDto) {
        this.logger.log('Creating a new claim!');
        return this.claimsService.create(dto);
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        this.logger.log('Fetching claim for id: ');
        return this.claimsService.findById(id);
    }

    @Get()
    findAll() {
        this.logger.log('Fetching all claims!');
        return this.claimsService.findAll();
    }

    // add Put method later for Claims update
}
