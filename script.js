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
    correct_html: '<div class="popup" data-popup="popup-1"><div class="popup-correct"><h2>Good job, that is correct!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    wrong_html: '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Sorry that is incorrect!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    askQuestion: function() {
      // SETS question TO CURRENT QUESTION IN THE ARRAY OBJECT
      this.question = questionArray[this.currentQuestion];

      // SETS THE MAIN QUESTION
      $('#questions').text(this.question.q);

      // SETS ANSWERS FOR THE QUESTION
      for(var i=0; i<this.question.choices.length; i++) {
        console.log(this.question.choices[i]);

      }

      $('#ans1').text(this.question.choices[0]);
      $('#ans2').text(this.question.choices[1]);
      $('#ans3').text(this.question.choices[2]);

      // INCREMENTS TO GET NEXT QUESTION IN THE ARRAY OBJECT
      this.currentQuestion++;
    },
    getResults: function() {
      // GIVES NUMBER RESULT OF RADIO BOX CHECKED (0 INDEXED)
      var result = +$("input[type='radio']:checked").val();

      if (result == this.question.ans) {
        $('.new').append(this.correct_html);
        this.showModal();
      } else {
        $('.new').append(this.wrong_html);
        this.showModal();
      };

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
    }
  }

  // SHOW FIRST QUESTION AND ANSWERS

    Quiz.askQuestion();

  // CLICK EVENT FOR BUTTON
    $('.btn').on('click', function() {
      Quiz.getResults();
    });
});

