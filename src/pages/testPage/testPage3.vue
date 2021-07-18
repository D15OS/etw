<template>
    <!--    <loginForm></loginForm>-->
    <view>
        <!-- 背景图片 -->
        <!--        <image src="../../static/images/login-bg.jpg" class="bg-container" id="circle" :style="{transform: bgTransform}"-->
        <!--               mode="widthFix"></image>-->
        <view class="bg-container" :style="{transform: bgTransform}">
<!--            <image src="../../static/images/avocado.png" class="logo-img" mode="widthFix"></image>-->
        </view>
        <view class="content-container">
            <view class="logo-container">
                <image src="../../static/images/avocado.png" class="logo-image animate__animated animate__slideInUp"
                       mode="widthFix"></image>
            </view>
            <view class="btn-container">
                <button class="wx-login-btn">微信登陆</button>
                <button class="tel-login-btn">手机号登陆</button>
            </view>
        </view>

        <!--        <view class="test animate__animated animate__slideInUp"></view>-->
    </view>
</template>

<script>
    export default {
        data() {
            return {
                windowWidth: 0, //设备窗口宽度
                windowHeight: 0, //设备窗口高度
                bgTransform: 'translate(0px, 0px) scale(1.2)' //背景Transform属性
            }
        },
        onLoad() {

        },
        methods: {},
        mounted() {
            wx.getSystemInfo({
                success: res => {
                    [this.windowWidth, this.windowHeight] = [res.windowWidth, res.windowHeight]; //获取设备窗口尺寸
                }
            });
            let _this = this;
            wx.startAccelerometer({
                interval: 'game',
                success: res => {
                    wx.onAccelerometerChange(res => {
                        let {x, y, z} = res;	//获取加速度x、y、z轴数据
                        if (Math.abs(x) > this.windowWidth * 0.1 / 50) {
                            return; //判断图片水平移动是否越界
                        }
                        this.bgTransform = `translate(${x * 50}px, ${-y * 50}px) scale(1.2)`;
                        // #ifdef MP-WEIXIN
                        // this.$scope.animate('#circle', [
                        //     {translateX: x * 100, ease: 'ease'}
                        // ], 500, function () {
                        //     this.$scope.clearAnimation('#circle', {translateX: true}, function () {
                        //         // _this.xTemp = x * 100
                        //     })
                        // }.bind(this));
                        // #endif
                    });
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .bg-container {
        width: 100%;
        height: 100vh;
        transition: 0.28s transform ease;
        background: linear-gradient(#FFC600, #FF3200);
        display: flex;
        //filter: blur(rpx(50));
    }

    .content-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .logo-container {
            text-align: center;
            width: 100%;
            padding: rpx(100);
            align-items: center;
            margin-top: rpx(-500);

            .logo-image {
                margin-top: rpx(-20);
                width: 90%;
            }
        }

        .btn-container {
            width: 100%;
            position: absolute;
            bottom: rpx(250);

            .wx-login-btn {
                width: 70%;
                height: rpx(94);
                line-height: rpx(94);
                color: #2F2F2F;
                font-weight: bold;
                border-radius: rpx(200);
                background-color: #F5F5F5;
                font-size: rpx(32);
            }

            .tel-login-btn {
                margin-top: rpx(24);
                width: 70%;
                height: rpx(94);
                line-height: rpx(90);
                color: #F5F5F5;
                border-radius: rpx(200);
                border: rpx(4) solid #F5F5F5;
                background-color: rgba(0, 0, 0, 0);
                font-size: rpx(32);
            }
        }
    }

    .test {
        width: 100 rpx;
        height: 100 rpx;
        background-color: cornflowerblue;
        position: absolute;
        top: 0;
        left: 0;
    }

</style>
