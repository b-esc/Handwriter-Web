$(document).ready(function () {
    var globaldraw;
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
    argArray = window.location.pathname.split('/');
    var filename = argArray[2];

    $.ajax({
        type: "POST",
        data: JSON.stringify({ targ: filename }),
        dataType: "json",
        contentType: "application/json",
        url: "/targResults",
        success: function(data) {
            console.log(data);
            addTableToPage(data,'#append-targ');
            calculateOffset(data[0].data[0],data[0].height,data[0].width);
        },
        error: function(err) {
            alert("error during ajax!");
            throw err;
            console.log("an error occured during ajax");
            // console.log(err);
        }
    });


    /*
     * argArray handles various arguments
     * argArray[2], intended for a single doc name
     */



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

    /*
    in the future, refactor
    Todo:
        refactor 800 to browserViewHeight
        refector 1100 to browserViewWidth
     */
    function calculateOffset(letterData,h,w){
        if(h <= 800 && w <= 1100){
            initDrawClient(letterData,h,w,1,1);
        }
        else{
            let aRatio = w/h;
            let newH = h - 800;
            let newW = w - 1100;
            let hOffSet = 1;
            let wOffSet = 1;
            /*
            difference between newH is greater
            fix newH to 800
            newWidth = (newH*aRatio)
             */
            if(newH > newW){
                newH = 800;
                newW = (newH*aRatio);
            }
            /*
            difference between width is greater
            fix newW to 1100
            newHeight = (newWidth/aRatio);
             */
            else{
                newW = 1100;
                newH = (newW/aRatio);
            }

            if(newW<w){
                wOffSet = (newW/w);
            } else{
                wOffSet = (w/newW);
            }

            if(newH<h){
                hOffSet = (newH/h);
            } else{
                hOffSet = (h/newH);
            }
            console.log("uhh debug; " + wOffSet);
            initDrawClient(letterData,newH,newW,hOffSet,wOffSet);
        }
    }
    function initDrawClient(letterData,height,width,heightOffset,widthOffset){
        console.log(height + " " + width + " " + heightOffset + " " + widthOffset);
        var draw = buildDrawingInstance(letterData,`/ThinImages/${filename}_thinned.png`,'inspectTarg', width,height,widthOffset,heightOffset);
      globaldraw = draw;
        //drawCircle(draw,5,5,2);
        //drawCircle(draw,770,556,2);
        //drawLetterCentroids(draw,[2,3,4],4);
        //drawLetterPaths(draw,[2,3],4);
      //
      //hmm this is pretty much the centroid rn
        //drawLetterCirclePath(draw,[2,3],2);
        draw.update();
    }

    $(document).on('click','[id^=letter]',function(e){
        ogId = e.currentTarget.id;
        showLetter(ogId);
        console.log(ogId);
    });

  $('#mark-centroids-button').click(()=>{
    var inputs = $('#mark-centroids-input').val().split(",");
    drawLetterCentroids(globaldraw,inputs,8);
    globaldraw.update();
  }); 

  $('#mark-lettercodes-button').click(()=>{
    var inputs = $('#mark-centroids-input').val().split(",");
    var lcNum = letterCodesToNumbers(inputs);
    drawLetterCentroids(globaldraw,...lcNum,8);
    globaldraw.update();
  });

});
