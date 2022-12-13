// code by Kacper Dabrowski

/** first functions triggered by onload of body */

/**Function 
 * to set up starting date for input element of calendar (date)
 * for form element used to set up reservations
 * uses slice() method to take first 10 chars of a string returned by toISOString() method (of date class)
 * it's because toISOString() returns date in format : 2020-05-12T23:50:21.817Z
 * but for input:date element we need only 2020-05-12 (10 chars)
 */
function setDate(){
        
        const today = new Date();
        let isoDate = today.toISOString().slice(0,10);
        const inputDate = document.getElementById("startDate");
        inputDate.value = isoDate;
        inputDate.min = isoDate;

        /** Also to calculate end date and fill output element of form */
        setEndDate();
}

/** function read starting date end number of days and calculate end date
 * end put it in output #endDate element
 */
function setEndDate() {
        const startDate = document.getElementById("startDate").value;
        const days = parseInt(document.getElementById("days").value);
        let endDate = calculateEndaDate(startDate,days);
 
        // write result to output element
        document.getElementById("endDate").value = endDate;
}

/** Global variables 
 * that can be used in all functions 
 * */
let rooms = [];
const roomKind = ["Suite","Single","Twin","Double"];
const maxAdults = [5,1,2,2];
const maxKids = [5,1,2,2];
let roomPrice = [150,50,80,100];

function updateResInfo()
{
        let room = document.getElementById("room").value;
        let startDate = document.getElementById("startDate").value;
        let noOfDays = parseInt(document.getElementById("days").value);
        let noOfPeople = parseInt(document.getElementById("adults").value);
        let noOfKids = parseInt(document.getElementById("kids").value);


        if (noOfDays && noOfDays>0) {
                let newBooking = [room,startDate,noOfDays,noOfPeople,noOfKids];
                rooms.push(newBooking);
                showRooms();
        }
        else {
                alert("Number of days must be a number higer than 0");
        }
}

function removeRoom(i)
{
        // alert(i);
        rooms.splice(i,1);
        showRooms();
}

function showRooms()
{
        // create a table with rooms information 
        let info = "<h3>Rooms to book</h3>"
        let table = "<table class='rooms'>";
        // header of table
        table += "<tr><th class='booking'>Room</th><th class='booking'>Arrival</th>";
        table += "<th class='booking'>last day</th><th class='booking'>Price</th>";
        table += "<th class='booking'>Adults</th><th class='booking'>Kids</th>";
        table += "<th class='booking'>Remove</th></tr>";
        
        // lines from array rooms[]
        for (i=0; i<rooms.length; i++){

                if (rooms[i].length == 5) {
                        table += "<tr class='booking'>";
                        table += "<td>"+roomKind[rooms[i][0]]+"</td>";
                        table += "<td>"+rooms[i][1]+"</td>";
                        // calculate last day
                        const arrivalDate = new Date(rooms[i][1]);
                        let lastDay = arrivalDate;
                        let noOfDays = parseInt( rooms[i][2]);
                        let price = roomPrice[rooms[i][0]];
                        lastDay.setDate(arrivalDate.getDate()+noOfDays);
                        table += "<td>"+lastDay.toISOString().slice(0,10)+"</td>";
                        table += "<td>"+noOfDays*price+"</td>";
                        table += "<td>"+rooms[i][4]+"</td>";
                        table += "<td>"+rooms[i][3]+"</td>";
                        table += "<td>"+"<button onclick='removeRoom("+i+");' class='form removeButton'>X</button>"+"</td>";
                        table += "</tr>";
                }
        }
        table += "</table>"
        document.getElementById("showResInfo").innerHTML = info+table;
        // document.getElementById("showResInfo").innerHTML += roomKind[room]+" room "+startDate+" "+ noOfDays+"<br />";
}

let roomElementsIds = ["suite-room","single-room","twin-room","double-room"];
let activeElement = document.getElementById(roomElementsIds[0]);
function showRoomPrice() {

        let room = document.getElementById("room").value;
        activeElement.style.display="none";
        activeElement = document.getElementById(roomElementsIds[room]);
        activeElement.style.display = "block";
}

/** function takes date as string and number of days
 * end calculate new date after said number of days
 * and returns it
 */

function calculateEndaDate(date,days){
        const arrivalDate = new Date(date);
        let lastDay = arrivalDate;      
        lastDay.setDate(arrivalDate.getDate()+days);

        return lastDay.toISOString().slice(0,10);
}

/** function changes maximum amount of people based on type of room  */
function changeMaxPeople() {
        // maxAdults and MaxKids are arrays that have maximum number of people for ech kind of room
        // using same index as roomKind array
        // defined in global variable section
        let roomIndex = parseInt(document.getElementById("room").value);
        
        const adults = document.getElementById("adults");
        const kids = document.getElementById("kids");
        adults.max = maxAdults[roomIndex];
        kids.max = maxKids[roomIndex];
        /** also value if higher than max must be changed */
        if (adults.value>adults.max){
                adults.value = adults.max;
        }
        if (kids.value>kids.max){
                kids.value = kids.max;
        }
        


}

// function checks if input fields name,surname,email are not empty 
// also check if there are any rooms in array rooms 
function sendBooking(){
        let bookingOK = true;
        const name = document.getElementById("name");
        const lastname = document.getElementById("lastname");
        const email = document.getElementById("email"); 
        let warning = "Please fill ";
        if (name.value.length <1 ){
                warning += "name ";
                bookingOK = false;
                name.style.borderColor = "red";
        }
        if (lastname.value.length < 1){
                warning += "surname ";
                bookingOK = false;
                lastname.style.borderColor = "red";
        }
        if (email.value.length < 1 || !email.value.includes("@")){
                warning += "email ";
                bookingOK = false;
                email.style.borderColor = "red";
        }
        warning += "field(s).";

        if (!bookingOK){
                changeBoxColor("bookIt","white");
                alert(warning);
           

        }
        else {
                alert("Send booking");
        }

}

/** function changes coloor of border to normal (moccasin) */
function changeBorderColor(name,color="moccasin"){
        const element = document.getElementById(name);
        if(element.value.length>=1){
                element.style.borderColor = color;
        }
        else {
                element.style.borderColor = "red";
        }
}

/** for email we need to check if there is @ in the string */
function changeBorderColorEmail(){
        if (document.getElementById("email").value.includes("@")){
                changeBorderColor("email");
        }
        else {
                changeBorderColor("email","red")
        }
}       

// let activeBox = document.getElementById("reserveForm");
// let focusBox = document.getElementById("reserveForm");
let boxColors = ["white","papayawhip"];
let borderColors = ["#894873","red"];
/** function changes background color of box */
function changeBoxColor(boxId,color){
        box = document.getElementById(boxId);
        box.style.backgroundColor = color;
}
/** function changes border color of box */
function changeBoxBorderColor(boxId,color){
        box = document.getElementById(boxId);
        box.style.borderColor = color;

}


/** add onfocus event listener using java script */
let boxNames = ["reserveForm","showResInfo","bookIt"];
function addEventListenersBox() {

        for (const boxName of boxNames){
                // console.log(boxName);
                const box = document.getElementById(boxName);
                box.addEventListener("mouseover",function () {changeBoxColor(boxName,boxColors[0]);},false);
                box.addEventListener("mouseout",function () {changeBoxColor(boxName,boxColors[1]);},false);
                box.addEventListener("focusin",function () {changeBoxBorderColor(boxName,borderColors[1]);},false);
                box.addEventListener("focusout",function () {changeBoxBorderColor(boxName,borderColors[0]);},false);

        }
}