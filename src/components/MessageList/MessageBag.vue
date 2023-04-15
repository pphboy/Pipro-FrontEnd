<script setup lang=ts>
 import {ref,reactive,Ref} from "vue";
  import MessageItem from '@/components/MessageList/MessageItem.vue';
 import {PiMessage} from '@/types/Message';

 const message:PiMessage = reactive<PiMessage>({
    messageMaker: "abc",
    messageTitle: "你收到一条转账",
    messageContent: "这是内容，这是内容<br>这是 <br> 这是李妈的内容",
    isRead: false,
    createTime: "2023年4月15日"
});
</script>

<template>
  <div class="head-btn">
    <div>
      <el-button size="small" type="success">全部已读</el-button>
    </div>
    <div>
      <el-button size="small" type="danger">清空消息</el-button>
    </div>
  </div>
  <div class="message-bag">
    <MessageItem :message="{...message}"></MessageItem>
    <MessageItem :message="{...message,isRead:true}"></MessageItem>
    <MessageItem :message="{...message,isRead:true}"></MessageItem>
    <MessageItem :message="{...message,isRead:true}"></MessageItem>
    <MessageItem :message="{...message,isRead:true}"></MessageItem>
    <MessageItem :message="{...message,isRead:true}"></MessageItem>
    <MessageItem :message="{...message,isRead:true}"></MessageItem>
    <MessageItem :message="{...message}"></MessageItem>
  </div>
</template>

<style scoped>

.head-btn {
  display: flex;
  margin-bottom: 5px;
  justify-content:space-between;
}

.message-bag {
}

</style>