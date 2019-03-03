$(document).ready(function() {
  // $("#myModal").modal();
  /* $('#myModal').on('shown.bs.modal', function() {
    $('#myInput').focus()
  });*/
function featuresToTable(features){
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
        return html;
    }

  function displayFeatureBlock(data) {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      let uploadInstance = `<div class="card" style="width: 18rem;">
          <img class="card-img-top" src='/${data[i].name}'></img>
          <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <br>
            <p class="card-text">${data[i].date}</a>
            <br>
            <div class="ib">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#info${i}">
                  View Data
                </button>
                <button type="button" class="btn btn-secondary" onclick="window.location='/inspectImage/${data[i].name}'">
                  Analyze
                </button>
            </div>

                <!-- Modal -->
                <div class="modal fade" id="info${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Features for ${data.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                                ${featuresToTable(data[i].data)}
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

      $("#append-targ").append(uploadInstance);
    }
  }
  $.ajax({
    type: "POST",
    data: JSON.stringify({ yes: "sure" }),
    dataType: "json",
    contentType: "application/json",
    url: "/allResults",
    success: function(data) {
      displayFeatureBlock(data);
      //console.log(data);
    },
    error: function(err) {
      throw err;
      console.log("an error occured during ajax");
      // console.log(err);
    }
  });
});
