<script setup lang=ts>
 import {ref,reactive,Ref,defineProps} from "vue";
 import {getHeadImage} from '@/utils/ProjectTool'
 import {PiMessage} from '@/types/Message';
import { type } from "os";
import {readOneMessage}  from '@/services/MessageService'

//  const message:PiMessage = reactive<PiMessage>({
//     messageMaker: "abc",
//     messageTitle: "你收到一条转账",
//     messageContent: "这是内容，这是内容<br>这是 <br> 这是李妈的内容",
//     isRead: false,
//     createTime: "2023年4月15日"
// });

const props = defineProps<{
  message:PiMessage
}>();

</script>

<template>
  <el-card style="" >
    <div class="message-head">
      <div>
        <div>
          {{ message.messageTitle}}
        </div>
        <el-link>发送时间:{{ message.createTime }}</el-link>
      </div>
      <div>
        <div>
          <img :src="getHeadImage(message.memberMaker.memberName || 'abc')" style="" alt="">
        </div>
        <div>{{ message.memberMaker.memberName }}</div>

      </div>
    </div>
    <div class="message-content" v-html="message.messageContent">
    </div>
    <div>
      <el-link type="info" title="已读" v-if="message.messageStatus == 1">已读</el-link>
      <el-link type="danger" title="点击此项将消息状态设置为已读" @click="readOneMessage(message.messageId)" v-else>点击标识已读</el-link>
    </div>

  </el-card>

</template>

<style scoped>
:deep() .el-card__body {
  margin:0;
  padding:10px;
}

.message-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-head>div:nth-child(1)>div:nth-child(1){
  font-size: 20px;
}

.message-head>div:nth-child(2) > div{
  font-size: 10px;
  color: green;
  text-align: center;

}

 .message-head>div:nth-child(2) > div>img {
    width:30px;height:30px;border-radius: 50%;box-shadow: 0 0 12px rgba(0,0,0,0.12);border:1px solid #ccc;
  }

.message-content{
  /* border:1px solid #ccc; */
  padding:2px;
  box-shadow: 0 0 12px rgba(0,0,0,0.04);
  margin: 5px 0;
}
</style>