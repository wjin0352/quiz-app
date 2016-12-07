$(document).ready(function(){

  var MultipleChoiceQuestion = function(q, choices, ans) {
    this.q = q;
    this.choices = choices;
    this.ans = ans;
  };

  MultipleChoiceQuestion.prototype.checkAnswer = function(result) {
    return this.ans === result;
  };

  var questionArray = [
    {
      q: "In which town do the Simpsons reside?",
      choices: ['springfield', 'shelbyville', 'seinfeld'],
      ans: 0
    },
    {
      q: "What is the name of the Simpsons' next door neighbor?",
      choices: ['barney gumble', 'ned flanders', 'principal skinner'],
      ans: 1
    },
    {
      q: "Who founded the Simpsons' town?",
      choices: ['jebadiah springfield', 'zachariah Springfield', 'springfield manhattan'],
      ans: 0
    },
    {
      q: "What is the name of the clown on Channel 6?",
      choices: ['gabbo', 'krusty','bonko'],
      ans: 1
    },
    {
      q: "Who is Mr Burns' assistant?",
      choices: ['seymour skinner', 'barnard gumble', 'waylon smithers'],
      ans: 2
    }
  ];

  questionArray = questionArray.map(function(question) {
    return new MultipleChoiceQuestion(question.q, question.choices, question.ans);
  });

  // View
  var View = function() {
    this.donut_gif = '<div class="donut"><img src="./images/donut-simpson.gif" alt="donut" style="width:120px;height:200px;"></img></div>';
    this.flanders_pissed = '<div class="flanders"><img src="./images/Nedpissed.gif" alt="flanders pissed" ></img>';
    this.correct_html = '<div class="popup" data-popup="popup-1"><div class="popup-correct"><h2>Good job, that is correct!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>';
    this.wrong_html = '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Sorry that is incorrect!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>';
    this.warning_html = '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Please click on one of the choices!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>';
    this.winner_html = '<div class="popup" data-popup="popup-1"><div class="popup-winner"><div class="winner_items"><h2>Congrats you won!!!</h2><p><a id="closer" data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div></div>';
    this.loser_html = '<div class="popup" data-popup="popup-1"><div class="popup-loser"><h2>Sorry you lost.</h2><p><a id="closer" data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>';
    this.prompt_html = '<div class="popup" data-popup="popup-1"><div class="popup-prompt"><h2>play again?</h2><p><a type="button" class="btn btn-lrg btn-warning">OK</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>';
  };

  // CLICK EVENT FOR SUBMIT BUTTON
  View.prototype.attachClickHandler = function() {
    $('.btn').on('click', function(e){
      quizObject.getResults();
      e.preventDefault();
    });
  }

  View.prototype.setHTML = function (html) {
    $('.new').html(html);
  }

  View.prototype.showModal = function() {
    $(".popup").fadeIn(1000);
    this.attachHideModal();
  }

  View.prototype.attachHideModal = function() {
    $('[data-popup-close]').on('click', function(e) {
      $(".popup").fadeOut(500);
      e.preventDefault();
    });
  }

  View.prototype.appendDonut = function() {
    // Appending the image didnt work well, as it overlapped the first image
    // instead we concatenate the image to a string var, looping and depending on how many correct
    // answers we have. Then instead of using append() we do html() which changes the html.
    var donut_html = "";
    for (var i =0; i< modelObject.rightAnswers; i++) {
      donut_html += viewObject.donut_gif;
    };
    $('.popup-correct p').html(donut_html);
  };

  View.prototype.clearRadioBox = function() {
    $('.q').attr('checked', null);
  };

  View.prototype.appendErrorMessage = function() {
    $('.popup h2').append(viewObject.flanders_pissed);
  };

  var viewObject = new View();

  // Model
  var Model = function() {
    this.rightAnswers = 0;
    this.currentQuestion = 0;
    this.gameWon = false;
  };

  var modelObject = new Model();

  // Business logic
  var Quiz = function() {
  };

  Quiz.prototype.askQuestion = function() {
    this.question = questionArray[modelObject.currentQuestion];
    var question = this.question;
    $('#questions').text(question.q);

    $('.answer').each(function(index) {
      $(this).text(question.choices[index]);
    });

    // INCREMENTS to make sure we get to the next object in the array
    modelObject.currentQuestion++;
  };

  Quiz.prototype.getResults = function(e) {
    // GIVES NUMBER RESULT OF RADIO BOX CHECKED (0 INDEXED)
    var result = parseInt($("input[type='radio']:checked").val(),10);

    // clears radio boxes after each question is answered
    viewObject.clearRadioBox();

    if (this.question.checkAnswer(result)) {
      var html = viewObject.correct_html;
      var music = "woohoo";
      quizObject.initialize(html,music);
      modelObject.rightAnswers++
      viewObject.appendDonut();
      quizObject.checkForWin();
    } else if (isNaN(result)) {
      var html = viewObject.warning_html;
      var music = "flanders";
      quizObject.initialize(html,music);
      viewObject.appendErrorMessage();
    } else if (!(this.question.checkAnswer(result))) {
      var html = viewObject.wrong_html;
      var music = "doh";
      quizObject.initialize(html,music);
      quizObject.checkForWin();
      };
  };

  Quiz.prototype.initialize = function(html, music) {
    viewObject.setHTML(html);
    viewObject.showModal();
    quizObject.playMusic(music);
  };

  Quiz.prototype.checkForWin = function () {
    if (( modelObject.currentQuestion >= 5) && (modelObject.rightAnswers === 5)) {
     quizObject.wonGame(viewObject.winner_html, 'rich');
   } else if (( modelObject.currentQuestion >= 5) && (modelObject.rightAnswers < 5)) {
     quizObject.lostGame(viewObject.loser_html, 'meltdown');
   } else {
    quizObject.askQuestion();
   };
  };

  Quiz.prototype.wonGame = function (html, music) {
    quizObject.initialize(html, music);
    modelObject.gameWon = true;
    quizObject.startGame();
  };

  Quiz.prototype.lostGame = function (html, music) {
    quizObject.initialize(html, music)
    quizObject.startGame();
  };

  Quiz.prototype.startGame = function () {
    modelObject.rightAnswers = 0;
    modelObject.currentQuestion = 0;
    modelObject.gameWon = false;
    quizObject.askQuestion();
  };

  Quiz.prototype.playMusic = function(id) {
    $('#'+id)[0].volume = 0.5;
    $('#'+id)[0].load();
    $('#'+id)[0].play();
  };

  var quizObject = new Quiz();

  // SHOW FIRST QUESTION AND ANSWERS
    quizObject.askQuestion();
    viewObject.attachClickHandler();
});

$(document).ready(function(){

  var MultipleChoiceQuestion = function(q, choices, ans) {
    this.q = q;
    this.choices = choices;
    this.ans = ans;
  };

  MultipleChoiceQuestion.prototype.checkAnswer = function(result) {
    return this.ans === result;
  };

  questionArray = [
    {
      q: "In which town do the Simpsons reside?",
      choices: ['springfield', 'shelbyville', 'seinfeld'],
      ans: 0
    },
    {
      q: "What is the name of the Simpsons' next door neighbor?",
      choices: ['barney gumble', 'ned flanders', 'principal skinner'],
      ans: 1
    },
    {
      q: "Who founded the Simpsons' town?",
      choices: ['jebadiah springfield', 'zachariah Springfield', 'springfield manhattan'],
      ans: 0
    },
    {
      q: "What is the name of the clown on Channel 6?",
      choices: ['gabbo', 'krusty','bonko'],
      ans: 1
    },
    {
      q: "Who is Mr Burns' assistant?",
      choices: ['seymour skinner', 'barnard gumble', 'waylon smithers'],
      ans: 2
    }
  ];

  questionArray = questionArray.map(function(question) {
    return new MultipleChoiceQuestion(question.q, question.choices, question.ans)
  })
});
