(function(window) {
  'use strict';

  var app = angular.module('answers', ['logger']);

  app.controller('answersController', function(LoggerService, $scope, $q) {
    console.log('controller here!');

    $scope.questions = [
      {
        text: "a",
        submitted: false,
        answer: 'a',
        error: null
      },
      {
        text: "b",
        submitted: false,
        answer: 'b',
        error: null
      },
      {
        text: "c",
        submitted: false,
        answer: 'c',
        error: null
      }];

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
