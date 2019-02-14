let result = [];
const label = document.getElementById("input-label");
const loading = document.getElementById("loading");
const downloadLink = document.getElementById("download-link");

document.getElementById("file-input").onchange = e => {
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
    label.classList.add("display-none");
    loading.classList.remove("display-none");

    return fetch("http://localhost:3000/combine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(result)
    }).then(res => {
      res.blob().then(blob => {
        loading.classList.add("display-none");
        downloadLink.classList.remove("display-none");

        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = "combined.igc";
      });
    });
  }
};
