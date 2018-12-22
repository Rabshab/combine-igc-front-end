let result = [];

document.getElementById("combine").onchange = e => {
  for (let i = 0; i < e.target.files.length; i++) {
    readFile(e.target.files[i], e.target.files.length);
  }
};

const readFile = (file, length) => {
  var fr = new FileReader();

  fr.onload = e => {
    postFiles(e.target.result, length);
  };

  fr.readAsText(file);
};

const postFiles = (contents, length) => {
  result.push(contents);

  if (result.length === length) {
    return fetch("http://localhost:3000/combine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(result)
    }).then(res => {
      res.blob().then(blob => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "combined.igc";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    });
  }
};
