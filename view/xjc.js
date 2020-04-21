// 这个是根据屏幕的刷新率做定时器的方法，新的定时器，但不受流阻碍？这个函数返回一个整值，用于传给cancelAnimationFrame用于关闭这个定时器
if (!window.requestAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
}

// 这个是删除定时器的操作
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}


var gameTime = 0;

setInterval(function() {
    gameTime++;
}, 1000);


// 结束
var endmatch = 0;
// 总分数
var score = 0;
// 总生命
var lifeNum = 10;
// 全局
var game_windows;
var game_windows_width;
var game_windows_height;
// 我的飞机
var plane;
// 我的子弹
var bulletArr = [];

$(document).ready(function() {

    // console.log(1);
    // setTimeout(function(){console.log(2);},0);
    // console.log(3);

    // 不知道为什么id的输出形式和class不一样
    // var ss = document.getElementById("aa");
    // console.log(ss);
    // start();

    $('.startGame').click(function() {
        $('.xjcbox').css('display', 'none');
        $('.game_windows').css('display', 'block');
        start()
    })

    // 测试
    var a1 = new obj1();
    a1.name = 'ccc';
    obj1.name = 'lashdlkashd';

    a1.haha();
    var a2 = new obj2();
    console.log([obj1]);
    console.log([a1]);
    console.log([a2]);

})

// 测试
function obj1() {
    this.name = '1';
    this.haha = function() {
        console.log('n');
    }
}
// 测试
function obj2() {
    var o = new obj1();
    for (var k in o) {
        this[k] = o[k];
    }
}


// 开始游戏
function start() {

    game_windows = document.getElementsByClassName('game_windows')[0];

    console.log(game_windows);

    game_windows_width = game_windows.clientWidth;

    game_windows_height = game_windows.clientHeight;

    console.log(game_windows_width);

    console.log(game_windows_height);
    // 创建飞机
    creatMyPlane(game_windows_width);
    backgroundMove();
    creatEnemy();

}


// 创建我的飞机
function creatMyPlane(game_windows_width) {

    plane = new Image();
    plane.src = "src/me.png";
    plane.width = 60;
    plane.height = 60;
    plane.className = 'plane';

    console.log(plane);

    plane.style.left = game_windows_width / 2 - plane.width / 2 + 'px';
    plane.style.top = game_windows_height - plane.height * 3 + 'px';

    // 现在是中间起开始。
    planePos = game_windows_width / 2 - plane.width / 2;
    // 边界
    borderleft = 0;
    borderright = game_windows_width - plane.width;
    // planePos不能越过这个界。
    // 所以必须borderright>planePos>borderleft
    // 注意一点，获取dom之后，必须要【0】才能在里面appendChild，不然不成功
    game_windows.appendChild(plane);

    var leftmove;
    var rightmove;

    $('.fire').click(function() {



        var thebullet = new xjcbullet('src/zidan.png');
        thebullet.width = 30;
        thebullet.height = 30;
        thebullet.className = 'bullet';
        thebullet.style.top = plane.offsetTop + 'px';
        thebullet.style.left = plane.offsetLeft + thebullet.width / 2 + 'px';
        game_windows.appendChild(thebullet);
        bulletArr.push(thebullet);
        // 放数组了面，现在thebullet只是一个引用变量，它随方法的消失而删除掉
        // 但是删除这个变量之后并没有删除这个创建出来的对象，因为下面的数组还在引用着它。
        // 所以修改数组对应指标的值之后，这个变量指向的地址没有变，对象的值变了，这个变量也是和数组中输出的值一样
        // 现在的问题是，似乎子弹上升之后，我删除了这个对象，但是似乎没有影响到数组中的志向，里面好像还有一个值。
        // 所以，我是将objMove(thebullet, 'up', 1);中的thebullet这个值变成空了还是？
        objMove(thebullet, 'up', 1);
        console.log(bulletArr);

    })


    $('.goLeft').on('touchstart', function(e) {

        leftmoveFn()

        function leftmoveFn() {

            if (planePos > borderleft) {
                planePos = planePos - 5;
                plane.style.left = planePos + 'px';
                leftmove = requestAnimationFrame(leftmoveFn);
            } else {
                window.cancelAnimationFrame(leftmove);
            }

        }
    });

    $('.goLeft').on('touchend', function(e) {

        window.cancelAnimationFrame(leftmove);

    });

    $('.goRight').on('touchstart', function(e) {

        rightmoveFn()

        function rightmoveFn() {

            if (borderright > planePos) {
                planePos = planePos + 5;
                plane.style.left = planePos + 'px';
                rightmove = requestAnimationFrame(rightmoveFn);
            } else {
                window.cancelAnimationFrame(rightmove);
            }

        }
    });

    $('.goRight').on('touchend', function(e) {

        window.cancelAnimationFrame(rightmove);

    });
}




// 创建敌军
function creatEnemy() {
    // var plane = new Image();
    // plane.src = "src/diji.png";
    // plane.width = 60;
    // plane.height = 60;
    // plane.className = 'plane';

    console.log('创建敌军');

    setTimeCreatEnemyFn(3000);

    function setTimeCreatEnemyFn(time) {

        setTimeout(function() {

            // console.log(time);

            // 在这里创建敌军
            CreatEnemyFn();

            // 3到5秒随机生成时间
            if (gameTime < 20) {
                var time1 = Math.floor(Math.random() * (4 - 2 + 1) + 2) * 100;
            } else if (gameTime < 40) {
                var time1 = Math.floor(Math.random() * (3 - 2 + 1) + 2) * 100;
            } else {
                var time1 = Math.floor(Math.random() * (2 - 1 + 1) + 1) * 100;
            }


            if (endmatch == 1) {

                return
            } else {
                setTimeCreatEnemyFn(time1);
            }


        }, time)

    }
}



// 创建敌军
function CreatEnemyFn() {

    var EnemyPlane = new Image();
    EnemyPlane.src = "src/diji.png";
    EnemyPlane.width = 60;
    EnemyPlane.height = 60;
    EnemyPlane.className = 'plane';
    EnemyPlane.haveShot = 0;

    EnemyPlane.style.left = Math.floor(Math.random() * ((game_windows_width - EnemyPlane.width / 2) - EnemyPlane.width / 2 + 1) + EnemyPlane.width / 2) + 'px';

    var planeTop = -EnemyPlane.height * 1.5;
    EnemyPlane.style.top = -EnemyPlane.height * 1.5 + 'px';

    game_windows.appendChild(EnemyPlane);
    Enemymove();

    function Enemymove() {
        planeTop = planeTop + 5;
        EnemyPlane.style.top = planeTop + 'px';

        if (endmatch == 1) {
            game_windows.removeChild(EnemyPlane);
        } else {
            var distance = crash(plane, EnemyPlane);

            // var distanceBullet = crash(plane, EnemyPlane);

            // 把子弹数组对象循环一遍，然后，和飞机做对比.
            // 现在遇到的情况是，子弹对象好像没有被烧毁
            for (var b = 0; b < bulletArr.length; b++) {


                // 如果子弹不是空就执行，如果是空就跳过，不然会出错，继续执行这一步

                // 终于找到问题，之前子弹对象没有被销毁，还有每次发射多个子弹只能击中前面的飞机
                // 原来是因为我只是吧obj的引用地址设置为null，并且在这里判断的是子弹数组的地址，2个东西互不相干，肯定会出问题
                // 第二个是因为飞机击中了我没有给他击中状态，所以还能继续受弹
                if (bulletArr[b] && bulletArr[b].haveShot == 0) {
                    if (EnemyPlane.haveShot != 1) {
                        console.log(bulletArr);
                        // if (bulletArr[b] == null) {
                        //     console.log('haha');
                        // }
                        var distanceB = crash(bulletArr[b], EnemyPlane);
                        console.log(b + '---------' + distanceB);




                        if (distanceB <= 50) {
                            console.log('中');

                            // 应该是要停止这架飞机的移动
                            bulletArr[b].haveShot = 1;
                            console.log(bulletArr[b]);

                            game_windows.removeChild(bulletArr[b]);
                            bulletArr[b] = null;
                            EnemyPlane.src = "src/4.png";
                            // 表示飞机已经中弹，然后下面判断中弹的飞机不能伤害我军飞机
                            EnemyPlane.haveShot = 1;
                            // game_windows.removeChild(EnemyPlane);

                            // 这里做了删除动画操作
                            // window.cancelAnimationFrame(Enemymove);

                        }
                    }
                }


                // if (distanceB <= 50) {
                //     console.log('中');

                //     // 应该是要停止这架飞机的移动
                //     bulletArr[b] = null;
                //      console.log(bulletArr[b]);
                //     EnemyPlane.src = "src/4.png";
                //     // 表示飞机已经中弹，然后下面判断中弹的飞机不能伤害我军飞机
                //     EnemyPlane.haveshot = 1;
                //     // game_windows.removeChild(EnemyPlane);

                //     // 这里做了删除动画操作
                //     // window.cancelAnimationFrame(Enemymove);

                // }
            }
        }

        if (planeTop > game_windows_height) {
            window.cancelAnimationFrame(Enemymove);
            // plane = null;
            game_windows.removeChild(EnemyPlane);
            score++;
            // lifeNum++;
            // $('.lifeNum').text(lifeNum);
            $('.score').text('得分:' + score);
        } else if (distance <= 50) {
            // EnemyPlane.src = "src/4.png";
            console.log(EnemyPlane.src);


            // 判断敌机是否已经中弹，如果是，则不死血，未中弹则扣血
            if (EnemyPlane.haveShot != 1) {
                console.log('haha');
                lifeNum--;
                $('.lifeNum').text(lifeNum);
            }
            // lifeNum--;
            // $('.lifeNum').text(lifeNum);

            EnemyPlane.src = "src/4.png";
            // window.cancelAnimationFrame(Enemymove);

            if (lifeNum == 0) {

                plane.src = "src/baozha.png";
                window.cancelAnimationFrame(Enemymove);

                setTimeout(function() {
                    // plane = null;
                    // EnemyPlane = null;
                    // removeChild
                    // game_windows.removeChild(plane);
                    game_windows.removeChild(EnemyPlane);
                    endGame(plane);
                }, 1000);

            } else {
                var anymove = requestAnimationFrame(Enemymove);
            }
        } else {
            var anymove = requestAnimationFrame(Enemymove);
        }
        // var anymove = requestAnimationFrame(Enemymove);

    }

}


// 游戏结束，重置所有条件
function endGame(plane) {

    endmatch = 1;

    $('.ctr').css('display', 'block');
    $('.finalScore').text(score);

    $('.ctr3').off('click');
    $('.ctr3').click(function() {
        plane.src = "src/me.png";
        endmatch = 0;
        score = 0;
        gameTime = 0;
        $('.score').text('得分:' + '0');
        lifeNum = 10;
        $('.lifeNum').text(lifeNum);
        // $('.game_windows').remove()
        // $('.game_windows').css('display', 'none');
        $('.ctr').fadeOut('1000');
        setTimeout(function() {
            // $('.game_windows').css('display', 'block');

            creatEnemy();

        }, 500);
    })
}



// 碰撞检测
function crash(one, two) {

    let mytop = one.offsetTop;
    let myleft = one.offsetLeft;
    // console.log(mytop + '---' + myleft);

    // 中心点是
    let centerX = myleft + one.width / 2;
    let centerY = mytop + one.height / 2;

    // var EnemyPlanetop = EnemyPlane
    let EnemyPlanetop = two.offsetTop;
    let EnemyPlaneleft = two.offsetLeft;
    // console.log(mytop+'---'+myleft);

    // 中心点是
    let EnemyPlanecenterX = EnemyPlaneleft + two.width / 2;
    let EnemyPlanecenterY = EnemyPlanetop + two.height / 2;

    // (EnemyPlanecenterX - centerX) + (EnemyPlanecenterY - centerY);
    // Math.pow((EnemyPlanecenterX - centerX),2)
    let distance = Math.sqrt(Math.pow((EnemyPlanecenterX - centerX), 2) + Math.pow((EnemyPlanecenterY - centerY), 2));

    return distance;

}



// this调用对象
// function bullet2() {
//     this.name ='xjc';
// }

// var bullet2 = {
//     name = 'xjc'
// }


// 我想继承一个类，发现很难将新增的方法写进去，而且有个问题，就是怎样可以接受多参数？对象不接受参数，方法才接受吧
// var bullet = new bullet2();
// bullet

// 普通子弹,有速度，图片，长宽，坐标，杀伤力
// var bullet = {
//     // this = new Image();
//     // bullet.prototype = new Image();
//     // Image.apply(this, arguments);
//     // this.speed = speed;
//     // this.src = src;
//     // this.bulletwidth = width;
//     // this.bulletheight = height;

// }


// 要这样继承对象的属性和方法，深复制，如果用原型，很多东西都干不了
// function bullet() {
//     var o = new Image();
//     for (var k in o) {
//         this[k] = o[k];
//     }

//     this.flySpeed = '111';

//     aaa();
//     function aaa() {
//         console.log('aaa');
//     }
// }
// bullet.prototype = new Image();
// bullet.prototype.constructor = bullet;



// 背景移动
function backgroundMove() {

    game_windows.style.backgroundImage = `url("src/background.png")`;

    // 创建动画
    function bcmove() {
        game_windows.bgy = game_windows.bgy || 0;
        game_windows.bgy++;
        game_windows.style.backgroundPositionY = game_windows.bgy + 'px';
        game_windows.bgTimer = requestAnimationFrame(bcmove);
    }
    bcmove();
}