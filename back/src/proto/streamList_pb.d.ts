// package: youtube.api.v3
// file: streamList.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class LiveChatMessageListRequest extends jspb.Message { 

    hasLiveChatId(): boolean;
    clearLiveChatId(): void;
    getLiveChatId(): string | undefined;
    setLiveChatId(value: string): LiveChatMessageListRequest;

    hasHl(): boolean;
    clearHl(): void;
    getHl(): string | undefined;
    setHl(value: string): LiveChatMessageListRequest;

    hasProfileImageSize(): boolean;
    clearProfileImageSize(): void;
    getProfileImageSize(): number | undefined;
    setProfileImageSize(value: number): LiveChatMessageListRequest;

    hasMaxResults(): boolean;
    clearMaxResults(): void;
    getMaxResults(): number | undefined;
    setMaxResults(value: number): LiveChatMessageListRequest;

    hasPageToken(): boolean;
    clearPageToken(): void;
    getPageToken(): string | undefined;
    setPageToken(value: string): LiveChatMessageListRequest;
    clearPartList(): void;
    getPartList(): Array<string>;
    setPartList(value: Array<string>): LiveChatMessageListRequest;
    addPart(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMessageListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMessageListRequest): LiveChatMessageListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMessageListRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMessageListRequest;
    static deserializeBinaryFromReader(message: LiveChatMessageListRequest, reader: jspb.BinaryReader): LiveChatMessageListRequest;
}

export namespace LiveChatMessageListRequest {
    export type AsObject = {
        liveChatId?: string,
        hl?: string,
        profileImageSize?: number,
        maxResults?: number,
        pageToken?: string,
        partList: Array<string>,
    }
}

export class LiveChatMessageListResponse extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): string | undefined;
    setKind(value: string): LiveChatMessageListResponse;

    hasEtag(): boolean;
    clearEtag(): void;
    getEtag(): string | undefined;
    setEtag(value: string): LiveChatMessageListResponse;

    hasOfflineAt(): boolean;
    clearOfflineAt(): void;
    getOfflineAt(): string | undefined;
    setOfflineAt(value: string): LiveChatMessageListResponse;

    hasPageInfo(): boolean;
    clearPageInfo(): void;
    getPageInfo(): PageInfo | undefined;
    setPageInfo(value?: PageInfo): LiveChatMessageListResponse;

    hasNextPageToken(): boolean;
    clearNextPageToken(): void;
    getNextPageToken(): string | undefined;
    setNextPageToken(value: string): LiveChatMessageListResponse;
    clearItemsList(): void;
    getItemsList(): Array<LiveChatMessage>;
    setItemsList(value: Array<LiveChatMessage>): LiveChatMessageListResponse;
    addItems(value?: LiveChatMessage, index?: number): LiveChatMessage;

    hasActivePollItem(): boolean;
    clearActivePollItem(): void;
    getActivePollItem(): LiveChatMessage | undefined;
    setActivePollItem(value?: LiveChatMessage): LiveChatMessageListResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMessageListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMessageListResponse): LiveChatMessageListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMessageListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMessageListResponse;
    static deserializeBinaryFromReader(message: LiveChatMessageListResponse, reader: jspb.BinaryReader): LiveChatMessageListResponse;
}

export namespace LiveChatMessageListResponse {
    export type AsObject = {
        kind?: string,
        etag?: string,
        offlineAt?: string,
        pageInfo?: PageInfo.AsObject,
        nextPageToken?: string,
        itemsList: Array<LiveChatMessage.AsObject>,
        activePollItem?: LiveChatMessage.AsObject,
    }
}

export class LiveChatMessage extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): string | undefined;
    setKind(value: string): LiveChatMessage;

    hasEtag(): boolean;
    clearEtag(): void;
    getEtag(): string | undefined;
    setEtag(value: string): LiveChatMessage;

    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): LiveChatMessage;

    hasSnippet(): boolean;
    clearSnippet(): void;
    getSnippet(): LiveChatMessageSnippet | undefined;
    setSnippet(value?: LiveChatMessageSnippet): LiveChatMessage;

    hasAuthorDetails(): boolean;
    clearAuthorDetails(): void;
    getAuthorDetails(): LiveChatMessageAuthorDetails | undefined;
    setAuthorDetails(value?: LiveChatMessageAuthorDetails): LiveChatMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMessage.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMessage): LiveChatMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMessage;
    static deserializeBinaryFromReader(message: LiveChatMessage, reader: jspb.BinaryReader): LiveChatMessage;
}

export namespace LiveChatMessage {
    export type AsObject = {
        kind?: string,
        etag?: string,
        id?: string,
        snippet?: LiveChatMessageSnippet.AsObject,
        authorDetails?: LiveChatMessageAuthorDetails.AsObject,
    }
}

export class LiveChatMessageAuthorDetails extends jspb.Message { 

    hasChannelId(): boolean;
    clearChannelId(): void;
    getChannelId(): string | undefined;
    setChannelId(value: string): LiveChatMessageAuthorDetails;

    hasChannelUrl(): boolean;
    clearChannelUrl(): void;
    getChannelUrl(): string | undefined;
    setChannelUrl(value: string): LiveChatMessageAuthorDetails;

    hasDisplayName(): boolean;
    clearDisplayName(): void;
    getDisplayName(): string | undefined;
    setDisplayName(value: string): LiveChatMessageAuthorDetails;

    hasProfileImageUrl(): boolean;
    clearProfileImageUrl(): void;
    getProfileImageUrl(): string | undefined;
    setProfileImageUrl(value: string): LiveChatMessageAuthorDetails;

    hasIsVerified(): boolean;
    clearIsVerified(): void;
    getIsVerified(): boolean | undefined;
    setIsVerified(value: boolean): LiveChatMessageAuthorDetails;

    hasIsChatOwner(): boolean;
    clearIsChatOwner(): void;
    getIsChatOwner(): boolean | undefined;
    setIsChatOwner(value: boolean): LiveChatMessageAuthorDetails;

    hasIsChatSponsor(): boolean;
    clearIsChatSponsor(): void;
    getIsChatSponsor(): boolean | undefined;
    setIsChatSponsor(value: boolean): LiveChatMessageAuthorDetails;

    hasIsChatModerator(): boolean;
    clearIsChatModerator(): void;
    getIsChatModerator(): boolean | undefined;
    setIsChatModerator(value: boolean): LiveChatMessageAuthorDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMessageAuthorDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMessageAuthorDetails): LiveChatMessageAuthorDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMessageAuthorDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMessageAuthorDetails;
    static deserializeBinaryFromReader(message: LiveChatMessageAuthorDetails, reader: jspb.BinaryReader): LiveChatMessageAuthorDetails;
}

export namespace LiveChatMessageAuthorDetails {
    export type AsObject = {
        channelId?: string,
        channelUrl?: string,
        displayName?: string,
        profileImageUrl?: string,
        isVerified?: boolean,
        isChatOwner?: boolean,
        isChatSponsor?: boolean,
        isChatModerator?: boolean,
    }
}

export class LiveChatMessageSnippet extends jspb.Message { 

    hasType(): boolean;
    clearType(): void;
    getType(): LiveChatMessageSnippet.TypeWrapper.Type | undefined;
    setType(value: LiveChatMessageSnippet.TypeWrapper.Type): LiveChatMessageSnippet;

    hasLiveChatId(): boolean;
    clearLiveChatId(): void;
    getLiveChatId(): string | undefined;
    setLiveChatId(value: string): LiveChatMessageSnippet;

    hasAuthorChannelId(): boolean;
    clearAuthorChannelId(): void;
    getAuthorChannelId(): string | undefined;
    setAuthorChannelId(value: string): LiveChatMessageSnippet;

    hasPublishedAt(): boolean;
    clearPublishedAt(): void;
    getPublishedAt(): string | undefined;
    setPublishedAt(value: string): LiveChatMessageSnippet;

    hasHasDisplayContent(): boolean;
    clearHasDisplayContent(): void;
    getHasDisplayContent(): boolean | undefined;
    setHasDisplayContent(value: boolean): LiveChatMessageSnippet;

    hasDisplayMessage(): boolean;
    clearDisplayMessage(): void;
    getDisplayMessage(): string | undefined;
    setDisplayMessage(value: string): LiveChatMessageSnippet;

    hasTextMessageDetails(): boolean;
    clearTextMessageDetails(): void;
    getTextMessageDetails(): LiveChatTextMessageDetails | undefined;
    setTextMessageDetails(value?: LiveChatTextMessageDetails): LiveChatMessageSnippet;

    hasMessageDeletedDetails(): boolean;
    clearMessageDeletedDetails(): void;
    getMessageDeletedDetails(): LiveChatMessageDeletedDetails | undefined;
    setMessageDeletedDetails(value?: LiveChatMessageDeletedDetails): LiveChatMessageSnippet;

    hasMessageRetractedDetails(): boolean;
    clearMessageRetractedDetails(): void;
    getMessageRetractedDetails(): LiveChatMessageRetractedDetails | undefined;
    setMessageRetractedDetails(value?: LiveChatMessageRetractedDetails): LiveChatMessageSnippet;

    hasUserBannedDetails(): boolean;
    clearUserBannedDetails(): void;
    getUserBannedDetails(): LiveChatUserBannedMessageDetails | undefined;
    setUserBannedDetails(value?: LiveChatUserBannedMessageDetails): LiveChatMessageSnippet;

    hasSuperChatDetails(): boolean;
    clearSuperChatDetails(): void;
    getSuperChatDetails(): LiveChatSuperChatDetails | undefined;
    setSuperChatDetails(value?: LiveChatSuperChatDetails): LiveChatMessageSnippet;

    hasSuperStickerDetails(): boolean;
    clearSuperStickerDetails(): void;
    getSuperStickerDetails(): LiveChatSuperStickerDetails | undefined;
    setSuperStickerDetails(value?: LiveChatSuperStickerDetails): LiveChatMessageSnippet;

    hasNewSponsorDetails(): boolean;
    clearNewSponsorDetails(): void;
    getNewSponsorDetails(): LiveChatNewSponsorDetails | undefined;
    setNewSponsorDetails(value?: LiveChatNewSponsorDetails): LiveChatMessageSnippet;

    hasMemberMilestoneChatDetails(): boolean;
    clearMemberMilestoneChatDetails(): void;
    getMemberMilestoneChatDetails(): LiveChatMemberMilestoneChatDetails | undefined;
    setMemberMilestoneChatDetails(value?: LiveChatMemberMilestoneChatDetails): LiveChatMessageSnippet;

    hasMembershipGiftingDetails(): boolean;
    clearMembershipGiftingDetails(): void;
    getMembershipGiftingDetails(): LiveChatMembershipGiftingDetails | undefined;
    setMembershipGiftingDetails(value?: LiveChatMembershipGiftingDetails): LiveChatMessageSnippet;

    hasGiftMembershipReceivedDetails(): boolean;
    clearGiftMembershipReceivedDetails(): void;
    getGiftMembershipReceivedDetails(): LiveChatGiftMembershipReceivedDetails | undefined;
    setGiftMembershipReceivedDetails(value?: LiveChatGiftMembershipReceivedDetails): LiveChatMessageSnippet;

    hasPollDetails(): boolean;
    clearPollDetails(): void;
    getPollDetails(): LiveChatPollDetails | undefined;
    setPollDetails(value?: LiveChatPollDetails): LiveChatMessageSnippet;

    hasGiftDetails(): boolean;
    clearGiftDetails(): void;
    getGiftDetails(): LiveChatGiftDetails | undefined;
    setGiftDetails(value?: LiveChatGiftDetails): LiveChatMessageSnippet;

    getDisplayedContentCase(): LiveChatMessageSnippet.DisplayedContentCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMessageSnippet.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMessageSnippet): LiveChatMessageSnippet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMessageSnippet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMessageSnippet;
    static deserializeBinaryFromReader(message: LiveChatMessageSnippet, reader: jspb.BinaryReader): LiveChatMessageSnippet;
}

export namespace LiveChatMessageSnippet {
    export type AsObject = {
        type?: LiveChatMessageSnippet.TypeWrapper.Type,
        liveChatId?: string,
        authorChannelId?: string,
        publishedAt?: string,
        hasDisplayContent?: boolean,
        displayMessage?: string,
        textMessageDetails?: LiveChatTextMessageDetails.AsObject,
        messageDeletedDetails?: LiveChatMessageDeletedDetails.AsObject,
        messageRetractedDetails?: LiveChatMessageRetractedDetails.AsObject,
        userBannedDetails?: LiveChatUserBannedMessageDetails.AsObject,
        superChatDetails?: LiveChatSuperChatDetails.AsObject,
        superStickerDetails?: LiveChatSuperStickerDetails.AsObject,
        newSponsorDetails?: LiveChatNewSponsorDetails.AsObject,
        memberMilestoneChatDetails?: LiveChatMemberMilestoneChatDetails.AsObject,
        membershipGiftingDetails?: LiveChatMembershipGiftingDetails.AsObject,
        giftMembershipReceivedDetails?: LiveChatGiftMembershipReceivedDetails.AsObject,
        pollDetails?: LiveChatPollDetails.AsObject,
        giftDetails?: LiveChatGiftDetails.AsObject,
    }


    export class TypeWrapper extends jspb.Message { 

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): TypeWrapper.AsObject;
        static toObject(includeInstance: boolean, msg: TypeWrapper): TypeWrapper.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: TypeWrapper, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): TypeWrapper;
        static deserializeBinaryFromReader(message: TypeWrapper, reader: jspb.BinaryReader): TypeWrapper;
    }

    export namespace TypeWrapper {
        export type AsObject = {
        }

        export enum Type {
    INVALID_TYPE = 0,
    TEXT_MESSAGE_EVENT = 1,
    TOMBSTONE = 2,
    FAN_FUNDING_EVENT = 3,
    CHAT_ENDED_EVENT = 4,
    SPONSOR_ONLY_MODE_STARTED_EVENT = 5,
    SPONSOR_ONLY_MODE_ENDED_EVENT = 6,
    NEW_SPONSOR_EVENT = 7,
    MEMBER_MILESTONE_CHAT_EVENT = 17,
    MEMBERSHIP_GIFTING_EVENT = 18,
    GIFT_MEMBERSHIP_RECEIVED_EVENT = 19,
    MESSAGE_DELETED_EVENT = 8,
    MESSAGE_RETRACTED_EVENT = 9,
    USER_BANNED_EVENT = 10,
    SUPER_CHAT_EVENT = 15,
    SUPER_STICKER_EVENT = 16,
    POLL_EVENT = 20,
    GIFT_EVENT = 21,
        }

    }


    export enum DisplayedContentCase {
        DISPLAYED_CONTENT_NOT_SET = 0,
        TEXT_MESSAGE_DETAILS = 19,
        MESSAGE_DELETED_DETAILS = 20,
        MESSAGE_RETRACTED_DETAILS = 21,
        USER_BANNED_DETAILS = 22,
        SUPER_CHAT_DETAILS = 27,
        SUPER_STICKER_DETAILS = 28,
        NEW_SPONSOR_DETAILS = 29,
        MEMBER_MILESTONE_CHAT_DETAILS = 30,
        MEMBERSHIP_GIFTING_DETAILS = 31,
        GIFT_MEMBERSHIP_RECEIVED_DETAILS = 32,
        POLL_DETAILS = 33,
        GIFT_DETAILS = 34,
    }

}

export class LiveChatTextMessageDetails extends jspb.Message { 

    hasMessageText(): boolean;
    clearMessageText(): void;
    getMessageText(): string | undefined;
    setMessageText(value: string): LiveChatTextMessageDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatTextMessageDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatTextMessageDetails): LiveChatTextMessageDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatTextMessageDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatTextMessageDetails;
    static deserializeBinaryFromReader(message: LiveChatTextMessageDetails, reader: jspb.BinaryReader): LiveChatTextMessageDetails;
}

export namespace LiveChatTextMessageDetails {
    export type AsObject = {
        messageText?: string,
    }
}

export class LiveChatMessageDeletedDetails extends jspb.Message { 

    hasDeletedMessageId(): boolean;
    clearDeletedMessageId(): void;
    getDeletedMessageId(): string | undefined;
    setDeletedMessageId(value: string): LiveChatMessageDeletedDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMessageDeletedDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMessageDeletedDetails): LiveChatMessageDeletedDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMessageDeletedDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMessageDeletedDetails;
    static deserializeBinaryFromReader(message: LiveChatMessageDeletedDetails, reader: jspb.BinaryReader): LiveChatMessageDeletedDetails;
}

export namespace LiveChatMessageDeletedDetails {
    export type AsObject = {
        deletedMessageId?: string,
    }
}

export class LiveChatMessageRetractedDetails extends jspb.Message { 

    hasRetractedMessageId(): boolean;
    clearRetractedMessageId(): void;
    getRetractedMessageId(): string | undefined;
    setRetractedMessageId(value: string): LiveChatMessageRetractedDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMessageRetractedDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMessageRetractedDetails): LiveChatMessageRetractedDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMessageRetractedDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMessageRetractedDetails;
    static deserializeBinaryFromReader(message: LiveChatMessageRetractedDetails, reader: jspb.BinaryReader): LiveChatMessageRetractedDetails;
}

export namespace LiveChatMessageRetractedDetails {
    export type AsObject = {
        retractedMessageId?: string,
    }
}

export class LiveChatUserBannedMessageDetails extends jspb.Message { 

    hasBannedUserDetails(): boolean;
    clearBannedUserDetails(): void;
    getBannedUserDetails(): ChannelProfileDetails | undefined;
    setBannedUserDetails(value?: ChannelProfileDetails): LiveChatUserBannedMessageDetails;

    hasBanType(): boolean;
    clearBanType(): void;
    getBanType(): LiveChatUserBannedMessageDetails.BanTypeWrapper.BanType | undefined;
    setBanType(value: LiveChatUserBannedMessageDetails.BanTypeWrapper.BanType): LiveChatUserBannedMessageDetails;

    hasBanDurationSeconds(): boolean;
    clearBanDurationSeconds(): void;
    getBanDurationSeconds(): number | undefined;
    setBanDurationSeconds(value: number): LiveChatUserBannedMessageDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatUserBannedMessageDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatUserBannedMessageDetails): LiveChatUserBannedMessageDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatUserBannedMessageDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatUserBannedMessageDetails;
    static deserializeBinaryFromReader(message: LiveChatUserBannedMessageDetails, reader: jspb.BinaryReader): LiveChatUserBannedMessageDetails;
}

export namespace LiveChatUserBannedMessageDetails {
    export type AsObject = {
        bannedUserDetails?: ChannelProfileDetails.AsObject,
        banType?: LiveChatUserBannedMessageDetails.BanTypeWrapper.BanType,
        banDurationSeconds?: number,
    }


    export class BanTypeWrapper extends jspb.Message { 

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): BanTypeWrapper.AsObject;
        static toObject(includeInstance: boolean, msg: BanTypeWrapper): BanTypeWrapper.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: BanTypeWrapper, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): BanTypeWrapper;
        static deserializeBinaryFromReader(message: BanTypeWrapper, reader: jspb.BinaryReader): BanTypeWrapper;
    }

    export namespace BanTypeWrapper {
        export type AsObject = {
        }

        export enum BanType {
    PERMANENT = 1,
    TEMPORARY = 2,
        }

    }

}

export class LiveChatSuperChatDetails extends jspb.Message { 

    hasAmountMicros(): boolean;
    clearAmountMicros(): void;
    getAmountMicros(): number | undefined;
    setAmountMicros(value: number): LiveChatSuperChatDetails;

    hasCurrency(): boolean;
    clearCurrency(): void;
    getCurrency(): string | undefined;
    setCurrency(value: string): LiveChatSuperChatDetails;

    hasAmountDisplayString(): boolean;
    clearAmountDisplayString(): void;
    getAmountDisplayString(): string | undefined;
    setAmountDisplayString(value: string): LiveChatSuperChatDetails;

    hasUserComment(): boolean;
    clearUserComment(): void;
    getUserComment(): string | undefined;
    setUserComment(value: string): LiveChatSuperChatDetails;

    hasTier(): boolean;
    clearTier(): void;
    getTier(): number | undefined;
    setTier(value: number): LiveChatSuperChatDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatSuperChatDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatSuperChatDetails): LiveChatSuperChatDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatSuperChatDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatSuperChatDetails;
    static deserializeBinaryFromReader(message: LiveChatSuperChatDetails, reader: jspb.BinaryReader): LiveChatSuperChatDetails;
}

export namespace LiveChatSuperChatDetails {
    export type AsObject = {
        amountMicros?: number,
        currency?: string,
        amountDisplayString?: string,
        userComment?: string,
        tier?: number,
    }
}

export class LiveChatSuperStickerDetails extends jspb.Message { 

    hasAmountMicros(): boolean;
    clearAmountMicros(): void;
    getAmountMicros(): number | undefined;
    setAmountMicros(value: number): LiveChatSuperStickerDetails;

    hasCurrency(): boolean;
    clearCurrency(): void;
    getCurrency(): string | undefined;
    setCurrency(value: string): LiveChatSuperStickerDetails;

    hasAmountDisplayString(): boolean;
    clearAmountDisplayString(): void;
    getAmountDisplayString(): string | undefined;
    setAmountDisplayString(value: string): LiveChatSuperStickerDetails;

    hasTier(): boolean;
    clearTier(): void;
    getTier(): number | undefined;
    setTier(value: number): LiveChatSuperStickerDetails;

    hasSuperStickerMetadata(): boolean;
    clearSuperStickerMetadata(): void;
    getSuperStickerMetadata(): SuperStickerMetadata | undefined;
    setSuperStickerMetadata(value?: SuperStickerMetadata): LiveChatSuperStickerDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatSuperStickerDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatSuperStickerDetails): LiveChatSuperStickerDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatSuperStickerDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatSuperStickerDetails;
    static deserializeBinaryFromReader(message: LiveChatSuperStickerDetails, reader: jspb.BinaryReader): LiveChatSuperStickerDetails;
}

export namespace LiveChatSuperStickerDetails {
    export type AsObject = {
        amountMicros?: number,
        currency?: string,
        amountDisplayString?: string,
        tier?: number,
        superStickerMetadata?: SuperStickerMetadata.AsObject,
    }
}

export class LiveChatFanFundingEventDetails extends jspb.Message { 

    hasAmountMicros(): boolean;
    clearAmountMicros(): void;
    getAmountMicros(): number | undefined;
    setAmountMicros(value: number): LiveChatFanFundingEventDetails;

    hasCurrency(): boolean;
    clearCurrency(): void;
    getCurrency(): string | undefined;
    setCurrency(value: string): LiveChatFanFundingEventDetails;

    hasAmountDisplayString(): boolean;
    clearAmountDisplayString(): void;
    getAmountDisplayString(): string | undefined;
    setAmountDisplayString(value: string): LiveChatFanFundingEventDetails;

    hasUserComment(): boolean;
    clearUserComment(): void;
    getUserComment(): string | undefined;
    setUserComment(value: string): LiveChatFanFundingEventDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatFanFundingEventDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatFanFundingEventDetails): LiveChatFanFundingEventDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatFanFundingEventDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatFanFundingEventDetails;
    static deserializeBinaryFromReader(message: LiveChatFanFundingEventDetails, reader: jspb.BinaryReader): LiveChatFanFundingEventDetails;
}

export namespace LiveChatFanFundingEventDetails {
    export type AsObject = {
        amountMicros?: number,
        currency?: string,
        amountDisplayString?: string,
        userComment?: string,
    }
}

export class LiveChatNewSponsorDetails extends jspb.Message { 

    hasMemberLevelName(): boolean;
    clearMemberLevelName(): void;
    getMemberLevelName(): string | undefined;
    setMemberLevelName(value: string): LiveChatNewSponsorDetails;

    hasIsUpgrade(): boolean;
    clearIsUpgrade(): void;
    getIsUpgrade(): boolean | undefined;
    setIsUpgrade(value: boolean): LiveChatNewSponsorDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatNewSponsorDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatNewSponsorDetails): LiveChatNewSponsorDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatNewSponsorDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatNewSponsorDetails;
    static deserializeBinaryFromReader(message: LiveChatNewSponsorDetails, reader: jspb.BinaryReader): LiveChatNewSponsorDetails;
}

export namespace LiveChatNewSponsorDetails {
    export type AsObject = {
        memberLevelName?: string,
        isUpgrade?: boolean,
    }
}

export class LiveChatMemberMilestoneChatDetails extends jspb.Message { 

    hasMemberLevelName(): boolean;
    clearMemberLevelName(): void;
    getMemberLevelName(): string | undefined;
    setMemberLevelName(value: string): LiveChatMemberMilestoneChatDetails;

    hasMemberMonth(): boolean;
    clearMemberMonth(): void;
    getMemberMonth(): number | undefined;
    setMemberMonth(value: number): LiveChatMemberMilestoneChatDetails;

    hasUserComment(): boolean;
    clearUserComment(): void;
    getUserComment(): string | undefined;
    setUserComment(value: string): LiveChatMemberMilestoneChatDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMemberMilestoneChatDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMemberMilestoneChatDetails): LiveChatMemberMilestoneChatDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMemberMilestoneChatDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMemberMilestoneChatDetails;
    static deserializeBinaryFromReader(message: LiveChatMemberMilestoneChatDetails, reader: jspb.BinaryReader): LiveChatMemberMilestoneChatDetails;
}

export namespace LiveChatMemberMilestoneChatDetails {
    export type AsObject = {
        memberLevelName?: string,
        memberMonth?: number,
        userComment?: string,
    }
}

export class LiveChatMembershipGiftingDetails extends jspb.Message { 

    hasGiftMembershipsCount(): boolean;
    clearGiftMembershipsCount(): void;
    getGiftMembershipsCount(): number | undefined;
    setGiftMembershipsCount(value: number): LiveChatMembershipGiftingDetails;

    hasGiftMembershipsLevelName(): boolean;
    clearGiftMembershipsLevelName(): void;
    getGiftMembershipsLevelName(): string | undefined;
    setGiftMembershipsLevelName(value: string): LiveChatMembershipGiftingDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatMembershipGiftingDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatMembershipGiftingDetails): LiveChatMembershipGiftingDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatMembershipGiftingDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatMembershipGiftingDetails;
    static deserializeBinaryFromReader(message: LiveChatMembershipGiftingDetails, reader: jspb.BinaryReader): LiveChatMembershipGiftingDetails;
}

export namespace LiveChatMembershipGiftingDetails {
    export type AsObject = {
        giftMembershipsCount?: number,
        giftMembershipsLevelName?: string,
    }
}

export class LiveChatGiftMembershipReceivedDetails extends jspb.Message { 

    hasMemberLevelName(): boolean;
    clearMemberLevelName(): void;
    getMemberLevelName(): string | undefined;
    setMemberLevelName(value: string): LiveChatGiftMembershipReceivedDetails;

    hasGifterChannelId(): boolean;
    clearGifterChannelId(): void;
    getGifterChannelId(): string | undefined;
    setGifterChannelId(value: string): LiveChatGiftMembershipReceivedDetails;

    hasAssociatedMembershipGiftingMessageId(): boolean;
    clearAssociatedMembershipGiftingMessageId(): void;
    getAssociatedMembershipGiftingMessageId(): string | undefined;
    setAssociatedMembershipGiftingMessageId(value: string): LiveChatGiftMembershipReceivedDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatGiftMembershipReceivedDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatGiftMembershipReceivedDetails): LiveChatGiftMembershipReceivedDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatGiftMembershipReceivedDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatGiftMembershipReceivedDetails;
    static deserializeBinaryFromReader(message: LiveChatGiftMembershipReceivedDetails, reader: jspb.BinaryReader): LiveChatGiftMembershipReceivedDetails;
}

export namespace LiveChatGiftMembershipReceivedDetails {
    export type AsObject = {
        memberLevelName?: string,
        gifterChannelId?: string,
        associatedMembershipGiftingMessageId?: string,
    }
}

export class LiveChatPollDetails extends jspb.Message { 

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): LiveChatPollDetails.PollMetadata | undefined;
    setMetadata(value?: LiveChatPollDetails.PollMetadata): LiveChatPollDetails;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): LiveChatPollDetails.PollStatusWrapper.PollStatus | undefined;
    setStatus(value: LiveChatPollDetails.PollStatusWrapper.PollStatus): LiveChatPollDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatPollDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatPollDetails): LiveChatPollDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatPollDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatPollDetails;
    static deserializeBinaryFromReader(message: LiveChatPollDetails, reader: jspb.BinaryReader): LiveChatPollDetails;
}

export namespace LiveChatPollDetails {
    export type AsObject = {
        metadata?: LiveChatPollDetails.PollMetadata.AsObject,
        status?: LiveChatPollDetails.PollStatusWrapper.PollStatus,
    }


    export class PollMetadata extends jspb.Message { 

        hasQuestionText(): boolean;
        clearQuestionText(): void;
        getQuestionText(): string | undefined;
        setQuestionText(value: string): PollMetadata;
        clearOptionsList(): void;
        getOptionsList(): Array<LiveChatPollDetails.PollMetadata.PollOption>;
        setOptionsList(value: Array<LiveChatPollDetails.PollMetadata.PollOption>): PollMetadata;
        addOptions(value?: LiveChatPollDetails.PollMetadata.PollOption, index?: number): LiveChatPollDetails.PollMetadata.PollOption;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): PollMetadata.AsObject;
        static toObject(includeInstance: boolean, msg: PollMetadata): PollMetadata.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: PollMetadata, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): PollMetadata;
        static deserializeBinaryFromReader(message: PollMetadata, reader: jspb.BinaryReader): PollMetadata;
    }

    export namespace PollMetadata {
        export type AsObject = {
            questionText?: string,
            optionsList: Array<LiveChatPollDetails.PollMetadata.PollOption.AsObject>,
        }


        export class PollOption extends jspb.Message { 

            hasOptionText(): boolean;
            clearOptionText(): void;
            getOptionText(): string | undefined;
            setOptionText(value: string): PollOption;

            hasTally(): boolean;
            clearTally(): void;
            getTally(): number | undefined;
            setTally(value: number): PollOption;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): PollOption.AsObject;
            static toObject(includeInstance: boolean, msg: PollOption): PollOption.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: PollOption, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): PollOption;
            static deserializeBinaryFromReader(message: PollOption, reader: jspb.BinaryReader): PollOption;
        }

        export namespace PollOption {
            export type AsObject = {
                optionText?: string,
                tally?: number,
            }
        }

    }

    export class PollStatusWrapper extends jspb.Message { 

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): PollStatusWrapper.AsObject;
        static toObject(includeInstance: boolean, msg: PollStatusWrapper): PollStatusWrapper.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: PollStatusWrapper, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): PollStatusWrapper;
        static deserializeBinaryFromReader(message: PollStatusWrapper, reader: jspb.BinaryReader): PollStatusWrapper;
    }

    export namespace PollStatusWrapper {
        export type AsObject = {
        }

        export enum PollStatus {
    UNKNOWN = 0,
    ACTIVE = 1,
    CLOSED = 2,
        }

    }

}

export class LiveChatGiftDetails extends jspb.Message { 

    hasGiftName(): boolean;
    clearGiftName(): void;
    getGiftName(): string | undefined;
    setGiftName(value: string): LiveChatGiftDetails;

    hasJewelsAmount(): boolean;
    clearJewelsAmount(): void;
    getJewelsAmount(): number | undefined;
    setJewelsAmount(value: number): LiveChatGiftDetails;

    hasGiftUrl(): boolean;
    clearGiftUrl(): void;
    getGiftUrl(): string | undefined;
    setGiftUrl(value: string): LiveChatGiftDetails;

    hasAltText(): boolean;
    clearAltText(): void;
    getAltText(): string | undefined;
    setAltText(value: string): LiveChatGiftDetails;

    hasLanguage(): boolean;
    clearLanguage(): void;
    getLanguage(): string | undefined;
    setLanguage(value: string): LiveChatGiftDetails;

    hasHasVisualEffect(): boolean;
    clearHasVisualEffect(): void;
    getHasVisualEffect(): boolean | undefined;
    setHasVisualEffect(value: boolean): LiveChatGiftDetails;

    hasComboCount(): boolean;
    clearComboCount(): void;
    getComboCount(): number | undefined;
    setComboCount(value: number): LiveChatGiftDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LiveChatGiftDetails.AsObject;
    static toObject(includeInstance: boolean, msg: LiveChatGiftDetails): LiveChatGiftDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LiveChatGiftDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LiveChatGiftDetails;
    static deserializeBinaryFromReader(message: LiveChatGiftDetails, reader: jspb.BinaryReader): LiveChatGiftDetails;
}

export namespace LiveChatGiftDetails {
    export type AsObject = {
        giftName?: string,
        jewelsAmount?: number,
        giftUrl?: string,
        altText?: string,
        language?: string,
        hasVisualEffect?: boolean,
        comboCount?: number,
    }
}

export class SuperChatEventSnippet extends jspb.Message { 

    hasChannelId(): boolean;
    clearChannelId(): void;
    getChannelId(): string | undefined;
    setChannelId(value: string): SuperChatEventSnippet;

    hasSupporterDetails(): boolean;
    clearSupporterDetails(): void;
    getSupporterDetails(): ChannelProfileDetails | undefined;
    setSupporterDetails(value?: ChannelProfileDetails): SuperChatEventSnippet;

    hasCommentText(): boolean;
    clearCommentText(): void;
    getCommentText(): string | undefined;
    setCommentText(value: string): SuperChatEventSnippet;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): string | undefined;
    setCreatedAt(value: string): SuperChatEventSnippet;

    hasAmountMicros(): boolean;
    clearAmountMicros(): void;
    getAmountMicros(): number | undefined;
    setAmountMicros(value: number): SuperChatEventSnippet;

    hasCurrency(): boolean;
    clearCurrency(): void;
    getCurrency(): string | undefined;
    setCurrency(value: string): SuperChatEventSnippet;

    hasDisplayString(): boolean;
    clearDisplayString(): void;
    getDisplayString(): string | undefined;
    setDisplayString(value: string): SuperChatEventSnippet;

    hasMessageType(): boolean;
    clearMessageType(): void;
    getMessageType(): number | undefined;
    setMessageType(value: number): SuperChatEventSnippet;

    hasIsSuperStickerEvent(): boolean;
    clearIsSuperStickerEvent(): void;
    getIsSuperStickerEvent(): boolean | undefined;
    setIsSuperStickerEvent(value: boolean): SuperChatEventSnippet;

    hasSuperStickerMetadata(): boolean;
    clearSuperStickerMetadata(): void;
    getSuperStickerMetadata(): SuperStickerMetadata | undefined;
    setSuperStickerMetadata(value?: SuperStickerMetadata): SuperChatEventSnippet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SuperChatEventSnippet.AsObject;
    static toObject(includeInstance: boolean, msg: SuperChatEventSnippet): SuperChatEventSnippet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SuperChatEventSnippet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SuperChatEventSnippet;
    static deserializeBinaryFromReader(message: SuperChatEventSnippet, reader: jspb.BinaryReader): SuperChatEventSnippet;
}

export namespace SuperChatEventSnippet {
    export type AsObject = {
        channelId?: string,
        supporterDetails?: ChannelProfileDetails.AsObject,
        commentText?: string,
        createdAt?: string,
        amountMicros?: number,
        currency?: string,
        displayString?: string,
        messageType?: number,
        isSuperStickerEvent?: boolean,
        superStickerMetadata?: SuperStickerMetadata.AsObject,
    }
}

export class SuperStickerMetadata extends jspb.Message { 

    hasStickerId(): boolean;
    clearStickerId(): void;
    getStickerId(): string | undefined;
    setStickerId(value: string): SuperStickerMetadata;

    hasAltText(): boolean;
    clearAltText(): void;
    getAltText(): string | undefined;
    setAltText(value: string): SuperStickerMetadata;

    hasAltTextLanguage(): boolean;
    clearAltTextLanguage(): void;
    getAltTextLanguage(): string | undefined;
    setAltTextLanguage(value: string): SuperStickerMetadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SuperStickerMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: SuperStickerMetadata): SuperStickerMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SuperStickerMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SuperStickerMetadata;
    static deserializeBinaryFromReader(message: SuperStickerMetadata, reader: jspb.BinaryReader): SuperStickerMetadata;
}

export namespace SuperStickerMetadata {
    export type AsObject = {
        stickerId?: string,
        altText?: string,
        altTextLanguage?: string,
    }
}

export class ChannelProfileDetails extends jspb.Message { 

    hasChannelId(): boolean;
    clearChannelId(): void;
    getChannelId(): string | undefined;
    setChannelId(value: string): ChannelProfileDetails;

    hasChannelUrl(): boolean;
    clearChannelUrl(): void;
    getChannelUrl(): string | undefined;
    setChannelUrl(value: string): ChannelProfileDetails;

    hasDisplayName(): boolean;
    clearDisplayName(): void;
    getDisplayName(): string | undefined;
    setDisplayName(value: string): ChannelProfileDetails;

    hasProfileImageUrl(): boolean;
    clearProfileImageUrl(): void;
    getProfileImageUrl(): string | undefined;
    setProfileImageUrl(value: string): ChannelProfileDetails;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChannelProfileDetails.AsObject;
    static toObject(includeInstance: boolean, msg: ChannelProfileDetails): ChannelProfileDetails.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChannelProfileDetails, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChannelProfileDetails;
    static deserializeBinaryFromReader(message: ChannelProfileDetails, reader: jspb.BinaryReader): ChannelProfileDetails;
}

export namespace ChannelProfileDetails {
    export type AsObject = {
        channelId?: string,
        channelUrl?: string,
        displayName?: string,
        profileImageUrl?: string,
    }
}

export class PageInfo extends jspb.Message { 

    hasTotalResults(): boolean;
    clearTotalResults(): void;
    getTotalResults(): number | undefined;
    setTotalResults(value: number): PageInfo;

    hasResultsPerPage(): boolean;
    clearResultsPerPage(): void;
    getResultsPerPage(): number | undefined;
    setResultsPerPage(value: number): PageInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PageInfo.AsObject;
    static toObject(includeInstance: boolean, msg: PageInfo): PageInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PageInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PageInfo;
    static deserializeBinaryFromReader(message: PageInfo, reader: jspb.BinaryReader): PageInfo;
}

export namespace PageInfo {
    export type AsObject = {
        totalResults?: number,
        resultsPerPage?: number,
    }
}
