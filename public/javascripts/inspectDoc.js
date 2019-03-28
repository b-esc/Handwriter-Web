$(document).ready(function () {
    //this is a massive hack lol
    //two test
    /*
    var elem = document.getElementById('draw-shapes');
    var params = {width:285,height:200};
    var two = new Two(params).appendTo(elem);
    var circle = two.makeCircle(72,100,50);
    var rect = two.makeRectangle(213, 100, 100, 100);
    circle.fill = '#FF8000';
    circle.stroke = 'orangered';
    circle.linewidth = 0;
    var godpls = "<image xlink:href='/OGImages/Writing_csafe_all.png' x='0' y='0' height='200px' width='600px'></image>";
    document.querySelector("svg").innerHTML += godpls;
    two.update();
    */



    /*
     * argArray handles various arguments
     * argArray[2], intended for a single doc name
     */
    argArray = window.location.pathname.split('/');
    var filename = argArray[2];
    var draw = buildDrawingInstance(`/ThinImages/${filename}_thinned.png`,'inspectTarg',1100,800);
    drawCircle(draw,5,5,2);
    drawCircle(draw,770,556,2);
    draw.update();

    /*$.get('/inspectGet/' + filename, (data, status) => {
        newImg = `<img id=${data[0].name} src=''/>`;
        //newImg = '<a>hey</a>'
        //lets you iterate through linked dir
        console.log(data);
        $("#inspectTarg img").attr('src', `/OGImages/${data[0].name}`);
        letterSrc = `<img src='/LetterPlots/${data[0].name}/`;
        for (var i = 1; i <= data[0].letterCount; i++) {
            stuff = `${letterSrc}letter${i}.png'/>`;
            console.log(stuff);
            //$("#inspectTarg").append(stuff);
        }
        console.log(data[0].name);
    });*/

    /*
    $('#thinned').click(()=>{
        $("#inspectTarg img").attr('src', `/ThinImages/${filename}_thinned.png`); //gross
    });
    $('#og').click(()=>{
        $("#inspectTarg img").attr('src', `/OGImages/${filename}`);
    });
     */




    /*
    I want to move these outside of the file, not sure how to without objects yet.
     */
    function showLetter(letterid){
        Swal.fire({
            title: `${letterid} in ${filename}`,
            imageUrl: `/LetterPlots/${filename}/${letterid}.png`,
            type: "info",
        });
    }

    $(document).on('click','[id^=letter]',function(e){
        ogId = e.currentTarget.id;
        showLetter(ogId);
        console.log(ogId);
    });


    $.ajax({
        type: "POST",
        data: JSON.stringify({ targ: filename }),
        dataType: "json",
        contentType: "application/json",
        url: "/targResults",
        success: function(data) {
            console.log(data);
            addTableToPage(data,'#append-targ');
            //console.log(data);
        },
        error: function(err) {
            alert("error during ajax!");
            throw err;
            console.log("an error occured during ajax");
            // console.log(err);
        }
    });
});
