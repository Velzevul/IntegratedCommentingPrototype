angular.module('comments')
  .factory('ContextualCommentsService', function($timeout, SelectionService) {
    'use strict';

    var mock = [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ab dolore, delectus exercitationem quia cumque distinctio ipsum reprehenderit harum quisquam suscipit iste recusandae enim, quod, saepe earum tenetur voluptatibus. Iure?',
          authorName: 'Volo Dziu',
          postedOn: '12-12-2014',
          color: 'pink',
          seen: true,
          unseenRepliesCount: 2,
          replies: [
            {
              id: 2,
              text: 'Necessitatibus illo ad veritatis commodi maiores et adipisci repellat officia suscipit quaerat minus minima placeat veniam expedita quasi, vel nemo distinctio provident.',
              authorName: 'Andrea Bunt',
              postedOn: '13-12-2014',
              seen: false
            },
            {
              id: 3,
              text: 'Iure natus fugiat impedit pariatur est dolore delectus illo voluptates. Deleniti laborum obcaecati cum, sed! Nisi cum, deserunt eos aspernatur? Quos, facilis.',
              authorName: 'Rose Kocher',
              postedOn: '13-12-2014',
              seen: false
            }
          ]
        },
        {
          id: 7,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas iure ullam minus optio sint tenetur, facere mollitia commodi accusamus doloribus!',
          authorName: 'Md Adnan Alam Khan',
          postedOn: '14-12-2014',
          color: 'teal',
          seen: true,
          isSelected: false,
          unseenRepliesCount: 0,
          replies: []
        },
        {
          id: 4,
          text: 'Quae omnis iste reiciendis eaque culpa excepturi officia obcaecati consequatur eum quasi vitae, suscipit nam sapiente similique voluptatum at maxime provident. Doloremque non voluptatibus, nam dolore atque ea aliquid beatae consequatur? Molestiae.',
          authorName: 'Brian Yeo',
          postedOn: '12-12-2014',
          color: 'purple',
          seen: true,
          isSelected: false,
          unseenRepliesCount: 0,
          replies: []
        },
        {
          id: 5,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio beatae accusantium, quasi vel eveniet earum et, rem placeat mollitia! Debitis doloribus similique obcaecati, nulla vitae beatae illo qui. Maxime, quia?',
          authorName: 'Volodymyr Dziubak',
          postedOn: '18-12-2014',
          color: 'yellow',
          seen: false,
          isSelected: false,
          unseenRepliesCount: 1,
          replies: [
            {
              id: 6,
              text: 'Harum fuga beatae optio alias modi, nobis veniam, assumenda saepe provident soluta eligendi. Suscipit obcaecati soluta earum optio minus et quisquam eligendi provident. Ut, asperiores? Vitae, dicta commodi dolorem quo esse nulla unde! Voluptas veritatis unde quae, a accusantium placeat optio quis, saepe laudantium qui consequatur expedita ducimus iste tenetur, quam sit soluta quidem eius. Nobis harum commodi porro explicabo saepe? Dignissimos eaque nostrum deleniti debitis facere delectus nemo sit laborum neque quasi, ipsam dolor ratione soluta rem exercitationem voluptates. In voluptatem saepe officiis consequatur eligendi ducimus, impedit similique maiores voluptate repellat?',
              authorName: 'Masayuki Nakane',
              postedOn: '18-12-2014',
              seen: false
            }
          ]
        }
      ],
      idIndexMap = {
        1: 0,
        7: 1,
        4: 2,
        5: 3
      },
      nextId = 8;

    function getRandomColor() {
      var colors = ['blue', 'green', 'yellow', 'orange', 'red', 'teal', 'purple', 'pink'],
          randomIndex = parseInt(Math.random() * 10) % colors.length;

      return colors[randomIndex]
    }

    function getById(id) {
      return mock[idIndexMap[id]];
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

    return {
      getAll: function() {
        return mock;
      },
      getOne: function(id) {
        return getById(id);
      },
      create: function(text, parentId) {
        var parent = getById(parentId),
            comment = {
              id: nextId,
              text: text,
              authorName: 'Volodymyr Dziubak',
              postedOn: '25-12-2014',
              seen: true
            },
            dummyText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia cupiditate, architecto voluptatem neque quo impedit possimus officia id maxime nesciunt qui sed voluptatibus soluta vero libero ex veritatis placeat molestias!',
            self = this;

        if (parent) {
          parent.replies.push(comment);
          parent.repliesCount += 1;
        } else {
          comment.color = getRandomColor();
          comment.unseenRepliesCount = 0;
          comment.replies = [];
          comment.text = dummyText;

          SelectionService.insertRealNote(comment)

          mock.splice(getCommentIndex(comment), 0, comment);

          updateIdIndexMap();

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
            anchors = $('[comment-anchor]'),
            threads = $('.comment-thread'),
            anchor,
            previousComment,
            previousCommentElement,
            secondPreviousComment,
            secondPreviousCommentElement,
            newPosition;

        if (threads.length) {
          angular.forEach(mock, function(comment, index) {
            anchor = anchors[index];

            if (index > 0) {
              previousComment = mock[index - 1];
              previousCommentElement = $('.comment-thread')[index - 1];

              if (previousComment.isSelected && index > 1) {
                secondPreviousComment = mock[index - 2];
                secondPreviousCommentElement = $('.comment-thread')[index - 2];

                if (secondPreviousComment.position + secondPreviousCommentElement.offsetHeight > previousComment.position + previousCommentElement.offsetHeight) {
                  previousComment = secondPreviousComment;
                  previousCommentElement = secondPreviousCommentElement;
                }
              }
            }

            if (!comment.isSelected &&
                previousComment &&
                previousComment.position + previousCommentElement.offsetHeight > anchor.offsetTop) {
              newPosition = previousComment.position + previousCommentElement.offsetHeight + spacing;
            } else {
              newPosition = anchor.offsetTop;
            }

            comment.position = newPosition;
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
        var self = this;

        deactivateAll();
        getById(id).isSelected = true;

        $timeout(function() {
          self.reposition();
        });
      }
    }
  });