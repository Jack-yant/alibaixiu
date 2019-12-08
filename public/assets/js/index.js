$("#logout").on("click", function() {
  //做一个弹出框 提醒用户是不是按错了
  var isConfirm = confirm("你真的要退出吗");
  //给一个判断(确定退出和点击错误的)
  if (isConfirm) {
    //用户确定要退出 就发送网络请求
    $.ajax({
      url: "/logout",
      type: "post",
      success: function(data) {
        //接口文档返回的数据是：{"message": "退出成功"}；退出成功，跳转到登录页面
        location.href = "login.html";
      },
      error: () => {
        alert("退出失败");
      }
    });
  }
});

//显示登录信息
$.ajax({
  type: "/users" + userId,
  url: "get",
  success: function(response) {
    //服务器返回请求,展现在页面
    $(".avatar").attr("src", response.avatar);
    $(".profile .name").html(response.nickName);
  }
});
