/**
 * 1. 类似实体类
 */
var o = {};
var bValue;
Object.defineProperty(o, "name", {
    get: function(){
        return bValue;
    },
    set: function (newValue) {
        bValue = newValue;
    },
    configurable: false, //为true时属性才能被改变与删除，默认false (delete o.name; 无事发生)
    enumerable: false, //为true时属性才能出现在枚举属性中(for..in循环, Object.keys())，默认false
    writable: false //为true时才能被赋值运算符改变，默认false
});
o.name2 = 'zz'; //直接赋值的方式，configurable,enumerable,writable都是true

/**
 * 2. 完整get/set例子
 */
function Logger()
{
    var temp = null;
    var loggerMsg = [];

    Object.defineProperty(this, "temp", {
        get: function () {
            return temp;
        },
        set: function (value) {
            temp = value;
            loggerMsg.push({val: temp});
        }
    });

    this.getLog = function () {
        return loggerMsg;
    }
}
var z = new Logger();
z.temp = 1;
z.temp = 2;
z.getLog();
