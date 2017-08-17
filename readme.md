# 支持IE8的轮播图插件
依赖jquery，1.12以上版本。使用jquery的animate方法进行动画。目前只有滑动轮播这一种效果。
## 使用方法
1. 引入`icarousel.css`样式文件和`icarousel.js`脚步文件，注意`icarousel.js`必须在`jquery`的后面引入。
2. 在`html`里设置一个放置轮播图的标签，并为之设置`class`或者`id`。须给该标签设置`width`和`height`。
3. 资源加载完成后调用`icarousel`方法初始化轮播图组件。
## 示例
```
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../src/icarousel.css">
    <style>
        .icarousel {
            width: 500px;
            height: 300px;
            margin: 20px auto;
        }
    </style>
</head>
<body>
<div class="icarousel"></div>
<div>
    <button class="start">开始</button>
    <button class="stop">停止</button>
    <button class="next">下一张</button>
    <button class="prev">上一张</button>
</div>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
        crossorigin="anonymous"></script>
<script src="../src/icarousel.js"></script>
<script>
    var carousel = $('.icarousel').icarousel({width: '20%'});
    $('.start').click(function () {
        carousel.icarousel('start');
    });
    $('.stop').click(function () {
        carousel.icarousel('pause');
    });
    $('.next').click(function () {
        carousel.icarousel('next');
    });
    $('.prev').click(function () {
        carousel.icarousel('prev');
    });
</script>
</body>
```
## 初始化参数
调用`icarousel`方法就能初始化轮播图，该方法初始化的时候可接受一个对象昨晚设置参数：
```
{
    autoPlay: true,//是否自动轮播
    hoverStop: true,//鼠标悬停时是否暂停
    duration: 2000,//轮播动画的间隔
    speed: 600,//轮播动画的速度
    images: [//需要轮播的图片，接收数组作为参数，数组元素如果是字符串，则为图片地址；如果要设置连接，则数组里设置对象
        'https://static.bootcss.com/www/assets/img/gulpjs.png?1502824502911',
        {
            src: 'https://static.bootcss.com/www/assets/img/webpack.png?1502824502911',//当数组元素为对象时的图片地址
            href: 'https://webpack.github.io/'//当数组元素为对象时的跳转链接
        },
        'https://static.bootcss.com/www/assets/img/lesscss.png?1502824502911'
    ]
};
```

## 可调用的方法
当初始化完成后，`icarousel`可接受一个字符串作为参数以调用内部方法，可接受的参数有：
* 'start': 开始轮播；
* 'pause': 停止轮播；
* 'next': 播放下一张；
* 'prev': 播放上一张；
* 'slideTo'：接受一个`number`参数，表示跳转到第几张；