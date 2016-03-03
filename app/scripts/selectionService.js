angular.module('comments')
  .factory('SelectionService', function() {
    'use strict';

    var range;

    function makeRealNote(comment) {
      var randId = parseInt(Math.random() * 100000),
          el = document.createElement('note-' +  randId);

      el.id = comment.id;
      el.setAttribute('comment-anchor', '');
      el.setAttribute('class', 'document__anchor document__anchor--' + comment.color)

      return  el;
    }

    function setRange(range){
      this.range = range;
    }

    return {
      clearSelection: function() {
        var newFragment;

        if (range) {
          newFragment = range.createContextualFragment(range.toString());
          range.deleteContents();
          range.insertNode(newFragment);
        }

        range = null;
      },
      storeSelection: function() {
        var noteElement = document.createElement('note-temp'),
            selection = window.getSelection();

        if (window.getSelection().type == 'Range') {
          range = selection.getRangeAt(0);
          //allows you to select previous comments
          noteElement.appendChild(range.extractContents()); 
          range.insertNode(noteElement);
          //range.surroundContents(noteElement);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      },initialRange: function(passedRange){
        var noteElement = document.createElement('note-temp'),
        selection = window.getSelection();

        //console.log(selection.type)
        range = passedRange;
        noteElement.appendChild(range.extractContents());
        //console.log(range.extractContents())
        range.insertNode(noteElement);
        selection.removeAllRanges();
        selection.addRange(range);
      },
      hasSelection: function() {
        return range ? true : false;
      },
      setRangeInitial: function(rangeToSet, comment){
        range = rangeToSet;
        range.surroundContents( makeRealNote(comment) );

        range = null;
      },
      insertRealNote: function(comment) {
        var newFragment;

        if (range) {
          newFragment = range.createContextualFragment(range.toString());

          range.deleteContents();
          range.insertNode(newFragment);
          range.surroundContents( makeRealNote(comment) );

          range = null;
        }
      },
      removeNote: function(id) {
        var note = document.getElementById(id),
            noteRange = new Range(),
            newFragment;

        noteRange.selectNode(note);
        noteRange.deleteContents();
        newFragment = noteRange.createContextualFragment(note.innerHTML);
        noteRange.insertNode(newFragment);
      }
    };
  });
