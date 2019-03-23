$(document).ready(function () {
    /*
     * argArray handles various arguments
     * argArray[2], intended for a single doc name
     */
    argArray = window.location.pathname.split('/');
    $.get('/inspectGet/' + argArray[2], (data, status) => {
        newImg = `<img id=${data[0].name} src=''/>`;
        //newImg = '<a>hey</a>'
        //lets you iterate through linked dir
        console.log(data);
        $("#inspectTarg img").attr('src', `/OGImages/${data[0].name}`);
        letterSrc = `<img src='/LetterPlots/${data[0].name}/`;
        for (var i = 1; i <= data[0].letterCount; i++) {
            stuff = `${letterSrc}letter${i}.png'/>`;
            console.log(stuff);
            $("#inspectTarg").append(stuff);
        }
        console.log(data[0].name);
    });
    alert(argArray[2]);

    //duplicate code, wanted to change the layout however..
    function modalTable(data) {


        <!-- Modal -->
        let table = `<div class="modal fade" id="info1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Features for argArray[2]</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                                ${featuresToTable(data[0].data)}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Delete</button>
                        <button type="button" class="btn btn-primary">Export</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>`;

        $("#append-targ").append(table);
    }

    function featuresToTable(features){
        //this is because list() in R packs it as 0th index element array of json objects
        features = features[0];
        var html = "<table class='table table-bordered table-dark'>";
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
        return html;
    }

    $.ajax({
        type: "POST",
        data: JSON.stringify({ targ: argArray[2] }),
        dataType: "json",
        contentType: "application/json",
        url: "/targResults",
        success: function(data) {
            console.log(data);
            alert("success on ajax");
            modalTable(data);
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
