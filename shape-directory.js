const process = (div) => {
    div.setAttribute("class", "process");
    const anchor = document.createElement("a");
    anchor.innerText = msg.value;
    anchor.setAttribute("href", anchor_link.value);
    div.appendChild(anchor);
}

const start = (div) => {
    div.setAttribute("class", "start");
}

const end = (div) => {
    div.setAttribute("class", "end");
}

const decision = (div) => {
    div.setAttribute("class", "desicion");
    div.innerText = msg.value;
    const anchor = document.createElement("a");
    anchor.innerText = msg.value;
    anchor.setAttribute("href", anchor_link.value);
    div.appendChild(anchor);
}

const inputOutput = (div) => {
    div.setAttribute("class", "input-output");
    div.innerText = msg.value;
    const anchor = document.createElement("a");
    anchor.innerText = msg.value;
    anchor.setAttribute("href", anchor_link.value);
    div.appendChild(anchor);
}
const _shapeGenrator = {
    "process": process,
    "start": start,
    "end": end,
    "decision": decision,
    "inputOutput": inputOutput,
}
const genrateShape = (shape)=>{
    const div = document.createElement("div");
    div.setAttribute("id", count++);
    div.style.top = Math.random() * 80 + "%";
    div.style.left = Math.random() * 80 + "%";
    _shapeGenrator[shape](div)
    return div
}
