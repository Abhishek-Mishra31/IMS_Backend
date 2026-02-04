import { CheckPolicies } from '../../casl/decorators/check-policies.decorator';
import { Action } from '../../casl/casl-ability.factory';

export const CreateStockPolicy = () =>
  CheckPolicies((ability) => ability.can(Action.Create, 'stock'));

export const ReadStockPolicy = () =>
  CheckPolicies((ability) => ability.can(Action.Read, 'stock'));

export const UpdateStockPolicy = () =>
  CheckPolicies((ability) => ability.can(Action.Update, 'stock'));

export const DeleteStockPolicy = () =>
  CheckPolicies((ability) => ability.can(Action.Delete, 'stock'));
