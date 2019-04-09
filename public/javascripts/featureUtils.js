/*
so i decided i need to stop writing bad code once stuff gets hairy
i focused too much on rushing out stuff, now its biting me a bit

utilities for handling features upon request..

depencencies:
    bootstrap, jquery
 */

$(document).ready(function(){

});

/*
takes an object received from R plumber, converts it into a table
this table gets inserted inside addTableToPage
 */
function featuresToTable(features){
    //this is because list() in R packs it as 0th index element array of json objects
    features = features[0];
    var html = "<table class='table table-bordered table-sm table-responsive-sm table-hover'>";
    html += "<thead><tr>";
    for(var arr1 in features[0]){
        html += "<th scope='col'>" + arr1 + "</th>";
    }
    html+="</tr></thead><tbody>";
    for(var i = 0; i < features.length; i++){
        targIndex = i+1;
        targId = `letter${targIndex}`;
        html += `<tr id=${targId}>`;
        //html += `<tr onclick='function(){showLetter(${targIndex})}'>`;
        for(var prop in features[i]){
            //if(features[i][prop].length > 15) features[i][prop] = "...";
            html += "<td>" + features[i][prop] + "</td>";
        }
        html += "</tr>"
    }
    html += "</tbody>";
    html += "</table>";
    return html;
}


/*
adds a pop-up table to a page
don't forget the # in front of target id
 */
function addTableToPage(data,targetId) {


    <!-- Modal -->
    let table = `<div class="modal fade" id="info1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Features for ${argArray[2]}</h5>
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

    $(targetId).append(table);
}