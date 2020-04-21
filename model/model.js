// 要这样继承对象的属性和方法，深复制，如果用原型，很多东西都干不了
// function xjcbullet(src) {

//     var o = new Image();
//     for (var k in o) {
//         this[k] = o[k];
//     }


//     this.src = src;


//     this.prototype = new Image();
//     this.prototype.constructor = this;

// }




class xjcbullet extends Image {
    constructor(src) {
        super();
        this.src = src;
        this.haveShot = 0;
    }
}



// 物体移动
function objMove(obj, adirection, aspeed) {

    // this.obj = aobj;
    // this.direction = adirection;
    // this.speed = aspeed;



    if (adirection == 'down') {

        // if (true) {}
        if (obj.offsetTop < 300) {
            console.log(obj.offsetTop);
            obj.offsetTop = obj.offsetTop + speed;
            console.log(obj.offsetTop);
        }

        // console.log(obj.offsetTop);
        // obj.offsetTop = obj.offsetTop + speed;
        // console.log(obj.offsetTop);
    }

    // this.move1();
    move1();

    function move1() {
        if (adirection == 'up') {
            console.log('这是子弹对象');
            console.log(obj);
            // console.log([obj])
            if (obj.offsetTop > 0) {
                // console.log(obj.offsetTop);
                obj.style.top = obj.offsetTop - 20 + 'px';
                // console.log(obj.offsetTop);

                var animate = requestAnimationFrame(move1);
            } else {

                game_windows.removeChild(obj);
                obj.haveShot = 1;
                window.cancelAnimationFrame(animate);

            }
        }
    }
    // this.move1();



    // this.animate = requestAnimationFrame(objMove(aobj, adirection, aspeed));

    // return 0;
}



// 物体消失
function xjcdelete(aobj) {
    aobj = null;
}