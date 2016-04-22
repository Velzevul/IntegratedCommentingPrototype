angular.module('comments')
  .factory('ContextualCommentsService', function($timeout, $q, $http, SelectionService, UserService, rootPrefix) {
    'use strict';

    var mock = [],
      trainingMock = [{"id":130,"text":"nissim urna, at fauc","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":148,"isSelected":false},{"id":121,"text":"ulum libero hendreri","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":253,"isSelected":false},{"id":120,"text":"ipiscing elit. Donec","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":358,"isSelected":false},{"id":128,"text":" interdum, efficitur","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":463,"isSelected":false},{"id":129,"text":"Nam in gravida erat,","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":568,"isSelected":false},{"id":124,"text":"a magna, a lobortis ","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":673,"isSelected":false,"highlightedAnchor":false,"isHighlighted":false},{"id":123,"text":"ssa accumsan efficit","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":778,"isSelected":false},{"id":126,"text":"ipiscing elit. Donec","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":883,"isSelected":false},{"id":127,"text":"tus volutpat ullamco","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":988,"isSelected":false},{"id":125,"text":"Lorem ip","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1093,"isSelected":false},{"id":122,"text":"Aenean nec dignissim","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1198,"isSelected":false},{"id":134,"text":"tor non, feugiat fri","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1303,"isSelected":false},{"id":136,"text":"lis tellus pulvinar.","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1408,"isSelected":false},{"id":131,"text":"ficitur enim vitae, ","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1513,"isSelected":false},{"id":135,"text":"on porttitor. Intege","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1618,"isSelected":false},{"id":132,"text":". Curabitur molestie","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1723,"isSelected":false},{"id":133,"text":" porttitor varius di","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1828,"isSelected":false},{"id":137,"text":" pulvinar. Nulla fac","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":1933,"isSelected":false},{"id":144,"text":"ulla facilisi. Curab","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2038,"isSelected":false},{"id":148,"text":"et massa accumsan ef","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2143,"isSelected":false},{"id":143,"text":"gna, a lobortis arcu","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2248,"isSelected":false},{"id":142,"text":"cibus dui. Proin por","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2353,"isSelected":false},{"id":141,"text":"nte. Etiam bibendum ","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2458,"isSelected":false},{"id":146,"text":"issim. Nam lacinia l","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2563,"isSelected":false},{"id":139,"text":"assa accumsan effici","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2668,"isSelected":false},{"id":145,"text":"consectetur adipisci","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2773,"isSelected":false},{"id":138,"text":"a purus. Integer sed","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2878,"isSelected":false},{"id":140,"text":"iam non porttitor. I","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":2983,"isSelected":false},{"id":147,"text":"is, bibendum et tort","author":{"name":"Volodymyr Dziubak","isInstructor":false},"postedOn":"2014-03-27T04:01:16","seen":true,"color":"teal","replies":[],"unseenRepliesCount":0,"hasInstructor":false,"position":3088,"isSelected":false}],
      idIndexMap = {},
      nextId = 120,
      statsCache = {
        commentsCount: 4/*,
        repliesCount: 3,
        totalUnseenCount: 4*/
      },
      user = UserService.getCurrent(),
      promise,
      mockData;

    updateIdIndexMap();

    promise = $q.all([
      $http.get(rootPrefix + '/data/comments-1.json'),//Amateurs
      $http.get(rootPrefix + '/data/comments-2.json'),//light
      $http.get(rootPrefix + '/data/comments-3.json'),//life
      $http.get(rootPrefix + '/data/comments-1-clutter.json'),
      $http.get(rootPrefix + '/data/comments-2-clutter.json'),
      $http.get(rootPrefix + '/data/comments-3-clutter.json')
    ])
      .then(function(response) {
        mockData = response;
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
        var startIndex = clutter === 'on' ? 3 : 0;

        if (content === 'training') {
          mock = trainingMock;
        } else if (content === 'amateurs') {
          mock = mockData[startIndex + 0].data;
        } else if (content === 'light') {
          mock = mockData[startIndex + 1].data;
        } else if (content === 'life') {
          mock = mockData[startIndex + 2].data;
        }

        updateStatsCache();
        updateIdIndexMap();
      }
    }
  });
