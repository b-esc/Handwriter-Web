$( document ).ready(function() {
    var $uploadCrop;
    var toUpload;

  $('#crop-redir').click(function(){
    window.location.href='/docsingle';
  })

    function readFile(input) {
      alert('file bein read');
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              $('#thumbnail-targ').css("background-image","url("+e.target.result+")");
              toUpload = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $uploadCrop = $('#croppie-targ').croppie({
        viewport: {
            width: 500,
            height: 500,
        },
        enableResize: true,
        boundary: {
            width: 500,
            height: 500
        }
    });

    function popupResult(result) {
        console.log("popping up result...");
        var status = "success";
        var html;
        if (result.html) {
            html = result.html;
        }
        if (result.src != "") {
            alert(result.src);
            html = '<img src="' + result.src + '" />';
        }else{
          status = "error";
        }

        //$('body').append(html);
        Swal.fire({
           title: "Image Upload",
           imageUrl: result.src,
            type: "success"
        });
        // swal({
        //     title: 'fancy loading bar here plz',
        //     content:{
        //         element: "img",
        //         attributes:{
        //             src : result.src
        //         }
        //     },
        //     allowOutsideClick: true
        // });
        setTimeout(function(){
            $('.sweet-alert').css('margin', function() {
                var top = -1 * ($(this).height() / 2),
                    left = -1 * ($(this).width() / 2);

                return top + 'px 0 0 ' + left + 'px';
            });
        }, 1);
    }

    //its too early to probably do type checking

    function displayFeatures(features,filename){
        //this is because list() in R packs it as 0th index element array of json objects
        features = features[0];
        var html = "<table class='table'>";
        html += "<thead><tr>";
        for(var arr1 in features[0]){
            html += "<th scope='col'>" + arr1 + "</th>";
        }
        html+="</tr></thead><tbody>";
        for(var i = 0; i < features.length; i++){
            html += "<tr>";
            for(var prop in features[i]){
                html += "<td>" + features[i][prop] + "</td>";
            }
            html += "</tr>"
        }
        html += "</tbody>";
        html += "</table>";
        Swal.fire({title:filename,customContainerClass:".swal2-fs",html:html});
    }
    //nogo probably
    function uploadResult(result){
        alert('attempting upload result');
        let image = result.src;
        console.log(image);
        $.ajax({
            type:'POST',
            data: result,
            url:'/upload',
            contentType: 'application/json',
            success: function(data){
                console.log(data);
            },
            error: function(error){
                console.log(error);
            }
        });
    }

    function base64Upload(str,filename){
        //console.log(str);
        popupResult({src:str});
        alert('attempting to upload image via base 64');
        test = {img:str};
        console.log(test);
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

    $('#upload').on('change', function () { readFile(this); });
    $('.upload-result').on('click', function (ev) {
        
                        
            filename = $('#upload').val().replace(/C:\\fakepath\\/i, '');
            base64Upload(toUpload,filename);
            //$('#fileupload').submit();
            //uploadResult({src:resp});
    });

});
