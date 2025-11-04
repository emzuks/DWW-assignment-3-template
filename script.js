document.addEventListener("DOMContentLoaded", function() {

    // do stuffs 
    // documentation for adafruit IO : https://github.com/methio/adafruitIO-class
    // documentation for alwan color picker : https://github.com/sefianecho/alwan
    // documentation for Name That Color (NTC) : https://chir.ag/projects/ntc/


    // adafruit Setup
    const username = "emzuks";
    const activeKey = "aio_OUgO62y878b30WklowrJFpLG9Ksl";
    const IO = new AdafruitIO(username, activeKey);

});


const delayBetweenRequest = 5000;

setInterval(function() {
  IO.getData("Moisture", function(data) {
    console.log(`🚚 - Here is your data from ${data.feed}! Latest value is: ${data.json[0].value}`);

    // Map Arduino analog range (0–1023) to percentage (0–100%)
    let currentMoisturePercent = parseInt(mapRange(data.json[0].value, 0, 1023, 0, 100));

    console.log(`Mapped value is: ${currentMoisturePercent}%`);

    // Update the water level (if you have one)
    const lightIndicator = document.getElementById("illu-indicator");
    lightIndicator.style.height = `${currentMoisturePercent}%`;

    // 🧭 Move the pointer position
    const pointer = document.getElementById("pointer");
    // Move from bottom (0%) to top (100%)
    pointer.style.bottom = currentMoisturePercent;
  });
}, delayBetweenRequest);

    // UTILITIES → custom map function to translate arduino map() function
    const mapRange = (value, inMin, inMax, outMin, outMax) => {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
;