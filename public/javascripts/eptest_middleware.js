$(document).ready(function(){
    //$('body').append("<a>middleware loaded</a><br>");
    $('#plumb_btn').click(plumb);

    function plumb(){
        let input = $('#plumb_input').val();
        console.log("echo plumb !! our input was: " + input);
        $.ajax({
            type: 'POST',
            data:JSON.stringify({
                msg: input
            }),
            contentType:'application/json',
            url:'/r_plumb',
            success: function(data){
                $('body').append(`<a>plumbed message: ${data}</a>`);
            }
        });
    }

    $('#plumb_img_btn').click(plumb_img);

    function plumb_img(){
        let input = $('#plumb_img_input').val();
        $.ajax({
            type: 'POST',
            data:JSON.stringify({
                img_name: input
            }),
            contentType:'application/json',
            url:'/r_img_plumb',
            success: function(data){
                $('body').append(`<a>img process response: ${data}</a>`);
                console.log(data);
            }
        });
    }
    //	$("#btn_addGroup").click(addGroup_onClick);

});
