/**
 * 轮播图插件
 * 要先引入jQuery 1.x 版本
 * */

;(function ($) {
    "use strict";

//定义轮播图组件的构造函数
var Icarousel = function (el) {
    //目标元素
    this.el = el;
    this.itemWidth = el.width();
    //当前元素下标
    this.currentNum = 0;
};
//初始化
Icarousel.prototype.init = function (option) {

    if (typeof option === 'string' || typeof option === 'number') {
        return console.error('初始化参数必须是对象');
    }

    var self = this;
    var DEFAULT = {
        height: '100%',
        width: '100%',
        autoPlay: true,
        duration: 2000,
        speed: 600,
        images: [
            'https://static.bootcss.com/www/assets/img/gulpjs.png?1502824502911',
            'https://static.bootcss.com/www/assets/img/webpack.png?1502824502911',
            'https://static.bootcss.com/www/assets/img/lesscss.png?1502824502911'
        ]
    };
    this.options = $.extend({}, DEFAULT, option);

    this.itemLength = this.options.images.length;

    var $ul = $('<ul></ul>');
    this.box = $ul;
    $ul.addClass('icarousel-box');
    this.el.addClass('icarousel').append($ul);

    //将图片资源增加到内容中
    $.each(this.options.images, function (index, item) {
       addImage(item);
    });
    //末尾重复第一张图片
    addImage(this.options.images[0]);

    function addImage (src) {
        var $img = $('<img>');
        $img.attr('src', src);
        $img.addClass('icarousel-img');
        var $li = $('<li></li>');
        $li.addClass('icarousel-item').append($img);
        $ul.append($li);
    }

    //添加箭头按钮
    var $btn = $('<div class="icarousel-btn"></div>');
    this.el.append($btn);
    var $nextBtn = $('<img class="next" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABuUlEQVR4Xu3b0U3DQBCE4dlO6ICUEDqADqAS6ASoAEqACqAESoAKFp3khygiRopnd2dl+zXyxf+XS5T4coaVH7byfmwA2wwgCbj7BYBLAO9m9k0aNnwYylvA3XcAPqarHfFXZvYZfvWEJ2ABPAC4P7ieNggsgGsAL0cvSAsECsAId/dbAI/dEGgAXRGoAB0R6ADdEEIAOiGEAXRBCAXogBAOMIMwHrozsyfCF7qzh0gBUEZIA1BFSAVQREgHUEMoAVBCKANQQSgFUEAoB6hGkACoRJABqEKQAqhAkAPIRpAEyESQBchCkAb4B+HGzF7P/h08nSgPMIMwluD2awZ4NrOxFrHokJ8BJxZcfgDszOxrUT2g/f+Amfg9a/FVdgZkxI/ZIwmQFS8JkBkvB5AdLwVQES8DUBUvAVAZXw5QHV8KoBBfBqASXwKgFJ8OoBafCqAYnwagGp8CoBwfDqAeHwrQIT4MoEt8CECneDpAt3gqQMd4GoC7/7VhYty6pt29XXr7+9T5lJui7n68ZaZFPHMGHG6aahNPA5jW78a2uQHxtrptc1Hvz4xxKZ8BGRca9RwbQJRsl3F/AdeRPFD/IEa/AAAAAElFTkSuQmCC">')
    var $prevBtn = $('<img class="prev" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACnklEQVR4XuWb4TEEQRCFuyMgAzJABicDIuAicCJABIgAESACMnAyEAIRtHpVc1VTW3d7Z3p6ptvNX7fL+677mX6zy7Tli7dcP4UEICJXRHRNRHMiOmbm79IvMhwAEXkgovNM8A0zA0bRCgVgiXiIvmTmuyL1RDFaQER2iQjf/MlA6CcRTf51CyTxb0R0OBD/xMx5KxQVgesWsBYPYm4BtBDvFoCI7BPRs1XZ573irgJEBL2Onofx5Uvl9qsMwhWAEfFTZn4scrk1F7kB0EO8Gw/oJd4FABHB/3JscvL1g00PM79blL0bExwRj90dBh3z1c0DPIjv1gJexHcBkM3yeXljqDlvVfbdPGDFOKue6DRG0cwDPIpv1gJexZsDSBPd7SDCwu99TT1fnOVpyr6JB7QaZ7UgTDwginiTFogkvjqAEfH3zDzTlqvF9dVaoOdEpwFTBUBU8VVaILJ4NYAUXn4M8jvM8jOrCEtT7suuVbWAiExSgJnf+5SZX2r/oVb30wJAgosKyJf6xNZKbPUKwA1FBGntWVQIqgpYiBYRnM5eRIRQBUCqhGXhJtoBmX6TfK+kdaoBGIGAiQ9PcbiEUBVARAjVAUSDYAIgEgQzAAkCNkrYFO1kBgVPwGbJ/NRnE1M0BZAgYLMEsTkE/MjsxHcT4YvPmAPwDqEJAM8QmgHwCqEpgAwCjHFv0KtdPKE5gAQBz//AGA8GEB6ZefoXE9N+tgsATxC6AfACoSsADxC6A+gNwQWADAKClWG6BLPE1tnkINUNgCxdahqxuQPQOmd0CaAlBLcAWkFwDSBBWJY4fyVjVOeM7gFYp0shAKyBcMTMqIiiFQbACITteW9wBQTVmyShKiDbLCFsxSM3c81bo7hfSABFzb7ioq0H8AvdWklQJKZ6cgAAAABJRU5ErkJggg==">')
    $btn.append($prevBtn).append($nextBtn);

    //监听按钮事件
    $nextBtn.click(function () {
       self.next();
    });
    $prevBtn.click(function () {
        self.prev();
    });

    //鼠标移入事件
    this.el.hover(function () {
        self.pause.apply(self);
    }, function () {
        self.start.apply(self);
    });

    //自动播放
    if (this.options.autoPlay) {
        this.start();
    }

};
//开始
Icarousel.prototype.start = function () {
    var self = this;
    (function cycle () {
        self.timmer = setTimeout(function () {
            self.currentNum++;
            self.slideTo(self.currentNum, cycle);
        }, self.options.duration);
    })();
};
//暂停
Icarousel.prototype.pause = function () {
    clearInterval(this.timmer);
};
//播放下一张
Icarousel.prototype.next = function () {
    if (this.isPlaying) {
        return;
    }
    this.currentNum++;
    this.slideTo(this.currentNum);
};
//播放上一张
Icarousel.prototype.prev = function () {
    if (this.isPlaying) {
        return;
    }
    if (this.currentNum === 0) {
        this.currentNum = this.itemLength;
        this.box.css('left', -1 * this.itemLength * this.itemWidth);
    }
    this.currentNum--;
    this.slideTo(this.currentNum);
};
//滑动播放
Icarousel.prototype.slideTo = function (i, callback) {
    if (this.isPlaying) {
        return;
    }
    this.isPlaying = true;
    var left = -i * this.itemWidth;
    var self = this;
    this.box.stop(true, true).animate({left: left}, this.options.speed, 'linear', function () {
        if (i === self.itemLength) {
            self.currentNum = 0;
            self.box.css('left', 0);
        }
        self.isPlaying = false;
        if (callback) {
            callback()
        }
    });
};

//绑定插件函数
$.fn.icarousel = function (option) {
    return this.each(function () {
       var $this = $(this);
       var carousel = $this.data('carousel');
       //第一次运行时初始化
       if (!carousel) {
           $this.data('carousel', carousel = new Icarousel($this));
           carousel.init(option);
       } else {
           //执行方法
           if (typeof option === 'string') {
               carousel[option]();
           }
       }
    });
}

})(window.jQuery);