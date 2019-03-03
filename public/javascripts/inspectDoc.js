$(document).ready(function() {
  /*
   * argArray handles various arguments
   * argArray[2], intended for a single doc name
   */
  argArray = window.location.pathname.split('/');
  $.get('/inspectGet/'+argArray[2], (data, status) =>{
    newImg = `<img id=${data[0].name} src=''/>`
    //newImg = '<a>hey</a>'
    $("#inspectTarg img").attr('src',`/${data[0].name}`);
    console.log(data[0].name);
  })
  alert(argArray[2]);
  //$.get()
/*  $.ajax({
    type: "GET",
    data: "NickCodingText.png",
    dataType: "json",
    contentType: "application/json",
    url: "/inspectImage",
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      throw err;
      console.log("an error occured during ajax");
      // console.log(err);
    }
  });*/
});
