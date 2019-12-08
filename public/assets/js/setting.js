//需求一
$("#settingsForm").on("submit", function(e) {
  var obj = $(this).serialize();

  //阻止默认事件
  ev.preventDefault();

  //发送请求
  $.ajax({
    type: "/settings",
    url: "post",
    data: obj,
    success: function() {
      location.reload();
    }
  });
});
