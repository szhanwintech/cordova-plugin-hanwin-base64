//使用的时候以 window.plugins.Base64开头

function Base64() {}

Base64.prototype.encodeFile = function(filePath, sucess, failure) {
  var args = {};
  args.filePath = filePath;
  //如果是android系统，则调用原生代码，如果苹果系统则直接使用toDataURL(因为Android version<3时不支持)
  if (device.platform == "Android")
    cordova.exec(sucess, failure, "Base64", "encodeFile", [args]);
  else {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();

    img.onload = function() {
      c.width = this.width;
      c.height = this.height;

      ctx.drawImage(img, 0, 0);

      var dataUri = c.toDataURL("image/png");

      sucess(dataUri);
    };
    img.src = filePath;
  }
};

cordova.addConstructor(function() {
  if (!window.plugins) {
    window.plugins = {};
  }

  // shim to work in 1.5 and 1.6
  if (!window.Cordova) {
    window.Cordova = cordova;
  }
  //设置调用
  window.plugins.Base64 = new Base64();
});
