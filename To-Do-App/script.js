const addToDo = document.querySelector(".addToDo");
const Todo = document.querySelector(".To-do");

addToDo.addEventListener("click", addtask);

function addtask() {
  addToDo.style.display = "block";
  addToDo.style.display = "none";

  const parent = document.createElement("div");
  const p = document.createElement("p");
  const desc = document.createElement("small");
  const addBtn = document.createElement("button");

  p.setAttribute("contenteditable", "true");
  p.setAttribute("data-placeholder", "Add your task...");
  desc.innerText = "Description";

  parent.classList.add("parent");
  desc.classList.add("desc");
  addBtn.classList.add("addBtn");
  addBtn.innerText = "Add task";

  addBtn.addEventListener("click", () => {
    if (p.textContent.trim().length > 1) {
      const taskText = p.textContent.trim();

      // Save task to localStorage
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Create task item
      const taskWrapper = document.createElement("div");
      taskWrapper.classList.add("task-item");

      const taskTitle = document.createElement("p");
      taskTitle.innerText = taskText;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("task-checkbox");

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          taskWrapper.remove();

          // Remove task from localStorage
          let updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
          updatedTasks = updatedTasks.filter(task => task !== taskText);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));

          const deleted = document.createElement("div");
          deleted.classList.add("deleted");
          deleted.innerText = "task Completed 🎉";

          document.body.prepend(deleted);
          setTimeout(() => deleted.remove(), 2000);
        }
      });

      taskWrapper.append(checkbox, taskTitle);
      Todo.prepend(taskWrapper);

      p.innerHTML = "";
      addToDo.style.display = "none";
    } else {
      alert("Please enter at least 2 characters.");
    }
  });

  parent.append(p, desc, addBtn);
  Todo.append(parent);
  console.log("hello");
}

// ✅ Run this on page load to restore input + saved tasks
const showData = () => {
  addtask(); // Show input field on load
  const fragment = document.createDocumentFragment();

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(taskText => {
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-item");

    const taskTitle = document.createElement("p");
    taskTitle.innerText = taskText;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskWrapper.remove();

        let updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        updatedTasks = updatedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        const deleted = document.createElement("div");
        deleted.classList.add("deleted");
        deleted.innerText = "task Completed 🎉";

        document.body.prepend(deleted);
        setTimeout(() => deleted.remove(), 2000);
      }
    });
    taskWrapper.append(checkbox, taskTitle);
    fragment.append(taskWrapper);

    Todo.prepend(fragment);
  });
};
showData();