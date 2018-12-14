

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

/// NEED TO FIGURE out how to change {saved: true}
// $(".save-btn").on("click", function () {
//   var thisId = $(this).attr("data-id");
//   console.log("button test")

//   $.ajax({
//     method: "POST",
//     url: "/saved",
//     data: {
//       saved: true
//     }
//   })
//     .then(function (data) {
//       console.log(data);
//     })

// })

