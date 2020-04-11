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
        var positionToIndex = {'pr': 0, 'historian': 1, 'web': 2, 'membership': 3, 'intersocietal': 4, 'mentorship': 5, 'swenext': 6, 'emoutreach': 7, 'hsep': 8, 'swe++': 9, 'miniu': 10, 'engday': 11, 'sae': 12, 'ewi': 13, 'pdm': 14, 'senior': 15, 'advocacy': 16, 'eandi': 17, 'transfer': 18, 'alum': 19, 'teamtech': 20, 'president': 21, 'internal': 22, 'corporate': 23, 'outreach': 24, 'treasurer': 25, 'secretary': 26};

        var indexToPosition = {0: 'Public Relations', 1: 'Historian', 2: 'Webmaster', 3: 'Membership Director', 4: 'Intersocietal Chair', 5: 'Mentorship Chair', 6: 'SWENext', 7: 'Elementary & Middle School Outreach', 8: 'High School Engineering Program', 9: 'SWE++', 10: 'Mini University', 11: 'Engineering Day', 12: 'Shadow an Engineer', 13: 'Evening with Industry', 14: 'Professional Development Month', 15: 'Senior Advisor', 16: 'Advocacy Director', 17: 'Equity and Inclusion Director', 18: 'Transfer Student Outreach', 19: 'Society and Alumni Relations', 20: 'Team Tech Lead', 21: 'President', 22: 'Vice President of Internal Relations', 23: 'Vice President of Corporate Relations', 24: 'Vice President of Outreach', 25: 'Treasurer', 26: 'Secretary'};

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
        $('.quiz-result').addClass('addBG').html('<span class="result-text">You are <span class="purple">' + result + '</span>!</span><br>Check Out the <a href="https://docs.google.com/document/d/1yGCa8K-L5a9NBfCqY85kQpu6KNJb8aIhJHOPuz2BjyY/edit" target="_">officer descriptions</a> to learn more about this role!');
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
