const inp = document.getElementById('nameInput');
const nameList = document.getElementById('nameList');
const display = document.getElementById('outputDisplay');
const giveATry = document.getElementById('giveATry');
const winnerList = document.getElementById('winnerList');
const winnerCountInput = document.getElementById('winnerCount');
const toggleNamesBtn = document.getElementById('toggleNamesBtn');
const collapseEl = document.getElementById('collapseExample');
const resetBtn = document.getElementById('resetBtn');
const copyWinnersBtn = document.getElementById('copyWinnersBtn');
const downloadWinnersBtn = document.getElementById('downloadWinnersBtn');

const participantsName = [];
const winners = [];
let shufflePool = [];
inp.value = "";

// ── Toggle button text ────────────────────────────────────────────
collapseEl.addEventListener('show.bs.collapse', function () {
  toggleNamesBtn.textContent = "Hide All Names";
});
collapseEl.addEventListener('hide.bs.collapse', function () {
  toggleNamesBtn.textContent = "Show All Names";
});

// ── Build winner slots ────────────────────────────────────────────
function buildWinnerSlots() {
  const count = parseInt(winnerCountInput.value) || 3;
  winnerList.innerHTML = "";
  winners.length = 0;
  shufflePool = [];

  const ordinals = ["First", "Second", "Third", "Fourth", "Fifth",
    "Sixth", "Seventh", "Eighth", "Ninth", "Tenth",
    "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth",
    "Sixteenth", "Seventeenth", "Eighteenth", "Nineteenth", "Twentieth"];

  for (let i = 0; i < count; i++) {
    const label = ordinals[i] ? ordinals[i] : `#${i + 1}`;
    const h5 = document.createElement('h5');
    const spanId = `winner_${i}`;
    h5.innerHTML = `${label} Winner : &nbsp;<span id="${spanId}"></span>`;
    winnerList.appendChild(h5);
    winners.push(spanId);
  }
}

buildWinnerSlots();

winnerCountInput.addEventListener("change", buildWinnerSlots);
winnerCountInput.addEventListener("input", buildWinnerSlots);

// ── Add names ─────────────────────────────────────────────────────
inp.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let newNames = event.target.value.split(", ");
    if (newNames[0] !== "") {
      newNames.forEach((name, index) => {
        participantsName.push(name);
        let item = createListItem(name, index);
        nameList.appendChild(item);
      });
    }
    event.target.value = "";
  }
});

function createListItem(name, index) {
  let li = document.createElement('li');
  li.className = "list-group-item";
  li.innerHTML = `${index + 1}. ` + name;
  return li;
}

// ── Give A Try ────────────────────────────────────────────────────
giveATry.addEventListener("click", function () {
  if (participantsName.length == 0) {
    alert("Please add participants name first");
    return;
  }

  const neededWinners = parseInt(winnerCountInput.value) || 3;
  if (participantsName.length < neededWinners) {
    alert(`Not enough participants. You need at least ${neededWinners} names for ${neededWinners} winners.`);
    return;
  }

  const allFilled = winners.every(id => document.getElementById(id).innerHTML !== "");
  if (allFilled) {
    alert("All winners are selected");
    return;
  }

  if (shufflePool.length === 0) {
    shufflePool = shuffleArray([...participantsName]);
  }

  const totalTicks = shufflePool.length;

  giveATry.disabled = true;

  for (let i = 0; i < totalTicks; i++) {
    (function (i, count) {
      setTimeout(() => {
        let rand = Math.floor(Math.random() * shufflePool.length);
        display.value = shufflePool[rand];

        if (count == totalTicks - 1) {
          const winnerName = shufflePool[rand];
          const ind = shufflePool.indexOf(winnerName);
          shufflePool.splice(ind, 1);

          for (let w = 0; w < winners.length; w++) {
            const slot = document.getElementById(winners[w]);
            if (!slot.innerHTML) {
              slot.innerHTML = winnerName;
              display.value = winnerName;
              break;
            }
          }

          giveATry.disabled = false;
        }
      }, i * 100);
    })(i, i);
  }
});

// ── Reset / New Round ─────────────────────────────────────────────
resetBtn.addEventListener("click", function () {
  if (!confirm("Start a new round? This will clear all winners and reset the draw.")) return;
  shufflePool = [];
  display.value = "";
  winners.forEach(id => {
    document.getElementById(id).innerHTML = "";
  });
});

// ── Copy Winners ──────────────────────────────────────────────────
copyWinnersBtn.addEventListener("click", function () {
  const lines = winners.map((id, i) => {
    const name = document.getElementById(id).innerHTML;
    return name ? `${i + 1}. ${name}` : null;
  }).filter(Boolean);

  if (lines.length === 0) {
    alert("No winners selected yet.");
    return;
  }

  navigator.clipboard.writeText(lines.join("\n")).then(() => {
    copyWinnersBtn.textContent = "Copied!";
    setTimeout(() => copyWinnersBtn.textContent = "Copy Winners", 2000);
  });
});

// ── Download Winners as TXT ───────────────────────────────────────
downloadWinnersBtn.addEventListener("click", function () {
  const lines = winners.map((id, i) => {
    const name = document.getElementById(id).innerHTML;
    return name ? `${i + 1}. ${name}` : null;
  }).filter(Boolean);

  if (lines.length === 0) {
    alert("No winners selected yet.");
    return;
  }

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "winners.txt";
  a.click();
  URL.revokeObjectURL(a.href);
});

// ── Shuffle helper ────────────────────────────────────────────────
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


//those are the old codes!
// const  inp =document.getElementById('nameInput'); 
// const  nameList =document.getElementById('nameList'); 
// const  display =document.getElementById('outputDisplay'); 
// const  giveATry =document.getElementById('giveATry'); 
// const  firstWinner =document.getElementById('firstWinner'); 
// const  secondWinner =document.getElementById('secondWinner'); 
// const  thirdWinner =document.getElementById('thirdWinner'); 

// const participantsName = [];
// inp.value="";
// inp.addEventListener("keypress", function(event){
//     if(event.key === "Enter"){
//         let newNames = event.target.value.split(", ");
//         console.log(newNames);
//         if(newNames[0]!==""){
//             newNames.forEach((name,index)=> {
//                 participantsName.push(name);
//                 let item= createListItem(name,index);
//                 nameList.appendChild(item);
               
//             });
//         }
//         event.target.value="";
//     }
// });

// function createListItem(name, index){
//     let li = document.createElement('li');
//     li.className="list-group-item";
//     li.innerHTML=`${index+1}. `+ name; 
//     return li;
// }


// giveATry.addEventListener("click", function(){
// if(participantsName.length==0)
// {alert("Please add participants name first");

// }
// else{
//     let shuffleNames = shuffleArray(participantsName);
//     for(let i=0; i<shuffleNames.length; i++){
//         (function(i, count){
//             setTimeout(()=>{
//                 let rand = Math.floor(Math.random()*shuffleNames.length);
//                 display.value=shuffleNames[rand];

//                 if(count==shuffleNames.length-1){
//                     if(!firstWinner.innerHTML){
//                         firstWinner.innerHTML=shuffleNames[rand];
//                         let  ind= shuffleNames.indexOf(shuffleNames[rand]);
//                         shuffleNames.splice(ind,1);
//                     }
//                     else if(!secondWinner.innerHTML){
//                         secondWinner.innerHTML=shuffleNames[rand];
//                         let  ind= shuffleNames.indexOf(shuffleNames[rand]);
//                         shuffleNames.splice(ind,1);
//                     }
//                     else if(!thirdWinner.innerHTML){
//                         thirdWinner.innerHTML=shuffleNames[rand];
//                         let  ind= shuffleNames.indexOf(shuffleNames[rand]);
//                         shuffleNames.splice(ind,1);
//                     }
//                     else{
//                         alert("All winners are selected");
//                     }
//                 }
                
//                 }, i)
//         })(i*100, i)
     
//     }

// }



// });

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   }

  
