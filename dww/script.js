document.addEventListener("DOMContentLoaded", function() {

  // Adafruit IO setup
  const username = "emzuks";
  const activeKey = "aio_OUgO62y878b30WklowrJFpLG9Ksl";
  const IO = new AdafruitIO(username, activeKey);

  const delayBetweenRequest = 4000;

  // UTILITIES → custom map function to translate Arduino map() function
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  };

  // Fetch new data every few seconds
  setInterval(function() {
    IO.getData("capacitive", function(data) {
      console.log(`🚚 Data from ${data.feed}! Latest value: ${data.json[0].value}`);

      // Map 0–1023 → 0–100%
      let currentCapacitivePercent = parseInt(mapRange(data.json[0].value, 0, 1023, 0, 100));
      console.log(`Mapped value: ${currentCapacitivePercent}%`);

      // Update indicator (water level)
      const lightIndicator = document.getElementById("illu-indicator");
      if (lightIndicator) {
        lightIndicator.style.height = `${currentCapacitivePercent}%`;
      }

      // Move the pointer
      const pointer = document.getElementById("pointer");
      if (pointer) {
        pointer.style.transition = "bottom 0.5s ease";
        pointer.style.bottom = `${currentCapacitivePercent}%`;
      }
    });
  }, delayBetweenRequest);

});