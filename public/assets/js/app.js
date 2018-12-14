
// Clear all articles
$(".clear").on("click", function (req, res) {
  console.log("button working")

  $.ajax({
    method: "GET",
    url: "/clear"
  })
    .then(function (data) {
      window.location.reload();
    })

})

// Scrap Articles from Buzzfeed
$(".scrape-new").on("click", function (req, res) {
  console.log("button working")

  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    .then(function (data) {
      window.location.reload();
    })

})

// Click event to save article
$(".save-btn").on("click", function () {
  var thisId = $(this).attr("data-id");
  console.log("button test")

  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  })
    .then(function (data) {
      console.log(data);
    })

})

// Click event to delete article
$(".delete-btn").on("click", function () {
  var thisId = $(this).attr("data-id");
  console.log("button test")

  $.ajax({
    method: "POST",
    url: "/delete/" + thisId
  })
    .then(function (data) {
      console.log(data);
      window.location.reload();
    })
    
})

