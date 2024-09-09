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
        let newNames= event.target.value.split(",");
        if(newNames[0]===""){
            newNames.foreach(name=> {
                participantsName.push(name)
            });
        }
    }
});