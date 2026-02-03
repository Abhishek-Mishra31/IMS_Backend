import { SetMetadata } from '@nestjs/common';
import { AppAbility } from '../casl-ability.factory';
import { UserDocument } from '../../../schemas/user.schema';

export const CHECK_POLICIES_KEY = 'check_policies';

export type PolicyHandler = (
    ability: AppAbility,
    user: UserDocument,
    params?: any,
    body?: any,
) => boolean;

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
    SetMetadata(CHECK_POLICIES_KEY, handlers);
