const input = document.getElementById("input");
const add = document.getElementById("add");
const list = document.getElementById("list");
const clear = document.getElementById("clear");
const storedList = localStorage.getItem("currentList");

if (storedList) {
    list.innerHTML = storedList;
}

input.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        add.click();
    }
});

add.addEventListener("click", insertItem);

clear.addEventListener("click", () => {
    list.innerHTML = "";
    localStorage.clear();
});

setInterval(() => {
    let rBtnGroup = document.querySelectorAll(".remove");
    let eBtnGroup = document.querySelectorAll(".edit");
    let pGroup = document.querySelectorAll("p");
    let sGroup = document.querySelectorAll("span");
    rBtnGroup.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            pGroup[i].remove();
            localStorage.setItem("currentList", list.innerHTML);
        });
    });
    eBtnGroup.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            input.value = sGroup[i].innerText;
            add.removeEventListener("click", insertItem);
            add.addEventListener("click", editText);
        });
        function editText() {
            sGroup[i].innerHTML = input.value;
            add.removeEventListener("click", editText);
            add.addEventListener("click", insertItem,);
            localStorage.setItem("currentList", list.innerHTML);
        }
    });
}, 100);

function insertItem() {
    if (input.value != "") {
        list.innerHTML += (`<p><button class="remove">X</button><button class="edit">E</button>&emsp;<span>${input.value}</span></p>`);
        localStorage.setItem("currentList", list.innerHTML);
        input.value = "";
    }
}
