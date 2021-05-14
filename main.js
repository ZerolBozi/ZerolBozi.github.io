// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCrtrm0XzGDeGgGd8AD6XFsLVct680BwTw",
    authDomain: "d3atemperature-fd015.firebaseapp.com",
    databaseURL:"https://d3atemperature-fd015-default-rtdb.firebaseio.com",
    projectId: "d3atemperature-fd015",
    storageBucket: "d3atemperature-fd015.appspot.com",
    messagingSenderId: "862536099803",
    appId: "1:862536099803:web:8ab3695e2287b1c25a29fe",
    measurementId: "G-B9J128R88S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.database().goOnline();
var database = firebase.database()

function save(){
    var time = new Date()
    var Nowtime = time.toLocaleDateString()
    var userId = document.getElementById('userId').value
    var temperature = document.getElementById('temperature').value
    Nowtime = Nowtime.replaceAll('/','');
    database.ref(Nowtime +'/'+userId ).set({
        Temperature : temperature
    })

}

function get(){

}

function update(){

}

function remove(){

}