let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
const welcomeMessage = document.getElementById("welcome");
let answerValue;
let operatorQuestion;

//Générateur de valeurs aléatoires
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const questionGenerator = () => {
  //Deux valeurs aléatoires entre 1 et 20
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
  //For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];
  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  //Résoudre l'équation
  let solution = eval(`${num1}${randomOperator}${num2}`);
  //Placement aléatoire
  
  let randomVar = randomValue(1, 5);
  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }
  //Vérification 
  submitBtn.addEventListener("click", () => {
    errorMessage.classList.add("hide");
    let userInput = document.getElementById("inputValue").value;

    if (userInput) {
    
      if (userInput == answerValue) {
        stopGame(`Super !! <span>Bonne</span> réponse`);
      }
      //Si l'utilisateur saisit un opérateur autre que +, -, *
      else if (operatorQuestion && !operators.includes(userInput)) {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Veuillez entrer un opérateur valide.";
      }
      //Si réponse fausse
      else {
        stopGame(`Oups !! <span>Mauvaise</span> réponse`);
      }
    }
    //Si vide
    else {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "La saisie ne peut pas être vide";
    }
  });
};
// Commencement du jeu
startBtn.addEventListener("click", () => {
    // Cacher l'élément #welcome
    welcomeMessage.style.display = "none";
  
    operatorQuestion = false;
    answerValue = "";
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");
    // Visibilité des contrôles et des boutons
    controls.classList.add("hide");
    startBtn.classList.add("hide");
    questionGenerator();
  });
  
//arrêt du jeu 
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Recommencer";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};