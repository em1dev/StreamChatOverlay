// package: youtube.api.v3
// file: streamList.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as streamList_pb from "./streamList_pb";

interface IV3DataLiveChatMessageServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    streamList: IV3DataLiveChatMessageServiceService_IStreamList;
}

interface IV3DataLiveChatMessageServiceService_IStreamList extends grpc.MethodDefinition<streamList_pb.LiveChatMessageListRequest, streamList_pb.LiveChatMessageListResponse> {
    path: "/youtube.api.v3.V3DataLiveChatMessageService/StreamList";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<streamList_pb.LiveChatMessageListRequest>;
    requestDeserialize: grpc.deserialize<streamList_pb.LiveChatMessageListRequest>;
    responseSerialize: grpc.serialize<streamList_pb.LiveChatMessageListResponse>;
    responseDeserialize: grpc.deserialize<streamList_pb.LiveChatMessageListResponse>;
}

export const V3DataLiveChatMessageServiceService: IV3DataLiveChatMessageServiceService;

export interface IV3DataLiveChatMessageServiceServer {
    streamList: grpc.handleServerStreamingCall<streamList_pb.LiveChatMessageListRequest, streamList_pb.LiveChatMessageListResponse>;
}

export interface IV3DataLiveChatMessageServiceClient {
    streamList(request: streamList_pb.LiveChatMessageListRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<streamList_pb.LiveChatMessageListResponse>;
    streamList(request: streamList_pb.LiveChatMessageListRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<streamList_pb.LiveChatMessageListResponse>;
}

export class V3DataLiveChatMessageServiceClient extends grpc.Client implements IV3DataLiveChatMessageServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public streamList(request: streamList_pb.LiveChatMessageListRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<streamList_pb.LiveChatMessageListResponse>;
    public streamList(request: streamList_pb.LiveChatMessageListRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<streamList_pb.LiveChatMessageListResponse>;
}
