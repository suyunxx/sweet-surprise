// Mic detection to blow out candles!
let flames = document.querySelectorAll('.flame');

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    const context = new AudioContext();
    const mic = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    mic.connect(analyser);
    analyser.fftSize = 512;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

      if (volume > 50) {
        flames.forEach(f => f.style.display = 'none');
        document.querySelector("p").innerText = "You blew out the candles! 🎉";
      }

      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  })
  .catch(function(err) {
    alert("Mic access denied or error!");
  });
