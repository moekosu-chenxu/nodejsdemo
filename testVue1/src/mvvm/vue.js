var data = {name: "moekosu",name2: "zz"};
observe(data);
data.name = "moekosu2";
console.log(data.name);
data.name2 = "zzz";


/**
 * 监听所有属性
 */
function observe(data)
{
    // 遍历data数组所有参数列表
    Object.keys(data).forEach(function (key) {
        define(data, key, data[key]);
    });
}

function define(data, key, val)
{
    // 订阅器
    var dep = new Dep();
    // 定义参数的get/set
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            return val;
        },
        set: function (newValue) {
            // 参数赋值的时候加上自己的逻辑
            console.log("get setting: "+val+ " -> "+ newValue);
            val = newValue;
            // 通知订阅者，addSub所有相关的元素
            dep.addSub();
            dep.notify();
        }
    });
}


/**
 * 订阅器
 */
function Dep()
{
    this.depSub = [];
}
Dep.prototype = {
    // 添加进数组
    addSub : function (sub) {
        this.depSub.push(sub);
    },
    // 遍历广播
    notify: function () {
        this.depSub.forEach(function (sub) {
            sub.update();
        });
    }
};

/**
 * 广播
 */
function Watch() {
    this.value = this.get();
}
Watch.prototype = {
    get: function () {

    },
    update: function () {
        this.run();
    },
    run: function () {

    }
};
