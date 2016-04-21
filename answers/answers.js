(function(window) {
  'use strict';

  var app = angular.module('answers', ['logger']);

  app.controller('answersController', function(LoggerService, $scope, $q) {
    console.log('controller here!');

    var content = LoggerService.get('content');

    if (content === 'life') {
      $scope.questions = [
        { text: "Copy and paste names of all the animals that have been tested on in the article" },
        { text: "Copy and paste names of 4 organisms that have the genes linked to increasing age" },
        { text: "Copy and paste concept or definition that the students in your class discuss the most" }
      ];
    } else if (content === 'amateurs') {
      $scope.questions = [
        { text: "Copy and paste names of all the science experts that has been mentioned in the article" },
        { text: "Copy and paste names of 3 advantages or discoveries made by amateurs" },
        { text: "Copy and paste concept or definition that the students in your class discuss the most" }
      ];
    } else if (content === 'light') {
      $scope.questions = [
        { text: "Copy and paste names of all the negative effects light pollution can cause" },
        { text: "Copy and paste names of 4 things people are doing to cut down on light pollution." },
        { text: "Copy and paste concept or definition that the students in your class discuss the most" }
      ];
    } else {
      console.error('wrong document type!');
    }

    $scope.submit = function(question, index) {
      if (!question.answer) {
        question.error = 'Cannot submit blank answer';
      } else {
        LoggerService.log('answered question: ' + index + ': ' + question.answer);
        question.submitted = true;
      }
    };

    $scope.resetError = function(question) {
      question.error = null;
    }
  });

  window.answers = app;
})(window);
