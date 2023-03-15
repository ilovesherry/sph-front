import Vue from 'vue';
// 引入VeeValidate
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN.js';
// 自定义校验器
VeeValidate.Validator.extend('tongyi', {
  validate: value => {
    console.log('自定义校验');
    return value;
  },
  getMessage: field => {
    console.log('协议必须统一');
    return field + '必须同意';
  }
});

Vue.use(VeeValidate, {
  events: 'change|blur'
});
// 国际化
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: field => `${field}必须与密码相同`
  },
  attributes: {
    phone: '手机',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
});