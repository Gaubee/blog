var baseDataUrl = "http://127.0.0.1:2013/";
var HTML = $("html");
var BODY = $("body");
var converter = new Showdown.converter();
avalon.ready(function(){
    avalon.Router.extend({
        routes: {
            '': 'index', // 当URL Hash在根目录时执行index方法：url# 
            'blog/:id': 'blog', // 当URL Hash在detail节点时执行query方法，并将detail后的数据作为参数传递给query方法：url#list/1001 
            'twitter/:year/:month/:day': 'twitter',
            '*error': 'showError' // 当URL Hash不匹配以上规则时, 执行error方法 
        },
        index: function() {
            // alert('index');
        },
        blog: function(id) {
            console.log(id);
            $("[href='#blog/"+id+"']").parent().click();
        },
        twitter: function(year, month, day) {
            alert([year, month, day].join("-"));
        },
        showError: function(url) {
            // alert( url +"这个URL没有对应的处理函数");
        }
    });
    avalon.history.start(true);
    avalon.scan();
    avalon.Router.onDocumentReady();

})

require("ajax,ready",function($1){// get blog post list
    $1.getScript(baseDataUrl+"blog?callback=parseBlogPostList");
})

function parseBlogPostMarkdown(data){
    console.log(data);
    parseBlogPostMarkdown.set(converter.makeHtml(data.content));
    $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
}

function parseBlogPostList (data) {
    require("../../quicksort,ready",function(){
        avalon.ready(function(){
            var i,
                Length = data.length,
                timeline = [],
                itemTimeline,
                itemTimelineVal,
                timelineCache = {array:[]}
                ;
            for(i=0;i<Length;i+=1){
                itemTimeline = data[i].filePath;
                itemTimelineVal = new Date(itemTimeline).valueOf();
                timelineCache[itemTimelineVal] = itemTimeline;
                timelineCache.array[i] = itemTimelineVal;
            };
            timelineCache.array.array = Array.quicksort(timelineCache.array)
            for(i=0;i<Length;i+=1){
                timeline[Length-i-1] = timelineCache[timelineCache.array[i]];
            }
            $.each(data,function(i,e){
                $.extend(e,{
                    blogContent:{
                        show:false,
                        html:"Gaubee"
                    }
                })
            });
            console.log(data);
            var blogPostModel = avalon.define("blogPost",function(vm){
                vm.timeline = timeline;
                vm.blogPostList = data;
                vm.lastShowBlogPost = -1;
                vm.showBlogPost = function(e){
                    var $self = $(this);
                    var index = $self.data("index");
                    var id = $self.data("id");
                    var top = $self.offset().top;
                    BODY.animate({scrollTop:top+"px"},300);

                    (vm.lastShowBlogPost !== -1)&&vm.blogPostList.set(vm.lastShowBlogPost,{blogContent:{show:false}});
                    vm.lastShowBlogPost = index;

                    delete parseBlogPostMarkdown.set;
                    parseBlogPostMarkdown.set = function(html){
                        vm.blogPostList.set(index,{
                            blogContent:{
                                show:true,
                                html:html
                            }
                        });
                    }

                    $1.getScript(baseDataUrl+"blog?callback=parseBlogPostMarkdown&mode=essay&id="+id);

                }
            });
            avalon.scan();
        });

    });
}

