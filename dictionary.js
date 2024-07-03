const api = `https://api.dictionaryapi.dev/api/`

async function searchedWord(dictionary){
    text.innerHTML = 'Please wait...';

    input.innerHTML = '';
    try{
        const response = await fetch(`${api}v2/entries/en/${dictionary}`);
        console.log(response);

        if(!response.ok){
            throw new Error('No result');
        }

        const data = await response.json();
        word1.innerHTML = data[0].word;
        word2.innerHTML = data[0].phonetic;
        word3.innerHTML = data[0].meanings[0].definitions[0].definition;
        word4.innerHTML = data[0].meanings[0].definitions[0].example;
        
        
        listen.addEventListener('click', () => {
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);  
            sound.play();
        });

        text.innerHTML = '';

    }
    catch(error){
        text.innerHTML = error
    }
}

const handleForm = evt => {
    evt.preventDefault();
    searchedWord(input.value);
    input.value = '';
}

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const search = document.querySelector('.search');
const text = document.querySelector('.text');
const word1 = document.querySelector('.word1');
const word2 = document.querySelector('.word2');
const word3 = document.querySelector('.word3');
const word4 = document.querySelector('.word4');
const listen = document.querySelector('.listen');
const sound = document.querySelector('.sound');

form.addEventListener('submit', handleForm);
