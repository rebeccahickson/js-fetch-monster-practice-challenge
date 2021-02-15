const url = "http://localhost:3000/monsters";
let page = 1;

document.addEventListener("DOMContentLoaded", () => {
  getMonsters();
  addForm();
  addMoreMonsters();
});

function getMonsters(page = 1) {
  fetch(url + `?_limit=50&_page=${page}`)
    .then((response) => response.json())
    .then(handleData);
}

function handleData(data) {
  let container = document.getElementById("monster-container");
  let ul = document.createElement("ul");
  container.append(ul);
  for (const monster of data) {
    let li = document.createElement("li");
    li.innerHTML = `<p>${monster.name}</p>
        <p>${monster.age}</p>
        <p>${monster.description}</p>`;
    ul.append(li);
  }
  console.log(data);
}

function addForm() {
  let formContainer = document.getElementById("create-monster");
  formContainer.innerHTML = `<form>
<p><input label="Name" type="text" name="monster-name"></input></p>
<p><input label="Age" type="text" name="monster-age"></input></p>
<p><input label="Description" type="text" name="monster-description"></input></p>
<input type="submit" value = "Create Monster Button"></input>
</form>`;
  formContainer.querySelector("form").addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: e.target.children[0].querySelector("input").value,
      age: e.target.children[1].querySelector("input").value,
      description: e.target.children[2].querySelector("input").value,
    }),
  };

  fetch(url, configObj)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function addMoreMonsters() {
  let btn = document.getElementById("forward");
  page += 1;
  btn.addEventListener("click", () => {
    document.getElementById("monster-container").innerHTML = "";
    getMonsters(page);
  });
}
