//从浏览器中查询参数
function getUrlParam(name) {
  //截取字符串
  var query = location.search.substr(1).split("&");
  //循环
  for (var i = 0; i < query.length; i++) {
    var tmp = query[i].split("=");
    if (tmp[0] == name) {
      return tmp[1];
    }

    return -1;
  }
}
//获取提交事件按钮
$("#parentBox").on("submit", function() {
  //获取表单的输入的内容
  var formData = $(this).serialize();
  //获取id
  var id = $(this).arrt("data-id");
  //向服务器发送请求
  $.ajax({
    type: "put",
    url: "/post/" + id,
    data: formData,
    success: function() {
      location.href = "/admin/post.html";
    }
  });
    //阻止默认事件提交按钮
  return false;
});
