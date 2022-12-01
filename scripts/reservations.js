// code by Kacper Dabrowski


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
}

let rooms = [];
let roomKind = ["Single","Twin","Double"];

function updateResInfo()
{
        let room = document.getElementById("room").value;
        let startDate = document.getElementById("startDate").value;
        let noOfDays = document.getElementById("noOfDays").value;
        let newBooking = [room,startDate,noOfDays];
        rooms.push(newBooking);
        // console.log(room,startDate);
        showRooms();
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
        table += "<th class='booking'>last day</th><th class='booking'>Remove</th></tr>";
        // lines from array rooms[]
        for (i=0; i<rooms.length; i++){
                table += "<tr>";
                table += "<td class='booking'>"+roomKind[rooms[i][0]]+"</td>";
                table += "<td class='booking'>"+rooms[i][1]+"</td>";
                // calculate last day
                const arrivalDate = new Date(rooms[i][1]);
                let lastDay = arrivalDate;
                lastDay.setDate(arrivalDate.getDate()+parseInt( rooms[i][2]));
                table += "<td class='booking'>"+lastDay.toISOString().slice(0,10)+"</td>";
                table += "<td class='booking'>"+"<button onclick='removeRoom("+i+");' class='form'>X</button>"+"</td>";
                table += "</tr>";
        }
        table += "</table>"
        document.getElementById("showResInfo").innerHTML = info+table;
        // document.getElementById("showResInfo").innerHTML += roomKind[room]+" room "+startDate+" "+ noOfDays+"<br />";
}