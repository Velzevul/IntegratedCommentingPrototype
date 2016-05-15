(function(window) {
  'use strict';

  var app = angular.module('answers', ['logger']);

  app.controller('answersController', function(LoggerService, $scope, $window, $interval) {
    var questions = [],
        activeQuestionIndex = 0;

    $interval(function() {
      $scope.stage = LoggerService.getStage() || 'selecting';
    }, 100);

    $scope.$watch('stage', function(value) {
      switch (value) {
        case 'selecting':
          $scope.question = null;
          activeQuestionIndex = 0;
          return;
        case 'reading':
          questions = setQuestions(LoggerService.getData().content);
          return;
        case 'answering':
          $scope.form = cleanForm();
          $scope.question = nextQuestion();
          return;
        default:
          return;
      }
    });

    function cleanForm() {
      return {
        answer: null,
        error: null
      };
    }
    
    function nextQuestion() {
      if (activeQuestionIndex < questions.length) {
        return questions[activeQuestionIndex++];
      } else {
        return null;
      }
    }

    function setQuestions(content) {
      switch (content) {
        case 'eggplant':
          return [
            "Which language or dialect calls eggplant 'aubergine'?"
          ];
        case 'chimney':
          return [
            "What was the name of Jack's employer?"
          ];
        case 'fritware':
          return [
            "Which country first started manufacturing frit?"
          ];
        case 'life':
          return [
            "In which educational institutions mentioned in the article researchers did NOT did work with earthworms?", // University College London, University of Michigan
            "In which organism scientists found genes that prolong life?" , // Crow
            "Which sentence (copy and paste) has received the most comments from the students and instructor?"
          ];
        case 'light':
          return [
            "Which people mentioned in the article are NOT related to an observatory?", // Jim Singleton, Brian Greer (out of 3)
            "Which state has been most pro-active in following the pollution bill?", // Texas
            "Which sentence (copy and paste) has received the most comments from the students and instructor?"
          ];
        case 'amateurs':
          return [
            "Which scientists mentioned in the article are NOT related to Ornithology?", // Dr Fienberg, Adrian Hunt
            "Which planet was discovered by amateurs?", // Uranus
            "Which sentence (copy and paste) has received the most comments from the students and instructor?"
          ];
        default:
          return [];
      }
    }

    $scope.setStage = function(stage) {
      LoggerService.log('start ' + stage  + ' stage');
      LoggerService.setStage(stage);
    };
    
    $scope.submitAnswer = function() {
      if (!$scope.form.answer) {
        $scope.form.error = 'Cannot submit blank answer';
        return;
      }
      
      LoggerService.log('answered question ' + activeQuestionIndex + ': ' + $scope.form.answer);
      
      $scope.question = nextQuestion();
      $scope.form = cleanForm();
    };

    $scope.resetError = function(question) {
      $scope.form.error = null;
    }
  });

  window.answers = app;
})(window);
