angular.module('app-templates', ['templates/commentBody.html', 'templates/commentTabs.html', 'templates/contextualComment.html', 'templates/contextualCommentForm.html', 'templates/contextualReplyForm.html', 'templates/generalComment.html', 'templates/generalCommentForm.html', 'templates/generalReplyFormDummy.html', 'templates/statusbarContextual.html', 'templates/statusbarDefault.html', 'templates/statusbarGeneral.html']);

angular.module("templates/commentBody.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/commentBody.html",
    "<div class=\"comment-body\">\n" +
    "  <div ng-hide=\"editMode\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "      <div class=\"comment-body__text\">{{comment.text | words: truncated && 10 || comment.text.length}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"comment-body__controls\">\n" +
    "      <div class=\"l-list-inline l-list-inline--small\" ng-show=\"postedByCurrentUser && !truncated\">\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <button class=\"link\" ng-click=\"enterEditMode()\">edit comment</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <button class=\"link link--danger\" ng-click=\"deleteComment()\">delete</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <form ng-show=\"editMode\" ng-submit=\"updateComment()\">\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <textarea msd-elastic=\"\\n\" ng-model=\"tempText\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"button\">Save</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"button\" type=\"button\" ng-click=\"leaveEditMode()\">Cancel</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>");
}]);

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
    "            ng-class=\"{'tc-comment--unseen': comment.isSelected && !comment.seen}\"\n" +
    "            ng-mouseover=\"markSeen(comment)\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
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
    "    <div class=\"l-block-x-small\">\n" +
    "      <comment-body comment=\"comment\" truncated=\"!comment.isSelected\"></comment-body>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"tc-comment__controls\" ng-hide=\"comment.isSelected\">\n" +
    "      <span class=\"link\" ng-if=\"comment.replies.length > 0\">see {{comment.replies.length}} <ng-pluralize count=\"comment.replies.length\" when=\"{'1': 'reply', other: 'replies'}\"></ng-pluralize></span>\n" +
    "      <span class=\"link\" ng-if=\"comment.replies.length == 0\">see full comment</span>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "\n" +
    "  <div ng-show=\"comment.isSelected\">\n" +
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
    "      <comment-body comment=\"reply\" parent=\"comment\" truncated=\"false\"></comment-body>\n" +
    "    </section>\n" +
    "\n" +
    "    <contextual-reply-form parent-thread-id=\"comment.id\"></contextual-reply-form>\n" +
    "  </div>\n" +
    "</article>");
}]);

angular.module("templates/contextualCommentForm.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/contextualCommentForm.html",
    "<div  class=\"thread-contextual\"\n" +
    "      ng-class=\"{'thread-contextual--selected': comment.isSelected,\n" +
    "                 'thread-contextual--highlighted': comment.isHighlighted}\"\n" +
    "      ng-click=\"selectComment()\">\n" +
    "  <section  class=\"tc-comment\"\n" +
    "            ng-class=\"{'tc-comment--unseen': comment.isSelected && !comment.seen}\"\n" +
    "            ng-mouseover=\"markSeen(comment)\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "      <div class=\"tc-comment__author\">{{comment.authorName}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <form ng-submit=\"saveComment()\">\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <textarea placeholder=\"Type your comment here\" msd-elastic=\"\\n\" ng-model=\"tempText\"></textarea>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline l-list-inline--small\">\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <button class=\"button\">Save</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <button class=\"button\" type=\"button\" ng-click=\"deleteComment()\">Cancel</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </section>\n" +
    "</div>");
}]);

angular.module("templates/contextualReplyForm.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/contextualReplyForm.html",
    "<div class=\"tc-comment tc-comment--reply\">\n" +
    "  <form ng-submit=\"postComment()\">\n" +
    "    <div ng-class=\"{'l-block-small': active}\">\n" +
    "      <textarea msd-elastic=\"\\n\" placeholder=\"Reply to the comment\" ng-focus=\"activate()\" ng-model=\"commentText\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-list-inline l-list-inline--small\" ng-show=\"active\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"button\">Post</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"button\" type=\"button\" ng-click=\"deactivate()\">Cancel</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>");
}]);

angular.module("templates/generalComment.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/generalComment.html",
    "<article  class=\"thread-general\"\n" +
    "          ng-class=\"{'thread-general--multiple': comment.replies.length > 0 && !comment.isExpanded,\n" +
    "                     'thread-general--expanded': comment.isExpanded}\">\n" +
    "  <div class=\"tg-unseen\" ng-show=\"!comment.isExpanded && (!comment.seen || comment.unseenRepliesCount > 0)\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\" ng-show=\"!comment.seen\">\n" +
    "        <div class=\"tg-unseen__item\">\n" +
    "          unseen comment\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\" ng-show=\"comment.seen && comment.unseenRepliesCount > 0\">\n" +
    "        <div class=\"tg-unseen__item\">\n" +
    "          {{comment.unseenRepliesCount}} unseen <ng-pluralize count=\"comment.unseenRepliesCount\" when=\"{'1': 'reply', other: 'replies'}\"></ng-pluralize>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <section class=\"tg-comment\" ng-hide=\"comment.isExpanded\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "      <div class=\"l-split\">\n" +
    "        <div class=\"l-split__right\">\n" +
    "          <div class=\"tg-comment__updated-at\">{{comment.postedOn | date:'short'}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-split__left\">\n" +
    "          <div class=\"tg-comment__author\">{{comment.authorName}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"tg-comment__text\">{{comment.text | words: 10}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <button class=\"link link--success\" ng-click=\"comment.isExpanded = true\" ng-show=\"comment.replies.length > 0\">see {{comment.replies.length}} <ng-pluralize count=\"comment.replies.length\" when=\"{'1': 'reply', other: 'replies'}\"></ng-pluralize></button>\n" +
    "    <button class=\"link link--success\" ng-click=\"comment.isExpanded = true\" ng-show=\"comment.replies.length == 0\">see full comment</button>\n" +
    "  </section>\n" +
    "\n" +
    "  <div ng-show=\"comment.isExpanded\">\n" +
    "    <section  class=\"tg-comment\"\n" +
    "              ng-class=\"{'tg-comment--unseen': !comment.seen}\"\n" +
    "              ng-mouseover=\"markSeen(comment)\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "          <div class=\"l-split__right\">\n" +
    "            <div class=\"tg-comment__updated-at\">{{comment.postedOn | date:'short'}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-split__left\">\n" +
    "            <div class=\"tg-comment__author\">{{comment.authorName}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <div class=\"tg-comment__text\">{{comment.text}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <button class=\"link link--success\" ng-click=\"comment.isExpanded = false\">collapse comment</button>\n" +
    "    </section>\n" +
    "\n" +
    "    <section  class=\"tg-comment tg-comment--reply\"\n" +
    "              ng-class=\"{'tg-comment--unseen': !reply.seen}\"\n" +
    "              ng-repeat=\"reply in comment.replies\"\n" +
    "              ng-mouseover=\"markSeen(reply, comment)\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "          <div class=\"l-split__right\">\n" +
    "            <div class=\"tg-comment__updated-at\">{{reply.postedOn | date:'short'}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-split__left\">\n" +
    "            <div class=\"tg-comment__author\">{{reply.authorName}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"tg-comment__text\">{{reply.text}}</div>\n" +
    "    </section>\n" +
    "\n" +
    "    <div class=\"tg-comment tg-comment--reply\">\n" +
    "      <general-reply-form-dummy parent-thread-id=\"comment.id\"></general-reply-form-dummy>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</article>");
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
    "        <button class=\"link-inv link--success\" ng-click=\"addContextualComment()\">new contextual comment</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"link-inv link--danger\" ng-click=\"activeTab = false\">hide comments</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-list-inline l-list-inline--small\" ng-show=\"selectingContext\">\n" +
    "      <div class=\"l-list-inline__item\">Now, select the part of the text you want to comment on</div>\n" +
    "      <div class=\"l-list-inline__item\"><button class=\"link link--danger\" ng-click=\"cancelContextualComment()\">(Cancel)</button></div>\n" +
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
    "        {{contextualStats.commentsCount + generalStats.commentsCount}} comments, {{contextualStats.repliesCount + generalStats.repliesCount}} replies\n" +
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
    "        <button class=\"link-inv link--success\" ng-click=\"showGeneralCommentForm()\">new general comment</button>\n" +
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
    "        {{generalStats.commentsCount}} comments, {{generalStats.repliesCount}} replies\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
