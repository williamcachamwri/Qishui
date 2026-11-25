// src/idl/goapi/contract/comment.ts
// @ts-nocheck
import { fieldsAssign } from "../../_common";

function CommentActionRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["comment_id", "reply_id", "group_id", "type", "scene_name"])
    };
  }

function CreateCommentRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["group_id", "text", "reply_id", "reply_to_reply_id", "reply_to_user_id", "comment_type", "group_type", "hashtags", "text_extra", "image_list", "audio"])
    };
  }

function DeleteCommentRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, []),
      body: fieldsAssign(data, ["comment_id", "reply_id"])
    };
  }

function ListCommentsRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, []),
      query: fieldsAssign(data, ["group_id", "cursor", "count", "group_type", "image_strategy", "sort_type"]),
      body: fieldsAssign(data, [])
    };
  }

function ListRepliesRequestToRequestData(data) {
    return {
      params: fieldsAssign(data, ["comment_id"]),
      query: fieldsAssign(data, ["cursor", "count", "image_strategy", "ab_param", "group_id", "group_type"]),
      body: fieldsAssign(data, [])
    };
  }

export {
  CommentActionRequestToRequestData,
  CreateCommentRequestToRequestData,
  DeleteCommentRequestToRequestData,
  ListCommentsRequestToRequestData,
  ListRepliesRequestToRequestData
};
