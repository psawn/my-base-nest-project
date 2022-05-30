import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  DKM = 'dkm',
}

type Subjects = InferSubjects<any | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role == 'admin') {
      // set action = manage + subject = all thì bên controller set thế nào cũng được
      // set action = manage thì chỉ cần trùng subject, action nào cũng được
      // set subject = all thì chỉ cần trùng action, subject nào cũng được
      can(Action.Read, 'all');
    } else {
      can(Action.Read, User, { id: user.id });
    }

    can(Action.Delete, User, { id: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
