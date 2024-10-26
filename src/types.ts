export enum PacketType {
  ClientUserStatus,
  ClientChatMessagePublic,
  ClientDisconnect,
  ClientStatusRequestOwn,
  ClientPong,
  ServerLoginReply,
  ServerUnused1,
  ServerChatMessage,
  ServerPing,
  ServerUserNameChanged,
  ServerUnused2,
  ServerUserData,
  ServerUserQuit,
  ServerSpectateSpectatorJoined,
  ServerSpectateSpectatorLeft,
  ServerSpectateData,
  ClientSpectateStart,
  ClientSpectateStop,
  ClientSpectateData,
  ServerUpdateCheck,
  ClientUnused3,
  ClientSpectateNoBeatmap,
  ServerSpectateNoBeatmap,
  ServerChatFocus,
  ServerNotification,
  ClientChatMessagePrivate,
  ServerMultiMatchUpdate,
  ServerMultiMatchNew,
  ServerMultiMatchDelete,
  ClientLobbyLeave,
  ClientLobbyJoin,
  ClientMultiMatchCreate,
  ClientMultiMatchJoin,
  ClientMultiMatchLeave,
  ServerUnused4,
  ServerUnused5,
  ServerMultiMatchJoinSuccess,
  ServerMultiMatchJoinFail,
  ClientMultiSlotChange,
  ClientMultiReady,
  ClientMultiSlotLock,
  ClientMultiSettingsChange,
  ServerSpectateOtherSpectatorJoined,
  ServerSpectateOtherSpectatorLeft,
  ClientMultiMatchStart,
  UnknwnUnused6,
  ServerMultiMatchStart,
  ClientMultiScoreUpdate,
  ServerMultiScoreUpdate,
  ClientMultiMatchCompleted,
  ServerMultiHostTransfer,
  ClientMultiChangeMods,
  ClientMultiMatchLoadComplete,
  ServerMultiAllPlayersLoaded,
  ClientMultiBeatmapMissing,
  ClientMultiNotReady,
  ClientMultiFailed,
  ServerMultiOtherFailed,
  ServerMultiMatchFinished,
  ClientMultiBeatmapAvailable,
  ClientMultiSkipRequest,
  ServerMultiSkip,
  ServerUnused7,
  ClientChatChannelJoin,
  ServerChatChannelJoinSuccess,
  ServerChatChannelAvailable,
  ServerChatChannelRevoked,
  ServerChatChannelAvailableAutojoin,
  ClientBeatmapInfoRequest,
  ServerBeatmapInfoReply,
  ClientMultiTransferHost,
  ServerUserPermissions,
  ServerFriendsList,
  ClientFriendsAdd,
  ClientFriendsRemove,
  ServerBanchoVersion,
  ServerMainMenuNews,
  ClientMultiChangeTeam,
  ClientChatChannelLeave,
  ClientRequestPlayerList,
  ServerUnused8,
  ServerMultiSkipRequestOther,
  ClientAway,
  ServerUserPresence,
  UnknwnUnused9,
  ClientUserStatsRequest,
  ServerRestart,
  ClientMultiInvite,
  ServerMultiInvite,
  ServerChatChannelListingComplete,
  ClientMultiChangePassword,
  ServerMultiChangePassword,
  ServerLockClient,
  ClientMultiMatchInfoRequest,
  ServerUserSilenced,
  ServerUserPresenceSingle,
  ServerUserPresenceBundle,
  ClientUserPresenceRequest,
  ClientUserPresenceRequestAll,
  ClientUserToggleBlockNonFriendPm,
  ServerChatPmBlocked,
  ServerChatPmTargetSilenced,
  ServerUpdateCheckForceRestart,
  ServerSwitchServer,
  ServerRestricted,
  ServerRtx,
  ClientMultiAbort,
  BanchoSwitchTourneyServer,
  ClientMultiJoinChannel,
  ClientMultiLeaveChannel,
}

export interface Packet {
  type: PacketType;
  packetName: string;
  data: Buffer;
}

export interface PacketHandlerEvents {
  "*": any;
  ServerUserData: {
    userId: number;
    status: number;
    statusText: string | null;
    beatmapChecksum: string | null;
    currentMods: number;
    playMode: number;
    beatmapId: number;
    rankedScore: bigint;
    accuracy: number;
    playCount: number;
    totalScore: bigint;
    rank: number;
    performance: number;
  };

  ServerChatMessage: {
    from: string;
    content: string;
  };

  ServerNotification: {
    content: string;
  };
}
