// console.log("Hello World... Song Manager is my Week 12 Project!");

//URL: https://64f41592932537f4051a1b1e.mockapi.io/Week12_Project_API/song

const SONG_API_URL = "https://64f41592932537f4051a1b1e.mockapi.io/Week12_Project_API/song";//This is the mockAPI that I created

// const SONG_API_URL = "http://localhost:57643/song";//This does not output the data we are using. Gives lots of Cors errors 


$(document).ready(function () {
    loadSongs();

    $("#songForm").submit(function (e) {
        console.log("Hello World...it's Brittiney!")
        e.preventDefault();
        let songId = $("#songId").val();
        if (songId) {
            updateSong(songId);
        } else {
            addSong(); 
        }
    });

});

function loadSongs() {
    $.get(SONG_API_URL, function(data) {
        let rows = ""; 
        data.forEach(song => {
            rows += `<tr>
                    <td>${song.songName}</td>
                    <td>${song.songArtist}</td>
                    <td>${song.songLength}</td>
                    <td>${song.songYear}</td>
                    <td>${song.songId}</td>
                    <td>
                    <button class="btn btn-warning" onclick="editSong(${song.songId})>Edit</button>"
                    <button class="btn btn-danger" onclick="deleteSong(${song.songId})">Delete</button>
                    </td>
                    </tr>`;
        });
        $("#songsTableBody").html(rows);
    });
}

function addSong(){
    const song = {
        songName: $("#song-name").val(),
        songArtist: $("#song-artist").val(), 
        songLength: $("#song-length").val(),
        songYear: $("#song-year").val(),
        songId: $("#song-id").val()
    };
    $.post(SONG_API_URL, song, function () {
        resetForm(); 
        loadSongs();
    });
}

function editSong(id) {
    $.get(SONG_API_URL + "/" + id, function (song) {
        $("#song-name").val(song.songName);
        $("#song-artist").val(song.songArtist);
        $("#song-length").val(song.songLength);
        $("#song-year").val(song.songYear);
        $("#song-id").val(song.songId);
    });
}

function updateSong(id) {
    const song = {
        songName: $("#song-name").val(),
        songArtist: $("#song-artist").val(), 
        songLength: $("#song-length").val(),
        songYear: $("#song-year").val(),
        songId: $("#song-id").val()
    };
    $.ajax({
        url: SONG_API_URL + "/" + id,
        type: 'PUT',
        data: song, 
        success: function () {
            resetForm();
            loadSongs();
        }
    });
}


function deleteSong(id) {
    $.ajax({
        url: SONG_API_URL + "/" + id,
        type: 'DELETE',
        success: function () {
            loadSongs(); 
        }
    });
}

function resetForm() {
        $("#song-name").val("");
        $("#song-artist").val("");
        $("#song-length").val("");
        $("#song-year").val("");
        $("#song-id").val("");
}

