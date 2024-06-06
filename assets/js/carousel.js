window.addEventListener('load', function () {
    let timer;
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const banners = document.querySelector('.banners');
    const images = document.querySelector('.images');
    const dots = document.querySelector('.selectors');

    let num = 0;
    let circle = 0;

    new ResizeObserver(() => {
        const w = parseInt(banners.offsetWidth);
        const h = w / 16 * 9;

        banners.style.height = h.toString()+'px'
        for (const e of document.querySelectorAll(".carousel .banners ul li img")) {
            e.style.width = w.toString()+'px';
            e.style.height = h.toString()+'px';
        }

        animate(images, -num * w);
    }).observe(banners);


    banners.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;//清除计时器
    });
    //3. 鼠标离开，隐藏左右按钮
    banners.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            // 轮播图自动切换 相当于点击右箭头
            next.click();
        }, 2000);
    });

    // 4. 动态生成小圆圈 有几张图片，就生成几个小圆圈

    for (let i = 0; i < images.children.length; i++) {
        //创建一个小li
        const li = document.createElement('li');
        //记录当前小圆圈的索引号 通过创建自定义属性来做
        li.setAttribute('index', i.toString());
        dots.appendChild(li);
        //5. 小圆圈的排他思想 可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (let i = 0; i < dots.children.length; i++) {
                dots.children[i].className = '';
            }
            this.className = 'active';
            // 6. 点击小圆圈，移动图片，本质移动的是ul
            //ul 的移动距离 就是小圆圈的索引号 * 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到它的index属性
            const index = this.getAttribute('index');
            //当我们点击了某个小li 就要把这个小li 的index给num
            num = index;
            circle = index;
            console.log(-index * banners.offsetWidth)
            animate(images, -index * banners.offsetWidth);
        })
    }

    //把dots 里面的第一个小li设置类名为 active
    dots.children[0].className = 'active';
    // 实现滑动到最后一张照片时 可以平滑地过渡到第一张，克隆第一张图片 放在ul最后面，在其后克隆小圆点不会多
    const first = images.children[0].cloneNode(true);
    images.appendChild(first);

    next.addEventListener('click', function () {
        // 如果走到了最后复制的一张图片，此时的ul要快速复原 left值改为零
        if (num === images.children.length - 1) {
            images.style.left = "0";
            num = 0;
        }
        num++;
        animate(images, -num * banners.offsetWidth);
        // 8. 点击右侧按钮，小圆圈跟随一起变化
        circle++;
        if (circle === dots.children.length) {
            circle = 0;
        }
        circleChange();
    })
    //左侧按钮点击事件
    prev.addEventListener('click', function () {
        if (num === 0) {
            num = images.children.length - 1;
            images.style.left = -num * banners.offsetWidth + 'px';
        }
        num--;
        animate(images, -num * banners.offsetWidth)
        circle--;
        circle = circle < 0 ? dots.children.length - 1 : circle;
        circleChange();
    })

    function circleChange() {
        for (let i = 0; i < dots.children.length; i++) {
            dots.children[i].className = '';
        }
        dots.children[circle].className = 'active';
    }

    timer = setInterval(function () {
        //手动调用点击事件
        next.click();
    }, 7000);
})

function animate(obj, target, callback) {
    //让元素只有一个定时器在执行，需要清除以前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft === target) {
            //停止动画 本质是停止定时器
            clearInterval(obj.timer)
            //回调函数写到定时器结束位置
            if (callback) {
                callback();
            }

        }
        //把每次加1这个步长值改为一个慢慢变小的值
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}