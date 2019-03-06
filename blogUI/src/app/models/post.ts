import { Action } from './action';
import { Preferences } from './preferences';
import { User } from './user';


export class Post {
  id: number;
  postText: string;
  imageSrc: string;
  postTitle: string;
  date: string;
  owner: User;
  preferences: Preferences[];
  actions: Action[];
  likeCount: number;
  commentCount: number;
}
