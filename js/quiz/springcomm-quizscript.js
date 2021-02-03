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
        //FIXME
        var positionToIndex = {'social': 0, 'ohp': 1, 'mentor': 2, 'advocacy': 3,
            'eandi': 4, 'transfer': 5, 'pr': 6, 'next': 7, 'science': 8, 
            'hsep': 9, 'swe++': 10, 'miniu': 11, 'sae': 12, 'career': 13,
            'startup': 14};
        //FIXME
        var indexToPosition = {0: 'Social Committee', 1: 'Overnight Host Program',
        2: 'Mentorship', 3: 'Advocacy', 4: 'Equity & Inclusion', 5: 'Transfer Outreach',
        6: 'Public Relations', 7: 'SWENext', 8: 'SWE Science (Elementary and Middle School Outreach)',
        9: 'High School Engineering Program (HSEP)', 10: 'SWE++', 11: 'Mini University', 
        12: 'Shadow an Engineer', 13: 'Career Options in Engineering', 14: 'Startup Spring'};

        var positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
        $('.quiz-result').addClass('addBG').html(
            //FIXME LINK
            '<span class="result-text">You are <span class="purple">' + result + '</span>!</span><br>Check out the <a href="http://tinyurl.com/swesp21committees" target="_">officer descriptions</a> to learn more about this role!');
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
