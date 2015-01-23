angular.module('comments')
  .factory('GeneralCommentsService', function() {
    'use strict';

    var mock = [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ab dolore, delectus exercitationem quia cumque distinctio ipsum reprehenderit harum quisquam suscipit iste recusandae enim, quod, saepe earum tenetur voluptatibus. Iure?',
          authorName: 'Volo Dziu',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 1,
          seen: true,
          replies: [
            {
              id: 2,
              text: 'Necessitatibus illo ad veritatis commodi maiores et adipisci repellat officia suscipit quaerat minus minima placeat veniam expedita quasi, vel nemo distinctio provident.',
              authorName: 'Andrea Bunt',
              postedOn: '2014-03-27T04:01:16',
              seen: true
            },
            {
              id: 3,
              text: 'Iure natus fugiat impedit pariatur est dolore delectus illo voluptates. Deleniti laborum obcaecati cum, sed! Nisi cum, deserunt eos aspernatur? Quos, facilis.',
              authorName: 'Rose Kocher',
              postedOn: '2014-03-27T04:01:16',
              seen: false
            }
          ]
        },
        {
          id: 7,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas iure ullam minus optio sint tenetur, facere mollitia commodi accusamus doloribus!',
          authorName: 'Md Adnan Alam Khan',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 0,
          seen: true,
          replies: []
        },
        {
          id: 4,
          text: 'Quae omnis iste reiciendis eaque culpa excepturi officia obcaecati consequatur eum quasi vitae, suscipit nam sapiente similique voluptatum at maxime provident. Doloremque non voluptatibus, nam dolore atque ea aliquid beatae consequatur? Molestiae.',
          authorName: 'Brian Yeo',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 0,
          seen: false,
          replies: []
        },
        {
          id: 5,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio beatae accusantium, quasi vel eveniet earum et, rem placeat mollitia! Debitis doloribus similique obcaecati, nulla vitae beatae illo qui. Maxime, quia?',
          authorName: 'Volodymyr Dziubak',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 1,
          seen: false,
          replies: [
            {
              id: 6,
              text: 'Harum fuga beatae optio alias modi, nobis veniam, assumenda saepe provident soluta eligendi. Suscipit obcaecati soluta earum optio minus et quisquam eligendi provident. Ut, asperiores? Vitae, dicta commodi dolorem quo esse nulla unde! Voluptas veritatis unde quae, a accusantium placeat optio quis, saepe laudantium qui consequatur expedita ducimus iste tenetur, quam sit soluta quidem eius. Nobis harum commodi porro explicabo saepe? Dignissimos eaque nostrum deleniti debitis facere delectus nemo sit laborum neque quasi, ipsam dolor ratione soluta rem exercitationem voluptates. In voluptatem saepe officiis consequatur eligendi ducimus, impedit similique maiores voluptate repellat?',
              authorName: 'Masayuki Nakane',
              postedOn: '2014-03-27T04:01:16',
              seen: false
            }
          ]
        },
        {
          id: 9,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ab dolore, delectus exercitationem quia cumque distinctio ipsum reprehenderit harum quisquam suscipit iste recusandae enim, quod, saepe earum tenetur voluptatibus. Iure?',
          authorName: 'Volo Dziu',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 0,
          seen: true,
          replies: [
            {
              id: 10,
              text: 'Necessitatibus illo ad veritatis commodi maiores et adipisci repellat officia suscipit quaerat minus minima placeat veniam expedita quasi, vel nemo distinctio provident.',
              authorName: 'Andrea Bunt',
              postedOn: '2014-03-27T04:01:16',
              seen: true
            },
            {
              id: 11,
              text: 'Iure natus fugiat impedit pariatur est dolore delectus illo voluptates. Deleniti laborum obcaecati cum, sed! Nisi cum, deserunt eos aspernatur? Quos, facilis.',
              authorName: 'Rose Kocher',
              postedOn: '2014-03-27T04:01:16',
              seen: true
            }
          ]
        },
        {
          id: 12,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas iure ullam minus optio sint tenetur, facere mollitia commodi accusamus doloribus!',
          authorName: 'Md Adnan Alam Khan',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 0,
          seen: true,
          replies: []
        },
        {
          id: 13,
          text: 'Quae omnis iste reiciendis eaque culpa excepturi officia obcaecati consequatur eum quasi vitae, suscipit nam sapiente similique voluptatum at maxime provident. Doloremque non voluptatibus, nam dolore atque ea aliquid beatae consequatur? Molestiae.',
          authorName: 'Brian Yeo',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 0,
          seen: true,
          replies: []
        },
        {
          id: 14,
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio beatae accusantium, quasi vel eveniet earum et, rem placeat mollitia! Debitis doloribus similique obcaecati, nulla vitae beatae illo qui. Maxime, quia?',
          authorName: 'Volodymyr Dziubak',
          postedOn: '2014-03-27T04:01:16',
          unseenRepliesCount: 0,
          seen: true,
          replies: [
            {
              id: 15,
              text: 'Harum fuga beatae optio alias modi, nobis veniam, assumenda saepe provident soluta eligendi. Suscipit obcaecati soluta earum optio minus et quisquam eligendi provident. Ut, asperiores? Vitae, dicta commodi dolorem quo esse nulla unde! Voluptas veritatis unde quae, a accusantium placeat optio quis, saepe laudantium qui consequatur expedita ducimus iste tenetur, quam sit soluta quidem eius. Nobis harum commodi porro explicabo saepe? Dignissimos eaque nostrum deleniti debitis facere delectus nemo sit laborum neque quasi, ipsam dolor ratione soluta rem exercitationem voluptates. In voluptatem saepe officiis consequatur eligendi ducimus, impedit similique maiores voluptate repellat?',
              authorName: 'Masayuki Nakane',
              postedOn: '2014-03-27T04:01:16',
              seen: true
            }
          ]
        }
      ],
      idIndexMap = {},
      nextId = 16,
      statsCache = {
        commentsCount: 8,
        repliesCount: 6,
        totalUnseenCount: 4
      };

    updateIdIndexMap();

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
      create: function(text, parentId) {
        var parent = getById(parentId),
            comment = {
              id: nextId,
              text: text,
              authorName: 'Volod Dziu',
              postedOn: '2014-03-27T04:01:16',
              seen: true
            };

        if (parent) {
          parent.replies.push(comment);
          statsCache.repliesCount += 1;
        } else {
          comment.replies = [];
          comment.unseenCount = 0;
          mock.splice(0,0,comment);

          statsCache.commentsCount += 1;

          updateIdIndexMap();
        }

        nextId += 1;
      }
    };
  });