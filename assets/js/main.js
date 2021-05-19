// проверка Email на валидность
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$(document).ready(function(){
    $(document).on("click", "#mbtn", function(){
        $(".mbtn").toggleClass("active");
        $(".main_mob_menu_wrapper").toggleClass("active");
    })
    if ($(".owl-carousel-main-slider").length > 0) {
        $(".owl-carousel-main-slider").owlCarousel({
            items:1,
            loop:true
        });
    }
    if ($(".owl-carousel-main-news").length > 0) {
        $(".owl-carousel-main-news").owlCarousel({
            items:1,
            loop:true,
            nav:true
        });
    }
    if ($(".owl-carousel-portfolio-slider").length > 0) {
        $(".owl-carousel-portfolio-slider").owlCarousel({
            items:1,
            /*loop:true*/
        });
    }
	if ($(".owl-carousel-news-slider").length > 0) {
        $(".owl-carousel-news-slider").owlCarousel({
            items:1,
            /*loop:true*/
        });
    }
    if ($('select.styler').length > 0) {
        $('select.styler').styler();
    }
    
$("form.submitter").on("submit", function(e){
    e.preventDefault();
    var a = $(this);
    var form_info = a.find(".form_info");
    var form_loader = a.find(".form_loader");
    var qr = a.serialize().replace(/\'/g, '"');
    var error = '';
    a.find(".required").each(function(){
        if ($(this).val() == '') {
            $(this).parent().addClass("invalid").find(".error").html('обязательное поле');
            error = 'Не заполнены обязательные поля';
        }
    })
    a.find(".email").each(function(){
        validEmail = isValidEmailAddress($(this).val());
        if (!validEmail && $(this).val() != '') {
            $(this).parent().addClass("invalid").find(".error").html('неверный формат');
            error = 'Неверный формат E-mail';
        }
    })
    var close = a.data("close")||'no';
    var open = a.data("open")||'no';

    if ($("#itogo").length > 0 && $(".resultTable").length > 0) {
        var addinfo1=$("#info").html();
        var addinfo2=$(".resultTable").html();
        var addinfo3=$("#itogo").html();
        qr += '&addinfo1=' + addinfo1 + '&addinfo2=' + addinfo2 + '&addinfo3=' + addinfo3;
    }
	console.log(qr);

    if (error == '') {
        $.ajax({
            url: "ajax.php",
            data: qr,
            type: "POST",
            cache: false,
            dataType: 'json',
            beforeSend:function(){
                form_info.html('');
            },
            success: function(msg){
				console.log(msg);
                if (msg.error) {
                    form_info.html('<span class="error">' + msg.error + '</span>');
                }
                if (msg.status) {
                    a.find("input[type='text']").val('');
                    a.find("textarea").val('');
                    if (close != 'no') {
                        $("." + close).removeClass("active");
                    }
                    if (open != 'no') {
                        $("." + open).addClass("active");
                    }
                }
            }
        })
    } else {
        /*form_info.html('<span class="error">' + error + '</span>');*/
    }
})

$("input").on("keyup change",function(e){
    if($(this).parent().hasClass("invalid")){
        $(this).parent().removeClass("invalid");
        $(this).parent().find(".error").html('');
    }
});
$("textarea").on("keyup change",function(e){
    if($(this).parent().hasClass("invalid")){
        $(this).parent().removeClass("invalid");
        $(this).parent().find(".error").html('');
    }
});

$(".slidetext1").on("click", function(e){
    e.preventDefault();
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parent("div").next("div.slidetext").slideUp("fast");
    } else {
        $(this).addClass("active");
        $(this).parent("div").next("div.slidetext").slideDown("fast");
    }
});

$("img.bigger").each(function(){
    $(this).wrap("<a href='" + $(this).attr("src") + "' data-fancybox='gallery' " + ($(this).attr("alt") ? "title='" + $(this).attr("alt") + "'" : "" ) + "></a>");
})


})