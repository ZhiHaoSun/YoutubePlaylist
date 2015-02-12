// JavaScript Document
$(document).ready(function() {

    var username=window.location.href.split('?')[1].split("&")[0];
    var code=window.location.href.split("&")[1];

    console.log(username);


    var query=new Parse.Query(user);
    query.equalTo("username",username);

    query.find({
        success: function(results){
            currentUser=results[0];

            var preferences=JSON.parse(currentUser.get("preference"));

            for(var i=0;i<preferences.length;i++){
                var list=$('<option value="'+preferences[i].code+'">'+preferences[i].title+'</option>');

                $("#preference").append(list);
            };

            $("#preference").change(function(){
                var newCode=$("#preference").val();

                if(!newCode){
                    return;
                }

                var newUrl=window.location.href;
                newUrl=newUrl.split('&')[0];

                newUrl+='&'+newCode;

                window.location.href=newUrl;
            });
        }
    });




    var playListURL = 'http://gdata.youtube.com/feeds/api/playlists/'+code+"?v=2&alt=json&callback=?";

    var videoURL = 'http://www.youtube.com/watch?v=';
    $.getJSON(playListURL, function(data) {
        console.log(data);
        var list_data = "";
        var i = 1;

        $.each(data.feed.entry, function(i, item) {

            var feedTitle = item.title.$t;

            var feedURL = item.link[1].href;
            var fragments = feedURL.split("/");

            var description = "";
            var thumbnailUrl = item.media$group.media$thumbnail[0].url;
            var res = thumbnailUrl.replace("default", 0);
            //alert(thumbnailUrl)
            var sum = item.media$group.media$description.$t;
            var playerUrl = item.media$group.media$content[0].url;

            id = "id" + i;

            list_data += '<div class="img" id="' + i + '" ondblclick="video_elem(\'' + feedTitle + '\',\'' + playerUrl + '\',\'' + i + '\')"><img src="' + res + '" /><div class="title" >' + feedTitle + '</div><div class="hide" >' + sum + '</div></div>';
        });

        $('.wrap').html(list_data);
        grid();
        $('.img').drags();
    });
    $('.filter').click(function() {
        $('.grid li').addClass("zoomout")

    })
})

function video_elem(title, source, id) {

    $('.light').fadeIn();
    loadVideo(source, true);
    $('.title').html(title);
    $('.text p').html($('#' + id + ' .description-back').html());
}

function loadVideo(playerUrl, autoplay) {
    swfobject.embedSWF(
        playerUrl + '&modestbranding=1&rel=1&border=0&autoplay=' +
        (autoplay ? 1 : 0), 'player', '525', '350', '9.0.0', false,
        false, {
            allowfullscreen: 'true'
        });
}

function stop_video() {
    //loadVideo("", false);
    $('.light').fadeOut();
}

$(document).ready(function() {

    $('#s_toggle').click(function() {
        if ($(this).html() == "Hide") {
            $(this).html("Show")
        } else {
            $(this).html("Hide");
        }
        $('.side-bar').slideToggle();

    });

    $('.light').hide();

    grid();




    $('.close').click(function() {

        $('.light').fadeOut();

    })


});




function shuffle() {


    $('.img').removeClass("img1").removeClass("img2").removeClass("img3").removeClass("img4").addClass("img1");

    $('.img1').animate({
        'top': '0px',
        'left': '0px'
    });

    var rand = [17, 8, 35, 15, 10, 25, 12, 19, 19, 30, 26, 40, 45, 12, 6];
    var rand1 = [30, 25, 15, 65, 7, 18, 39, 45, 19, 30, 26, 40, 45, 12, 6];

    for (var i = 1; i <= 20; i++) {
        var rr = Math.floor(Math.random() * rand.length);
        var rr1 = Math.floor(Math.random() * rand1.length);
        $(".img1:nth-child(" + i + ")").css({
            "-webkit-transform": "rotate(0deg)",
            "-moz-transform": "rotate(0deg)",
            "margin-left": "" + rand1[rr1] + "%",
            "margin-top": "" + rand[rr] + "%"
        })
    }
}

function shuffle_r() {


    $('.img').removeClass("img1").removeClass("img2").removeClass("img3").removeClass("img4").addClass("img3");

    $('.img3').animate({
        'top': '0px',
        'left': '0px'
    });

    var rand = [2, 15, 10, 25, 19, 35, 17, 8, 19, 30, 26, 40, 45, 12, 6];
    var rand1 = [15, 65, 30, 25, 39, 45, 7, 18, 19, 30, 26, 40, 45, 12, 6];

    for (var i = 1; i <= 20; i++) {
        var rr = Math.floor(Math.random() * rand.length);
        var rr1 = Math.floor(Math.random() * rand1.length);
        var rr2 = Math.floor(Math.random() * rand1.length);
        var rr3 = Math.floor(Math.random() * rand1.length);

        $(".img3:nth-child(" + i + ")").css({
            "-webkit-transform": "rotate(-" + rand[rr3] + "deg)",
            "-moz-transform": "rotate(-" + rand[rr2] + "deg)",
            "margin-left": "" + rand1[rr] + "%",
            "margin-top": "" + rand[rr1] + "%"
        });


    }
}

function video_elem(title, source, id) {

    $('.modal').fadeIn()
    loadVideo(source, true)
    $('#title').html(title)
    $('.desc p').html($('#' + id + ' .hide').html())
}

function loadVideo(playerUrl, autoplay) {
    swfobject.embedSWF(
        playerUrl + '&modestbranding=1&rel=1&border=0&autoplay=' +
        (autoplay ? 1 : 0), 'player', '525', '350', '9.0.0', false,
        false, {
            allowfullscreen: 'true'
        });
}

function stop_video() {

    $('.modal').fadeOut();
}


function grid() {

    $('.img').removeClass("img1").removeClass("img2").removeClass("img3").removeClass("img4").addClass("img2");
    $('.img2').animate({
        'top': '0px',
        'left': '0px'
    });


    for (var i = 1; i <= 20; i++) {

        $(".img2:nth-child(" + i + ")").css({
            "margin-left": "5px",
            "margin-top": "5px",
            "-webkit-transform": "rotate(0deg)",
            "-moz-transform": "rotate(0deg)"
        })
    }


}


function stack() {

    $('.img').removeClass("img1").removeClass("img2").removeClass("img3").removeClass("img4").addClass("img4");
    $('.img4').animate({
        'top': '0px',
        'left': '0px'
    });


    var marg_l = 30;
    var marg_t = 10;

    for (var i = 1; i <= 20; i++) {

        $(".img4:nth-child(" + i + ")").css({
            "margin-left": "" + marg_l + "%",
            "margin-top": "" + marg_t + "%",
            "-webkit-transform": "rotate(0deg)",
            "-moz-transform": "rotate(0deg)",
            "z-index": "" + i + ""
        })

        marg_l = marg_l + 1;
        marg_t = marg_t + 1;
    }


}


function logout(){

    var newUrl=window.location.href;

    newUrl=newUrl.split('/');
    newUrl=newUrl.splice(0,newUrl.length-1).join('/');

    newUrl+='/index.html';

    window.location.href=newUrl;
}