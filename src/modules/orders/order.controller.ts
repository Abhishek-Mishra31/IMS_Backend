import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/guards/policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { UserDocument } from '../../schemas/user.schema';

@Controller('orders')
@UseGuards(JwtAuthGuard, PoliciesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @CheckPolicies((ability) => ability.can(Action.Create, 'orders'))
  @HttpCode(HttpStatus.CREATED)
  create(
    @CurrentUser() user: UserDocument,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(user._id.toString(), createOrderDto);
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.View, 'orders'))
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('my-orders')
  @CheckPolicies((ability) => ability.can(Action.View, 'orders'))
  findMyOrders(@CurrentUser() user: UserDocument) {
    return this.ordersService.findByUser(user._id.toString());
  }

  @Get(':id')
  @CheckPolicies((ability) => ability.can(Action.View, 'orders'))
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.Update, 'orders'))
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
  @Delete(':id/cancel')
  @CheckPolicies((ability) => ability.can(Action.Delete, 'orders'))
  @HttpCode(HttpStatus.OK)
  cancel(@Param('id') id: string) {
    return this.ordersService.cancel(id);
  }
}
