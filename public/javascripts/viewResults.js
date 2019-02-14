$( document ).ready(function() {


$.ajax({
            type: 'POST',
            data:JSON.stringify({img:str,filename:filename}),
            dataType: "json",
            contentType:'application/json',
            url:'/fileUpload',
            success: function(data){
                console.log('the ajax call was considered successful');
                console.log(data);
                displayFeatures(data,filename);
            },
            error: function(err){
                throw err;
                console.log('an error occured during ajax');
                //console.log(err);
            }
        });

}
