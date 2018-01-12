


class Quiz {
  constructor(quizQuestions, quizAnswers) {
    this.questions = quizQuestions;
    this.answers = quizAnswers;
  }
  
  totalQuestions() {
    return this.questions.length;
  }
  
  htmlGenerator() {

    let output = '';

    this.questions.map( (item, number) => {
      let count = number+1;
      output += `
        <div class="row">
          <div class="col-12">
            <h2 class="mt-5">Question ${count}</h2>
            <p>${item.question}</p>
            <ul class="question-group">
      `;
      
      for(let option in item.options) {
        output +=`<li class="${ count === 0 ? 'checked' : '' }"><label for="${option+count}"><span class="option">${option.toUpperCase()}</span><input type="radio" name="q${count}" id="${option+count}" value="${option === item.answer ? option : 0}" class="answer" />${item.options[option]}</label></li>`;
      }
      
      output += `
            </ul>
          </div>
        </div>
      `;
    });

    // console.log(output);
    return output;
  }
  
  getResults() {
    const answerNodes = document.querySelectorAll('input:checked');
    const optionNodes = document.querySelectorAll('input');
    const answers = [].slice.call(answerNodes);
    
    let goodAnswers = 0;

    optionNodes.forEach( node => node.disabled = true);
    
    answers.map( (answer, number) => {
      if( this.questions[number].answer === answer.value ) {
        goodAnswers++;
        answer.disabled = false;
        // console.log(answer);
        answer.parentNode.parentNode.classList.add('good');
        answer.parentNode.parentNode.insertAdjacentHTML( 'beforeend', '<span class="check good">Correct <i class="fa fa-check" aria-hidden="true"></i>' );
        // console.log('Correct')
      }else{
        answer.parentNode.parentNode.classList.add('bad');
        answer.parentNode.parentNode.insertAdjacentHTML( 'beforeend', '<span class="check bad">Incorrect <i class="fa fa-check" aria-hidden="true"></i>' );
        // console.log('Incorrect')
      }
    });
    
    document.querySelector('#score').innerHTML = `
    <div>
      <h3>Your Score</h3>
      <h1>${ Math.round((goodAnswers)/this.totalQuestions() * 100) }%</h1>
      <p>${goodAnswers}/${this.totalQuestions()} Points Received</p>
    </div>
    `;
  }
  
  validations() {
    const totalAnswers = document.querySelectorAll('input:checked');
    if( totalAnswers.length < this.totalQuestions() ) {
      alert('You must answer all questions');
      return false;
    }else{
      return true;
    }
  }
}

const quizQuestions = [
  {
    question: 'A function that calls itself is a',
    answer: 'a',
    options: {
      a: 'Recursive Function', 
      b: 'Duplicate Function', 
      c: 'Typed Function', 
      d: 'Cell Function'
    }
  },
  {
    question: `
    In this object what is the property?
    <pre>let product = {
  Item: 'Milk'
}</pre>
    `,
    answer: 'd',
    options: {
      a: 'Milk', 
      b: 'product', 
      c: 'let', 
      d: 'Item'
    }
  },
  {
    question: `
      What is the method being used in this object?
      <pre>let product = {
  name: 'Milk',
  price: 2.33,
  calculateTax() {
      return this.price * 0.08;
  }
};</pre>
    `,
    answer: 'c',
    options: {
      a: 'name', 
      b: 'price', 
      c: 'calculateTax()', 
      d: 'product'
    }
  },
  {
    question: 'Represents any sequence of characters such as a message or description.',
    answer: 'c',
    options: {
      a: 'Constants', 
      b: 'Boolean', 
      c: 'String', 
      d: 'Scope'
    }
  },
  {
    question: 'Is the set of variables you have access to.',
    answer: 'c',
    options: {
      a: 'String', 
      b: 'Constants', 
      c: 'Number', 
      d: 'Scope'
    }
  }
];



let quiz = new Quiz(quizQuestions);



// console.log(quiz.htmlGenerator());
document.querySelector("#questions").innerHTML = quiz.htmlGenerator();



const checkboxes = document.querySelectorAll('input[type="radio"]');
checkboxes.forEach( input => {
  let li = input.parentNode.parentNode;
  input.addEventListener('change', (changed) => {

    const nodes = [].slice.call(li.parentNode.children);
    nodes.forEach( elm => elm.className = '');

    if( input.checked ) {
      li.classList.toggle('checked');
    }

    // console.log(nodes);

  });
});

const results = document.querySelector('#getResults');
results.addEventListener('click', () => {
  if(quiz.validations()) {
    results.style.display = 'none';
    quiz.getResults();
  };
});

