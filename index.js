var levels = "";
var level = "";

var lvlname = document.getElementById("name");
var lvldesc = document.getElementById("desc");
var author = document.getElementById("author");
var dl = document.getElementById("dl");
var likes = document.getElementById("likes");
var likeImg = document.getElementById("likeImg");
var len = document.getElementById("len");
var obj = document.getElementById("obj");
var songname = document.getElementById("songname");
var songauthor = document.getElementById("songauthor");
var songinfo = document.getElementById("songinfo");
var id = document.getElementById("idbox");

var idbox = document.getElementById("idbox");
var color = _.sample(["#A1582C", "#B96C39"]);
idbox.setAttribute("style", "transform: scale(0.5); bottom: 1%; position: fixed; z-index: 1; left: 15.5%; right: 15.5%; border: 0.5vh solid #803E1E; border-radius: 2vh; text-align: center; background-color: "+color+";");

jQuery("#songname").fitText(1.5);

let page = 0;
let rawlevels = "";
let found = false;

function thing() {
    let exit = false;
    page = page + 1;
    lvlname.innerHTML = "Loading..."
    let ws = new WebSocket('ws://localhost:8765');

    ws.onerror = () => {
        desc.innerHTML = 'Connection error. Make sure you can access redoverflow.sudocode1.xyz'; 
        return exit = true;
    }

    if (exit) return;

    ws.onopen = () => {ws.send('hey give me the funni level data from page .'+page.toString())};
    ws.onmessage = s => {
        rawlevels = s.data;
        levels = JSON.parse(rawlevels);
        console.log(levels)
        levels.forEach(x => {
            if (found) return;
            console.log(x)
            if (x.id.toString().endsWith("69")) {
                level = x;
                found = true;
                return;
            }
        });
        if (found == false) {
            thing();
        }
        if (found == true) {
            lvlname.innerHTML = level.name;
            lvldesc.innerHTML = level.description;
            author.innerHTML = "By "+level.author;
            author.setAttribute("href", "https://gdbrowser.com/u/"+level.accountID);
            dl.innerHTML = level.downloads;
            if (level.disliked == true) {
                likeImg.setAttribute("src", "assets/dislike.png");
            }
            likes.innerHTML = level.likes;
            len.innerHTML = level.lvllength;
            obj.innerHTML = level.objects;
            songname.innerHTML = level.songName;
            songauthor.innerHTML = "By: "+level.songAuthor;
            songinfo.innerHTML = "SongID: "+level.songID+" &nbsp;&nbsp; Size: "+level.songSize;
            id.innerHTML = "ID: "+level.id;
            level = null;
            page = 0;
        }
    }

}

thing();