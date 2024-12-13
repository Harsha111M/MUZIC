console.log("Welcome to MUZIC")

//initialize the variables
let songindex = 0;
let audioElement = new Audio('songs/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songsItems = Array.from(document.getElementsByClassName('songitem')); 

let songs = [
    {songname: "King of the Fall", filePath:"songs/0.mp3", coverPath: "covers/0.jpg"},
    {songname: "Another Brick in the wall pt2", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songname: "15 step", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songname: "No Chruch in the Wild", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songname: "Challengers", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"}
]
console.log(songs[2].songname)

songsItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
})

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0 ;
    }
    
})
//listen to events 
audioElement.addEventListener('timeupdate', ()=>{
    //update seek
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        songindex  = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songindex}.mp3`
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>4){
        songindex=0;
    }
    else{
        songindex+=1
    }
    audioElement.src = `songs/${songindex}.mp3`
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1
    }
    audioElement.src = `songs/${songindex}.mp3`
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})