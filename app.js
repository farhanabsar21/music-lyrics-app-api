const searchSongs = ()=>{
    const searchField = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchField}`;
    fetch(url).then(res => res.json()).then(data => displaySongs(data.data)).catch(err => console.log(err))
}

const displaySongs = songs =>{
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    songs.forEach(song => {
        const singleTrack = document.createElement("DIV");
        singleTrack.className = "single-result row align-items-center my-3 p-3";
        singleTrack.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio> 
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyrics('${song.artist.name}','${song.title}')">Get Lyrics</button>
            </div>`;
        songContainer.appendChild(singleTrack); 
        document.getElementById("search-field").value = "";  
    });
}

const getLyrics = (artist,title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url).then(res => res.json()).then(data => songLyrics(data.lyrics)).catch(err => console.log(err))
}

const songLyrics = lyrics => {
    const lyricsBox = document.getElementById("track-lyrics");
    lyricsBox.innerText = lyrics;
}

