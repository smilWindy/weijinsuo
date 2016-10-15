/**
 * 轮播图自适应
 */

$(function() {
  // 当文档加载完成才会执行
  /**
   * 根据屏幕宽度的变化决定轮播图片应该展示什么
   * @return {[type]} [description]
   */
  function resize() {
    // 获取屏幕宽度
    var windowWidth = $(window).width();
    // 判断屏幕属于大还是小
    var isSmallScreen = windowWidth < 768;
    // 根据大小为界面上的每一张轮播图设置背景
    // $('#main_ad > .carousel-inner > .item') // 获取到的是一个DOM数组（多个元素）
    $('#carouselcontainer > .carousel-inner > .item').each(function(i, item) {
      // 因为拿到是DOM对象 需要转换
      var $item = $(item);
      // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
      var imgSrc =
        isSmallScreen ? $item.data('image-sm') : $item.data('image-lg');

      // jQuery方式
      // $element.data()
      // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
      // 函数的参数是我们要取得属性名称（abc）
      //
      // $element.attr('data-abc')
      //
      // JS中的写法
      // element.dataset['abc']
      //
      // element.getAttribute('data-abc')
      // element.setAttribute('data-abc','')

      // 设置背景图片
      $item.css('backgroundImage', 'url("' + imgSrc + '")');
      //
      // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
      }
    });
  }
  // $(window).on('resize', resize);
  // // 让window对象立即触发一下resize
  // $(window).trigger('resize');
  $(window).on('resize', resize).trigger('resize');

  //设置横向标签滚动条
  //1、首先就是给ul包一个外部容器，在html代码里做
  //2、给ul设置一个动态宽度，这个宽度由ul里的li来决定
  
  //获取ul外包容器
  var $ulContainer=$('.nav-tabs');

  //取得ul子元素的宽度和
  var width=270;
  //遍历子元素
  $ulContainer.children().each(function(index,element){
      //console.log(element.clientWidth);
      width+=element.clientWidth;
     // console.log(width);
  });
  //遍历完了之后取得了所有li的宽度总和
  //为ul外包容器设置宽度
  $ulContainer.css('width',width);

  /*****设置新闻选项卡点击时出现对应的标题***/
  //获取要点击新闻的a标签，并绑定点击事件
  $('#news .nav-pills a').click(function(e){
    //e.preventDefault();
    //为新闻标题赋值
    $('#news .news-title').text($(this).data('title'));
  });
    
  //为轮播图设置左滑右滑的时候图片能进行相应的移到上一张或者下一张
  //首先判断手指移动的方向
  var OFFSET=50;
  $('#carouselcontainer').each(function(index,item){
    var startX,endX;
    item.addEventListener('touchstart',function(e){
        //console.log(e);
        //取事件e的touches数组中的x坐标来判断手指滑下的起点和终点位置
        startX=e.touches[0].clientX;
        console.log(startX);
        e.preventDefault();
    });
    //取得终点位置
    item.addEventListener('touchmove',function(e){
      endX=e.touches[0].clientX;
      console.log(endX);
      e.preventDefault();
    });
  
  //通过判断起点和终点位置来确定手指滑动的方向
  /*item.addEventListener('touchend',function(e){
    var offsetX=startX - endX;
      if(offsetX < OFFSET){
        $(this).carousel('prev');
      }
      else if(offsetX > -OFFSET){
        $(this).carousel('next');
      }
    e.preventDefault();
  });*/
  item.addEventListener('touchend',function(e){
    var offsetX=Math.abs(startX - endX);
      if(offsetX > OFFSET){
        $(this).carousel(startX > endX ? 'next':'prev');
      }
    e.preventDefault();
  });
  });
  //然后根据获得的方向选择上一张或者下一张
});
