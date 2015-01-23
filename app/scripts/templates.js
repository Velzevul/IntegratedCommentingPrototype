angular.module('app-templates', ['templates/commentTabs.html', 'templates/contextualComment.html', 'templates/contextualReplyFormDummy.html', 'templates/generalComment.html', 'templates/generalCommentForm.html', 'templates/generalReplyFormDummy.html', 'templates/statusbarContextual.html', 'templates/statusbarDefault.html', 'templates/statusbarGeneral.html']);

angular.module("templates/commentTabs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/commentTabs.html",
    "<div class=\"comment-tabs\" fix-width>\n" +
    "  <div class=\"grid grid--narrow\">\n" +
    "    <div class=\"grid__item one-half\">\n" +
    "      <button class=\"ct-item\"\n" +
    "              ng-class=\"{'ct-item--active': activeTab == 'contextual'}\"\n" +
    "              ng-click=\"activeTab = 'contextual'\">\n" +
    "        Contextual <span class=\"ct-item__counter\" ng-show=\"contextualStats.totalUnseenCount\">{{contextualStats.totalUnseenCount}}</span>\n" +
    "      </button>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-half\">\n" +
    "      <button class=\"ct-item\"\n" +
    "              ng-class=\"{'ct-item--active': activeTab == 'general'}\"\n" +
    "              ng-click=\"activeTab = 'general'\">\n" +
    "        General <span class=\"ct-item__counter\" ng-show=\"generalStats.totalUnseenCount\">{{generalStats.totalUnseenCount}}</span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/contextualComment.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/contextualComment.html",
    "<article  class=\"thread-contextual\"\n" +
    "          ng-class=\"{'thread-contextual--selected': comment.isSelected,\n" +
    "                     'thread-contextual--highlighted': comment.isHighlighted,\n" +
    "                     'thread-contextual--multiple': comment.replies.length > 0 && !comment.isSelected}\"\n" +
    "          ng-click=\"selectComment()\">\n" +
    "  <div class=\"tc-unseen\" ng-show=\"!comment.isSelected && (!comment.seen || comment.unseenRepliesCount > 0)\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\" ng-show=\"!comment.seen\">\n" +
    "        <div class=\"tc-unseen__item\">\n" +
    "          unseen comment\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\" ng-show=\"comment.seen && comment.unseenRepliesCount > 0\">\n" +
    "        <div class=\"tc-unseen__item\">\n" +
    "          {{comment.unseenRepliesCount}} unseen <ng-pluralize count=\"comment.unseenRepliesCount\" when=\"{'1': 'reply', other: 'replies'}\"></ng-pluralize>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section  class=\"tc-comment\"\n" +
    "            ng-hide=\"comment.isSelected\">\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"l-split\">\n" +
    "        <div class=\"l-split__right\">\n" +
    "          <div class=\"tc-comment__updated-at\">{{comment.postedOn | date:'short'}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-split__left\">\n" +
    "          <div class=\"tc-comment__author\">{{comment.authorName}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"tc-comment__text\">{{comment.text | words:10}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-split\">\n" +
    "      <div class=\"l-split__right\" ng-show=\"comment.unseenCount > 0\">\n" +
    "        <div class=\"label\" ng-show=\"comment.unseenCount\">{{comment.unseenCount}} unseen</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-split__right\" ng-show=\"comment.unseenCount == 0\">\n" +
    "        {{comment.replies.length}} replies\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-split__left\">\n" +
    "        <span class=\"link link--success\" ng-if=\"comment.replies.length > 0\">see replies</span>\n" +
    "        <span class=\"link link--success\" ng-if=\"comment.replies.length == 0\">see full comment</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "\n" +
    "  <div ng-show=\"comment.isSelected\">\n" +
    "    <section  class=\"tc-comment\"\n" +
    "              ng-class=\"{'tc-comment--unseen': !comment.seen}\"\n" +
    "              ng-mouseover=\"markSeen(comment)\">\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "          <div class=\"l-split__right\">\n" +
    "            <div class=\"tc-comment__updated-at\">{{comment.postedOn | date:'short'}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-split__left\">\n" +
    "            <div class=\"tc-comment__author\">{{comment.authorName}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"tc-comment__text\" ng-show=\"comment.isSelected\">{{comment.text}}</div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section  class=\"tc-comment tc-comment--reply\"\n" +
    "              ng-class=\"{'tc-comment--unseen': !reply.seen}\"\n" +
    "              ng-repeat=\"reply in comment.replies\"\n" +
    "              ng-mouseover=\"markSeen(reply, comment)\">\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "          <div class=\"l-split__right\">\n" +
    "            <div class=\"tc-comment__updated-at\">{{reply.postedOn | date:'short'}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-split__left\">\n" +
    "            <div class=\"tc-comment__author\">{{reply.authorName}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"tc-comment__text\">{{reply.text}}</div>\n" +
    "    </section>\n" +
    "\n" +
    "    <contextual-reply-form-dummy parent-thread-id=\"comment.id\"></contextual-reply-form-dummy>\n" +
    "  </div>\n" +
    "</article>");
}]);

angular.module("templates/contextualReplyFormDummy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/contextualReplyFormDummy.html",
    "<div class=\"tc-comment tc-comment--reply\">\n" +
    "  <form ng-submit=\"postComment()\">\n" +
    "    <div ng-class=\"{'l-block-small': active}\">\n" +
    "      <textarea placeholder=\"Reply to the comment\" ng-focus=\"activate()\" ng-model=\"commentText\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-split\" ng-show=\"active\">\n" +
    "      <div class=\"l-split__right\">\n" +
    "        <button class=\"button\">Post</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-split__left\">\n" +
    "        <button class=\"button\" type=\"button\" ng-click=\"deactivate()\">Cancel</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>");
}]);

angular.module("templates/generalComment.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/generalComment.html",
    "<article  class=\"thread-general\"\n" +
    "                ng-class=\"{'thread-general--multiple': comment.replies.length > 0 && !comment.isExpanded,\n" +
    "                           'thread-general--expanded': comment.isExpanded}\">\n" +
    "        <section class=\"tg-comment\" ng-hide=\"comment.isExpanded\">\n" +
    "          <div class=\"l-block-x-small\">\n" +
    "            <div class=\"l-split\">\n" +
    "              <div class=\"l-split__right\">\n" +
    "                <div class=\"tg-comment__updated-at\">{{comment.postedOn}}</div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-split__left\">\n" +
    "                <div class=\"tg-comment__author\">{{comment.authorName}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-block-small\">\n" +
    "            <div class=\"tg-comment__text\">{{comment.text | words: 10}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "              <div ng-show=\"comment.unseenCount > 0\">\n" +
    "                <div class=\"label\">{{comment.unseenCount}} unseen</div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div ng-show=\"comment.unseenCount == 0\">\n" +
    "                {{comment.replies.length}} replies\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "              <button class=\"link link--success\" ng-click=\"comment.isExpanded = true\" ng-show=\"comment.replies.length > 0\">see full discussion</button>\n" +
    "              <button class=\"link link--success\" ng-click=\"comment.isExpanded = true\" ng-show=\"comment.replies.length == 0\">see full comment</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </section>\n" +
    "\n" +
    "        <div ng-show=\"comment.isExpanded\">\n" +
    "          <section  class=\"tg-comment\"\n" +
    "                    ng-class=\"{'tg-comment--unseen': !comment.seen}\"\n" +
    "                    ng-mouseover=\"markSeen(comment)\">\n" +
    "            <div class=\"l-block-x-small\">\n" +
    "              <div class=\"l-split\">\n" +
    "                <div class=\"l-split__right\">\n" +
    "                  <div class=\"tg-comment__updated-at\">{{comment.postedOn}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-split__left\">\n" +
    "                  <div class=\"tg-comment__author\">{{comment.authorName}}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "              <div class=\"tg-comment__text\">{{comment.text}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split\">\n" +
    "              <div class=\"l-split__right\">\n" +
    "                {{comment.replies.length}} replies\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-split__left\">\n" +
    "                <button class=\"link link--success\" ng-click=\"comment.isExpanded = false\">collapse discussion</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </section>\n" +
    "\n" +
    "          <section  class=\"tg-comment tg-comment--reply\"\n" +
    "                    ng-class=\"{'tg-comment--unseen': !reply.seen}\"\n" +
    "                    ng-repeat=\"reply in comment.replies\"\n" +
    "                    ng-mouseover=\"markSeen(reply, comment)\">\n" +
    "            <div class=\"l-block-x-small\">\n" +
    "              <div class=\"l-split\">\n" +
    "                <div class=\"l-split__right\">\n" +
    "                  <div class=\"tg-comment__updated-at\">{{reply.postedOn}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-split__left\">\n" +
    "                  <div class=\"tg-comment__author\">Reply by {{reply.authorName}}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"tg-comment__text\">{{reply.text}}</div>\n" +
    "          </section>\n" +
    "\n" +
    "          <div class=\"tg-comment tg-comment--reply\">\n" +
    "            <general-reply-form-dummy parent-thread-id=\"comment.id\"></general-reply-form-dummy>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </article>");
}]);

angular.module("templates/generalCommentForm.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/generalCommentForm.html",
    "<form ng-submit=\"postComment()\">\n" +
    "  <div class=\"l-block-small\">\n" +
    "    <textarea placeholder=\"Write new comment\" ng-model=\"commentText\"></textarea>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-split\">\n" +
    "    <div class=\"l-split__right\">\n" +
    "      <button class=\"button\">Post</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-split__left\">\n" +
    "      <button class=\"button\" ng-click=\"cancelComment()\">Cancel</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("templates/generalReplyFormDummy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/generalReplyFormDummy.html",
    "<form ng-submit=\"postComment()\">\n" +
    "  <div class=\"l-block-small\">\n" +
    "    <textarea placeholder=\"Reply to this comment\" ng-focus=\"activate()\" ng-model=\"commentText\"></textarea>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-split\" ng-show=\"active\">\n" +
    "    <div class=\"l-split__right\">\n" +
    "      <button class=\"button\">Post</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-split__left\">\n" +
    "      <button class=\"button\" ng-click=\"deactivate()\">Cancel</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("templates/statusbarContextual.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/statusbarContextual.html",
    "<div class=\"l-split\">\n" +
    "  <div class=\"l-split__right\">\n" +
    "    <div class=\"l-list-inline\" ng-hide=\"selectingContext\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"link-inv link--success\" ng-click=\"addContextualComment()\">add contextual comment</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"link-inv link--danger\" ng-click=\"activeTab = false\">hide comments</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-list-inline\" ng-show=\"selectingContext\">\n" +
    "      <div class=\"l-list-inline__item\">Select the text which you want to comment on</div>\n" +
    "      <div class=\"l-list-inline__item\"><button class=\"link link--danger\" ng-click=\"cancelContextualComment()\">cancel</button></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-split__left\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <div class=\"document-toolbar__title\">Contextual comments:</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        {{contextualStats.commentsCount}} comments, {{contextualStats.repliesCount}} replies\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/statusbarDefault.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/statusbarDefault.html",
    "<div class=\"l-split\">\n" +
    "  <div class=\"l-split__right\">\n" +
    "    <button class=\"link-inv link--success\" ng-click=\"activeTab = 'contextual'\">show comments</button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-split__left\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <div class=\"document-toolbar__title\">Comments:</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        {{contextualStats.threadsCount + generalStats.threadsCount}} threads, {{contextualStats.commentsCount + generalStats.commentsCount}} comments\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/statusbarGeneral.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/statusbarGeneral.html",
    "<div class=\"l-split\">\n" +
    "  <div class=\"l-split__right\">\n" +
    "    <div class=\"l-list-inline\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"link-inv link--success\" ng-click=\"showGeneralCommentForm()\">add general comment</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"link-inv link--danger\" ng-click=\"activeTab = false\">hide comments</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-split__left\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <div class=\"document-toolbar__title\">General comments:</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        {{generalStats.threadsCount}} comments, {{generalStats.commentsCount}} replies\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
