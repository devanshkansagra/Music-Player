let masterPlay = document.getElementById('masterPlay');
let progress = document.getElementById('progress');
let seekBack = document.getElementById('seek-backward');
let seekFor = document.getElementById('seek-forward');
let songTitle = document.getElementById('song-title');
let playBtns = document.querySelectorAll('.play-btn');
let volumeControl = document.getElementById('vol-control');
let devBtn = Array.from(document.getElementsByClassName('dev-song'));
let songIndex = 0;

let songs = [
    { songName: "Chill-Lofi beats to code/relax to", fileLocation: "Lo-Fi-Beat_AdobeStock_536976487_preview.m4a" },
    { songName: "UPBEAT-SYNTHWAVE-VOCAL", fileLocation: "UPBEAT-SYNTHWAVE-VOCAL-CHOP-(NEON-WOODS)_AdobeStock_605002806_preview.m4a" },
    { songName: "Powerful-Energetic-Rock-Trailer", fileLocation: "Powerful-Energetic-Rock-Trailer_AdobeStock_601100961_preview.m4a" },
    { songName: "Lofi-Study-Beat-Hiphop", fileLocation: "Lofi-Study-Beat-Hiphop-(Short-Loop-1)_AdobeStock_526743709_preview.m4a" },
    { songName: "CHILL-HIPHOP-DREAMS-(FEELIN-GOOD)", fileLocation: "CHILL-HIPHOP-DREAMS-(FEELIN-GOOD)_AdobeStock_602734696_preview.m4a" },
    { songName: "Acoustic-Happy-Background", fileLocation: "Acoustic-Happy-Background_AdobeStock_593919373_preview.m4a" }
]

let audio = new Audio('Lo-Fi-Beat_AdobeStock_536976487_preview.m4a');

// changing the length of progress bar according to song time
audio.addEventListener('timeupdate', () => {
    progressLen = parseInt(audio.currentTime / audio.duration * 100);
    progress.value = progressLen;
});

progress.addEventListener('change', () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
});

// Making play buttons change automatically according to the current song is playing
let makePlay = () => {
    Array.from(document.getElementsByClassName('dev-song')).forEach((element) => {
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
    });
}

// Play/Pause
masterPlay.addEventListener('click', () => {
    if (audio.paused) {
        devBtn[songIndex].classList.remove('fa-play');
        devBtn[songIndex].classList.add('fa-pause');
        audio.play();
        masterPlay.innerHTML = '<i class="fa-solid fa-pause fa-xl" style="color: #b3bac6;"></i>';
    }
    else {
        devBtn[songIndex].classList.remove('fa-pause');
        devBtn[songIndex].classList.add('fa-play');
        audio.pause();
        masterPlay.innerHTML = '<i class="fa-solid fa-play fa-xl" style="color: #b3bac6;"></i>';
    }

});

// Previous and next Song play events
seekBack.addEventListener('click', () => {
    makePlay();
    if (songIndex < 0) {
        songIndex = 0

        // Not given in CodeWithHarry
        devBtn[songIndex].classList.remove('fa-play');
        devBtn[songIndex].classList.add('fa-pause');
    }
    else {
        songIndex -= 1;

        // Not given in CodeWithHarry
        devBtn[songIndex].classList.remove('fa-play');
        devBtn[songIndex].classList.add('fa-pause');
    }
    audio.src = songs[songIndex].fileLocation;
    audio.play();
    songTitle.innerHTML = songs[songIndex].songName;
    masterPlay.innerHTML = '<i class="fa-solid fa-pause fa-xl" style="color: #b3bac6;"></i>'
});

seekFor.addEventListener('click', () => {
    makePlay();
    if (songIndex >= songs.length - 1) {
        songIndex = 0

        // Not given in CodeWithHarry
        devBtn[songIndex].classList.remove('fa-play');
        devBtn[songIndex].classList.add('fa-pause');
    }
    else {
        songIndex += 1;

        // Not given in CodeWithHarry
        devBtn[songIndex].classList.remove('fa-play');
        devBtn[songIndex].classList.add('fa-pause');
    }
    audio.src = songs[songIndex].fileLocation;
    audio.play();
    songTitle.innerHTML = songs[songIndex].songName;
    masterPlay.innerHTML = '<i class="fa-solid fa-pause fa-xl" style="color: #b3bac6;"></i>'
});


// Autoplaying next song when current song is over (Not in code with harry)
audio.addEventListener('ended', () => {
    makePlay();
    songIndex += 1;

    // Not given in CodeWithHarry
    devBtn[songIndex].classList.remove('fa-play');
    devBtn[songIndex].classList.add('fa-pause');
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    audio.src = songs[songIndex].fileLocation;
    audio.play();
    songTitle.innerHTML = songs[songIndex].songName;
    masterPlay.innerHTML = '<i class="fa-solid fa-pause fa-xl" style="color: #b3bac6;"></i>';
});

Array.from(document.getElementsByClassName('dev-song')).forEach((btn) => {
    btn.addEventListener('click', (x) => {
        
        makePlay();
        songIndex = parseInt(btn.id);
        if (audio.paused) {
            devBtn[songIndex].classList.remove('fa-play');
            devBtn[songIndex].classList.add('fa-pause');
            audio.src = songs[songIndex].fileLocation;
            audio.play();
            masterPlay.innerHTML = '<i class="fa-solid fa-pause fa-xl" style="color: #b3bac6;"></i>';
        }
        else {
            devBtn[songIndex].classList.remove('fa-pause');
            devBtn[songIndex].classList.add('fa-play');
            audio.src = songs[songIndex].fileLocation;
            audio.pause();
            masterPlay.innerHTML = '<i class="fa-solid fa-play fa-xl" style="color: #b3bac6;"></i>';
        }
        songTitle.innerHTML = songs[songIndex].songName;
        // masterPlay.innerHTML = '<i class="fa-solid fa-pause fa-xl" style="color: #b3bac6;"></i>';

    });
});

// Control volume using JS (Not in code with harry)
volumeControl.addEventListener('change', () => {
    audio.volume = (volumeControl.value / 100);
});
