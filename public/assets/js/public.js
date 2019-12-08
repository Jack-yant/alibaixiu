//评论详情列表
//向服务器中发送请求
$.ajax({
  type: "get",
  url: "/comments/lasted",
  success: function(resp) {
    var commentTpl = `
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
			{{/each}}
        `;
    var html = template.render(commentTpl, { data: resp });
    $("#commentBox").html(html);
  }
});

//导航栏列表
//向服务器发送请求
$.ajax({
  type: "get",
  url: "/categories",
    success: function (resp) {
        var navTpl = `
      {{each data}}
			<li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
        `;
        var html = template.render(navTpl, { data: resp });
        $('#navBox').html(html)
        $('#topnavBox').html(html)
  }
});
