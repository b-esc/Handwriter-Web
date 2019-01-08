$(document).ready(function(){
    //$('body').append("<a>middleware loaded</a><br>");
    $('#plumb_btn').click(plumb);

    function plumb(){
        let input = $('#plumb_input').val();
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
    //	$("#btn_addGroup").click(addGroup_onClick);

});
