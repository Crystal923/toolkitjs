module.exports = {
    /**
     * 手机号校验
     * @param phone  需要校验的手机号
     * @returns {Object}
     */
    checkPhone (phone) {
        let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|17[0-9]{1}|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
        let result = reg.test(phone);
        let obj = {};
        if (!phone || phone === '') {
            obj.code = 40001;
            obj.msg = '手机号不能为空';
        } else if (!result) {
            obj.code = 40002;
            obj.msg = '手机号格式不正确';
        } else {
            obj.code = 200;
            obj.msg = '校验成功';
        }
        return obj;
    },
    /**
     * 图形验证码校验
     * @param captcha  需要校验的图形验证码
     * @returns {Object}
     */
    checkCaptcha (captcha) {
        let reg = /^[0-9a-zA-Z]{5}$/;
        let result = reg.test(captcha);
        let obj = {};
        if (!captcha || captcha === '') {
            obj.code = 40001;
            obj.msg = '图形验证码不能为空';
        } else if (!result) {
            obj.code = 40002;
            obj.msg = '图形验证码格式不正确';
        } else {
            obj.code = 200;
            obj.msg = '校验成功';
        }
        return obj;
    },
    /**
    * 短信验证码校验
    * @param code  需要校验的短信验证码
    * @returns {Object}
    */
    checkCode (code) {
        let reg = /^[0-9]{4}$/;
        let result = reg.test(code);
        let obj = {};
        if (!code || code === '') {
            obj.code = 40001;
            obj.msg = '短信验证码不能为空';
        } else if (!result) {
            obj.code = 40002;
            obj.msg = '短信验证码格式不正确';
        } else {
            obj.code = 200;
            obj.msg = '校验成功';
        }
        return obj;
    },
    /**
    * 密码校验
    * @param password  需要校验的密码
    * @returns {Object}
    */
    checkPsw (password) {
        let reg = /^[0-9a-zA-Z!@#$%&*]{6,20}$/;
        let result = reg.test(password);
        let obj = {};
        if (!password || password === '') {
            obj.code = 40001;
            obj.msg = '密码不能为空';
        } else if (!result) {
            obj.code = 40002;
            obj.msg = '密码格式不正确';
        } else {
            obj.code = 200;
            obj.msg = '校验成功';
        }
        return obj;
    },
    /**
     * 检测客户端类型
     * @returns 0:web or 1:h5 or 2:wx
     */
    checkClient () {
        let userAgent = window.navigator.userAgent;
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(userAgent)) {
            return userAgent.toLowerCase().indexOf("micromessenger") > -1 ? 2 : 1;
        } else {
            return 0;
        }
    }
}