import { User } from '../users/user.entity';
import { Action, AppAbility } from './casl-ability.factory';
import { IPolicyHandler } from './IPolicyHandler.interface';

export class ReadAllPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, User);
  }
}
