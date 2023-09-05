// console.log("Hello World... Song Manager is my Week 12 Project!");

//URL: https://64f41592932537f4051a1b1e.mockapi.io/Week12_Project_API/song

const SONG_API_URL = "https://64f41592932537f4051a1b1e.mockapi.io/Week12_Project_API/song";//This is the mockAPI that I created

// const SONG_API_URL = "http://localhost:57643/song";//This does not output the data we are using. Gives lots of Cors errors 

//keep working to refactor so that those depreciated values are no longer in the code. 
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

//this function will be to get the API that has our data stored
//This will create the table in our HTML to post including rows and buttons
function loadSongs() {
    $.get(SONG_API_URL, function (data) {
        let rows = ""; 
        data.forEach(song => {//this will loop over data and add information to the DOM.
            rows += `<tr>
                    <td>${song.id}</td>
                    <td>${song.songName}</td>
                    <td>${song.songArtist}</td>
                    <td>${song.songLength}</td>
                    <td>${song.songYear}</td>
                    <td>
                    <button class="btn btn-info" onclick="editSong(${song.id})">Edit</button>
                    </td>
                    <td>
                    <button class="btn btn-primary" onclick="deleteSong(${song.id})">Delete</button>
                    </td>
                    </tr>`;
        });
        $("#songsTableBody").html(rows);
    });
}

//this function will be our C or Create 
function addSong(){
    const song = {//we will create a song that has the values below 
        //jquery to target the inputElement.val() of my form.
        id: $("#id").val(),
        songName: $("#song-name").val(),
        songArtist: $("#song-artist").val(), 
        songLength: $("#song-length").val(),
        songYear: $("#song-year").val(),
    };//POST: we will then add that song to the song list
    $.post(SONG_API_URL, song, function () {
        resetForm(); //this will reset the form 
        loadSongs(); //this will load all the new songs
    });
}

//This function is reading our song that we created 
function editSong(id) {
    $.get(SONG_API_URL + "/" + id, function (song) {
        $("#id").val(song.id);
        $("#song-name").val(song.songName);
        $("#song-artist").val(song.songArtist);
        $("#song-length").val(song.songLength);
        $("#song-year").val(song.songYear);
    });
}

//this is our function to update our songs in our song manager
function updateSong(id) {
    const song = {
        id: $("#id").val(),
        songName: $("#song-name").val(),
        songArtist: $("#song-artist").val(), 
        songLength: $("#song-length").val(),
        songYear: $("#song-year").val()
    };
    // Set up $.ajax() for 'PUT', We need two key/value pairs: method and data
    //use ajax method to make our HTTP request
    $.ajax({
        url: SONG_API_URL + "/" + id,
        type: 'PUT',//this is our HTTP:// verb UPDATE
        data: song, 
        success: function () {
            resetForm();
            loadSongs();
        }
    });
}

//this is our function to delete songs from our manager 
function deleteSong(id) {
    $.ajax({
        url: SONG_API_URL + "/" + id,
        type: 'DELETE', //This is our HTTP:// verb DELETE 
        success: function () {
            loadSongs(); 
        }
    });
}

//for a more user friendly experience reset the form back to blank
function resetForm() {
        $("#id").val("");    
        $("#song-name").val("");
        $("#song-artist").val("");
        $("#song-length").val("");
        $("#song-year").val("");
}

