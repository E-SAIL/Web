$(document).ready(e => {
  db.collection("notifications")
    .get()
    .then(snapshot => {
      generateNotification(snapshot.docs.reverse())
    })
  const generateNotification = notificationCollection => {
    notificationCollection.forEach(doc => {
      const notification = doc.data();
      $.toast({
        text: notification.description,
        heading: notification.title,
        hideAfter: 10000,
        loaderBg: "#ffe100",
        position: "bottom-right",
        showHideTransition: "fade",
        icon: 'info'
      });
    });
  };
  //dynamic event card display
  //retrieve events
  db.collection('eventCards').doc('LSeIS0Q8FfbsXCxL9iZN')
  .onSnapshot(snapshot=>{
    const card1=snapshot.data().card1;
    const card2=snapshot.data().card2;
    const card3=snapshot.data().card3;
    //get the event for card 1 and update it 
    db.collection('Events').where('title','==',card1).limit(1).get().then(snapshot=>{
     snapshot.forEach(doc=>{
       const event=doc.data()
       storage.ref('events/'+event.title).getDownloadURL().then(url=>{
        let imgUrl=url;
         let htmlCard =`<img src=${imgUrl} alt="" style="width:100%">
        <div class="pad">
          <div class="ae-6">
            <h6 class="uppercase bold small opacity-4">${event.type}</h6>
          </div>
          <div class="margin-top-3 margin-bottom-3 equalElement ae-7">
            <h3>
                ${event.title}
            </h3>
            <p class="p tiny" style="padding-top:10px;text-align:left;height:180px;overflow: scroll;">
                ${event.description}
            </p>
          </div>
          <a  href="event.html#${doc.id}" class="button blue gradient wide cropSides cropBottom ae-8">View Details</a>
        </div>`;
        document.querySelector('#eventCard1').innerHTML=htmlCard;
       })
     })
    }).catch(err=>{
    $.toast({
      text: err.message,
      heading: 'Error',
      hideAfter: 10000,
      loaderBg: "#ffe100",
      position: "bottom-right",
      showHideTransition: "fade",
      icon: 'error'
    })
  });
  //get the event for card 2 and update it 
  db.collection('Events').where('title','==',card2).limit(1).get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const event=doc.data()
      storage.ref('events/'+event.title).getDownloadURL().then(url=>{
       let imgUrl=url;
        let htmlCard =`<img src=${imgUrl} alt="" style="width:100%">
       <div class="pad">
         <div class="ae-6">
           <h6 class="uppercase bold small opacity-4">${event.type}</h6>
         </div>
         <div class="margin-top-3 margin-bottom-3 equalElement ae-7">
           <h3>
               ${event.title}
           </h3>
           <p class="p tiny" style="padding-top:10px;text-align:left;height:180px;overflow: scroll;">
               ${event.description}
           </p>
         </div>
         <a  href="event.html#${doc.id}" class="button blue gradient wide cropSides cropBottom ae-8">View Details</a>
       </div>`;
       document.querySelector('#eventCard2').innerHTML=htmlCard;
      })
    })
   }).catch(err=>{
   $.toast({
     text: err.message,
     heading: 'Error',
     hideAfter: 10000,
     loaderBg: "#ffe100",
     position: "bottom-right",
     showHideTransition: "fade",
     icon: 'error'
   })
 });
//get the event for card 3 and update it 
 db.collection('Events').where('title','==',card3).limit(1).get().then(snapshot=>{
  snapshot.forEach(doc=>{
    const event=doc.data()
    storage.ref('events/'+event.title).getDownloadURL().then(url=>{
     let imgUrl=url;
      let htmlCard =`<img src=${imgUrl} alt="" style="width:100%">
     <div class="pad">
       <div class="ae-6">
         <h6 class="uppercase bold small opacity-4">${event.type}</h6>
       </div>
       <div class="margin-top-3 margin-bottom-3 equalElement ae-7">
         <h3>
             ${event.title}
         </h3>
         <p class="p tiny" style="padding-top:10px;text-align:left ;height:180px;overflow: scroll;">
             ${event.description}
         </p>
       </div>
       <a  href="event.html#${doc.id}" class="button blue gradient wide cropSides cropBottom ae-8">View Details</a>
     </div>`;
     document.querySelector('#eventCard3').innerHTML=htmlCard;
    })
  })
 }).catch(err=>{
 $.toast({
   text: err.message,
   heading: 'Error',
   hideAfter: 10000,
   loaderBg: "#ffe100",
   position: "bottom-right",
   showHideTransition: "fade",
   icon: 'error'
 })
});
});
  //template the cards
  //modify html
  //email list generation (suscribe block)
  emailList=document.querySelector('#subscribeForm');
  emailList.addEventListener('submit',e=>{
    e.preventDefault();
    db.collection("emailList")
    .add({
      email: emailList['subscribeEmail'].value
    }).then(e=>{
      emailList.reset();
      $.toast({
        text: "Thanks for subscribing",
        heading: "Email Added",
        hideAfter: 3000,
        loaderBg: "#ffe100",
        position: "bottom-right",
        showHideTransition: "fade",
        icon: 'success'
      });
    }).catch(err=>{
      $.toast({
        text: err.message,
        heading: "Error",
        hideAfter: 3000,
        loaderBg: "#ffe100",
        position: "bottom-right",
        showHideTransition: "fade",
        icon: 'error'
      });
    })
  });
  //send email
  var queryForm = document.querySelector('#contactForm');
  queryForm.addEventListener('submit', e => {
    e.preventDefault();
    Email.send({
      SecureToken: "1e86c01d-c730-4688-947f-2b7975e8ddd1",
      To: 'mohitkhiani6@gmail.com',
      From: queryForm['email'].value,
      Subject: "New Query from Esail : " + queryForm['subject'].value,
      Body: queryForm['message'].value + "<br/><br/><hr/> Senders Name : " + queryForm['name'].value + "<br/>Reply to : " + queryForm['email'].value,
    }).then(
      message => {
        queryForm.reset();
          $.toast({
            heading: "Query sent!",
            text: "Request sent to E-SAIL",
            hideAfter: 3000,
            loaderBg: "#ffe100",
            position: "bottom-right",
            showHideTransition: "fade",
            icon: 'success'
          });
      }).catch(error=>{
        $.toast({
          heading: "Error",
          text: error,
          hideAfter: 3000,
          loaderBg: "#ffe100",
          position: "bottom-right",
          showHideTransition: "fade",
          icon: 'error'
        });
      })
  });
})


