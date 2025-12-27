// Get references to display and buttons from the DOM
let display = document.getElementById('display');
let startStopBtn = document.getElementById('startStop');
let resetBtn = document.getElementById('reset');

// Variables to keep track of time and timer state
let startTime = 0;       // Timestamp when the timer starts or resumes
let elapsedTime = 0;     // Total elapsed time in milliseconds
let timerInterval;       // ID of the setInterval for updating the timer
let running = false;     // Boolean flag to indicate if the timer is running

// Converts elapsed time in milliseconds to a formatted string "hh:mm:ss"
function timeToString(time) {
    let diffInHrs = time / 3600000;        // Convert milliseconds to hours
    let hh = Math.floor(diffInHrs);        // Get whole hours

    let diffInMin = (diffInHrs - hh) * 60; // Remaining minutes
    let mm = Math.floor(diffInMin);        // Get whole minutes

    let diffInSec = (diffInMin - mm) * 60; // Remaining seconds
    let ss = Math.floor(diffInSec);        // Get whole seconds

    // Return the time formatted with two digits per unit
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

// Pads single digit numbers with a leading zero (e.g., 7 -> "07")
function pad(number) {
    return number.toString().padStart(2, '0');
}

// Starts or resumes the stopwatch
function start() {
    // Calculate the start time accounting for previously elapsed time
    startTime = Date.now() - elapsedTime;

    // Update the display every second
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = timeToString(elapsedTime);
    }, 1000);

    // Change button text to "Stop"
    startStopBtn.textContent = 'Stop';

    // Set running flag
    running = true;
}

// Stops/pauses the stopwatch
function stop() {
    clearInterval(timerInterval);   // Clear the interval to stop updates
    startStopBtn.textContent = 'Start'; // Change button text back to "Start"
    running = false;                // Set running flag to false
}

// Listen for clicks on start/stop button
startStopBtn.addEventListener('click', () => {
    if (!running) {
        start();   // If timer not running, start it
    } else {
        stop();    // If timer running, stop it
    }
});

// Listen for clicks on reset button
resetBtn.addEventListener('click', () => {
    stop();                    // Stop the timer
    elapsedTime = 0;           // Reset elapsed time
    display.textContent = "00:00:00";  // Reset display to zero time
});
