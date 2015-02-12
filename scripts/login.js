/**
 * Created by Sun on 2/12/2015.
 */

var currentUser;

Parse.initialize("u69qJREkjBxioKLH08v0G9kK5fWHMoEJ9r2SnuiU", "3iZO7rI8ZUQHl9EHFAes0PmdHHLAo3ZGYP6M1ED7");

var user=Parse.Object.extend("user",{

    ini:function(username,password){

        this.set("username",username);
        this.set("password",password);
        this.set("preference",JSON.stringify([]));
    },
    addPlaylist: function(newList){
        var playlists=JSON.parse(this.get("preference"));

        playlists.push(newList);

        this.set("preference",JSON.stringify(playlists));
        this.save();
    }


});




function Register(username,password){

        var existing=false;

        var newUser=new user();
        newUser.ini(username ,password);


        var query=new Parse.Query(user);

        query.equalTo("username",username);

        query.find({
            success:function(result){
                if(result.length>0) {

                    existing=true;
                    return;
                }
            }
        });
        if(existing){
            $("#RegisterSuccess").html("User already exists!");

            return;
        }else {
            newUser.save(null, {
                    success: function (newUser) {

                        currentUser = newUser;

                        refresh();

                        $("#RegisterSuccess").html("New user Created! " + username);
                    },
                    error: function (error) {

                    }
                }
            );
        }


        newUser.save(null,{
            success : function(newUser){

                currentUser=newUser;

                $("#RegisterSuccess").html("New user Created! "+username);
            },
            error:function(error){

            }});
};

function Login(username,password){
    var query=new Parse.Query(user);

    query.equalTo("username",username);

    query.find({
        success:function(result){
            if(result.length>1){
                return;

            }else{
                var pass=result[0].get('password');

                if(password==pass){

                    currentUser=result[0];

                    refresh();


                }else{
                    $("#LogInFail").html("The password is wrong!");
                }
            }
        },
        error: function(error){
            $("#LogInFail").html("The user does not exist!");
        }
    });
};




function loginFacebook(data){
    Register(data.name,"");
    Login(data.name,"");
}


function refresh(){
    var playlist=JSON.parse(currentUser.get("preference"));

    $(".login").hide();

    $(".ChoosePlaylist").show();

    $("#Playlists").html("");

    for(var i=0;i<playlist.length;i++){
        var list=$('<option value="'+playlist[i].code+'">'+playlist[i].title+'</option>');

        console.log(playlist[i]);

        $("#Playlists").append(list);
    };

    $("#proceed").click(function(){
       var code= $("#Playlists").val();

        if(!code){
            return;
        }

        var newUrl=window.location.href;

        newUrl=newUrl.split('/');
        newUrl=newUrl.splice(0,newUrl.length-1).join('/');
        newUrl+='/gallery.html?'+currentUser.get("username")+"&"+code;

        window.location.href=newUrl;

    });

};

function addPlaylist(){
    var newList={title: $("#newListTitle").val(),code: $("#newListCode").val()};

    var playlist=JSON.parse(currentUser.get("preference"));

    currentUser.addPlaylist(newList);

    refresh();

    $('.row p').html("New Playlist Added!");
}