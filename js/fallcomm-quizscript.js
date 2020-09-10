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
        var positionToIndex = {'social': 0, 'mentor': 1, 'advocacy': 2, 
        'eandi': 3, 'transfer': 4, 'pr': 5, 'web': 6, 'next': 7, 'swe++': 8,
        'science': 9, 'hsep': 10, 'miniu': 11, 'tutoring': 12, 'sae': 13,
        'pdm': 14, 'alum': 15, 'tech': 16};

        var indexToPosition = {0: 'Social Committee', 1: 'Mentorship Apprentice',
        2: 'Advocacy', 3: 'Equity and Inclusion', 4: 'Transfer Outreach',
        5: 'Public Relations', 6: 'Web', 7: 'SWENext', 8: 'SWE++',
        9: 'SWE Science', 10: 'High School Engineering Program (HSEP)', 
        11: 'Mini University', 12: 'Tutoring Program Coordinators', 
        13: 'Shadow an Engineer', 14: 'Professional Development Month',
        15: 'Society and Alumni Apprentice', 16: 'Team Tech'};

        var positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
        $('.quiz-result').addClass('addBG').html('<span class="result-text">You are <span class="purple">' + result + '</span>!</span><br>Check out <a href="https://docs.google.com/document/d/1FsTUxRtMSPylVBTQ2TafZmuJsaWWP9uO3HFf5YnyM3A/edit#heading=h.86pobrekl5ga" target="_">committee descriptions</a> to learn more about this role!');
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
