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

      // console.log(this);
      // console.log(question);
      console.log(result + ' is the value of the result');
      // if (result == $(obj)) {
      //   console.log('win');
      // }
      this.askQuestion();
    }
  }

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
  $(function() {
    // OPEN---- modal
    $('[data-popup-open]').on('click', function(e) {
      var targeted_popup_class = $(this).attr('data-popup-open');
      $('[data-popup="' + targeted_popup_class + '"]').fadeIn(1000);

      e.preventDefault();
    });

    // CLOSE---- modal
    $('[data-popup-close]').on('click', function(e) {
      var targeted_popup_class = $(this).attr('data-popup-close');
      $('[data-popup="' + targeted_popup_class + '"]').fadeOut(1000);

      e.preventDefault();
    });
  });
});

