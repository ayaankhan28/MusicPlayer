const musiccontainer = document.querySelector('.music-container');
const playbtn = document.querySelector('#play');
const prevbtn = document.querySelector('#prev');
const nextbtn = document.querySelector('#next');
const searchbtn = document.querySelector('#search');
var audio = document.getElementById('audio');
const progress = document.querySelector('.progress');
const progresscontainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
/*const fs = require('fs');
const songs = fs.readdirSync('C:\\Mydrive\\New folder\\c language\\MusicPlayer\\musicplayer\\song\\');*/

songs = ['Attention',
'Complicated',
'Dancin',
'Dj wale babu',
'Falling',
'Good as gold',
'Huyu Suyu',
'Lean On',
'Let me down slowly',
'Levitating',
'Love your voice',
'Mehrama',
'Meridian',
'Ola La',
'Randall',
'Saiyaara',
'Safari',
'Witcher']
const result = getRandomNumber(0, 17);  
let songIndex = result;   


loadSong(songs[songIndex]);

function getRandomNumber(min, max) {
    // Generate a random decimal number between 0 and 1
    const randomDecimal = Math.random();
  
    // Scale the decimal number to fit within the specified range
    const randomNumber = min + Math.floor(randomDecimal * (max - min + 1));
  
    return randomNumber;
  }
function loadSong(song) {
    
    title.innerText = song;
    audio.src = `song/${song}.mp3`;
    cover.src = `img/${song}.jpeg`;
}
function playSong() {
    musiccontainer.classList.add('play');
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
    

}
function pauseSong() {
    musiccontainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
    
}
function prevSong() { 
    const result = getRandomNumber(0, 17);  
    songIndex = result;
    /*songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }*/
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    const result = getRandomNumber(0, 17);  
    songIndex = result;   
    /*songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }*/
    loadSong(songs[songIndex]);
    playSong();
};
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    if(audio.ended) {
        nextSong();
    }
    

}
function nextSong() {   
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
};
function setprogress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;

}

playbtn.addEventListener('click', () => {
    const isPlaying = musiccontainer.classList.contains('play');
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
        
    }
});
prevbtn.addEventListener('click', prevSong); 
nextbtn.addEventListener('click', nextSong);   


audio.addEventListener('timeupdate', updateProgress);
progresscontainer.addEventListener('click', setprogress);