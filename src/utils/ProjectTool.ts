import Identicon from 'identicon.js'
import sha256 from 'crypto-js/sha256';


/**
 * 返回头像的字符串用于 img 元素的src
 * @param username 用户名
 * @returns  头像字符串
 */
function getHeadImage(username: string|undefined):string{

  if(username == undefined) return '';

  const data = new Identicon(sha256(username).toString().substr(0,15), 30).toString();
  return `data:image/png;base64,${data}`;
}

export {
  getHeadImage,

}