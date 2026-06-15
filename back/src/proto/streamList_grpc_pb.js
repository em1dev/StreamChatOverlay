// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var streamList_pb = require('./streamList_pb.js');

function serialize_youtube_api_v3_LiveChatMessageListRequest(arg) {
  if (!(arg instanceof streamList_pb.LiveChatMessageListRequest)) {
    throw new Error('Expected argument of type youtube.api.v3.LiveChatMessageListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_youtube_api_v3_LiveChatMessageListRequest(buffer_arg) {
  return streamList_pb.LiveChatMessageListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_youtube_api_v3_LiveChatMessageListResponse(arg) {
  if (!(arg instanceof streamList_pb.LiveChatMessageListResponse)) {
    throw new Error('Expected argument of type youtube.api.v3.LiveChatMessageListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_youtube_api_v3_LiveChatMessageListResponse(buffer_arg) {
  return streamList_pb.LiveChatMessageListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var V3DataLiveChatMessageServiceService = exports.V3DataLiveChatMessageServiceService = {
  // Allows a user to load live chat through a server-streamed RPC.
  streamList: {
    path: '/youtube.api.v3.V3DataLiveChatMessageService/StreamList',
    requestStream: false,
    responseStream: true,
    requestType: streamList_pb.LiveChatMessageListRequest,
    responseType: streamList_pb.LiveChatMessageListResponse,
    requestSerialize: serialize_youtube_api_v3_LiveChatMessageListRequest,
    requestDeserialize: deserialize_youtube_api_v3_LiveChatMessageListRequest,
    responseSerialize: serialize_youtube_api_v3_LiveChatMessageListResponse,
    responseDeserialize: deserialize_youtube_api_v3_LiveChatMessageListResponse,
  },
};

exports.V3DataLiveChatMessageServiceClient = grpc.makeGenericClientConstructor(V3DataLiveChatMessageServiceService, 'V3DataLiveChatMessageService');
