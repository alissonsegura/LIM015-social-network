const newsPage = `
<nav class="navcontainer" id="menu">
  <p id="profile" class="profile">Profile</p>

  <div  class="menuoptions">
  <p class="menuoptions">Discover</p>
  <br>
  <img class="navicons" src="./images/logoairplane.svg" alt="airplanelogo"
    srcset=""/>
  </div>

  <div id= "logout" class="menuoptions">
  <p class="logout">Log out </p>
  <img id="navicons" class="navicons" src="./images/logout.svg" alt="logout icon"
    srcset="" />
  </div>
</nav>

<section class="status-container boxed">
    <div class="infocontainer">
      <img id="userImage" class="userImage" src="" alt="user photo" srcset="" />
      <p class="username" id="user-name"></p>
    </div>
    <section id="post-container" class="post-container">
      <div class="textbox" id="post text">
        <textarea class="status" type="text" placeholder="What's on your mind?"></textarea>
        <div class="buttons">
          <img class="svgimage" src="./images/post-image.svg" alt="image-post" srcset="">
          <button class="post">Post</button>
        </div>
      </div>
    </section>
  </section>



  <section id="news" class="newscontainer">
    <section id = "posttwo" class="post-container">
      <div class="post-text" id="post text">
        <textarea class="status" type="text" placeholder="What's on your mind?"></textarea>
        <div class="buttons">
          <img class="svgimage" src="./images/post-image.svg" alt="image-post" srcset="">
          <button class="post">Post</button>
        </div>
      </div>
    </section>




    <div class="status-main">
      <div class="main">
        <div class="imgandtext">
          <img id="userImagePost" class="userImagePost" src="" alt="user photo" srcset="" />
          <p class="user-name" id="username"></p>
        </div>
        <div class="dropdownbox">
          <img id="dropdown" class="dropdown" src="./images/more-horizontal.svg" alt="user photo" srcset="" />
        </div>
      </div>

      <div class="container-main">
        <textarea class="statusbox" type="text" placeholder="HELLO"></textarea>

        <div class="svgbuttons">
          <img class="svgimg" src="./images/likebutton.svg" alt="image-post" srcset="" />
          <img class="svgimgs" src="./images/commentbutton.svg" alt="image-post" srcset="" />
        </div>
      </div>
    </div>
  </section>
`;
const db = firebase.firestore();

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = '';

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
const saveTask = (description) =>
  db.collection("tasks").doc().set({
    description,
  });

const getTasks = () => db.collection("tasks").get();

const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

const deleteTask = (id) => db.collection("tasks").doc(id).delete();

const getTask = (id) => db.collection("tasks").doc(id).get();

const updateTask = (id, updatedTask) => db.collection('tasks').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    <p>${task.description}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Save";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      await saveTask(description.value);
    } else {
      await updateTask(id, {
        description: description.value,
      })

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Post';
    }

    taskForm.reset();
  } catch (error) {
    console.log(error);
  }
});

export default newsPage;
