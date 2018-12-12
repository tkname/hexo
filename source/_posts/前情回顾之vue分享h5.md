---
title: 前情回顾之vue2.9分享h5
date: 2018-12-12 00:46:52
tags: vue分享h5
---

*在学习新技术之前，免不了要踩踩坑*

开发环境：vue+webpack+sass+html

# 安装

    淘宝镜像cnpm安装
        npm install -g cnpm --registry=https://registry.npm.taobao.org
    
    vue全局安装
        cnpm install vue

    全局安装 vue-cli
        cnpm install --global vue-cli

    创建一个基于 webpack 模板的新项目
        vue init webpack my-project
    
    cd my-project
    npm install
    npm run dev

    项目打包
        npm run build

    项目运用的到插件
        sass 安装
            npm install node-sass sass-loader --save-dev 

            css除改动
                <style lang='scss' scoped>

# 生命周期

    beforeCreate: function() {
      console.group('------beforeCreate创建前状态------');
      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
      console.log("%c%s", "color:red","message: " + this.message) 
    },
    created: function() {
      console.group('------created创建完毕状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount挂载前状态------');
      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
    },
    mounted: function() {
      console.group('------mounted 挂载结束状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);   
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el); 
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);  
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message)
    }

# 使用

    - 数据绑定
        data () {
            return {
         
            }
        }

    - 页面方法
        methods:{

        }
    
    - 父页面取值
        props:{
            val:<type>
        }

    - 开始布局页面
        页面插入数据 {{ message }}
        页面事件交互数据插入 v-show="maskShowState"
        页面dom属性数据带入 :src="'../assets/images/' + e "
        因图片放在'src/assets'目录下，需要特殊处理
            :src="require('../assets/images/repeat-title.png')"

    - 页面显示 v-if 与 v-show
        一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，
        则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
    
    - 页面事件
        点击事件，v-on:可以简写为@click
            v-on:click=""  

        阻止单击事件继续传播
            @click.stop="doThis"

        提交事件不再重载页面
            @submit.prevent="onSubmit"
        
        修饰符可以串联
            @click.stop.prevent="onSubmit"
        
        只有修饰符
            @submit.prevent
        
        添加事件监听器时使用事件捕获模式
        即元素自身触发的事件先在此处理，然后才交由内部元素进行处理
            <div v-on:click.capture="doThis">...</div>

        只当在 event.target 是当前元素自身时触发处理函数
        即事件不是从内部元素触发的
            <div v-on:click.self="doThat">...</div>
        
        按键修饰符
            @keyup.enter="submit"
                .enter
                .tab
                .delete (捕获“删除”和“退格”键)
                .esc
                .space
                .up
                .down
                .left
                .right
    
    - 子组件建立与调用
        父组件
            页面调用
                <title-bar></title-bar>

            配置
                import TitleBar from '@/components/TitleBar'
                components:{
                    TitleBar,
                }
            
            调用子组件函数
                methods：{
                    this.$refs.titleBar.hideSetting();
                }

                <title-bar ref="titleBar"></title-bar>

                子组件
                    methods：{
                        hideSetting(){

                        }
                    }
                    
            父组件传值
                <title-bar :navigation="navigation"></title-bar>
                
                子页面接收
                    props:{
                        navigation:{
                            type:Boolean,
                            default:false
                        },
                    },
        
        子组件
            调用父组件函数
                this.$emit('jumpTo',target)
                父组件
                    <title-bar @jumpTo="jumpTo"></title-bar>
                    methods:{
                        jumpTo(e){
                            
                        }
                    }

    - vue动画    transtion
        html
            <transition name="slide-down">
            
            </transition>

        css
            .slide-up-enter,.slide-up-leave-to{
            transform: translate3d(0,2.16rem,0)
            }
            .slide-down-enter,.slide-down-leave-to{
            transform: translate3d(0,-100%,0)
            }
            .slide-down-enter-to,.slide-down-leave,.slide-up-enter-to,
            .slide-up-leave{
            transform: translate3d(0,0,0)
            }
            .slide-down-enter-active,.slide-down-leave-active,
            .slide-up-enter-active,.slide-up-leave-active{
            transition: all .3s linear;
            }

            .fade-enter,.fade-leave-to{
            opacity: 0;
            }
            .fade-enter-to,.fade-leave{
            opacity: 1;
            }

# 接口请求

    - 微信分享jsonp接口请求
        安装axios vue-jsonp 'src/main.js'
            import  VueJsonp from 'vue-jsonp'
            Vue.use(VueJsonp)
        
    - 提取公共代码 'src/util/public/main.js'
            import wx from 'weixin-js-sdk'
            import axios from 'axios'

            function share(data,that,callback){
            wx.config({
                // debug: true,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow'
                ]
            });
            console.log(wx);
            wx.ready(function () {
                // 在这里调用 API
                // 2. 分享接口
                // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                console.log("来了 老弟！", that.shareData.title);
                // wx.hideAllNonBaseMenuItem();
                wx.onMenuShareAppMessage({
                    title: that.shareData.title,
                    desc: that.shareData.desc,
                    link: that.shareData.link,
                    imgUrl: that.shareData.imgUrl,
                    trigger: function (res) {
                        // alert('用户点击发送给朋友');
                    },
                    success: function (res) {
                        // alert('成功');
                        callback('friend');
                    },
                    cancel: function (res) {
                        // alert('已取消');
                    },
                    fail: function (res) {
                        // alert(JSON.stringify(res));
                    }
                });

                // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口

                wx.onMenuShareTimeline({
                    title: that.shareData.title,
                    link: that.shareData.link,
                    imgUrl: that.shareData.imgUrl,
                    trigger: function (res) {
                        // alert('用户点击分享到朋友圈');
                    },
                    success: function (res) {
                        callback('friends');
                    },
                    cancel: function (res) {
                        // alert('已取消');
                    },
                    fail: function (res) {
                        // alert(JSON.stringify(res));
                    }
                });
            }); //end of wx.ready

            }

            function ajax(api,param,success,errors){
            axios({
                method: 'post',
                url: api,
                data:param,
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function (response) {
                console.log(response.data);
                success(response);
            })
            .catch(function (error) {
                console.log(error);
                errors(error);
            });
            }

            export {share,ajax}
    
    - 页面调用js
        引入
            import {share,ajax} from './util/public/main.js'

        created(){

            //微信分享
            let that=this;
            let url="http://app.hocodo.com/webapps/weixinservice/weixinservice.php?callback=?";
            let sendData={"param": JSON.stringify(this.shareInfo)};
            this.urlData=this.$route.query;


            let param_user={
                openid:this.urlData.openid,
                smscode:this.urlData.smscode,
                stamp:this.urlData.stamp,
                result:this.urlData.result,
                cinemaid:this.urlData.cinemaID
            }

            this.$jsonp(url,sendData).then(data => {
                　// 返回数据 json， 返回的数据就是json格式
                share(data,that,function(type){

                    //判断用户是否中将
                    ajax(that.apiUrl+'con=Award&mod=info',param_user,function(res){
                        res=res.data;
                        if(res.code==200){
                        // 未参与
                        that.pageIndex=2;
                        that.qrcode=res.data.code;
                        that.htmlSuccess=true;
                        }else if(res.code==502){
                        //用户没用中将
                        that.pageIndex=2;
                        that.htmlSuccess=false;
                        }else{
                        that.$layer.msg(res.message);
                        }
                        that.maskShowState=false;
                    },function(error){

                    })

                });
            }).catch(err => {
                console.log(err)
            })

            接口请求

            ajax(this.apiUrl+'con=Award&mod=check',param,function(res){
                res=res.data;
                if(res.code==200){
                // 未参与
                }else if(res.code==201){
                //中过奖
                that.pageIndex=2;
                that.qrcode=res.data.code;
                that.prize_state=false;
                }else if(res.code==502){
                //用户没用中将
                that.pageIndex=2;
                that.htmlSuccess=false;

                }else{
                that.$layer.msg(res.message);
                }
            },function(error){
                console.log(error);
            });

        }
# 使用问题

    1.打包路径问题 config/index.js 替换
            build: {
                // Template for index.html
                index: path.resolve(__dirname, '../dist/index.html'),

                // Paths
                assetsRoot: path.resolve(__dirname, '../dist'),
                assetsSubDirectory: './static', 替换
                assetsPublicPath: './',         替换

        bulid/utils.js 添加
        
        47    if (options.extract) {
        48        return ExtractTextPlugin.extract({
                    use: loaders,
                    publicPath:'../../', 添加
                    fallback: 'vue-style-loader'

    2.vue得到解析url参数值
        this.$route.query;

    3.打包放服务器不显示 'src/router/index.js'
        export default new Router({
            mode:'history',         //不在跟vue默认后缀,比如# 目前发现开启页面不能跳转
            base: '/apps/gzqg/',    //打包只能识别的域名根目录
            routes: [

    4.vue请求数据默认为json格式，需改变成formData
        axios({
            method: 'post',
            url: api,
            data:param,
            //start
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            //end
        }).then(function (response) {
            console.log(response.data);
            success(response);
        }).catch(function (error) {
            console.log(error);
            errors(error);
        });
