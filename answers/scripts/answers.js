(function(window) {
  'use strict';

  var app = angular.module('answers', ['logger']);

  app.controller('answersController', function(LoggerService, $scope, $interval) {
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
          "Which language or dialect calls eggplant 'aubergine'?"
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
          "In which educational institutions mentioned in the article researchers did NOT did work with earthworms?", // University College London, University of Michigan
          "In which organism scientists found genes that prolong life?" , // earthworm
          "Which sentence (copy and paste) has received the most comments from the students and instructor?"
        ];
      } else if (values[0] === 'amateurs') {
        questions = [
          "Which scientists mentioned in the article are NOT related to Ornithology?", // Dr Fienberg, Adrian Hunt
          "Which planet was discovered by amateurs?", // Uranus
          "Which sentence (copy and paste) has received the most comments from the students and instructor?"
        ];
      } else if (values[0] === 'light') {
        questions = [
          "Which people mentioned in the article are NOT related to an observatory?", // Jim Singleton, Brian Greer (out of 3)
          "Which state has been most pro-active in following the pollution bill?", // Texas
          "Which sentence (copy and paste) has received the most comments from the students and instructor?"
        ];
      } else {
        // console.error('wrong document type!');
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
