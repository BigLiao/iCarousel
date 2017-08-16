/**
 * 轮播图插件
 * 要先引入jQuery
 * */

(function ($) {

//定义轮播图组件的构造函数
function Carousel(el, option) {
    //目标元素
    this.el = el;
    //滑动块
    this.ul;
    //图片列表
    this.items;
    //图片个数
    this.itemsLength;
    //当前播放图片
    this.current;
    //每个图片的宽度
    this.itemWidth;
}
//初始化
Carousel.prototype.init = function () {
    //在相应位置生成HTML
    var ul = $('<ul></ul>');
    this.el.append(ul);
};
//开始
Carousel.prototype.start = function () {
    //动画开始
};
//暂停
Carousel.prototype.pause = function () {
    //鼠标悬浮的时候暂停
};
//播放下一张
Carousel.prototype.next = function () {

};
//播放上一张
Carousel.prototype.prev = function () {

};
//滑动播放
Carousel.prototype.slideTo = function () {

};

//绑定插件函数
$.fn.carousel = function (option) {
    var data = new Carousel(this, option);
    data.init();
}

})(jQuery);