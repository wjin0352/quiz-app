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
    donut_gif: '<div class="donut"><img src="./images/donut-simpson.gif" alt="donut" style="width:120px;height:200px;"></img></div>',
    flanders_pissed: '<div class="flanders"><img src="./images/Nedpissed.gif" alt="flanders pissed" ></img>',
    correct_html: '<div class="popup" data-popup="popup-1"><div class="popup-correct"><h2>Good job, that is correct!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    wrong_html: '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Sorry that is incorrect!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    warning_html: '<div class="popup" data-popup="popup-1"><div class="popup-incorrect"><h2>Please click on one of the choices!</h2><p><a data-popup-close="popup-1" href="#">Close</a></p><a class="popup-close" data-popup-close="popup-1" href="#">x</a></div></div>',
    askQuestion: function() {
      // SETS question TO CURRENT QUESTION IN THE ARRAY OBJECT
      this.question = questionArray[this.currentQuestion];

      // SETS THE MAIN QUESTION
      $('#questions').text(this.question.q);

      // SETS ANSWERS FOR THE QUESTION
      // for(var i=0; i<this.question.choices.length; i++) {
      //   console.log(this.question.choices[i]);

      // }
      var spanAns = $('span.answer');
      // console.log($('span.answer').text());

      $('body').each(function(index, value){
        // console.log(spanAns);
        // console.log($(this).text());

      });

      // console.log($('.answer').length);
      // $.each(spanAns, function(index, value) {
        // console.log(index +" " + value);
        // spanAns.text(this.question);
        // console.log(questionArray[index].choices[index]);

      // });

      $('#ans1').text(this.question.choices[0]);
      $('#ans2').text(this.question.choices[1]);
      $('#ans3').text(this.question.choices[2]);

      // INCREMENTS TO GET NEXT QUESTION IN THE ARRAY OBJECT
      this.currentQuestion++;
    },
    validateRadioButton: function() {
      //  valid = true;
      // var radio = $('form');
      //   if (!(radio[0].checked || radio[1].checked || radio[2].checked)) {
      //       valid = false;
      //   }
      // console.log(valid);
      //   return valid;
    },
    // CLICK EVENT FOR BUTTON
    clickButton: function() {
      $('.btn').on('click', function(){
        Quiz.getResults();
      });
    },
    getResults: function(e) {
      // GIVES NUMBER RESULT OF RADIO BOX CHECKED (0 INDEXED)
      var result = parseInt($("input[type='radio']:checked").val(),10);

      // if (!$("input[name='html_elements']:checked").val())
      // if(!document.getElementById('rdoPaid').checked
      // if (!$("input[type='radio']").checked) {
      //   this.playMusic('duffmanbad');
      //   console.log(result);
      //   alert('Please click on a choice.')
      // }
       if (result === this.question.ans) {
        $('.new').append(this.correct_html);
        this.showModal();
        this.appendDonut();
        this.playMusic('woohoo');
        $('#q').attr('checked', false);
        // this.validateRadioButton();
      } else if (isNaN(result)) {
        $('.new').append(this.warning_html);
        this.showModal();
        alert('wtf?'); // how come my alert dont work!
        console.log(result + " WTF is going on!");
        this.playMusic('flanders');
        $('.popup h2').append(this.flanders_pissed);
        $('#q').attr('checked', false);
        e.preventDefault();
      } else if (result != this.question.ans) {
        console.log(result + " wrong answer");
        $('.new').append(this.wrong_html);
        this.showModal();
        this.playMusic('doh');
        $('#q').attr('checked', false);
        // this.validateRadioButton();
        // console.log(result);
      }

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
      $('.popup-correct').append(this.donut_gif);
    },
    clearRadioBox: function() {
      $('#q').attr('checked', false);
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

