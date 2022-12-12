function setDate(){const today=new Date();let isoDate=today.toISOString().slice(0,10);const inputDate=document.getElementById("startDate");inputDate.value=isoDate;inputDate.min=isoDate;setEndDate();}
function setEndDate(){const startDate=document.getElementById("startDate").value;const days=parseInt(document.getElementById("days").value);let endDate=calculateEndaDate(startDate,days);document.getElementById("endDate").value=endDate;}
let rooms=[];const roomKind=["Suite","Single","Twin","Double"];const maxAdults=[5,1,2,2];const maxKids=[5,1,2,2];let roomPrice=[150,50,80,100];function updateResInfo()
{let room=document.getElementById("room").value;let startDate=document.getElementById("startDate").value;let noOfDays=parseInt(document.getElementById("days").value);let noOfPeople=parseInt(document.getElementById("adults").value);let noOfKids=parseInt(document.getElementById("kids").value);if(noOfDays&&noOfDays>0){let newBooking=[room,startDate,noOfDays,noOfPeople,noOfKids];rooms.push(newBooking);showRooms();}
else{alert("Number of days must be a number higer than 0");}}
function removeRoom(i)
{rooms.splice(i,1);showRooms();}
function showRooms()
{let info="<h3>Rooms to book</h3>"
let table="<table class='rooms'>";table+="<tr><th class='booking'>Room</th><th class='booking'>Arrival</th>";table+="<th class='booking'>last day</th><th class='booking'>Price</th>";table+="<th class='booking'>Adults</th><th class='booking'>Kids</th>";table+="<th class='booking'>Remove</th></tr>";for(i=0;i<rooms.length;i++){if(rooms[i].length==5){table+="<tr class='booking'>";table+="<td>"+roomKind[rooms[i][0]]+"</td>";table+="<td>"+rooms[i][1]+"</td>";const arrivalDate=new Date(rooms[i][1]);let lastDay=arrivalDate;let noOfDays=parseInt(rooms[i][2]);let price=roomPrice[rooms[i][0]];lastDay.setDate(arrivalDate.getDate()+noOfDays);table+="<td>"+lastDay.toISOString().slice(0,10)+"</td>";table+="<td>"+noOfDays*price+"</td>";table+="<td>"+rooms[i][4]+"</td>";table+="<td>"+rooms[i][3]+"</td>";table+="<td>"+"<button onclick='removeRoom("+i+");' class='form removeButton'>X</button>"+"</td>";table+="</tr>";}}
table+="</table>"
document.getElementById("showResInfo").innerHTML=info+table;}
let roomElementsIds=["suite-room","single-room","twin-room","double-room"];let activeElement=document.getElementById(roomElementsIds[0]);function showRoomPrice(){let room=document.getElementById("room").value;activeElement.style.display="none";activeElement=document.getElementById(roomElementsIds[room]);activeElement.style.display="block";}
function calculateEndaDate(date,days){const arrivalDate=new Date(date);let lastDay=arrivalDate;lastDay.setDate(arrivalDate.getDate()+days);return lastDay.toISOString().slice(0,10);}
function changeMaxPeople(){let roomIndex=parseInt(document.getElementById("room").value);const adults=document.getElementById("adults");const kids=document.getElementById("kids");adults.max=maxAdults[roomIndex];kids.max=maxKids[roomIndex];if(adults.value>adults.max){adults.value=adults.max;}
if(kids.value>kids.max){kids.value=kids.max;}}
function sendBooking(){let bookingOK=true;const name=document.getElementById("name");const lastname=document.getElementById("lastname");const email=document.getElementById("email");let imie="";let warning="Please fill ";if(name.value.length<1){warning+="name ";bookingOK=false;name.style.borderColor="red";}
if(lastname.value.length<1){warning+="surname ";bookingOK=false;lastname.style.borderColor="red";}
if(email.value.length<1||!email.value.includes("@")){warning+="email ";bookingOK=false;email.style.borderColor="red";}
warning+="field(s).";if(!bookingOK){changeBoxColor("bookIt","white");alert(warning);}
else{alert("Send booking");}}
function changeBorderColor(name,color="moccasin"){const element=document.getElementById(name);if(element.value.length>=1){element.style.borderColor=color;}
else{element.style.borderColor="red";}}
function changeBorderColorEmail(){if(document.getElementById("email").value.includes("@")){changeBorderColor("email");}
else{changeBorderColor("email","red")}}
let boxColors=["white","papayawhip"];let borderColors=["#894873","red"];function changeBoxColor(boxId,color){box=document.getElementById(boxId);box.style.backgroundColor=color;}
function changeBoxBorderColor(boxId,color){box=document.getElementById(boxId);box.style.borderColor=color;}
let boxNames=["reserveForm","showResInfo","bookIt"];function addEventListenersBox(){for(const boxName of boxNames){const box=document.getElementById(boxName);box.addEventListener("mouseover",function(){changeBoxColor(boxName,boxColors[0]);},false);box.addEventListener("mouseout",function(){changeBoxColor(boxName,boxColors[1]);},false);box.addEventListener("focusin",function(){changeBoxBorderColor(boxName,borderColors[1]);},false);box.addEventListener("focusout",function(){changeBoxBorderColor(boxName,borderColors[0]);},false);}}