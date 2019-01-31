$( document ).ready(function() {
    var $uploadCrop;

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                });
                $('.upload-demo').addClass('ready');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $uploadCrop = $('#upload-demo').croppie({
        viewport: {
            width: 200,
            height: 200,
        },
        boundary: {
            width: 300,
            height: 300
        }
    });

    function popupResult(result) {
        var html;
        if (result.html) {
            html = result.html;
        }
        if (result.src) {
            html = '<img src="' + result.src + '" />';
        }
        $('body').append(html);
        swal({
            title: 'fancy loading bar here plz',
            content:{
                element: "img",
                attributes:{
                    src : result.src
                }
            },
            allowOutsideClick: true
        });
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
        Swal.fire({title:filename,html:html});
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
        console.log(str);
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
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            //console.log(typeof(resp));
            //console.log(resp);
            //console.log($('#hiddenupload'));
            //$('#hiddenupload').val(resp);
            //console.log($('#hiddenupload'));
            popupResult({
                src: resp
            });
            filename = $('#upload').val().replace(/C:\\fakepath\\/i, '');
            base64Upload(resp,filename);
            //$('#fileupload').submit();
            //uploadResult({src:resp});
        });
    });

});