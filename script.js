const  inp =document.getElementById('nameInput'); 
const  nameList =document.getElementById('nameList'); 
const  display =document.getElementById('outputDisplay'); 
const  giveATry =document.getElementById('giveATry'); 
const  firstWinner =document.getElementById('firstWinner'); 
const  secondWinner =document.getElementById('secondWinner'); 
const  thirdWinner =document.getElementById('thirdWinner'); 

const participantsName = [];

inp.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        let newNames = event.target.value.split(", ");
        console.log(newNames);
        if(newNames[0]!==""){
            newNames.forEach((name,index)=> {
                participantsName.push(name);
                let item= createListItem(name,index);
                nameList.appendChild(item);
               
            });
        }
        event.target.value="";
    }
});

function createListItem(name, index){
    let li = document.createElement('li');
    li.className="list-group-item";
    li.innerHTML=`${index+1}. `+ name; 
    return li;
}


giveATry.addEventListener("click", function(){
if(participantsName.length==0)
{alert("Please add participants name first");

}
else{
    let shuffleNames = shuffleArray(participantsName);
    for(let i=0; i<shuffleNames.length; i++){
        (function(i, count){
            setTimeout(()=>{
                let rand = Math.floor(Math.random()*shuffleNames.length);
                display.value=shuffleNames[rand];

                if(count==shuffleNames.length-1){
                    if(!firstWinner.innerHTML){
                        firstWinner.innerHTML=shuffleNames[rand];
                        let  ind= shuffleNames.indexOf(shuffleNames[rand]);
                        shuffleNames.splice(ind,1);
                    }
                    else if(!secondWinner.innerHTML){
                        secondWinner.innerHTML=shuffleNames[rand];
                        let  ind= shuffleNames.indexOf(shuffleNames[rand]);
                        shuffleNames.splice(ind,1);
                    }
                    else if(!thirdWinner.innerHTML){
                        thirdWinner.innerHTML=shuffleNames[rand];
                        let  ind= shuffleNames.indexOf(shuffleNames[rand]);
                        shuffleNames.splice(ind,1);
                    }
                    else{
                        alert("All winners are selected");
                    }
                }
                
                }, i)
        })(i*100, i)
     
    }

}



});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  