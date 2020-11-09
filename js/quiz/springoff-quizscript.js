var Quiz = function(){
    var self = this;
    this.init = function(){
        self._bindEvents();
    }

    this._pickAnswer = function($answer, $answers){
        $answers.find('.quiz-answer').removeClass('active');
        $answer.addClass('active');
    }
    this._calcResult = function(){
        var positionToIndex = {'pr': 0, 'media': 1, 'web': 2, 'membership': 3, 'intersocietal': 4, 'mentorship': 5, 'emoutreach': 6, 'hsep': 7, 'swe++': 8, 'miniu': 9, 'ohp': 10, 'sae': 11, 'career': 12, 'startup': 13, 'senior': 14, 'advocacy': 15, 'eandi': 16, 'transfer': 17, 'alum': 18};

        var indexToPosition = {0: 'Public Relations', 1: 'Social Media Chair', 2: 'Webmaster', 3: 'Membership Director', 4: 'Intersocietal Chair', 5: 'Mentorship Program Student Liaison', 6: 'Elementary & Middle School Outreach', 7: 'High School Engineering Program', 8: 'SWE++', 9: 'Mini University', 10: 'Overnight Host Program', 11: 'Shadow an Engineer', 12: 'Career Options in Engineering', 13: 'Startup Spring', 14: 'Senior Advisor', 15: 'Advocacy Chair', 16: 'Equity and Inclusion Director', 17: 'Transfer Student Outreach', 18: 'Society and Alumni Relations'};
        var positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        $('ul[data-quiz-question]').each(function(i){
            var $this = $(this), chosenAnswer = $this.find('.quiz-answer.active').data('quiz-answer');
            var answerSplit = chosenAnswer.split(' ');
            for (i = 0; i < answerSplit.length; i++) {
                positions[positionToIndex[answerSplit[i]]]++;
            }
            console.log(positions);
        });

        var maxVal = Math.max.apply(Math, positions);
        var indexMax = [];
        for (i = 0; i < positions.length; i++) {
            if (positions[i] == maxVal) {
                indexMax.push(i);
            }
        }

        var positionIndex = indexMax[Math.floor(Math.random() * indexMax.length)]
        return indexToPosition[positionIndex];
    }

    this._isComplete = function(){
        var answersComplete = 0;
        $('ul[data-quiz-question]').each(function(){
            if ( $(this).find('.quiz-answer.active').length ) {
                answersComplete++;
            }
        });

        if ( answersComplete >= 10 ) {
            return true;
        } else {
            return false;
        }
    }

    this._showResult = function(result){
        $('.quiz-result').addClass('addBG').html('<span class="result-text">You are <span class="purple">' + result + '</span>!</span><br>Check Out the <a href="https://tinyurl.com/officerdescsp21" target="_">officer descriptions</a> to learn more about this role!');
    }

    this._bindEvents = function(){
        $('.quiz-answer').on('click', function(){
            var $this = $(this),
                $answers = $this.closest('ul[data-quiz-question]');
            self._pickAnswer($this, $answers);

            if ( self._isComplete() ) {
                $('html, body').animate({
                    scrollTop: $('.quiz-result').offset().top
                });

                self._showResult( self._calcResult() );
                $('.quiz-answer').off('click');

            }
        });
    }
}

var quiz = new Quiz();
quiz.init();
