///////////////建立假数据
var date=[
  {song:"小幸运",geshou:"谭嘉仪",time:"3:13",src:"./谭嘉仪 - 小幸运.mp3"},
  {song:"期待爱",geshou:"林俊杰",time:"3:43",src:"./林俊杰、金莎 - 期待爱.mp3"},
  {song:"第一次",geshou:"光良",time:"3:44",src:"./第一次.mp3"},
  {song:"宠爱",geshou:"TFBOYS",time:"3:00",src:"./宠爱.mp3"}
]

$.each(date,function(i,v){
  $("<li>")
  .html("<span>"+v.song+"</span><span>"+v.geshou+"</span><span>"+v.time+"</span>")
  .appendTo(".list_t")
})
var audio=$("audio").get(0);
//////////////显示界面上歌曲数目
$(".list_show span").html(date.length)
///////////////收起列表
$(".list_h span").on("click",function(){
  $(".m_list").addClass("touming")
})
$(".list_show").on("click",function(){
  $(".m_list").toggleClass("touming")
})
/////////////数据点击播放
$(".play").on("click",function(){
  if(audio.paused){
    audio.play();
  }else{
    audio.pause();
  }
})
///////////界面点击播放
$(audio).on("play",function(){
    $(".play").addClass("zanting")
})
$(audio).on('pause',function(){
  $(".play").removeClass("zanting")
})
/////////////数据上调节音量
var s=1
$(".b_sound").on("click",function(e){
  audio.volume=e.offsetX/this.offsetWidth
  s=audio.volume
})
/////////////界面上调节音量
$(audio).on("volumechange",function(){
  p=audio.volume.toFixed(2)*100+"%"
  $(".circle").css("left",p)
  $(".sound").css("width",p)
})
/////////////数据静音
$(".mute").on("click",function(){
  if(audio.volume!==0){
    audio.volume=0
    $(".mute").addClass("jingyin")
  }else{
    audio.volume=s;
    $(".mute").removeClass("jingyin")
  }
})
//////////////进度条数据
$(".bj").on("click",function(e){
  var b=e.offsetX/this.offsetWidth*audio.duration
  audio.currentTime=b
  audio.play()
})
//////////////进度条界面
$(audio).on("timeupdate",function(){
  var t=audio.currentTime/audio.duration.toFixed(2)*100+"%"
  $(".right").css("width",t)
})
///////////换歌函数
var huange=function(shu){
  $(".list_t li span").removeClass("bianse")
  $(".m_particular p:eq(0) span:eq(0)").html(date[shu].song)
  $(".m_particular p:eq(1)").html(date[shu].geshou)
  $(".m_particular p:eq(2)").html(date[shu].time)
  audio.play()
  $(".list_t li:eq("+shu+")").find("span").addClass("bianse")
}
////////////////点击歌曲换歌
$(".list_t li:eq(0) span").addClass("bianse")
$(".list_t").on("click","li",function(){
  audio.src=date[$(this).index()].src
  var shu=$(this).index()
  huange(shu)
})
////////////////下一首函数
var xiayishou=function(){
  var shu=$(".bianse").parent().index()+1
  if(shu>=date.length){
    shu=0
  }
  audio.src=date[shu].src
  huange(shu)
}
////////////////随机播放函数
var suijibofang=function(){
  var suiji=Math.floor(Math.random()*date.length)
  audio.src=date[suiji].src
  huange(suiji)
}
///////////////////下一首
$(".next").on("click",function(){
  xiayishou()
})
///////////////////上一首
$(".before").on("click",function(){
  var shu=$(".bianse").parent().index()-1
  if(shu<0){
    shu=date.length-1
  }
  audio.src=date[shu].src
  huange(shu)
})
//////////////数据上循环方式
$(audio).on("ended",function(){
  if($("#xunhuan").hasClass("lb")){
    xiayishou()
  }
  else if($("#xunhuan").hasClass("dq")){
    audio.play()
  }
  else if($("#xunhuan").hasClass("sj")){
    suijibofang()
  }
  else if($("#xunhuan").hasClass("sx")){
    if($(".list_t li .bianse").parent().index()!==date.length-1){
      xiayishou()
    }
  }
})
///////////////循环界面
$("#xunhuan").on("click",function(){
  $(".yc").toggleClass("chuxian")
})
$(".yc").on("click","div",function(){
  $("#xunhuan").removeClass("lb sx sj dq")
  if($(this).hasClass("shunxu")){
    $("#xunhuan").addClass("sx")
  }
  else if($(this).hasClass("suiji")){
    $("#xunhuan").addClass("sj")
  }
  else if($(this).hasClass("danqu")){
    $("#xunhuan").addClass("dq")
  }
  else if($(this).hasClass("liebiao")){
    $("#xunhuan").addClass("lb")
  }
})
