import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';

@Controller('query')
export class QueryController {
    constructor(private readonly queryService: QueryService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createQueryDto: CreateQueryDto) {
        return this.queryService.create(createQueryDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.View, 'users'))
    async findAll() {
        return this.queryService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.View, 'users'))
    async findOne(@Param('id') id: string) {
        return this.queryService.findOne(id);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.Edit, 'users'))
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ) {
        return this.queryService.updateStatus(id, status);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, PoliciesGuard)
    @CheckPolicies((ability) => ability.can(Action.Delete, 'users'))
    async remove(@Param('id') id: string) {
        return this.queryService.delete(id);
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1dde1c5e03416d0b09edd374d4e8977003b79ac6
