/*
 *An easy way to archieve personalized popup on your own website
 *author:zackma
 */

if (typeof jQuery === 'undefined') {
    throw new Error('zackpop requires jQuery');
}

var flag = false;   //Set a flag for function zackpop.init(). 

//Define a css object where you can also add more object members(css) for your popup.
var css = {
    "default":"default.css",
    //More themes go here......       
};        

var zackpop = {
    "version":"1.1",
    "date":"20150423",
    "function":"[alert(str,okCB),confirm(str,okCB,canCB)]",
    "perameter":"[{'str':'your message'},{'okCB':'callback function for OK button'},{'canCB':'callback function for Cancel button'}]",
    //show detail information of zackpop
    det:function(){
        for(var key in zackpop){
            if(typeof(zackpop[key]) == 'string'){
                console.log(key+':'+zackpop[key]);
            }
        }
    },   
    //function to initialize popup theme.
    init:function (theme){
       $('#themes').attr('href','css/'+ css[theme]/*Your css path here*/ );  //add popup stylesheet
       flag = true;
    }
};   

//Set default css if there is no initialization.
if(!flag){
    $('#themes').attr('href','css/default.css');
}

;(function($){                      

    //Define musk for all popup here :
    var musk = '<div id = "musk"></div>';

    //Define msgFram here :
    var msgFram = '<div id = "msgFram">\
                       <ul>\
                           <li class = "msg"></li>\
                           <li class = "btn"><span class="doOk">确 定</sapn></li>\
                       </ul>\
                  </div>';

    //Some constant for popup position :
    var dist = ($(window).width() - 280)/2 +'px';
    var docHeight = $(document).height() + 'px';
    var framTop = $(window).height()-85-($(window).height()*0.618) + 'px' ; //Consider to The Golden Ratio in the direction of y axis.
    
    //basic function for popup :
    var popup = {
        //Show popup :
        show:function(str){         
            if($('#musk,#msgFram').length == 0){      //Make sure there is no popup before executing append.
                $('body').append(musk + msgFram);  
                $('.msg').html(str);

                //Set postion of msgFram and make musk cover the whole screen.     
                $("#msgFram").css({"left":dist,"top":framTop});                        
                $("#musk").css({"height":docHeight});
            }     
        },
        //Remove popup by clicking musk or pressing 'enter' key :
        remove:function(callback){
            if($('#musk,#msgFram').length != 0){
                //Click events
                $('#musk').on('click',function(){
                    $('#musk,#msgFram').remove();
                });
                //Knock 'Enter' key to remove popup.
                $(window).keydown(function(e){
                    if(e.keyCode == '13'){
                        $('#musk,#msgFram').remove();
                    }
                }); 
                //Click 'OK' key to remove popup.
                if($('.doOk')){
                    $('.doOk').on('click',function(e){
                        if(e.target == $('.doOk')[0]){
                            if(callback){callback()}
                            console.log(true);
                            $('#musk,#msgFram').remove();
                        }                       
                    });
                }
                //Click 'Cancel' key to remove popup.
                if($('.doCancel')){
                    $('.doCancel').on('click',function(e){
                        if(e.target == $('.doCancel')[0]){
                            console.log(false);
                            $('#musk,#msgFram').remove();
                            return false;
                        }
                        
                    });
                }  
            }  
        },
    };

    $.fn.extend({                 
        alert:function(str,callback){    
            popup.show(str);
            popup.remove(callback);
        },         
        confirm:function(str,callback){
            var that = this;
            popup.show(str);
            $('.btn').append('<span class="doCancel">取 消</sapn>');
            popup.remove(callback);
        },
    });
})(jQuery);