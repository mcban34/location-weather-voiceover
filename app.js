function konumAl(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      x = position.coords.latitude;
      y = position.coords.longitude;
  
      const cityUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${x}&lon=${y}&zoom=18&addressdetails=1`
      fetch(cityUrl)
      .then(res => res.json())
      .then(konum =>{
        console.log(konum.address.province)

        const api_key = 'e936334b81823fe1ec085d573de2961b';
        let city = konum.address.province;
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        fetch(url)
          .then(response => response.json())
          .then(durum => {
            const content = document.querySelector(".content")
            let messageTextElement = document.createElement("h3")
            let messageText = `Konumunuz : ${konum.address.province}. <br> En Düşük Sıcaklık : ${(durum.main.temp_min - 273.1600).toFixed(0)} Derece, En Yüksek Sıcaklık : ${(durum.main.temp_max - 273.1600).toFixed(0)} Derece`
            messageTextElement.innerHTML+= messageText
            content.append(messageTextElement)

            //!seslendirme
            var metin = new SpeechSynthesisUtterance(messageText);
            var synth = window.speechSynthesis;
            synth.cancel();
            synth.speak(metin);
           
        })
      })
    },function () {alert("Lütfen Konumunuzu Açın!")});
  }
   else {
    alert("Tarayıcı konum özelliklerini desteklemiyor");
  }
}

document.querySelector(".konumBul").addEventListener("click",function(){
    konumAl();
})

