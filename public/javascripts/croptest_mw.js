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

    $('#upload').on('change', function () { readFile(this); });
    $('.upload-result').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            $('#imagebase64').val(resp);
            popupResult({
                src: resp
            });
            $('#fileupload').submit();
            //uploadResult({src:resp});
        });
    });

});