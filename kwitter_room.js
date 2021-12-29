 var firebaseConfig = {
   apiKey: "AIzaSyCiL5CNXTniGkc8Q9si-1KigTJN3Oiujs4",
   authDomain: "kwitter-3e415.firebaseapp.com",
   databaseURL: "https://kwitter-3e415-default-rtdb.firebaseio.com",
   projectId: "kwitter-3e415",
   storageBucket: "kwitter-3e415.appspot.com",
   messagingSenderId: "628155507410",
   appId: "1:628155507410:web:db89716d652b2df5b0c30b"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 user_name = localStorage.getItem("user_name");
 room_name = localStorage.getItem("room_name");

 document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

 function addroom() {
   room_name = document.getElementById("room_name").value;
   firebase.database().ref("/").child(room_name).update({
     purpose: "adding room name"
   });
   localStorage.setItem("room_name", room_name);
   window.location = "kwitter_page.html";
 }

 function getData() {
   firebase.database().ref("/").on('value', function (snapshot) {
     document.getElementById("output").innerHTML = "";
     snapshot.forEach(function (childSnapshot) {
       childKey = childSnapshot.key;
       Room_names = childKey;
       //Start code
       console.log("room name-" + Room_names);
       row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";
       document.getElementById("output").innerHTML += row;

       function redirectToRoomName(name) {
         console.log(name);
         localStorage.setItem("room_name", name);
         window.location = "kwitter_page.html";
       }

       function logout() {
         localStorage.removeItem("user_name");
         localStorage.removeItem("room_name");
         window.location = "kwitter.html";
       }

       function send() {
         msg = document.getElementById("msg").value;
         firebase.database().ref(room_name).push({
           name: user_name,
           message: msg,
           like: 0
         });

         document.getElementById("msg").value = "";
       }


       //End code
     });
   });
 }
 getData();