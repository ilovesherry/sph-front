import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    let localUUID = localStorage.getItem("UUID");
    if(!localUUID) { // 当本地存储中没有“UUID”时，生成新的uuid，并存储到本地后返回该值
        // 生成uuid
        let uuid = uuidv4();
        // 存储到本地
        localStorage.setItem("UUID", uuid)
        return uuid;
    }
    return localUUID;
}