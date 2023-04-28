<script setup lang=ts>
 import {ref,reactive,Ref} from "vue";
  import MessageItem from '@/components/MessageList/MessageItem.vue';
  import { useMessageStore } from "@/store/modules/message";
 import {PiMessage} from '@/types/Message';
import {getMessageList,readOneMessage,readAllMessage,deleteAllMessage} from '@/services/MessageService'

 getMessageList();

 const messageStore = useMessageStore();
 const message:PiMessage = reactive<PiMessage>({
    messageTitle: "你收到一条转账",
    messageContent: "这是内容，这是内容<br>这是 <br> 这是李妈的内容",
    createTime: "2023年4月15日"
});
</script>

<template>
  <div class="head-btn">
    <div>
      <el-button size="small" type="success" @click="readAllMessage">全部已读</el-button>
    </div>
    <div>
      <el-button size="small" @click="deleteAllMessage" type="danger">清空消息</el-button>
    </div>
  </div>
  <div class="message-bag">
    <MessageItem v-for="(m,i) in messageStore.messageList " :message="m"></MessageItem>
    <div style="text-align: center;" v-if="!messageStore.messageList.length">
      目前无消息
    </div>
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