(function(window) {
  'use strict';

  var app = angular.module('answers', ['logger']);

  app.controller('answersController', function(LoggerService, $scope, $interval) {
    console.log('controller here!');

    var questions = [];

    $scope.experimentPaused = false;

    $interval(function() {
      $scope.experimentOn = localStorage.getItem('IntegratedCommentingStudy-started');
      $scope.content = LoggerService.getData().content;
    }, 100);

    $scope.$watchGroup(['content', 'experimentOn'], function(values) {
      $scope.activeQuestionIndex = 0;

      if (values[0] === 'eggplant') {
        questions = [
          "From the comments, which language or dialect calls eggplant 'aubergine'?"
        ];
      } else if (values[0] === 'chimney') {
        questions = [
          "What was the name of Jack's employer?"
        ];
      } else if (values[0] === 'fritware') {
        questions = [
          "Which country first started manufacturing frit?"
        ];
      } else if (values[0] === 'life') {
        questions = [
          "List names of all Universities mentioned in the article" ,
          "From the comments, copy and paste a name of the organism that has genes similar to an earth worm" ,
          "Copy and paste a sentence that was commented the most in the document"
        ];
      } else if (values[0] === 'amateurs') {
        questions = [
          "List names of all science experts mentioned in the article",
          "From the comments, copy and paste a name of the name of a planet discovered by amateurs",
          "Copy and paste a sentence that was commented the most in the document"
        ];
      } else if (values[0] === 'light') {
        questions = [
          "List all the people mentioned in the article",
          "From the comments, copy and paste a name of the state that has been the most proactive in following state bills",
          "Copy and paste a sentence that was commented the most in the document"
        ];
      } else {
        console.error('wrong document type!');
      }


      getNextQuestion();
    });

    var getNextQuestion = function() {
      if ($scope.activeQuestionIndex < questions.length) {
        $scope.question = questions[$scope.activeQuestionIndex];
        $scope.activeQuestionIndex += 1;
      } else {
        $scope.question = null;
      }

      $scope.form = {
        answer: null,
        error: null
      };
    };

    $scope.submitAnswer = function() {
      if ($scope.form.answer) {
        LoggerService.log('answered question: ' + $scope.activeQuestionIndex + ': ' + $scope.form.answer);
        getNextQuestion();
      } else {
        $scope.form.error = 'Cannot submit blank answer';
      }
    };

    $scope.resetError = function(question) {
      $scope.form.error = null;
    }
  });

  window.answers = app;
})(window);
