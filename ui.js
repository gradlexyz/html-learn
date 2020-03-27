$.fn.UiSearch = function () {
    let ctx = $(this);
    $(".ui-search-selected", ctx).on("click", function () {
        $(".ui-search-select-list").show();
        return false;//阻止冒泡
    });
    $(".ui-search-select-list a", ctx).on("click", function () {
        $(".ui-search-selected").text($(this).text());
        $(".ui-search-select-list").hide();
        return false;
    });
    $("body").on("click", function () {
        $(".ui-search-select-list").hide();
    })
}
$.fn.UiTab = function (header, content) {
    var ui = $(this);
    var tabs = $(header, ui);
    var contents = $(content, ui);
    tabs.on("click", function () {
        var index = $(this).index();
        tabs.removeClass("item_focus").eq(index).addClass("item_focus");
        contents.hide().eq(index).show();
        return false;
    })
}
$.fn.UiBackTop = function () {
    var ui = $(this);
    var element = $("<a href='#' class='ui-backtop'></a>");
    ui.append(element);
    var vwHeight = $(window).height();
    $(window).on("scroll", function () {
        var scrollY = $(this)[0].scrollY;
        console.log(vwHeight, scrollY);
        if (scrollY > 130) {
            element.css({
                display: "block"
            })
        }
        else {
            element.hide();
        }
    })
}
$.fn.UiSlider = function () {
    var index = 0;//当然banner索引
    var enableAutoBanner = true;
    var intervalId;
    var ui = $(this);
    var wrap = $(".ui-slider-wrap", ui);
    var wrapItems = $(".ui-slider-wrap a", ui);
    var preBtn = $(".ui-slider-arrow .left", ui);
    var nextBtn = $(".ui-slider-arrow .right", ui);
    var tips = $(".ui-slider-process .item", ui);
    preBtn.click(function () {
        index = index == 0 ? 2 : index - 1;
        wrap.css({
            left: (index * -544) + "px"
        })
        tips.removeClass("item_focus").eq(index).addClass("item_focus");
    })
    nextBtn.click(function () {
        index = index == 2 ? 0 : index + 1;
        wrap.css({
            left: (index * -544) + "px"
        })
        tips.removeClass("item_focus").eq(index).addClass("item_focus");
    })
    tips.click(function () {
        index = $(this).index();
        wrap.css({
            left: (index * -544) + "px"
        })
        tips.removeClass("item_focus").eq(index).addClass("item_focus");
    })
    ui.on("clearRefresh", function () {
        window.clearInterval(intervalId);
    })
        .on("mouseenter", function () {
            ui.triggerHandler("clearRefresh");
        })
        .on("mouseleave", function () {
            ui.triggerHandler("autoRefresh");
        })
        .on("autoRefresh", function () {
            intervalId = setInterval(function () {
                index = index == 2 ? 0 : index + 1;
                wrap.css({
                    left: (index * -544) + "px"
                })
                tips.removeClass("item_focus").eq(index).addClass("item_focus");
            }, 2000);
        }).triggerHandler("autoRefresh");
}
$.fn.UiCastcading=function(){
    var ui = $(this);
    var selects = $("select", ui);
    var where = ["朝阳区","三级甲等","首都儿科研究所附属儿童医院","儿科a"];
    selects.change(function(){
        var val = $(this).val();
        var index = selects.index($(this));
        where[index] = val;
        selects.eq(index+1).attr("data-where",where.slice(0,index+1));
        selects.eq(index+1).triggerHandler("reload");
    }).on("reload",function(){
        var select = $(this);
        console.log("reload");
        var method = select.attr("data-search");
        var temp = select.attr("data-where").split(",");
        console.log(temp);
        var data = AjaxRemoteGetData[method].apply(null,select.attr("data-where").split(","));
        select.find("option").remove();
        $.each(data,function(index,item){
            var element = $("<option value=" + item + ">"+item +"</option>");
            select.append(element);
        })
        select.trigger("change");
    })
    var submit = $(this).siblings().eq(1).find(".button");
    submit.click(function(){
        console.log(where);
    })
}
$(document).ready(function () {
    // $("a").click(function(event){
    //     return false;
    // })
    $(".ui-search").UiSearch();
    $(".content-tab").UiTab(".caption > .item", ".block > .item");
    $(".content-tab").UiTab(".block-caption > .block-caption-item ", ".block-content > .block-content-item");
    $("body").UiBackTop();
    $(".ui-slider").UiSlider();
    $(".ui-castcading").UiCastcading();
})
