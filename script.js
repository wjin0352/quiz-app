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
    introScreen: function() {
      // SETS question TO CURRENT QUESTION IN THE ARRAY OBJECT
      question = questionArray[0];

      // SETS THE MAIN QUESTION
      $('#questions').text(question.q);

      // SETS ANSWERS FOR THE QUESTION
      $('#ans1').text(question.choices[0]);
      $('#ans2').text(question.choices[1]);
      $('#ans3').text(question.choices[2]);
    },
    askQuestion: function() {
      // SETS question TO CURRENT QUESTION IN THE ARRAY OBJECT
      question = questionArray[this.currentQuestion];

      // SETS THE MAIN QUESTION
      $('#questions').text(question.q);

      // SETS ANSWERS FOR THE QUESTION
      $('#ans1').text(question.choices[0]);
      $('#ans2').text(question.choices[1]);
      $('#ans3').text(question.choices[2]);

      // INCREMENTS TO GET NEXT QUESTION IN THE ARRAY OBJECT
      this.currentQuestion++;
    },
    getResults: function() {
      // console.log(this.currentQuestion);
      // GIVES NUMBER RESULT OF RADIO BOX CHECKED (0 INDEXED)
      var result = $("input[type='radio']:checked").val();

      // console.log(result + ' is the value of the result');
      if (result == question.ans) {
        console.log(question.choices[result] + ' is a right answer!');
        // this.showModalCorrect();
        $('.new').append(correct_html);
        // console.log(correct_html);
        this.showModalCorrect();
      } else {
        console.log(question.choices[result] + ' is a wrong answer!');
        $('.new').append(wrong_html);
        this.showModalIncorrect();
      };

      this.askQuestion();
    },
    showModalCorrect: function() {
      $(".popup").fadeIn(1000);
      this.hideModal();
    },
    showModalIncorrect: function() {
      $(".popup").fadeIn(1000);
      this.hideModal();
    },
    hideModal: function() {
      $('[data-popup-close]').on('click', function(e) {
        $(".popup").fadeOut(1000);
        e.preventDefault();
      })

    }
  }

  correct_html = '<div class="popup" data-popup="popup-1"><div class="popup-correct"><h2>Good job, that is correct!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>'

  wrong_html = '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Sorry that is incorrect!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>'
  // right answer modal
    // right-modal =
  // wrong answer modal

  // SHOW FIRST QUESTION AND ANSWERS
    Quiz.introScreen();

  // CLICK EVENT FOR BUTTON
    $('.btn').on('click', function() {
      Quiz.getResults();
      // or should i do this?
      /*  $('form').on('click','.btn', function() {
        Quiz.getResults();
      });  */
    });



// ----------------------------------------------
  /* modal feature */
  // $(function() {
  //   // OPEN---- modal
  //   $('[data-popup-open]').on('click', function(e) {
  //     var targeted_popup_class = $(this).attr('data-popup-open');
  //     $('[data-popup="' + targeted_popup_class + '"]').fadeIn(1000);

  //     e.preventDefault();
  //   });

  //   // CLOSE---- modal
    $('[data-popup-close]').on('click', function(e) {

      $('.popup').fadeOut(1000);

      e.preventDefault();
    });
  // });
});

