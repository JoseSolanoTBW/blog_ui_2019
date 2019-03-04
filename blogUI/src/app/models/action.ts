import { User } from './user';

export class Action {
  id: number;
  ownerAction: User;
  post: number;
  actionType: number;
  comment: number;
}
