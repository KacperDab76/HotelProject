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