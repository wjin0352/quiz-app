$(document).ready(function() {
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

  var Quiz = {
    rightAnswers: 0,
    currentQuestion: 0,
    askQuestion: function(){
      var answerIndex = 0;
      // question is the hash object inside the array
      var question = questionArray[this.currentQuestion];

      // sets the question to question.q from our array hash
      $('#questions').text(question.q);

      // answerTitle is the text in the span.answer tag
      var answerTitle = $('span.answer').text();

      // console.log(this.currentQuestion);
      // this sets each span with the answers text
      // answerIndex = this.currentQuestion % question.choices.length;
      // console.log(answerIndex);

      $('#ans1').text(question.choices[0]);
      $('#ans2').text(question.choices[1]);
      $('#ans3').text(question.choices[2]);

      this.currentQuestion++;

      this.getResults(question);
    },
    getResults: function(obj) {
      var result = $("input[type='radio']:checked").val();
      // console.log(result);
      // console.log(obj.q);
      // if result == $()
    }
  }

  var game = Object.create(Quiz);


  game.askQuestion();

  $('.btn').on('click', function() {
    game.askQuestion();
    // console.log(game);
    game.getResults(game.question);
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

