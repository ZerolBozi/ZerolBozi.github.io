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
var time = new Date()
var m = time.getMonth()+1
var d = time.getDate()
if(m < 10){m = "0" + (time.getMonth()+1)}
if(d < 10){d = "0" + time.getDate()}
var Nowtime = "" + time.getFullYear() + m + d
var StartTime = '20210514'

function save(){
    var userId = document.getElementById('userId').value
    var temperature = document.getElementById('temperature').value
    if(userId == "" || temperature == ""){
        alert("請輸入座號及今日體溫!!!")
    }
    else{
        database.ref('DetailedRecords/' + Nowtime + '/' + userId ).once("value").then(function(snapshot){
        var val = snapshot.val();
        if(val == null){
            if(userId >= 0 && userId <= 35 && temperature > 0 && temperature < 50){
                if(temperature > 37.5){
                    database.ref('DetailedRecords/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        Warning : 1 ,
                        Date : Nowtime
                        })
                    database.ref('Records/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        })
                }
                else{
                    database.ref('DetailedRecords/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        Warning : 0 ,
                        Date : Nowtime
                        })
                    database.ref('Records/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        })
                }
                alert('體溫上傳成功')
                document.getElementById('temperature').value = ''
            }
            else{
                alert('座號或體溫輸入有誤')
                document.getElementById('userId').value = ''
                document.getElementById('temperature').value = ''
            }
        }
        else{
            alert('今日體溫已回報完畢，不需要重複上傳')
            document.getElementById('temperature').value = ''
        }
        })
    }
}

function display(){
    //var userId = document.getElementById('userId').value
    document.getElementById('div1').style.display = "block"
    //if(userId == 50){
    //    document.getElementById('outputBtn').style.display = "block"
    //}
}

function get(){
    var userId = document.getElementById('userId').value
    clean()
    if(userId >= 0 && userId <= 35 && userId != ''){
        if(document.getElementById('div1').style.display != "block"){
            var end = Nowtime - StartTime + 1
            display()
            for(i = 0; i < end ; i++){
                var Refdate = (parseInt(StartTime,10)+i).toString()
                database.ref('DetailedRecords/' + Refdate + '/' + userId).once("value").then(function(snapshot){
                    var val = snapshot.val();
                    if(val != null){
                        create(val.Date,val.Temperature)
                    }
                })
            }
        }
        else{
            var end = Nowtime - StartTime + 1
            for(i = 0; i < end ; i++){
                var Refdate = (parseInt(StartTime,10)+i).toString()
                database.ref('DetailedRecords/' + Refdate + '/' + userId).once("value").then(function(snapshot){
                    var val = snapshot.val();
                    if(val != null){
                        create(val.Date,val.Temperature)
                    }
                })
            }
        }
    }
    else{
        alert('請先輸入正常的座號，才可以查看紀錄')
    }
}

function create(date,temperature){
    var td1 = document.createElement('td');
    td1.appendChild(document.createTextNode(date));
    var td2 = document.createElement('td');
    td2.appendChild(document.createTextNode(temperature));
    var tr1 = document.createElement('tr');
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    var table = document.getElementsByTagName('table')[0]
    table.appendChild(tr1)
}

function clean(){
    var table = document.getElementsByTagName('table')[0]
    if(table.rows.length >= 2){
        for(i = 0 ; i <= table.rows.length ; i++){
            table.deleteRow(1)
        }
    }
}

function fnExcelReport()
{
    var tab_text="<table border='3px'><tr bgcolor='#FFFFFF'>";
    var textRange; var j=0;
    tab = document.getElementById('headerTable'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace("日期","Date")
    tab_text= tab_text.replace("溫度","Temperature")
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' +　encodeURIComponent(tab_text));  

    return (sa);
}
