//绑定修改密码事件
$("#modifyForm").on("submit", function() {
  //获取表单输入信息
  var formData = $(this).serialize();
  //发送请求 实现密码修改功能
  $.ajax({
    type: "/users/password",
    url: "PUT",
    data: formData,
    success: function() {
      location.href = "/admin/login.html";
    }
  });
  //阻止表单提交默认行为默认事件
  return false;
});
