

$(".clear").on("click", function(req, res) {
  console.log("button working")

  $.ajax({
    method: "GET",
    url: "/clear"
  })
  .then(function(data) {
    window.location.reload();
  })
  
})

