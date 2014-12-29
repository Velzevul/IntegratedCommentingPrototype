angular.module('comments')
  .factory('SelectionService', function() {
    'use strict';

    var range;

    function makeTempNote() {
      return '<note-temp>' + range.originalText + '</note-temp>';
    }

    function makeRealNote(comment) {
      var randId = parseInt(Math.random() * 100000);

      return '<note-' + randId + ' id="' + comment.id + '" comment-anchor class="document__anchor document__anchor--' + comment.color + '">' + range.originalText + '</note-' + randId + '>';
    }

    return {
      clearSelection: function() {
        var newFragment;

        if (range) {
          range.deleteContents();
          newFragment = range.createContextualFragment(range.originalText);
          range.insertNode(newFragment);
        }

        range = null;
      },
      storeSelection: function() {
        var newFragment;

        if (window.getSelection().type == 'Range') {
          range = window.getSelection().getRangeAt(0);
          range.originalText = range.toString();
          range.deleteContents();
          newFragment = range.createContextualFragment(makeTempNote());
          range.insertNode(newFragment);
        }
      },
      hasSelection: function() {
        return range ? true : false;
      },
      insertRealNote: function(comment) {
        var newFragment;

        range.deleteContents();
        newFragment = range.createContextualFragment(makeRealNote(comment));
        range.insertNode(newFragment);

        range = null;
      }
    };
  });