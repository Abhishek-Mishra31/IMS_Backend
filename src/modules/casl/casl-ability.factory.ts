import { Ability, AbilityBuilder, AbilityClass, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '../../schemas/user.schema';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
    View = 'view',
    Edit = 'edit',
}

export type Subjects =
    | 'users'
    | 'inventory'
    | 'material'
    | 'stock'
    | 'warehouse'
    | 'all';

export type AppAbility = Ability<[Action | string, Subjects | string]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: UserDocument): AppAbility {
        const { can, build } = new AbilityBuilder<AppAbility>(
            Ability as AbilityClass<AppAbility>
        );

        if (user.permissions && Array.isArray(user.permissions)) {
            user.permissions.forEach(permission => {
                const parsed = this.parsePermission(permission);
                if (parsed) {
                    can(parsed.action, parsed.subject);
                }
            });
        }

        if (user.permissions?.includes('can_manage_all')) {
            can(Action.Manage, 'all');
        }

        return build();
    }

    private parsePermission(permission: string): { action: string; subject: string } | null {
        const match = permission.match(/^can_(\w+)_(\w+)$/);
        if (match) {
            return {
                action: match[1],
                subject: match[2],
            };
        }
        return null;
    }
}
