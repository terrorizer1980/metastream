import { IRTCPeerCoordinator } from 'lobby/rtc';
import { NetUniqueId } from 'lobby/types';

export const enum LobbyType {
  Private,
  FriendsOnly,
  Public,
  Invisible
}

export interface ILobbyOptions {
  type?: LobbyType;
  maxMembers?: number;
}

export interface ILobbySession {
  name: string;
  id: string;
}

export const enum SessionKey {
  /** Session name */
  Name = 'name',

  /** Session GUID for filtering - remove when we have our own App ID */
  Guid = 'guid',

  MaxPlayers = 'maxplayers',
  NumPlayers = 'numplayers',

  // Dedicated = 'dedi',

  /** Boolean value indicating the session is password protected */
  PasswordProtected = 'pw'
}

export interface ILobbyData {
  // see Microsoft/TypeScript#18346
  // [key in SessionKey]: string;
  [key: string]: string;
}

export abstract class Platform {
  // Matchmaking
  abstract createLobby(opts: ILobbyOptions): Promise<boolean>;
  abstract joinLobby(id: string): Promise<boolean>;
  abstract leaveLobby(id: string): boolean;
  abstract findLobbies(): Promise<ILobbySession[]>;
  abstract getLobbyData(): ILobbyData | null;

  // RTC
  abstract createPeerCoordinator(): IRTCPeerCoordinator;

  // Users
  abstract getLocalId(): NetUniqueId;
  abstract getUserName(id: NetUniqueId): string;
}
