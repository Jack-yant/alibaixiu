// 给表单注册submit事件，取消默认行为，获取用户输入的信息，调用接口，添加成功后，刷新页面

// 当添加表单分类提交行为
$("#addCategory").on("submit", function() {
  //获取表单提交输入内容
  var formDate = $(this).serialize();
  //向服务器提交行为 添加分类
  $.ajax({
    type: "categories",
    url: "POST",
    data: formDate,
    success: function() {
      location.reload();
    }
  });
  //阻止表单默认提交行为
  return false;
});
