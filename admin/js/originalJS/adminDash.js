//on load
$("document").ready(() => {
  const authorize = sessionStorage.getItem(authKey);
  if (!authorize) {
    document.execCommand("stop");
    window.stop();
    alert("Access Denied !");
  } else {
    ping();
    auth.onAuthStateChanged(user => {
      if (user) {
        document.getElementById("last-login").innerText =
          "Last Login : " + user.metadata.lastSignInTime;
        document.getElementById(
          "avatar"
        ).src = `https://ui-avatars.com/api/?name=${user.displayName}&size=120`;
        document.getElementById("user-name").innerText = user.displayName;
        if (
          user.metadata.lastSignInTime === (user.metadata.creationTime || null)
        ) {
          $.toast({
            heading: "Alert",
            text:
              "Hi," +
              user.displayName +
              " For security reasons we recommend to reset your password after first login",
            position: "top-center",
            stack: false,
            icon: "warning",
            hideAfter: 5000
          });
        }
      }
    });
  }
});

const ping = () => {
  var p = new Ping();

  p.ping("http://e-sail.christuniversity.in", function (err, data) {
    if (data) {
      document.getElementById("server-state").style.color = "green";
      document.getElementById("server-state").innerText = "Online";
    } else {
      document.getElementById("server-state").style.color = "red";
      document.getElementById("server-state").innerText = "Offline";
    }
  });
  p.ping("https://e-sail-web-christuniversity.firebaseio.com", function (
    err,
    data
  ) {
    if (data) {
      document.getElementById("data-state").style.color = "green";
      document.getElementById("data-state").innerText = "Online";
    } else {
      document.getElementById("data-state").style.color = "red";
      document.getElementById("data-state").innerText = "Offline";
    }
    var num = Math.floor(Math.random() * 101);
    document.getElementById("hitcount").innerText = num;
  });
};

//add user
const addUserForm = document.querySelector("#newUser-form");
addUserForm.addEventListener("submit", e => {
  e.preventDefault();
  //get data
  const fname = addUserForm["newUser-fname"].value;
  const lname = addUserForm["newUser-lname"].value;
  const newEmail = addUserForm["newUser-email"].value;
  const password = addUserForm["newUser-password"].value;
  const cpassword = addUserForm["newUser-cpassword"].value;
  //match password
  if (password === cpassword) {
    createUser(fname, lname, newEmail, password);
    addUserForm.reset();
  } else {
    $.toast({
      heading: "Error",
      text: "Passwords do not match !",
      position: "top-center",
      stack: false,
      icon: "error",
      hideAfter: 5000
    });
  }
});
const createUser = (fname, lname, newEmail, password) => {
  auth
    .createUserWithEmailAndPassword(newEmail, password)
    .then(cred => {
      const newUser = cred.user;
      newUser
        .updateProfile({
          displayName: fname + " " + lname,
          email: newEmail
        })
        .then(() => {
          newUser
            .sendEmailVerification()
            .then(function () {
              $.toast({
                heading: "User Created",
                text: "A verification email has been sent !",
                position: "top-center",
                stack: false,
                icon: "success",
                hideAfter: 5000
              });
            })
            .catch(function (error) {
              $.toast({
                heading: "Error",
                text: error.message,
                position: "top-center",
                stack: false,
                icon: "error",
                hideAfter: 5000
              });
            });
        })
        .catch(err => {
          $.toast({
            heading: "Error",
            text: error.message,
            position: "top-center",
            stack: false,
            icon: "error",
            hideAfter: 5000
          });
        });
    })
    .catch(function (error) {
      $.toast({
        heading: "Error",
        text: error.message,
        position: "top-center",
        stack: false,
        icon: "error",
        hideAfter: 5000
      });
    });
};
//logout
const signOut = document.querySelector("#sign-out");
signOut.addEventListener("click", e => {
  e.preventDefault();
  logout();
});

const logout = () => {
  if (window.confirm("Are you sure want to log out")) {
    auth.signOut().then(() => {
      window.location = "index.html";
      $.toast({
        heading: "Logged Out",
        text: "User has been logged out",
        position: "top-center",
        stack: false,
        icon: "info",
        hideAfter: 5000
      });
    });
  } else {
    $.toast({
      heading: "Error",
      text: "Command Cancelled",
      position: "top-center",
      stack: false,
      icon: "error",
      hideAfter: 5000
    });
  }
};
//dashboard page Call
const dashboardPageLink = document.querySelector("#dashboardLink");
dashboardPageLink.addEventListener("click", e => {
  e.preventDefault();
  //change page location name
  document.getElementById("pagename").innerText = "Dashboard";
  //hide all and display only dash
  document.getElementById("notification").classList.add("hide");
  document.getElementById("events").classList.add("hide");
 
  document
    .getElementById("notificationLink")
    .parentElement.classList.remove("active");
  document
    .getElementById("eventsLink")
    .parentElement.classList.remove("active");
  document.getElementById("dashboard").classList.remove("hide");
  dashboardPageLink.parentElement.classList.add("active");
  document.getElementById("addUserBtn").style.display = "block";
});

//notifiaction page call
const notificationPageLink = document.querySelector("#notificationLink");
notificationPageLink.addEventListener("click", e => {
  e.preventDefault();
  //change page location name
  document.getElementById("pagename").innerText = "Notifications";
  //hide all and display only notifications
  document.getElementById("dashboard").classList.add("hide");
  document.getElementById("events").classList.add("hide");
  document
    .getElementById("dashboardLink")
    .parentElement.classList.remove("active");
  document
    .getElementById("eventsLink")
    .parentElement.classList.remove("active");
  document.getElementById("notification").classList.remove("hide");
  notificationPageLink.parentElement.classList.add("active");
  document.getElementById("addUserBtn").style.display = "none";
});

//events page call
const eventsPageLink = document.querySelector("#eventsLink");
eventsPageLink.addEventListener("click", e => {
  e.preventDefault();
  //change page location name
  document.getElementById("pagename").innerText = "Events";
  //hide all and display only notifications
  document.getElementById("dashboard").classList.add("hide");
  document.getElementById("notification").classList.add("hide");
  document
    .getElementById("dashboardLink")
    .parentElement.classList.remove("active");
  document
    .getElementById("notificationLink")
    .parentElement.classList.remove("active");
  document.getElementById("events").classList.remove("hide");
  eventsPageLink.parentElement.classList.add("active");
  document.getElementById("addUserBtn").style.display = "none";
});
//file input change
$(".custom-file-input").on("change", function () {
  var fileName = $(this)
    .val()
    .split("\\")
    .pop();
  $(this)
    .siblings(".custom-file-label")
    .addClass("selected")
    .html(fileName);
});
//background image file upload
const uploader = document.querySelector("#upload");
//event listner for change in file input field
upload.addEventListener("change", e => {
  //get file
  const file = e.target.files[0];
  //storage reference
  const storageRef = storage.ref("E-SAIL_web_Background/background");
  //upload file
  const progress = storageRef.put(file);
  //update progress

  progress.on(
    "state_changed",
    function prog(snapshot) {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("progressBar").style.width = percentage + "%";
    },

    function error(err) {
      $.toast({
        heading: "Error",
        text: "Upload Failed! " + err.message,
        position: "top-center",
        stack: false,
        icon: "error",
        hideAfter: 3000
      });

    },
    function complete() {
      storageRef.getDownloadURL().then(url => {
        document.getElementById('bgThumbnail').src = url;
        $.toast({
          heading: "Upload Success",
          text: "Background Image Changed",
          position: "top-center",
          stack: false,
          icon: "success",
          hideAfter: 3000
        });
      });
    }
  );
});

//notification populate

db.collection("notifications").orderBy('title')
  .onSnapshot(snapshot => {
    getNotification(snapshot.docs);
  });

const getNotification = notificationCollection => {
  let htmlString = "";
  notificationCollection.forEach(doc => {
    const notification = doc.data();
    let tableData = ` <tr class="tr-shadow">
                                                       
    <td>${notification.title}</td>
    <td class="desc">${notification.description}</td>
    <td>
        <div class="table-data-feature">
            
            <button class="item" onclick='updateNotification("${doc.id}")' data-toggle="tooltip" data-placement="top" title="Edit">
                <i class="zmdi zmdi-edit"></i>
            </button>
            <button class="item deleteNotification" onclick='deleteNotification("${
      doc.id
      }")' data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="zmdi zmdi-delete"></i>
            </button>
           
        </div>
    </td>
</tr>
<tr class="spacer"></tr>
    `;
    htmlString += tableData;
    //get table body
    document.querySelector("#notificationTable").innerHTML = htmlString;
  });
};
//add notification
const newNotification = document.querySelector("#newNotification-form");
newNotification.addEventListener("submit", e => {
  e.preventDefault();
  //add new notification
  db.collection("notifications")
    .add({
      title: newNotification["notificationTitle"].value,
      description: newNotification["notificationDescription"].value
    })
    .then(() => {
      //close modal & reset form
      $("#addNotification").modal("hide");
      newNotification.reset();
      //toast notification
      $.toast({
        heading: "Success",
        text: "New notification added",
        position: "top-center",
        stack: false,
        icon: "success",
        hideAfter: 3000
      });
    });
});
//get update Notification form
const updateNotification = (id)=>{
  db.collection("notifications").doc(id).get().then(snapshot=>{
    const updateform= document.querySelector('#updateNotification-form');
    updateform['notificationTitle'].value=snapshot.data().title;
    updateform['notificationDescription'].value=snapshot.data().description;
    $("#updateNotification").data("id",id);
    $("#updateNotification").modal("show");
  })
}
//update notification
const updateNotificationForm = document.querySelector("#updateNotification-form");
updateNotificationForm.addEventListener("submit", e => {
  e.preventDefault();
  //add new notification
  let id = $('#updateNotification').data('id');
  db.collection("notifications").doc(id)
    .update({
      title: updateNotificationForm["notificationTitle"].value,
      description: updateNotificationForm["notificationDescription"].value
    })
    .then(() => {
      //close modal & reset form
      $("#updateNotification").modal("hide");
      updateNotificationForm.reset();
      //toast notification
      $.toast({
        heading: "Success",
        text: "Notification Updated",
        position: "top-center",
        stack: false,
        icon: "success",
        hideAfter: 3000
      });
    });
});
//delete Notifiaction
const deleteNotification = id => {
  db.collection("notifications")
    .doc(id)
    .delete()
    .then(() => {
      $.toast({
        heading: "Success",
        text: "Notification Deleted",
        position: "top-center",
        stack: false,
        icon: "success",
        hideAfter: 3000
      });
    });
};
//events page
//add event modal
//image preview
const eventImgPreview = document.querySelector("#uploadEventImage");
let file;
eventImgPreview.addEventListener('change', e => {
   file = e.target.files[0];
  if (file) 
  {
      let img=document.getElementById('eventImage');
      img.src =URL.createObjectURL(file);
  }
    else {
      alert('failed');
    }
});
//get data and file from modal
const eventForm=document.querySelector('#newEvent-form');
eventForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(file)
  {
    //get data
  const imageFile=file;
  let ele=document.getElementById("eventType");//get the option
  const type=ele.options[ele.selectedIndex].text;//get the option value
  const title=eventForm['eventTitle'].value;
  const desc=eventForm['eventDescription'].value;
  const dateofevent = new Date(eventForm['eventDate'].value);
  const venue=eventForm['eventVenue'].value;
  const linkname=eventForm['eventLinkName'].value;
  const link=eventForm['eventLink'].value;
  //new image upload url
  let urlOfImage='';
  //upload image storage
  const storageRef = storage.ref("events/"+title);
  //upload file
  const progress = storageRef.put(imageFile);
  //update progress

  progress.on(
    "state_changed",
    function prog(snapshot) {
    },

    function error(err) {
      $.toast({
        heading: "Error",
        text: "Upload Failed! " + err.message,
        position: "top-center",
        stack: false,
        icon: "error",
        hideAfter: 3000
      });

    },
    function complete() {
      storageRef.getDownloadURL().then(url => {
        urlOfImage= url;
        //update db 
      db.collection("Events")
      .add({
        title: title,
        description:desc,
        type:type,
        date:dateofevent,
        venue:venue,
        linkName:linkname,
        link:link,
        imageUrl:urlOfImage
      })
      .then(() => {
        //close modal & reset form
        $("#addEvent").modal("hide");
        document.getElementById('eventImage').src='https://place-hold.it/355x236';
        document.getElementById('imageName').innerText="Choose Event Image"
        eventForm.reset();
        //toast notification
        $.toast({
          heading: "Success",
          text: "New event added",
          position: "top-center",
          stack: false,
          icon: "success",
          hideAfter: 3000
        });
      });

        });
      });
  
  }
  else{
    $.toast({
      heading: "Error",
      text: "No Image Selected",
      position: "top-center",
      stack: false,
      icon: "error",
      hideAfter: 5000
    });
  }
      

});
//get update events form
const updateEvent = (id)=>{
  db.collection("Events").doc(id).get().then(snapshot=>{
    const updateform= document.querySelector('#updateEvent-form');
    updateform['eventDescription'].value=snapshot.data().description;
    updateform['eventDate'].value= snapshot.data().date;
    updateform['eventVenue'].value=snapshot.data().venue;
    updateform['eventLinkName'].value=snapshot.data().linkName;
    updateform['eventLink'].value=snapshot.data().link;
    $("#updateEvent").data("id",id);
    $("#updateEvent").modal("show");
  })
}
//update events
const updateEventForm = document.querySelector("#updateEvent-form");
updateEventForm.addEventListener("submit", e => {
  e.preventDefault();
  //add new notification
  let id = $('#updateEvent').data('id');
  db.collection("Events").doc(id)
    .update({
      description: updateEventForm["eventDescription"].value,
      date:new Date (updateEventForm["eventDate"].value),
      venue:updateEventForm["eventVenue"].value,
      linkName:updateEventForm["eventLinkName"].value,
      link:updateEventForm["eventLink"].value,
    })
    .then(() => {
      //close modal & reset form
      $("#updateEvent").modal("hide");
      updateEventForm.reset();
      //toast notification
      $.toast({
        heading: "Success",
        text: "Event Updated",
        position: "top-center",
        stack: false,
        icon: "success",
        hideAfter: 3000
      });
    });
});
//list events

db.collection("Events").orderBy('date')
  .onSnapshot(snapshot => {
    getEvents(snapshot.docs.reverse());
  });
  const getEvents = EventsCollection => {
    let htmlString = "";
    let cardOptionString=''; 
    EventsCollection.forEach(doc => {
      const event = doc.data();
      let tableData = ` <tr class="tr-shadow">
                                                         
      <td>${event.title}</td>
      <td>${event.date.toDate().toDateString()}</td>
      <td>${event.venue}</td>
      <td>
          <div class="table-data-feature">
              
         
              <button class="item" data-toggle="tooltip" data-placement="top" onclick='updateEvent("${doc.id}")' title="Edit">
                  <i class="zmdi zmdi-edit"></i>
              </button>
              <button class="item deleteNotification" onclick='deleteEvent("${
        doc.id
        }","${event.title}")' data-toggle="tooltip" data-placement="top" title="Delete">
                  <i class="zmdi zmdi-delete"></i>
              </button>
             
          </div>
      </td>
  </tr>
  <tr class="spacer"></tr>
      `;
      let cardOption=`<option value="${event.title}">${event.title}</option>`;
      htmlString += tableData;
      cardOptionString+= cardOption;
      //get table body
      document.querySelector("#eventsTable").innerHTML = htmlString;
      document.querySelector("#eventCard1").innerHTML = cardOptionString;
      document.querySelector("#eventCard2").innerHTML = cardOptionString;
      document.querySelector("#eventCard3").innerHTML = cardOptionString;
       //set event cards fields
        db.collection('eventCards').doc('LSeIS0Q8FfbsXCxL9iZN').get().then(snapshot => {
        const card = snapshot.data();
        document.querySelector("#eventCard1").value = card.card1;
        document.querySelector("#eventCard2").value = card.card2;
        document.querySelector("#eventCard3").value = card.card3;
  })
    });
  };
 
  //update event cards
   const eventCardForm=document.querySelector('#eventCards-form');
   eventCardForm.addEventListener('submit',e=>{
     e.preventDefault();
     db.collection('eventCards').doc('LSeIS0Q8FfbsXCxL9iZN').update({
       card1: document.querySelector("#eventCard1").value,
       card2: document.querySelector("#eventCard2").value,
       card3: document.querySelector("#eventCard3").value
     })
     .then(()=>{
      $.toast({
        heading: "Success",
        text: "Event Cards Changed",
        position: "top-center",
        stack: false,
        icon: "success",
        hideAfter: 3000
      });
     }).catch(err=>{
      $.toast({
        heading: "Error",
        text: err.message,
        position: "top-center",
        stack: false,
        icon: "Error",
        hideAfter: 5000
      });
     })
   });
  
  //delete event
  const deleteEvent = (id ,title) =>{
    storage.ref('events/'+title).delete().then(e=>{
      db.collection("Events")
    .doc(id)
    .delete()
    .then(() => {
      $.toast({
        heading: "Success",
        text: "Event Deleted",
        position: "top-center",
        stack: false,
        icon: "success",
        hideAfter: 3000
      });
    });
    })
    
  }
