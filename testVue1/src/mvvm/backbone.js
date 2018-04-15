function dataBinder(oid)
{
    //
    var pubSub = {
        callbacks: {},
        on: function (msg, callback){
            this.callbacks[msg] = this.callbacks[msg] || [];
            this.callbacks[msg].push(callback);
        },
        publish: function(msg){
            this.callbacks[msg] = this.callbacks[msg] || [];
            for(var i=0,len = this.callbacks[msg].length; i< len; i++){
               this.callbacks[msg][i].apply(this, arguments);
            }
        }
    };

    var data_attr = "data-bind-" + oid;
    var message = oid + ":change";

    var changeHandler = function(evt){
        var target = evt.target || evt.srcElement; //IE8
        var prop_name = target.getAttribute(data_attr);
        if(prop_name && prop_name != ''){
            pubSub.publish(message, prop_name, target.value);
        }
    };

    // 绑定
    document.addEventListener("change", changeHandler, false);

    // 传播
    pubSub.on(message, function (vet, prop_name, new_val) {
        var ele = document.querySelectorAll("[" + data_attr + "=" + prop_name + "]");
        var tag_name;

        for (var i = 0, len = ele.length; i < len; i++) {
            tag_name = ele[i].tagName.toLowerCase();
            if(tag_name == "input" || tag_name == "textarea" || tag_name == "select"){
                ele[i].value = new_val;
            }
            else{
                ele[i].innerHTML = new_val;
            }
        }
    });

    return pubSub;
}


function User(uid)
{
    var binder = new dataBinder(uid);

    var user = {
        attributes: {},

        set: function (key, val) {
            this.attributes[key] = val;
            binder.publish(uid+ ":change", key, val, this);
        },

        get: function (key) {
            return this.attributes[key];
        },

        var _binder = binder;
    };

    binder.on(uid+ ":change", function (vet, key, newValue, initiator) {
        if(initiator != user){
            user.set(key, newValue);
        }
    });
}

$(function () {

    var user = new User(123);
    user.set("name", "moekosu");

    // html
    // <input type="number" data-bind-123="name" />

});














