/*
 *An easy way to archieve personalized popup on your own website
 *author:zackma
 */

var flag = false;   //Set a flag for function zackpop.init(). 

var zackpop = {

    "version":"1.0",
    "date":"20150423",
    
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

//Define a css object where you can also add more object members(css) for your popup.
var css = {
    "default":"default.css",
    //More themes go here......       
};        

;(function($){                      

    //Define musk for all popup here :
    var musk = '<div id = "musk"></div>';

    //Some constant for popup position :
    var dist = ($(window).width() - 280)/2 +'px';
    var docHeight = $(document).height() + 'px';
    var framTop = $(window).height()-85-($(window).height()*0.618) + 'px' ; //Consider to The Golden Ratio in the direction of y axis.
    
    $.fn.extend({          
        
        alert:function(str){
            
            //Define msgFram here :
            var msgFram = '<div id = "msgFram">\
                               <ul>\
                                   <li class = "msg">'+str+'</li>\
                                   <li class = "btn"><span class="doOk">确 定</sapn></li>\
                               </ul>\
                          </div>';
                                
            //Show popup :
            if($('#musk,#msgFram').length == 0){      //Make sure there is no popup before executing append.
                $('body').append(musk + msgFram);  

                //Set postion of msgFram and make musk cover the whole screen.     
                $("#msgFram").css({"left":dist,"top":framTop});                        
                $("#musk").css({"height":docHeight});
            }               

            //Click the 'OK' button to remove popup.
            $('.doOk').on('click',function(){
                $('#musk,#msgFram').remove();
            });

            //Knock 'Enter' key to remove popup.
            $(window).keydown(function(e){
                if(e.keyCode == '13'){
                    $('#musk,#msgFram').remove();
                }
                return false;
            });

            $('#msgFram').focus();
            $(window).click(function(){return false;});

        }              
    });
})(jQuery);
