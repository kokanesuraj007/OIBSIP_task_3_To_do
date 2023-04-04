"use strict";

var inputTask = document.querySelector('#inputTask');
var soundEffect = document.getElementById('sound');
var allCompletedTask = document.getElementById('allCompletedTask');
var completedNumber = document.getElementById('completedNumber');
var close = document.querySelector('.close');
var open = document.querySelector('.completed');
open.addEventListener('click', function () {
  document.querySelector('.taskT').classList.add('open');
});
close.addEventListener('click', function () {
  document.querySelector('.taskT').classList.add('hide');
  document.querySelector('.taskT').classList.remove('open');
});
functiontodo();
inputTask.addEventListener('click', function () {
  var addTask = document.getElementById('addTask');
  var localData = localStorage.getItem('taskSame');
  localData == null ? alltask = [] : alltask = JSON.parse(localData);

  if (addTask.value) {
    alltask.push(addTask.value);
    soundEffect.src = "./ting.mp3";
    soundEffect.play();
  }

  localStorage.setItem('taskSame', JSON.stringify(alltask));
  addTask.value = "";
  functiontodo();
});

function functiontodo() {
  var localData = localStorage.getItem('taskSame');
  var complTa = localStorage.getItem('completedTask');
  var completedTask = localStorage.getItem('completedTask');

  if (complTa == null) {
    completedNumber.innerText = 0;
    completedNumber.style.color = "red";
    complete = [];
  } else {
    complete = JSON.parse(complTa);
    completedNumber.innerText = JSON.parse(completedTask).length;
  }

  localData == null ? alltask = [] : alltask = JSON.parse(localData);
  var comTask = JSON.parse(completedTask);
  var html = '';
  var comp = '';
  alltask.forEach(function (e, index) {
    html += "\n        <div id=\"tskbox\">\n        <div class=\"col d-flex justify-content-between align-items-center todoCard my-2 mx-3 p-4\">\n            <h5 class=\"card-number\">".concat(index + 1, "</h5>\n            <p class=\"card-text ncTask editTask\">").concat(e, "</p>\n            <div class=\"d-flex gap\">\n                <i id=\"").concat(index, "\" onclick=\"editTask(this.id)\" class=\"btn btn-outline-success fa fa-pen d-flex align-items-center\"></i>\n                <i id=\"").concat(index, "\" onclick=\"deleteTask(this.id)\" class=\"btn btn-outline-danger fa fa-close d-flex align-items-center\"></i>\n                <i id=\"").concat(index, "\" onclick=\"completedTaskFunc(this.id)\" class=\"btn btn-outline-success fa fa-check d-flex align-items-center\"></i>\n            </div>\n        </div>\n        </div>\n        ");
  });
  var pushNote = document.getElementById('pushNote');
  alltask.length != 0 ? pushNote.innerHTML = html : pushNote.innerHTML = "List is empty\uD83D\uDCC3";

  if (comTask) {
    comTask.forEach(function (e, index) {
      comp += "\n            <div id=\"tskbox\">\n        <div class=\"col d-flex justify-content-between todoCard my-2 mx-3 p-4 py-5\">\n        <h5 class=\"card-number mb-0 mr-2\">".concat(index + 1, "</h5>\n        <p class=\"card-text mb-0\">").concat(e, "</p>\n        <i id=\"").concat(index, "\" onclick=\"deleteCoomplete(this.id)\" class=\"btn btn-outline-danger fa fa-close d-flex align-items-center\"></i>\n        </div>\n        </div>\n        ");
    });
  }

  var compTask = document.getElementById('pushComplete');
  comTask != 0 ? compTask.innerHTML = comp : compTask.innerHTML = "<h3 style='color:blue'>Ops, No task Completed📃</h3>";
}

function deleteTask(index) {
  var localData = localStorage.getItem('taskSame');

  if (localData == null) {
    alltask = [];
  } else {
    alltask = JSON.parse(localData);
  }

  alltask.splice(index, 1);
  soundEffect.src = "./delete.mp3";
  soundEffect.play();
  localStorage.setItem('taskSame', JSON.stringify(alltask));
  functiontodo();
}

;

function completedTaskFunc(index) {
  var localData = localStorage.getItem('taskSame');
  var complTa = localStorage.getItem('completedTask');

  if (localData == null) {
    alltask = [];
  } else {
    alltask = JSON.parse(localData);
  }

  if (complTa == null) {
    complete = [];
  } else {
    complTa = JSON.parse(complTa);
  }

  if (complTa) {
    complete.push(alltask.splice(index, 1));
    soundEffect.src = "./delete.mp3";
    soundEffect.play();
  }

  localStorage.setItem('taskSame', JSON.stringify(alltask));
  localStorage.setItem('completedTask', JSON.stringify(complete));
  functiontodo();
}

;

function deleteCoomplete(index) {
  var complTa = localStorage.getItem('completedTask');

  if (complTa == null) {
    complete = [];
  } else {
    complete = JSON.parse(complTa);
  }

  complete.splice(index, 1);
  soundEffect.src = "./delete.mp3";
  soundEffect.play();
  localStorage.setItem('completedTask', JSON.stringify(complete));
  functiontodo();
}

;

function editTask(index) {
  var edit = prompt("Edit your task", alltask[index]);
  var editTask = document.getElementsByClassName('editTask')[index];
  editTask.innerHTML = edit;
  alltask.splice(index, 1, edit);
  localStorage.setItem('taskSame', JSON.stringify(alltask));
  functiontodo();
}

var musicPlayer = document.querySelector("#music-player");
var playlistItems = document.querySelectorAll(".playlist li");
var prevButton = document.querySelector("#prev-button");
var playButton = document.querySelector("#play-button");
var nextButton = document.querySelector("#next-button");
var currentTrackIndex = 0; // Function to play the current track

function playTrack() {
  musicPlayer.src = playlistItems[currentTrackIndex].getAttribute("data-src");
  musicPlayer.play();
  playlistItems[currentTrackIndex].classList.add("active");
} // Function to pause the current track


function pauseTrack() {
  musicPlayer.pause();
  playlistItems[currentTrackIndex].classList.remove("active");
} // Event listener for the play button


playButton.addEventListener("click", function () {
  if (musicPlayer.paused) {
    playTrack();
    playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24px" height="24px"><path d="M8 5v14l11-7z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
  } else {
    pauseTrack();
    playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4caf50" width="24px" height="24px"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
  }
}); // Event listener for the previous button

prevButton.addEventListener("click", function () {
  if (currentTrackIndex === 0) {
    currentTrackIndex = playlistItems.length - 1;
  } else {
    currentTrackIndex--;
  }

  pauseTrack();
  playTrack();
}); // Event listener for the next button

nextButton.addEventListener("click", function () {
  if (currentTrackIndex === playlistItems.length - 1) {
    currentTrackIndex = 0;
  } else {
    currentTrackIndex++;
  }

  pauseTrack();
  playTrack();
});
//# sourceMappingURL=index.dev.js.map
