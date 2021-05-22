
    db.collection('Events').orderBy('date').onSnapshot(event=>{
        listEvent(event.docs.reverse());
    });
const listEvent = (events) =>{
    let html='';
    events.forEach(doc => {
        const event=doc.data();
        let imageUrl='';
        storage.ref('events/'+event.title).getDownloadURL().then(url=>{
           imageUrl=url;
           html+=`<div class="card horizontal event-card" id='${doc.id}'>
        <div class="card-image">
          <img class="mobile-display-none" src=${imageUrl} class="fadeIn">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <span class="card-title">${event.title}</span>
            <p>${event.description}
            </p>
            <span class='date'>Date : <span style='color: #2487cd !important;'>${event.date.toDate().toDateString()}</span></span>
            <span class='venue'>Venue : <span style='color: #2487cd !important;'>${event.venue}</span></span>
          </div>
          <div class="card-action">
            <a href=${event.link} target="_blank">${event.linkName}</a>
          </div>
        </div>
      </div>
        `;
        document.querySelector('#eventList').innerHTML=html;
           
        });
       
            
    });
    
} 