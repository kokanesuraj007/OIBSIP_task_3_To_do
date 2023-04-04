const inputTask = document.querySelector('#inputTask');
let soundEffect = document.getElementById('sound');
let allCompletedTask = document.getElementById('allCompletedTask');
let completedNumber = document.getElementById('completedNumber');
let close = document.querySelector('.close');
let open = document.querySelector('.completed');

open.addEventListener('click', () => {
    document.querySelector('.taskT').classList.add('open')
})
close.addEventListener('click', () => {
    document.querySelector('.taskT').classList.add('hide')
    document.querySelector('.taskT').classList.remove('open')
})


functiontodo();
inputTask.addEventListener('click', () => {
    let addTask = document.getElementById('addTask');
    let localData = localStorage.getItem('taskSame');

    localData == null ? alltask = [] : alltask = JSON.parse(localData);

    if (addTask.value) {
        alltask.push(addTask.value);
        soundEffect.src = "./ting.mp3"
        soundEffect.play()
    }
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    addTask.value = "";
    functiontodo();
});



function functiontodo() {
    let localData = localStorage.getItem('taskSame');
    let complTa = localStorage.getItem('completedTask');
    let completedTask = localStorage.getItem('completedTask');

    if (complTa == null) {
        completedNumber.innerText = 0;
        completedNumber.style.color = "red"
        complete = [];
    }
    else {
        complete = JSON.parse(complTa);
        completedNumber.innerText = JSON.parse(completedTask).length;
    }

    localData == null ? alltask = [] : alltask = JSON.parse(localData);

    let comTask = JSON.parse(completedTask)
    let html = '';
    let comp = '';
    alltask.forEach((e, index) => {
        html += `
        <div id="tskbox">
        <div class="col d-flex justify-content-between align-items-center todoCard my-2 mx-3 p-4">
            <h5 class="card-number">${index + 1}</h5>
            <p class="card-text ncTask editTask">${e}</p>
            <div class="d-flex gap">
                <i id="${index}" onclick="editTask(this.id)" class="btn btn-outline-success fa fa-pen d-flex align-items-center"></i>
                <i id="${index}" onclick="deleteTask(this.id)" class="btn btn-outline-danger fa fa-close d-flex align-items-center"></i>
                <i id="${index}" onclick="completedTaskFunc(this.id)" class="btn btn-outline-success fa fa-check d-flex align-items-center"></i>
            </div>
        </div>
        </div>
        `
    });

    let pushNote = document.getElementById('pushNote');

    alltask.length != 0 ? pushNote.innerHTML = html : pushNote.innerHTML = `List is empty📃`;

    if (comTask) {
        comTask.forEach((e, index) => {
            comp += `
            <div id="tskbox">
        <div class="col d-flex justify-content-between todoCard my-2 mx-3 p-4 py-5">
        <h5 class="card-number mb-0 mr-2">${index + 1}</h5>
        <p class="card-text mb-0">${e}</p>
        <i id="${index}" onclick="deleteCoomplete(this.id)" class="btn btn-outline-danger fa fa-close d-flex align-items-center"></i>
        </div>
        </div>
        `
        });
    }

    let compTask = document.getElementById('pushComplete');

    comTask != 0 ? compTask.innerHTML = comp : compTask.innerHTML = "<h3 style='color:blue'>Ops, No task Completed📃</h3>";

}

function deleteTask(index) {
    let localData = localStorage.getItem('taskSame');
    if (localData == null) {
        alltask = [];
    }
    else {
        alltask = JSON.parse(localData);
    }
    alltask.splice(index, 1);
    soundEffect.src = "./delete.mp3"
    soundEffect.play()
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    functiontodo();
};

function completedTaskFunc(index) {
    let localData = localStorage.getItem('taskSame');
    let complTa = localStorage.getItem('completedTask');
    if (localData == null) {
        alltask = [];
    }
    else {
        alltask = JSON.parse(localData);
    }
    if (complTa == null) {
        complete = [];
    }
    else {
        complTa = JSON.parse(complTa);
    }
    if (complTa) {
        complete.push(alltask.splice(index, 1))
        soundEffect.src = "./delete.mp3"
        soundEffect.play()

    }
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    localStorage.setItem('completedTask', JSON.stringify(complete));
    functiontodo();
};
function deleteCoomplete(index) {
    let complTa = localStorage.getItem('completedTask');
    if (complTa == null) {
        complete = [];
    }
    else {
        complete = JSON.parse(complTa);
    }
    complete.splice(index, 1);
    soundEffect.src = "./delete.mp3"
    soundEffect.play()
    localStorage.setItem('completedTask', JSON.stringify(complete));
    functiontodo();
};

function editTask(index) {
    let edit = prompt("Edit your task", alltask[index]);
    let editTask = document.getElementsByClassName('editTask')[index];
    editTask.innerHTML = edit;
    alltask.splice(index, 1, edit);
    localStorage.setItem('taskSame', JSON.stringify(alltask));
    functiontodo();
}

const musicPlayer = document.querySelector("#music-player");
const playlistItems = document.querySelectorAll(".playlist li");
const prevButton = document.querySelector("#prev-button");
const playButton = document.querySelector("#play-button");
const nextButton = document.querySelector("#next-button");

let currentTrackIndex = 0;

// Function to play the current track
function playTrack() {
  musicPlayer.src = playlistItems[currentTrackIndex].getAttribute("data-src");
  musicPlayer.play();
  playlistItems[currentTrackIndex].classList.add("active");
}

// Function to pause the current track
function pauseTrack() {
  musicPlayer.pause();
  playlistItems[currentTrackIndex].classList.remove("active");
}

// Event listener for the play button
playButton.addEventListener("click", () => {
  if (musicPlayer.paused) {
    playTrack();
    playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24px" height="24px"><path d="M8 5v14l11-7z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
  } else {
    pauseTrack();
    playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4caf50" width="24px" height="24px"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
  }
});

// Event listener for the previous button
prevButton.addEventListener("click", () => {
  if (currentTrackIndex === 0) {
    currentTrackIndex = playlistItems.length - 1;
  } else {
    currentTrackIndex--;
  }
  pauseTrack();
  playTrack();
});

// Event listener for the next button
nextButton.addEventListener("click", () => {
  if (currentTrackIndex === playlistItems.length - 1) {
    currentTrackIndex = 0;
  } else {
    currentTrackIndex++;
  }
  pauseTrack();
  playTrack();
});
