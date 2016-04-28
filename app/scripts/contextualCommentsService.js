angular.module('comments')
  .factory('ContextualCommentsService', function($timeout, $q, $http, SelectionService, UserService, rootPrefix) {
    'use strict';

    var mock = [],
      contentMock = {},
      clutterMock = {},
      idIndexMap = {},
      nextId = 120,
      statsCache = {
        commentsCount: 4/*,
        repliesCount: 3,
        totalUnseenCount: 4*/
      },
      user = UserService.getCurrent(),
      promise;

    updateIdIndexMap();

    promise = $q.all([
      $http.get(rootPrefix + '/data/comments-1.json'),//Amateurs
      $http.get(rootPrefix + '/data/comments-2.json'),//light
      $http.get(rootPrefix + '/data/comments-3.json'),//life
      $http.get(rootPrefix + '/data/comments-1-clutter.json'),
      $http.get(rootPrefix + '/data/comments-2-clutter.json'),
      $http.get(rootPrefix + '/data/comments-3-clutter.json'),
      $http.get(rootPrefix + '/data/comments-chimney.json'),
      $http.get(rootPrefix + '/data/comments-fritware.json'),
      $http.get(rootPrefix + '/data/comments-eggplant.json')
    ])
      .then(function(response) {
        contentMock['amateurs'] = response[0].data;
        contentMock['light'] = response[1].data;
        contentMock['life'] = response[2].data;
        
        clutterMock['amateurs'] = response[3].data;
        clutterMock['light'] = response[4].data;
        clutterMock['life'] = response[5].data;

        contentMock['chimney'] = response[6].data;
        contentMock['fritware'] = response[7].data;
        contentMock['eggplant'] = response[8].data;
      });

    function getById(id) {
      //if(idIndexMap.)
      return mock[idIndexMap[id]];
    }

    function updateIdIndexMap() {
      var map = {};

      angular.forEach(mock, function(comment, index) {
        map[comment.id] = index;
      });

      idIndexMap = map;
    }

    function updateStatsCache(){
      var comments = mock.length;

      for( var i = 0; i < mock.length; i++ ){
        comments = comments + mock[i].replies.length;
      }

      statsCache.commentsCount = comments;
    }

    function deactivateAll() {
      angular.forEach(mock, function(comment, index) {
        comment.isSelected = false;
      });
    }

    function getCommentIndex(comment) {
      var notes = $('[comment-anchor]');

      for (var i = 0; i<notes.length; i++) {
        if (parseInt(notes[i].id) == comment.id) {
          return i;
        }
      }
    }

    function profInvolvement(id){
      return getById(id).hasInstructor == true;
    }

    function recalculateProfInvolvement(comment) {
      var hasInstructor = comment.author.isInstructor;

      angular.forEach(comment.replies, function(reply, index) {
        hasInstructor = hasInstructor || reply.author.isInstructor;
      });

      comment.hasInstructor = hasInstructor;
    }

    return {
      loaded: promise,
      stats: function() {
        return statsCache;
      },
      markAsSeen: function(comment, parent) {
        comment.seen = true;

        if (parent) {
          parent.unseenRepliesCount -= 1;
        }

        statsCache.totalUnseenCount -= 1;
      },
      getAll: function() {
        return mock;
      },
      getOne: function(id) {
        return getById(id);
      },
      create: function(text, replyRequested, parentId) {
        var parent = getById(parentId),
            comment = {
              id: nextId,
              text: text,
              author: {
                name: user.name,
                isInstructor: user.role == 'prof'
              },
              postedOn: '2014-03-27T04:01:16',
              seen: true
            },
            self = this;

        if (parent) {
          parent.replies.push(comment);
          if (user.role == 'prof') {
            parent.replyRequested = false;
          } else {
            parent.replyRequested = replyRequested;
          }

          recalculateProfInvolvement(parent);
          statsCache.repliesCount += 1;
        } else {
          comment.color = user.commentingColor;
          comment.replies = [];
          comment.unseenRepliesCount = 0;
          comment.hasInstructor = user.role == 'prof';

          SelectionService.insertRealNote(comment)

          mock.splice(getCommentIndex(comment), 0, comment);

          updateIdIndexMap();
          statsCache.commentsCount += 1;

          $timeout(function() {
            comment.isSelected = true;
            self.reposition();
          });
        }

        nextId += 1;
      },
      reposition: function() {
        // console.log('reposition');
        var spacing = 24,
            anchors = $('[comment-active]'),
            threads = $('.thread-contextual'),
            anchor,
            ids = [],
            previousComment,
            previousCommentElement,
            secondPreviousComment,
            secondPreviousCommentElement,
            newPosition;

        //sets correct anchors to search through
        if(anchors.length){
          for( var i = 0 ; i < anchors.length ; i++ ){
            ids.push(getById(anchors[i].id));
          }
        }

        if (threads.length) {
          angular.forEach(ids, function(comment, index) {
            anchor = anchors[index];

            if (index > 0) {
              previousComment = ids[index - 1];
              previousCommentElement = $('.thread-contextual')[index - 1];

              if (previousComment.isSelected && index > 1) {
                secondPreviousComment = ids[index - 2];
                secondPreviousCommentElement = $('.thread-contextual')[index - 2];

                if (secondPreviousComment.position + secondPreviousCommentElement.offsetHeight > previousComment.position + previousCommentElement.offsetHeight) {
                  previousComment = secondPreviousComment;
                  previousCommentElement = secondPreviousCommentElement;

                }
              }
            }
            if (!comment.isSelected &&
                previousComment &&
                previousCommentElement !== undefined &&
                previousComment.position + previousCommentElement.offsetHeight > anchor.offsetTop) {
              newPosition = previousComment.position + previousCommentElement.offsetHeight + spacing;
            } else {
              newPosition = anchor.offsetTop;
            }
            comment.position = newPosition ;
          });
        }
      },
      deactivateAll: function() {
        var self = this;

        deactivateAll();

        $timeout(function() {
          self.reposition();
        });
      },
      activate: function(id) {
        var self = this,
            anchor = document.getElementById(id);

        deactivateAll();
        getById(id).isSelected = true;

        $timeout(function() {
          self.reposition();

          if ($(document).scrollTop() > anchor.offsetTop - 48) {
            $('body').animate({'scrollTop': anchor.offsetTop - 100});
          }
        });
      },
      delete: function(comment, parent) {
        var context;

        if (parent) {
          context = parent.replies;
        } else {
          context = mock;
          SelectionService.removeNote(comment.id);
        }

        for (var i = 0; i < context.length; i++) {
          if (context[i].id == comment.id) {
            if (parent) {
              // timeout is required so that the "click" event
              // is processed before the comment is deleted
              $timeout(function() {
                context.splice(i, 1);
              });
            } else {
              context.splice(i, 1);
            }

            break;
          }
        }

        if (parent) {
          $timeout(function() {
            recalculateProfInvolvement(parent);
          });
        }

        updateIdIndexMap();
      },
      profInvolvement: function(id){
        return profInvolvement(id);
      },
      printMock: function(){
        console.log(JSON.stringify(mock))
      },
      setMock: function(content, clutter){
        var mockMap = contentMock;

        if (clutter === 'on') {
          mockMap = clutterMock;
        }

        mock = mockMap[content];

        updateStatsCache();
        updateIdIndexMap();
      }
    }
  });
