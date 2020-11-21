window.addEventListener('load', function () {

    //获取左右图标和图片窗口
    var al = document.querySelector('.focus').querySelector('.iconl');
    var ar = document.querySelector('.focus').querySelector('.iconr');
    var focus = document.querySelector('.focus');
    //悬停显示，离开隐藏左右切换按钮
    ar.click();
    focus.addEventListener('mouseover', function () {
        al.style.display = 'block';
        ar.style.display = 'block';
        clearInterval(timer); //悬停时取消自动播放，清除定时器
        timer = null; //清除定时器变量

    })
    focus.addEventListener('mouseleave', function () {
        al.style.display = 'none';
        ar.style.display = 'none';
        timer = setInterval(function () { //鼠标离开后再次启动定时器调用右按钮切换图片事件
            //手动调用点击事件
            ar.click();

        }, 2000);
    })

    var ul = focus.querySelector('ul'); //获取图片父元素
    var ol = focus.querySelector('.focusicon'); //获取小图标
    var focusWidth = focus.offsetWidth;
    //小图标切换模块
    for (var i = 0; i < ul.children.length; i++) { //利用父元素得到其子元素的个数，动态生成相同数量的点击图标
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'olpoint';

            var index = this.getAttribute('index');

            num = index;
            circle = index; //使三个函数同步num=circle=index

            animate(ul, -index * focusWidth); //调用动画 参数（动画移动的对象元素节点，移动的距离）
        })
    }

    ol.children[0].className = 'olpoint';
    //无缝切换图片添加深度克隆
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //左右按钮切换模块
    var num = 0; //为了控制图片的变化定义的变量
    var circle = 0; //为了控制图片下小图标的变化定义的变量
    var flag = true; //节流阀，防止多次点击切换图片效果差
    ar.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'olpoint';
        }


    })

    al.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = num * (ul.children.length - 1);
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            if (circle == -1) {
                circle = ol.children.length - 1;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'olpoint';
        }

    })
    //自动播放模块
    var timer = setInterval(function () {
        //手动调用点击事件
        ar.click();

    }, 2000);

})