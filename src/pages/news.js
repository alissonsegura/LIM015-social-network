import airplane from '../images/logoairplane.svg';
import logout from '../images/logout.svg';
import imgpost from '../images/post-image.svg';

const newsPage = `
<nav class="navcontainer" id="menu">
  <p id="profile" class="profile">Profile</p>

  <div  class="menuoptions">
  <p class="menuoptions">Discover</p>
  <br>
  <img class="navicons" src="${airplane}" alt="airplanelogo"
    srcset=""/>
  </div>

  <div id= "logout" class="menuoptions">
  <p class="logout">Log out </p>
  <img id="navicons" class="navicons" src="${logout}" alt="logout icon"
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
        <textarea class="status" id="txtarea" placeholder="What's on your mind?"></textarea>
        <div class="buttons">
          <img class="svgimage" src="${imgpost}" alt="image-post" srcset="">
          <button id="btnpostmob" class="post">Post</button>
        </div>
      </div>
    </section>
  </section>


    <!-- POST -->
  
    <section id="news" class="newscontainer"></section>
`;
export default newsPage;
