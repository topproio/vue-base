
export function formatMoney (s, n) {
    if (!s) return 0;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}


//读取上传图片宽高
export function imageWithHeight(file){
    return new Promise((resolve,reject)=>{
        if(file){
            let reader = new FileReader();
            reader.onload = function (e) {
                let data = e.target.result;
                //加载图片获取图片真实宽度和高度
                let image = new Image();
                image.onload=function(){
                    resolve(
                        {
                            width: image.width,
                            height: image.height,
                        }
                    );
                };
                image.src= data;
            };
            reader.readAsDataURL(file);
        }else{
            reject();
        }
        
    });
};

//获取文件后缀
export function getFileType(file){
    let filename=file;
    let index1=filename.lastIndexOf(".");
    let index2=filename.length;
    let type=filename.substring(index1+1,index2);
    return type;
}

// Download a file form a url. url:请求服务器地址，表单方式提交
// 后端拿到file.url 后下载转成blob 响应到客户端
export function saveFile(url,file,token) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        let fd = new FormData();
        fd.append('url',file.url);
        fd.append('name',file.name);
        xhr.responseType = 'blob';
        xhr.onload = function() {
            resolve(xhr);
        };
        xhr.onerror = reject;
        xhr.open('post', url);
        xhr.setRequestHeader('Authorization', token)
        xhr.send(fd);
    }).then(function(xhr) {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = file.name; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        return xhr;
    });
}

//导入指定路径文件
export function importFromContext(info) {
  const requireComponent = info;
  let components = {};
  requireComponent.keys().forEach(fileName => {
      // 获取组件配置
      const componentConfig = requireComponent(fileName);
      // 获取组件的命名
      const componentName = fileName.replace(/(.*\/)*([^.]+).*/ig,"$2");
      components[componentName] = componentConfig.default;
  });
  return components;
};




