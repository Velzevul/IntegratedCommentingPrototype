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
          "Copy and paste names of all the animals that have been tested on in the article" ,
          "Copy and paste names of 4 organisms that have the genes linked to increasing age" ,
          "Copy and paste concept or definition that the students in your class discuss the most"
        ];
      } else if (values[0] === 'amateurs') {
        questions = [
          "Copy and paste names of all the science experts that has been mentioned in the article",
          "Copy and paste names of 3 advantages or discoveries made by amateurs",
          "Copy and paste concept or definition that the students in your class discuss the most"
        ];
      } else if (values[0] === 'light') {
        questions = [
          "Copy and paste names of all the negative effects light pollution can cause",
          "Copy and paste names of 4 things people are doing to cut down on light pollution.",
          "Copy and paste concept or definition that the students in your class discuss the most"
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
