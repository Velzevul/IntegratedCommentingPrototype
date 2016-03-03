angular.module('comments')
  .factory('ContextualCommentsService', function($timeout, SelectionService, UserService) {
    'use strict';

    var mock = [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ab dolore, delectus exercitationem quia cumque distinctio ipsum reprehenderit harum quisquam suscipit iste recusandae enim, quod, saepe earum tenetur voluptatibus. Iure?',
          author: {
            name: 'Volo Dziu',
            isInstructor: false
          },
          replyRequested: true,
          hasInstructor: true,
          postedOn: '2014-05-31T11:18:12',
          color: 'red',
          unseenRepliesCount: 1,
          score: 6,
          seen: true,
          replies: [
            {
              id: 2,
              text: 'Necessitatibus illo ad veritatis commodi maiores et adipisci repellat officia suscipit quaerat minus minima placeat veniam expedita quasi, vel nemo distinctio provident.',
              author: {
                name: 'Andrea Bunt',
                isInstructor: true
              },
              postedOn: '2014-03-27T04:01:16',
              seen: true
            },
            {
              id: 3,
              text: 'Iure natus fugiat impedit pariatur est dolore delectus illo voluptates. Deleniti laborum obcaecati cum, sed! Nisi cum, deserunt eos aspernatur? Quos, facilis.',
              author: {
                name: 'Rose Kocher',
                isInstructor: false
              },
              postedOn: '2014-03-27T04:01:16',
              seen: false
            }
          ]
        },
        {
          id: 7,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas iure ullam minus optio sint tenetur, facere mollitia commodi accusamus doloribus!',
          author: {
            name: 'Md Adnan Alam Khan',
            isInstructor: false
          },
          replyRequested: false,
          score: 3,
          hasInstructor: false,
          postedOn: '2014-03-27T04:01:16',
          color: 'red',
          unseenRepliesCount: 0,
          seen: false,
          replies: []
        },
        {
          id: 4,
          text: 'Quae omnis iste reiciendis eaque culpa excepturi officia obcaecati consequatur eum quasi vitae, suscipit nam sapiente similique voluptatum at maxime provident. Doloremque non voluptatibus, nam dolore atque ea aliquid beatae consequatur? Molestiae.',
          author: {
            name: 'Andrea Bunt',
            isInstructor: true
          },
          replyRequested: false,
          hasInstructor: true,
          score: 5,
          postedOn: '2014-03-27T04:01:16',
          color: 'red',
          unseenRepliesCount: 0,
          seen: true,
          replies: []
        },
        {
          id: 5,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio beatae accusantium, quasi vel eveniet earum et, rem placeat mollitia! Debitis doloribus similique obcaecati, nulla vitae beatae illo qui. Maxime, quia?',
          author: {
            name: 'Volodymyr Dziubak',
            isInstructor: false
          },
          replyRequested: false,
          hasInstructor: true,
          postedOn: '2014-03-27T04:01:16',
          color: 'red',
          score: 8,
          unseenRepliesCount: 1,
          seen: false,
          replies: [
            {
              id: 6,
              text: 'Harum fuga beatae optio alias modi, nobis veniam, assumenda saepe provident soluta eligendi. Suscipit obcaecati soluta earum optio minus et quisquam eligendi provident. Ut, asperiores? Vitae, dicta commodi dolorem quo esse nulla unde! Voluptas veritatis unde quae, a accusantium placeat optio quis, saepe laudantium qui consequatur expedita ducimus iste tenetur, quam sit soluta quidem eius. Nobis harum commodi porro explicabo saepe? Dignissimos eaque nostrum deleniti debitis facere delectus nemo sit laborum neque quasi, ipsam dolor ratione soluta rem exercitationem voluptates. In voluptatem saepe officiis consequatur eligendi ducimus, impedit similique maiores voluptate repellat?',
              author: {
                name: 'Masayuki Nakane',
                isInstructor: false
              },
              postedOn: '2014-03-27T04:01:16',
              seen: false
            }
          ]
        }
      ],
      idIndexMap = {},
      nextId = 8,
      statsCache = {
        commentsCount: 4,
        repliesCount: 3,
        totalUnseenCount: 4
      },
      user = UserService.getCurrent();

    updateIdIndexMap();

    function getById(id) {
      return mock[idIndexMap[id]];
    }

    function profInvolvement(id){
      return getById(id).hasInstructor == true;
    }

    function updateIdIndexMap() {
      var map = {};

      angular.forEach(mock, function(comment, index) {
        map[comment.id] = index;
      });

      idIndexMap = map;
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

    function recalculateProfInvolvement(comment) {
      var hasInstructor = comment.author.isInstructor;

      angular.forEach(comment.replies, function(reply, index) {
        hasInstructor = hasInstructor || reply.author.isInstructor;
      });

      comment.hasInstructor = hasInstructor;
    }

    return {
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
      profInvolvement: function(id){
        return profInvolvement(id);
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
              seen: true,
              score: 5
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
          comment.score = Math.floor( ( Math.random() *  7 ) + 1 ) ;
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
        
        if(anchors.length){
          for( var i = 0 ; i < anchors.length ; i++ ){
            ids.push(getById(anchors[i].id));
          }
        }

        if (threads.length) {
          //index == coment id
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
      }
    }
  });
