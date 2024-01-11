document.addEventListener("DOMContentLoaded", () => {
  const gridInput = document.getElementById("grid-input");
  const clearBtn = document.getElementById("clear");
  const guessBtn = document.getElementById("guess");
  const result = document.getElementById("result")
  let isColoring = false;

  for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    cell.id = `${i}`;
    cell.classList.add("cell");
    cell.style.cssText =
      "border: 1px solid white; width: 50px; height: 50px; color: white;";
    gridInput.appendChild(cell);
  }

  clearBtn.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.cssText =
        "background-color: rgb(38 38 38); border: 1px solid white; width: 50px; height: 50px;";
    }
    isColoring = false;
  });

  gridInput.addEventListener("mousedown", (e) => {
    e.target.style.cssText = "background-color: white;";
    isColoring = true;
    // console.log(e.target.id);
  });

  gridInput.addEventListener("mouseup", (e) => {
    isColoring = false;
  });

  gridInput.addEventListener("mouseover", (e) => {
    if (isColoring && e.target.classList.contains("cell")) {
      e.target.style.cssText = "background-color: white;";
      // console.log(e.target.id);
    }
    else {
      isColoring = false;
    }
  });

  guessBtn.addEventListener("click", () => {
    let imgArr = new Array(64);

    for (let i = 0; i < 64; i++) {
      const cells = document.querySelectorAll(".cell");
      if (cells[i].style.cssText === "background-color: white;") imgArr[i] = 15;
      else imgArr[i] = 0;
    }

    const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];

    $.ajax({
      url: "/app/predict_digit/",
      method: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({ array: imgArr }),
      headers: {
        "X-CSRFToken": csrfToken,
      },
      success: function (response) {
        console.log(response.prediction[1]);
        result.innerHTML = `Is it a ${response.prediction[1]}?`
      },
      error: function (error) {
        console.error(error);
      },
    });
  });
});
