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

  var Quiz = {
    rightAnswers: 0,
    currentQuestion: 0,
    gameWon: false,
    donut_gif: '<div class="donut"><img src="./images/donut-simpson.gif" alt="donut" style="width:120px;height:200px;"></img></div>',
    flanders_pissed: '<div class="flanders"><img src="./images/Nedpissed.gif" alt="flanders pissed" ></img>',
    correct_html: '<div class="popup" data-popup="popup-1"><div class="popup-correct"><h2>Good job, that is correct!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    wrong_html: '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Sorry that is incorrect!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    warning_html: '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Please click on one of the choices!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    winner_html: '<div class="popup" data-popup="popup-1"><div class="popup-winner"><h2>Congrats you won!!!</h2><p><a id="closer" data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    prompt_html: '<div class="popup" data-popup="popup-1"><div class="popup-prompt"><h2>play again?</h2><p><a type="button" class="btn btn-lrg btn-warning">OK</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    askQuestion: function() {
      // $('#q').attr('checked', false);
      // SETS question TO CURRENT QUESTION IN THE ARRAY OBJECT
      this.question = questionArray[this.currentQuestion];
      // console.log(this.question);

      // SETS THE MAIN QUESTION of current object from array
      $('#questions').text(this.question.q);

      // Loops through all span.answer elements and using each iterates through to set the answer choices of current object from the array
      var question = this.question;
      $('span.answer').each(function(index) {
        $(this).text(question.choices[index]);
      });

      // INCREMENTS to make sure we get to the next object in the array
      this.currentQuestion++;
    },
    // CLICK EVENT FOR SUBMIT BUTTON
    clickButton: function() {
      $('.btn').on('click', function(e){
        Quiz.getResults();
        e.preventDefault();
      });
    },
    // setTimeout: function () {

    // },
    getResults: function(e) {
      // GIVES NUMBER RESULT OF RADIO BOX CHECKED (0 INDEXED)
      var result = parseInt($("input[type='radio']:checked").val(),10);

      this.clearRadioBox();

      if (this.rightAnswers === 1) {
        $('.new').append(this.winner_html);
        this.showModal();
        this.appendDonut();
        this.playMusic('rich');
        this.gameWon = true;
      } else if (result === this.question.ans) {
        $('.new').append(this.correct_html);
        this.showModal();
        this.rightAnswers++
        this.appendDonut();
        this.playMusic('woohoo');
      } else if (isNaN(result)) {
        $('.new').append(this.warning_html);
        this.showModal();
        this.playMusic('flanders');
        $('.popup h2').append(this.flanders_pissed);
        e.preventDefault();
      } else if (result != this.question.ans) {
        $('.new').append(this.wrong_html);
        this.showModal();
        this.playMusic('doh');
      };

      // asks the next question
      console.log(this.rightAnswers);
      console.log(this.currentQuestion);
      this.gameWon == true ? this.startGame() : this.askQuestion();
    },
    // promptUser: function () {
    //   $('.new').append(this.prompt_html);
    //   this.showModal().delay(3000);
    //   $('.btn-warning').on('click', function(e) {
    //     this.startGame();
    //     e.preventDefault();
    //   });
    // },
    startGame: function () {
      this.rightAnswers = 0;
      this.currentQuestion = 0;
      this.gameWon = false;
      this.askQuestion();
    },
    showModal: function() {
      $(".popup").fadeIn(1000);
      this.attachHideModal();
    },
    attachHideModal: function() {
      $('[data-popup-close]').on('click', function(e) {
        $(".popup").fadeOut(1000);
        e.preventDefault();
      });
    },
    appendDonut: function() {
      // Appending the image didnt work well, as it overlapped the first image
      // instead we concatenate the image to a string var, looping and depending on how many correct
      // answers we have. Then instead of using append() we do html() which changes the html.
      var donut_html = "";
      for (var i =0; i< this.rightAnswers; i++) {
        donut_html += this.donut_gif;
      };

      $('.popup-correct p').html(donut_html);
    },
    clearRadioBox: function() {
      $('.q').attr('checked', null);
    },
    playMusic: function(id) {
    $('#'+id)[0].volume = 0.5;
    $('#'+id)[0].load();
    $('#'+id)[0].play();
    }
  }

  // SHOW FIRST QUESTION AND ANSWERS

    Quiz.askQuestion();

    Quiz.clickButton();

});

