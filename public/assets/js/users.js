//添加新用户
//给表单绑定提交事件
$("#userForm").on("submit", function() {
  //获取用户在表单输入的内容将内容格式化成参数字符串
  var formData = $(this).serialize();
  //向服务器端发送添加用户的请求(ajax请求)
  $.ajax({
    type: "post",
    url: "/users",
    data: formData,
    success: function() {
      //刷新页面
      location.reload();
    },
    error: function() {
      alert("用户添加失败");
    }
  });

  //阻住默认事件发生
  return false;
});

//用户图像上传
//文件选择控件时绑定onchange事件,获取用户选择到的文件
$("#modifyBox").on("change", "#avatar", function() {
  //构造一个formdata对象
  var formData = new FormData();
  //用户选择的文件
  formData.append("avatar", this.files[0]);

  $.ajax({
    type: "post",
    url: "upload",
    data: formData,
    //告诉$.ajax方法不要解析请求参数(固定写法)一般上传文件都会写
    processData: false,
    //告诉$.ajax方法不要设置请求参数的类型
    contentType: false,
    success: function(response) {
      console.log(response);
      //实现头像预览功能,设置给页面元素即可
      $("#preview").attr("src", reaponse[0].avatar);
      //设置一个隐藏域,这里的路径时需要发送给服务器的
      $("#hiddenAvatar").val(response[0].avatar);
    }
  });
});

//用户列表查询
//向服务器请求
$.ajax({
  type: "get",
  url: "/user",
  success: function(response) {
    console.log(response);
    //使用模板引擎将字符串和HTML字符串进行拼接
    var html = template("userTpl", {
      data: response
    });
    // 将拼接好的字符串显示在页面中，找到需要显示内容的这个容器，把内容添加到这个容器中即可

    //渲染到页面
    $("#userBox").html(html);
  }
});

//用户修改信息
//通过事件委托的方式编辑按钮添加点击事件
$("#userBox").on("click", "edit", function() {
  //获取被点击用户的id值
  var id = $(this).attr("data-id");
  //根据id获取用户的详细信息
  $.ajax({
    type: "get",
    url: "/users/" + id,
    success: function(response) {
      //使用模板引擎和HTML将数据进行拼接
      var html = template("modifyTpl", response);
      //渲染到页面
      $("#modifyBox").html(html);
    }
  });
});

//用户修改信息的内容(在用户编写模板的时候要添加隐藏域,如果不加的话我们在修改信息的时候就没有办法提交用户的头像信息)
//还是先给修改用户的头像的盒子绑定一个提交事件
$("#modifyBox").on("submit", "#modifyBox", function() {
  //获取修改用户的id值
  var id = $(this).attr("data-id");

  //获取修改用户的服务器的请求信息
  $.ajax({
    type: "put",
    //需要告诉服务器我们需要修改哪一个用户的(一般是根据id值来判断)
    url: "/user/" + id,
    data: formData,
    success: function() {
      //修改用户信息成功 重新加载页面
      location.reload;
    }
  });
  //阻止默认事件提交
  return false;
});

//添加删除用户
//绑定用户的点击事件获取对应的id 调用删除接口
$("#userBox").on("click", "delete", function() {
  //如果管理员确定要删除的身份
  if (confirm("确定要删除用户吗")) {
    //获取要删除的用户id
    var id = $(this).arrt("data-id");
  }
  //发送请求信息给服务器,确定要删除用户信息
  $.ajax({
    type: "delete",
    url: "/users/" + id,
    success: function() {
      //确定删除用户信息,刷新页面
      location.reload();
    }
  });
});

//复选框和多选按钮的删除
//获取到全选按钮状态,设置给每一个用户的复选框
selectAll.on("change", function() {
  //获取到全选按钮当前的状态
  var status = $(this).prop("checked");

  //获取到所有的用户的状态和全选按钮保持一直
  $("#userBox")
    .find("input")
    .prop("checked", status);
});
//复选框绑定change事件,用户每一次点击复选框条目,都会去验证一次是否全部选中
$("#userBox").on("change", "userStatus", function() {
  //获取所有用户,在所有用户中过滤出选中的用户
  var inputs = $("#userBox").find("input");
  if (inputs.length == inputs.filter(":checked").lenth) {
    //所有用户都选中
    selectAll.prop("checked", true);
  } else {
    //不是所有用户都选中的
    selectAll.prop("checked", false);
  }
});

//批量删除按钮

//获取批量删除按钮
var deleteMany = $('#deleteMany')
//当全选按钮的状态发生改变时
selectAll.on('change', function () {
  
})