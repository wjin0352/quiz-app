$(document).ready(function() {
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

  var View = {
    // CLICK EVENT FOR SUBMIT BUTTON
    attachClickHandler: function() {
      $('.btn').on('click', function(e){
        Quiz.getResults();
        e.preventDefault();
      });
    },
    showModal: function() {
      $(".popup").fadeIn(1000);
      this.attachHideModal();
    },
    attachHideModal: function() {
      $('[data-popup-close]').on('click', function(e) {
        $(".popup").fadeOut(500);
        e.preventDefault();
      });
    },
    appendDonut: function() {
      // Appending the image didnt work well, as it overlapped the first image
      // instead we concatenate the image to a string var, looping and depending on how many correct
      // answers we have. Then instead of using append() we do html() which changes the html.
      var donut_html = "";
      for (var i =0; i< Model.rightAnswers; i++) {
        donut_html += Model.donut_gif;
      };
      $('.popup-correct p').html(donut_html);
    },
    clearRadioBox: function() {
      $('.q').attr('checked', null);
    }
  };

  var Model = {
    rightAnswers: 0,
    currentQuestion: 0,
    gameWon: false,
    donut_gif: '<div class="donut"><img src="./images/donut-simpson.gif" alt="donut" style="width:120px;height:200px;"></img></div>',
    flanders_pissed: '<div class="flanders"><img src="./images/Nedpissed.gif" alt="flanders pissed" ></img>',
    correct_html: '<div class="popup" data-popup="popup-1"><div class="popup-correct"><h2>Good job, that is correct!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    wrong_html: '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Sorry that is incorrect!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    warning_html: '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Please click on one of the choices!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    winner_html: '<div class="popup" data-popup="popup-1"><div class="popup-winner"><h2>Congrats you won!!!</h2><p><a id="closer" data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    loser_html: '<div class="popup" data-popup="popup-1"><div class="popup-loser"><h2>Sorry you lost.</h2><p><a id="closer" data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    prompt_html: '<div class="popup" data-popup="popup-1"><div class="popup-prompt"><h2>play again?</h2><p><a type="button" class="btn btn-lrg btn-warning">OK</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>'
  };

  // business logic
  var Quiz = {
    askQuestion: function() {
      // SETS question TO CURRENT QUESTION IN THE ARRAY OBJECT
      this.question = questionArray[Model.currentQuestion];

      // SETS THE MAIN QUESTION of current object from array
      $('#questions').text(this.question.q);

      // Loops through all span.answer elements and using each iterates through to set the answer choices of current object from the array
      var question = this.question;
      $('span.answer').each(function(index) {
        $(this).text(question.choices[index]);
      });

      // INCREMENTS to make sure we get to the next object in the array
      Model.currentQuestion++;
    },
    getResults: function(e) {
      // GIVES NUMBER RESULT OF RADIO BOX CHECKED (0 INDEXED)
      var result = parseInt($("input[type='radio']:checked").val(),10);

      View.clearRadioBox();

      // if you want you can put this main game logic in a funtion and call it here.
      if (result === this.question.ans) {
        // var html = "";
        // var music = "";
        $('.new').html(Model.correct_html);
        View.showModal();
        Model.rightAnswers++
        View.appendDonut();
        Quiz.playMusic('woohoo');
        Quiz.checkForWin();
      } else if (isNaN(result)) {
        $('.new').html(Model.warning_html);
        View.showModal();
        Quiz.playMusic('flanders');
        $('.popup h2').append(Model.flanders_pissed);
      } else if (result != this.question.ans) {
        $('.new').html(Model.wrong_html);
        View.showModal();
        Quiz.playMusic('doh');
        Quiz.checkForWin();
      };


       // else if ((Model.currentQuestion >= 5) && (Model.rightAnswers < 5)) {
       //   Quiz.lostGame();
       // };

      // Final logic for win or lose, you can also create a function for this.
      // if ((Model.currentQuestion === 6) && (Model.rightAnswers < 5)) {
      //   Quiz.lostGame();
        // return statement? to break?  we dont need to ask any more questions here.\

      // if (Model.gameWon != true ) {
      //     Quiz.askQuestion();
      // };
      // this.gameWon == true ? this.startGame() : this.askQuestion();
      // if (Model.rightAnswers === 5) {
      //   $('.new').html(Model.winner_html);
      //   View.showModal();
      //   View.appendDonut();
      //   Quiz.playMusic('rich');
      //   Model.gameWon = true;
      //   Quiz.startGame();
      //   }

      },
      checkForWin: function () {
        if (( Model.currentQuestion >= 5) && (Model.rightAnswers === 5)) {
         Quiz.wonGame();
       } else if (( Model.currentQuestion >= 5) && (Model.rightAnswers < 5)) {
         Quiz.lostGame();
       } else {
        Quiz.askQuestion();
       };
      },
      wonGame: function () {
        $('.new').html(Model.winner_html);
        View.showModal();
        View.appendDonut();
        Quiz.playMusic('rich');
        Model.gameWon = true;
        Quiz.startGame();
      },
    lostGame: function () {
      $('.new').html(Model.loser_html);
      View.showModal();
      Quiz.playMusic('meltdown');
      Quiz.startGame();
    },
    startGame: function () {
      Model.rightAnswers = 0;
      Model.currentQuestion = 0;
      Model.gameWon = false;
      Quiz.askQuestion();
    },
    playMusic: function(id) {
      $('#'+id)[0].volume = 0.5;
      $('#'+id)[0].load();
      $('#'+id)[0].play();
    }
  }

  // SHOW FIRST QUESTION AND ANSWERS
    Quiz.askQuestion();  // initialize the view and controller
    View.attachClickHandler();

});

