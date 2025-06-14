const addBtn = document.querySelector(".addNotes");
const area = document.querySelector(".notes");
const colors = ["#393E46", "#547792", "#AFDDFF", "#4F1C51"];
let index = 0;

addBtn.addEventListener("click", () => {
    // Outer note container
    const noteElement = document.createElement("div");
    noteElement.classList.add("snippet");
    noteElement.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;

    // Text area inside note (editable only this part)
    const textArea = document.createElement("div");
    textArea.classList.add("textArea");
    textArea.setAttribute("contenteditable", "true");
    textArea.innerText = "Start Typing...";

    // Cross (×) button
    const close = document.createElement("span");
    close.classList.add("close");
    close.innerHTML = "&times;";
    
    // Append editable text and close button to note
    noteElement.appendChild(close);
    noteElement.appendChild(textArea);

    // Append note to area
    area.appendChild(noteElement);

    // Close removes the note
    close.addEventListener("click", () => {
        noteElement.remove();
    });
});
