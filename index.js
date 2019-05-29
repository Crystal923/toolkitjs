let jswToolkit = {
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
     * 密码再次确认
     * @param password  密码
     * @param confirmPassword  确认密码
     * @returns {Object}
     */
    confirmPassword (password, confirmPassword) {
        if (password !== confirmPassword) {
            obj.code = 40003;
            obj.msg = '两次输入密码不一致';
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
    },
    /**
     * 判断手机机型 
     * @returns {Boolean}   true:ios   false:Android
     */
    isIos () {
        let userAgent = navigator.userAgent.toLocaleLowerCase();
        if (/iphone|ipad|ipod/.test(userAgent)) {
            return true;
        } else if (/android/.test(userAgent)) {
            return false;
        }
    },
    /**
    * 读取cookie
    * @param c_name  cookie的key值
    * @returns cookie的value值
    */
    getCookie (c_name) {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                let c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return "";
    },
    /**
    * 存储cookie
    * @param c_name  cookie的key值
    * @param value  cookie的value值
    * @param expire  过期时间 默认100年
    */
    setCookie (c_name, value, expire = 60 * 60 * 24 * 366 * 100) {
        var date = new Date()
        date.setSeconds(date.getSeconds() + expire)    //获取秒数 date.getSetSeconds()  + （24h*60） * 60秒 * 天数  
        document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()  //toGMTString 转成格林威治时间 (GMT); 电脑端的中国时间 = 对应的GMT+8之后的
    },
    /**
     * 删除cookie，原理就是把原有的cookie的value设置为‘’
     * @param c_name  cookie的key值
     */
    delCookie (c_name) {
        this.setCookie(c_name, "", -1)
    },
    /**
     * 清除所有cookie,原理就是循环获取所有已存储的cookie的key值，根据key值将value设置为‘’
     */
    clearCookie () {
        let arr = document.cookie.split(';');
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                this.setCookie(arr[i].split('=')[0], "", -1)
            }
        }
    },
    /**
     * base64 转换为 Blob 对象
     * @param base64 
     * @param fileName 数据转换为 Blob 对象
     * @returns {Object}  Blob对象
     */
    base64ToBlob (base64, fileName) {
        var arr = base64.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        };
        let b = new Blob([u8arr], { type: mime });
        b.lastModifiedDate = new Date();
        b.name = fileName;
        return b;
    },
    /**
     * 
     * @param {*} url 接收文件的URL地址
     * @param {*} file 需要上传的file对象
     * @param {*} params 其他参数,对象形式
     * @param {*} callback 上传成功回调
     */
    upload (url, file, params, callback) {
        // FormData 对象
        var form = new FormData();
        // 文件对象
        form.append("file", file, 'img.png');
        // 其他参数
        for (var key in params) {
            form.append(key, params[key]);
        }
        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = callback;
        xhr.send(form);
    },
    /**
     * 将字符串转换为标准时间
     * @param {*} str 
     * @returns {String}  标准时间
     */
    strToTime (str) {
        return new Date(str.replace(/\-/g, "/"));
    },
    /**
     * 将字符串转换成时间戳
     * @param {*} str 
     * @returns {String} 时间戳
     */
    strToTimestamp (str) {
        return Date.parse(new Date(str.replace(/\-/g, "/")));
    },
    /**
     * 获取当前时间的时间戳
     */
    getCurrentTimestamp () {
        let date = new Date();
        let Y = date.getFullYear() + '/';
        let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "/";
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        let str = Y + M + D + h + m + s;
        return Date.parse(new Date(str.replace(/\-/g, "/")));
    },
    /**
     * 将两个时间进行对比，默认传入的时间的格式为字符串
     * @param {*} time 
     * @param {*} time2 
     * @returns  {Number} 1：time 大于 time2；0： time 等于 time2； -1：time 小于 time2
     */
    compareTime (time, time2) {
        let result = Date.parse(new Date(time.toString().replace(/\-/g, "/"))) - Date.parse(new Date(time2.toString().replace(/\-/g, "/")));
        return result > 0 ? 1 : result === 0 ? 0 : -1;
    }
}
module.exports = jswToolkit;
