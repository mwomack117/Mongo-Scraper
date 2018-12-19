
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

// Click event to save node
$(".note-save").on("click", function () {
  var thisId = $(this).attr("data-id");
  console.log("note test")

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#note-title").val(),
      body: $("#note-body").val()
    }
  })
    .then(function (data) {
      console.log(data);
    })

})
 