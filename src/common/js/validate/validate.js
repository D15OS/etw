/**
 *封装验证类
 *@param {Object} data 需要验证的数据，格式为 {username:"abc"}
 *@param {Array} rules 验证的规则，格式为 [{key:"abc"，require:true,regExp: ["email", "phone"]}]
 *@return {String} 错误信息
 **/
class Validator {
  //class类必需的构造函数
  constructor() {}
  //验证方法
  validate(data, rules) {
    let errors = {}; //存放验证错误信息
    //遍历数组中每个数据对应的每个规则对象
    rules.forEach((rule) => {
      let value = data[rule.key]; //获取这个规则验证的数据
      //是否必需
      if (rule.required) {
        let error = this.required(value);
        if (error) {
          this.setDefaultObj(errors, rule.key);
          errors[rule.key] = error;
          return;
        }
      }
      //过滤key和require这两个键
      let restKeys = Object.keys(rule).filter(
        (key) => key !== "key" && key !== "required"
      );
      //遍历剩下的规则
      restKeys.forEach((restKey) => {
        if (this[restKey]) {
          let error = this[restKey](value, rule[restKey]);
          if (error && error.length !== 0) {
            this.setDefaultObj(errors, rule.key);
            errors[rule.key][restKey] = error;
          }
        } else {
          throw `${restKey} 规则不存在`;
        }
      });
    });
    if (Object.keys(errors).length > 0) {
      return errors;
    } else {
      return true;
    }
  }
  //验证规则
  //必填
  required(value) {
    if (!value && value !== 0) {
      return "必填";
    }
  }
  //正则表达式
  regExp(value, regExpArray) {
    // regExp 可以是用户自定义的正则也可以是内置的
    let regExpErrors = [];
    regExpArray.forEach((regExpName) => {
      switch (regExpName) {
        case "phone":
          if (!/^1\d{10}$/.test(value)) {
            regExpErrors.push("手机格式错误");
          }
          break;
        case "email":
          if (!/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/.test(value)) {
            regExpErrors.push("邮箱格式错误");
          }
          break;
        default:
          //自定义正则
          if (!regExp.test(value)) {
            regExpErrors.push("格式错误");
          }
          break;
      }
    });
    return regExpErrors;
  }
  //生成对象便于赋值
  setDefaultObj(obj, key) {
    obj[key] = obj[key] || {};
  }
}

export { Validator };
