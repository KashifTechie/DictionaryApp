const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector('#result');
const sound = document.querySelector('#sound');
const btn = document.querySelector("#search-btn");


btn.addEventListener("click", ()=>{
      let input_words = document.querySelector("#input_word").value;
      console.log(input_words);
      const xml = new XMLHttpRequest();
      xml.open("GET", url+input_words, true);
      xml.send();
      xml.onreadystatechange = function(){
        if(xml.readyState===4 && xml.status===200){
            let data = JSON.parse(this.responseText);
            console.log(data.meanings);
            result.innerHTML = `<div class="word">
                                        <h3 style="font-size: 30px;">${input_words}</h3>
                                        <button onclick="playSound('${input_words}')">
                                                 <i class="fa-solid fa-volume-high"></i>
                                        </button>
                                    </div>
                                    <div class="details">
                                        <p>${data[0].meanings[0].partOfSpeech}</p>
                                        <p>/${data[0].phonetics[0].text || " "}/</p>
                                    </div>
                                    <p class="word-meaning">
                                    ${data[0].meanings[0].definitions[0].definition}
                                    </p>
                                    <p class="word-example">
                                    ${data[0].meanings[0].definitions[0].example||" "}
                                    </p>`;
                                    //sound.src = data[0].phonetics[0].audio;
        }
      }
      
});

function playSound(text) {
    if (text.trim() !== "") {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
}

}
 