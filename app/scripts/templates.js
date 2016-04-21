angular.module('app-templates', ['templates/commentBody.html', 'templates/commentTabs.html', 'templates/contextualComment.html', 'templates/contextualCommentForm.html', 'templates/contextualReplyForm.html', 'templates/developerToolbar.html', 'templates/heatmap-amateurs.html', 'templates/heatmap-amateurs_clutter.html', 'templates/heatmap-life.html', 'templates/heatmap-life_clutter.html', 'templates/heatmap-light.html', 'templates/heatmap-light_clutter.html', 'templates/integrated-amateurs.html', 'templates/integrated-amateurs_clutter.html', 'templates/integrated-life.html', 'templates/integrated-life_clutter.html', 'templates/integrated-light.html', 'templates/integrated-light_clutter.html', 'templates/interface.html', 'templates/optionsPanel.html', 'templates/paragraph-amateurs.html', 'templates/paragraph-amateurs_clutter.html', 'templates/paragraph-life.html', 'templates/paragraph-life_clutter.html', 'templates/paragraph-light.html', 'templates/paragraph-light_clutter.html', 'templates/searchBar.html', 'templates/startScreen.html', 'templates/statusbarContextual.html', 'templates/statusbarDefault.html', 'templates/temp.html']);

angular.module("templates/commentBody.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/commentBody.html",
    "<div class=\"comment-body\">\n" +
    "  <div ng-hide=\"editMode\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "      <div class=\"comment-body__text\">{{comment.text | words: truncated && parameters.truncate || comment.text.length}}</div>\n" +
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
    "  <div class=\"ct-header\">{{contextualStats.commentsCount}} comments</div>\n" +
    "  <div class=\"l-block\">\n" +
    "    <options-panel></options-panel>\n" +
    "  </div>\n" +
    "  <!--<div class=\"grid grid--narrow\">\n" +
    "    <div class=\"grid__item one-whole\">\n" +
    "      <button class=\"ct-item\"\n" +
    "              ng-class=\"{'ct-item--active':  optionsPanel}\"\n" +
    "              ng-click=\"optionsPanel = !optionsPanel\"\n" +
    "              ng-show=\"!optionsPanel\">\n" +
    "        Comment Filtering\n" +
    "      </button>\n" +
    "      <button class=\"ct-item\"\n" +
    "              ng-class=\"{'ct-item--active':  optionsPanel}\"\n" +
    "              ng-click=\"optionsPanel = !optionsPanel\"\n" +
    "              ng-show=\"optionsPanel\">\n" +
    "        Close\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    -->\n" +
    "\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/contextualComment.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/contextualComment.html",
    "<article  class=\"thread-contextual\"\n" +
    "          ng-class=\"{'thread-contextual--selected': comment.isSelected,\n" +
    "                     'thread-contextual--highlighted': comment.isHighlighted,\n" +
    "                     'thread-contextual--multiple': comment.replies.length > 0 && !comment.isSelected}\"\n" +
    "          ng-click=\"selectComment()\">\n" +
    "  <div class=\"tc-unseen\" ng-show=\"!comment.isSelected\">\n" +
    "    <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "      <div class=\"l-list-inline__item\" ng-show=\"currentUser.role == 'prof' && comment.replyRequested\">\n" +
    "        <div class=\"tc-unseen__item\">\n" +
    "          reply requested\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
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
    "          <div class=\"tc-comment__author\">{{comment.author.name}} <span ng-show=\"comment.author.isInstructor && currentUser.role == 'student'\">(Prof)</span></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "      <comment-body type=\"contextual\" comment=\"comment\" truncated=\"!comment.isSelected\"></comment-body>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-split\" ng-hide=\"comment.isSelected\">\n" +
    "      <div class=\"l-split__right\" ng-show=\"comment.hasInstructor && currentUser.role == 'student'\">\n" +
    "        <div class=\"tc-comment__prof-indicator\">\n" +
    "          discussion with Prof\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-split__left\">\n" +
    "        <div class=\"tc-comment__controls\">\n" +
    "          <span class=\"link\" ng-if=\"comment.replies.length > 0\">see {{comment.replies.length}} <ng-pluralize count=\"comment.replies.length\" when=\"{'1': 'reply', other: 'replies'}\"></ng-pluralize></span>\n" +
    "          <span class=\"link\" ng-if=\"comment.replies.length == 0\">see full comment</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "\n" +
    "  <div ng-show=\"comment.isSelected\">\n" +
    "    <section  class=\"tc-comment tc-comment--reply\"\n" +
    "              ng-class=\"{'tc-comment--unseen': !reply.seen}\"\n" +
    "              ng-repeat=\"reply in comment.replies\"\n" +
    "              ng-mouseover=\"markSeen(reply, comment)\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "          <div class=\"l-split__right\">\n" +
    "            <div class=\"tc-comment__updated-at\">{{reply.postedOn | date:'short'}}</div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-split__left\">\n" +
    "            <div class=\"tc-comment__author\">{{reply.author.name}} <span ng-show=\"reply.author.isInstructor && currentUser.role == 'student'\">(Prof)</span></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <comment-body type=\"contextual\" comment=\"reply\" parent=\"comment\" truncated=\"false\"></comment-body>\n" +
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
    "      <div class=\"tc-comment__author\">{{comment.author.name}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <form ng-submit=\"saveComment()\">\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <textarea placeholder=\"Type your comment here\" msd-elastic=\"\\n\" ng-model=\"tempText\"></textarea>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-small\" ng-show=\"currentUser.role == 'student'\">\n" +
    "        <label><input type=\"checkbox\" ng-model=\"replyRequested\"> request reply from Prof.</label>\n" +
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
    "    <div ng-show=\"active\">\n" +
    "      <div class=\"l-block-small\" ng-show=\"currentUser.role == 'student'\">\n" +
    "        <label><input type=\"checkbox\" ng-model=\"replyRequested\"> request reply from Prof.</label>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline l-list-inline--small\">\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <button class=\"button\">Post</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <button class=\"button\" type=\"button\" ng-click=\"deactivate()\">Cancel</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>");
}]);

angular.module("templates/developerToolbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/developerToolbar.html",
    "<div class=\"dev-toolbar\" ng-class=\"{'dev-toolbar--hidden': isHidden}\">\n" +
    "  <div class=\"dev-toolbar__section dev-toolbar__section--header\">\n" +
    "    <div class=\"l-split\">\n" +
    "      <div class=\"l-split__right\">\n" +
    "        <div class=\"dev-toolbar__controls\">\n" +
    "          <button class=\"link\" ng-click=\"isHidden = !isHidden\"><span ng-if=\"isHidden\">show</span><span ng-if=\"!isHidden\">hide</span></button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-split__left\">\n" +
    "        <div class=\"dev-toolbar__title\">Developer panel</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"dev-toolbar__section\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">Truncate comments after</div>\n" +
    "      <div class=\"l-list-inline__item\"><input class=\"dev-toolbar__input-text\" size=\"2\" type=\"number\" ng-model=\"params.truncate\" ng-change=\"reposition()\"></div>\n" +
    "      <div class=\"l-list-inline__item\">words</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"dev-toolbar__section\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">Document font-size</div>\n" +
    "      <div class=\"l-list-inline__item\"><input ng-change=\"changeDocumentFontSize()\" size=\"3\" class=\"dev-toolbar__input-text\" type=\"number\" ng-model=\"documentFontSize\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"dev-toolbar__section\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">Comment font-size</div>\n" +
    "      <div class=\"l-list-inline__item\"><input ng-change=\"changeCommentFontSize()\" size=\"3\" class=\"dev-toolbar__input-text\" type=\"number\" ng-model=\"commentFontSize\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"dev-toolbar__section\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">Comment notification color</div>\n" +
    "      <div class=\"l-list-inline__item\"><input ng-change=\"changeUnseenIndicatorColor()\" class=\"dev-toolbar__input-color\" type=\"color\" ng-model=\"unseenIndicatorColor\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"dev-toolbar__section\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">Current user role</div>\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <label>\n" +
    "          <input type=\"radio\" ng-model=\"currentUser.role\" value=\"student\"> Student\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <label>\n" +
    "          <input type=\"radio\" ng-model=\"currentUser.role\" value=\"prof\"> Prof\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/heatmap-amateurs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/heatmap-amateurs.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"\" ng-repeat=\"n in setDivs(51) track by $index\">\n" +
    "            <span class=\"relevantComments\" id=\"anchorRelevant{{$index}}\" relevant-anchor ></span>\n" +
    "            <span class=\"heatmap\" id=\"{{$index}}\" ng-click=\"setActiveLine( $index )\" heatmap ></span>\n" +
    "            <span class=\"teacherParticipation\" id=\"teacherParticipation{{$index}}\" ng-click=\"setActiveLine( $index )\" teacherParticipation></span>\n" +
    "        </div>\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"fasle\">\n" +
    "            <statusbar-contextual ng-show=\"true\"></statusbar-contextual>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Light Pollution</h1>\n" +
    "            </header>\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p class=\"ng-scope\"><span first></span>During the scientific revolution of the 17th century, scientists were largely men of private means who pursued their interest in natural philosophy for their own edification. Only in the past century or two has it become possible to make a living from investigating the workings of nature. Modern science was, in other words, built on the work of <note-11067 id=\"55\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"7\">amateurs</note-11067>. Today, science is an increasingly specialized and compartmentalized subject, the domain of experts who know more and more about less and less. Perhaps surprisingly, however, amateurs – even those without private means – are still important.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">A recent poll carried out at a meeting of the American Association for the Advancement of Science by astronomer Dr Richard Fienberg found that, in addition to his field of astronomy, amateurs are actively involved in such field as <note-99366 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">acoustics, horticulture, ornithology, meteorology, hydrology and palaeontology</note-99366>. Far from being crackpots, amateur scientists are often in close touch with professionals, some of whom rely heavily on their co-operation.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Admittedly, some fields are more open to amateurs than others. Anything that requires expensive equipment is clearly a no-go area. And some kinds of research can be dangerous; most amateur chemists, jokes Dr Fienberg, are either locked up or have blown themselves to bits. But amateurs can make valuable contributions in fields from rocketry to palaeontology and the rise of the internet has made it easier than before to collect data and distribute results.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Exactly which field of study has benefited most from the contributions of amateurs is a matter of some dispute. Dr Fienberg makes a strong case for <note-74433 id=\"47\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">astronomy</note-74433>. There is, he points out, a long tradition of collaboration between amateur and professional sky watchers. Today, in addition to <note-23656 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">asteroid spotting,</note-23656> amateurs continue to do valuable work observing the brightness of variable stars and detecting novae- ‘new’ stars in the Milky Way and supernovae in other galaxies. Amateur observers are helpful, says Dr Fienberg, because there are <note-18242 id=\"27\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">so many of them </note-18242>(they far outnumber professionals) and because they are <note-36635 id=\"50\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">distributed all over the world</note-36635>. </p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Another field in which amateurs have <note-18577 id=\"40\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">traditionally </note-18577>played an important role is <note-5432 id=\"29\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">palaeontology</note-5432>. Adrian Hunt, a palaeontologist at Mesa Technical College in New Mexico, insists that his is the field in which amateurs have made the biggest contribution. Despite the development of high-tech equipment, he says, the best sensors for finding fossils are human eyes – lots of them.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Finding volunteers to look for fossils is not difficult, he says, because of the near –universal interest in anything to do with dinosaurs. As well as helping with this research, volunteers <note-58596 id=\"42\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">learn about science</note-58596>, a process he calls ‘recreational education’.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Rick Bonney of the Cornell Laboratory of <note-81291 id=\"36\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">Ornithology</note-81291> in Ithaca, New York, contends that amateurs have contributed the most in his field. There are, he notes, thought to be as many as 60 million birdwatchers in America alone. Given their huge numbers and the wide geographical coverage they provide, Mr Bonney has enlisted thousands of amateurs in a number of <note-97048 id=\"28\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">research projects</note-97048>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Despite the successes and whatever the field of study, collaboration between amateurs and professionals is not without its difficulties. Not everyone, for example is happy with the term ‘amateur’. Mr Bonney has coined the term ‘citizen scientist’ because he felt that other words, such as ‘volunteer’ sounded disparaging. A more serious problem is the question of how professionals can best acknowledge the <note-44899 id=\"54\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions made by amateurs. </note-44899>Dr Fienberg says that some amateur astronomers are happy to provide their observations but grumble about not being reimbursed for out-of-pocket expenses. Others feel let down when their observations are used in scientific papers, but they are not listed as co-authors. Dr Hunt says some amateur palaeontologists are disappointed when told that they cannot take finds home with them.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">These are legitimate concerns but none seems insurmountable. Provided <note-67544 id=\"62\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">amateurs</note-67544> and professionals agree the terms on which they will work together beforehand, there is no reason why co-operation between the two groups should not flourish. Last year Dr S. Carlson, founder of the Society for Amateur Scientists won an award worth $290,000 for his work in promoting such co-operation. He says that one of the main benefits of the prize is the endorsement it has given to the contributions of amateur scientists, which has done much to silence critics among those professionals who believe science should remain their exclusive preserve.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">At the moment, says Dr Carlson, the society is involved in several schemes including an innovative rocket-design project and the setting up of a network of observers who will search for evidence of a link between low- frequency radiation and earthquakes. The  <note-2628 id=\"26\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals provide</note-2628> guidance for the amateurs ‘so that anything they do discover will be taken seriously’. Having laid the foundations of science, amateurs will have much to contribute to its ever – <note-45171 id=\"68\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--selected\" comment-active=\"false\" data-content=\"1\">expanding edifice</note-45171></p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" ng-show=\"activeTab\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/heatmap-amateurs_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/heatmap-amateurs_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"\" ng-repeat=\"n in setDivs(51) track by $index\">\n" +
    "            <span class=\"relevantComments\" id=\"anchorRelevant{{$index}}\" relevant-anchor ></span>\n" +
    "            <span class=\"heatmap\" id=\"{{$index}}\" ng-click=\"setActiveLine( $index )\" heatmap ></span>\n" +
    "            <span class=\"teacherParticipation\" id=\"teacherParticipation{{$index}}\" ng-click=\"setActiveLine( $index )\" teacherParticipation></span>\n" +
    "        </div>\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"fasle\">\n" +
    "            <statusbar-contextual ng-show=\"true\"></statusbar-contextual>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Light Pollution</h1>\n" +
    "            </header>\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p class=\"ng-scope\"><span first></span>During the scientific revolution of the <note-22991 id=\"80\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">17th century,</note-22991> scientists were largely men of <note-64913 id=\"81\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">private means who pursued</note-64913> their interest in natural philosophy for their own edification. Only in the past century or two has it become possible to make a living from investigating the workings of nature. Modern science was, in other words, built on the work of <note-11067 id=\"55\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"7\">amateurs</note-11067>. Today, science is an increasingly specialized and compartmentalized subject, the domain of experts who know <note-84084 id=\"82\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">more and more about less and less</note-84084>. Perhaps surprisingly, however, <note-79670 id=\"84\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">amateurs</note-79670> – even those without private means – are still important.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">A recent poll carried out at a meeting of the American Association for the Advancement of Science by astronomer Dr Richard Fienberg found that, in addition to his field of astronomy, amateurs are <note-86864 id=\"85\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">actively involved</note-86864> in such field as <note-99366 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">acoustics, horticulture, ornithology, meteorology, hydrology and palaeontology</note-99366>. Far from being <note-59071 id=\"86\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">crackpots</note-59071>, amateur scientists are often in close touch with professionals, some of whom rely <note-95873 id=\"87\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">heavily on their co-operation</note-95873>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Admittedly, <note-74709 id=\"88\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">some fields are more open to amateurs</note-74709> than others. Anything that <note-15904 id=\"89\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">requires expensive equipment</note-15904> is clearly a no-go area. And some kinds of research can be <note-67151 id=\"90\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">dangerous</note-67151>; most amateur chemists, jokes Dr Fienberg, are either locked up or have blown themselves to bits. But amateurs can make valuable contributions in fields from <note-44416 id=\"92\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">rocketry</note-44416> to palaeontology and the rise of the internet has made it easier than before to <note-63574 id=\"93\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">collect data and distribute results</note-63574>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Exactly which field of study has benefited most from the contributions of amateurs is a matter of some dispute. Dr Fienberg makes a strong case for <note-74433 id=\"47\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">astronomy</note-74433>. There is, he points out, a <note-73588 id=\"94\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">long tradition</note-73588> of collaboration between amateur and professional sky watchers. Today, in addition to <note-23656 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">asteroid spotting,</note-23656> amateurs continue to do valuable work observing the brightness of variable stars and detecting novae- ‘new’ stars in the Milky Way and supernovae in other galaxies. Amateur observers are helpful, says Dr Fienberg, because there are <note-18242 id=\"27\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">so many of them </note-18242>(they far outnumber professionals) and because they are <note-36635 id=\"50\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">distributed all over the world</note-36635>. </p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Another field in which amateurs have <note-18577 id=\"40\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">traditionally </note-18577>played an important role is <note-5432 id=\"29\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">palaeontology</note-5432>. Adrian Hunt, a palaeontologist at Mesa Technical College in New Mexico, insists that his is the field in which amateurs have made the biggest contribution. Despite the development of high-tech equipment, he says,<note-76636 id=\"95\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> the best sensors for finding fossils are human eye</note-76636>s – lots of them.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Finding volunteers to look for fossils is not difficult, he says, because of the near –universal interest in anything to do with dinosaurs. As well as helping with this research, volunteers <note-58596 id=\"42\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">learn about science</note-58596>, a process he calls ‘recreational education’.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Rick Bonney of the Cornell Laboratory of <note-81291 id=\"36\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">Ornithology</note-81291> in Ithaca, New York, contends that amateurs have contributed the most in his field. There are, he notes, thought to be as many as <note-42636 id=\"96\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">60 million birdwatchers </note-42636>in America alone. Given their <note-45833 id=\"97\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">huge numbers</note-45833> and the wide geographical coverage they provide, Mr Bonney has enlisted thousands of amateurs in a number of <note-97048 id=\"28\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">research projects</note-97048>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Despite the successes and <note-55751 id=\"99\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">whatever the field of study</note-55751>, collaboration <note-77451 id=\"100\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">between amateurs and professionals </note-77451>is not without its difficulties. Not everyone,<note-10250 id=\"101\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\"> for example is happy with the term ‘amateur</note-10250>’. Mr Bonney has coined the term ‘<note-20068 id=\"103\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">citizen scientist</note-20068>’ because he felt that other words, such as ‘<note-56182 id=\"104\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">volunteer</note-56182>’ sounded disparaging. A more serious problem is the question of how professionals can best acknowledge the <note-44899 id=\"54\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions made by amateurs. </note-44899>Dr Fienberg says that some amateur astronomers are happy to provide their observations <note-25917 id=\"106\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">but grumble about not being reimbursed for out-of-pocket expenses</note-25917>. Others feel let down when their observations are used in scientific papers, but they are not listed as <note-91049 id=\"107\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">co-authors</note-91049>. Dr Hunt says some amateur palaeontologists are disappointed when told that they <note-33554 id=\"108\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">cannot take finds home with them</note-33554>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">These are legitimate concerns but none seems insurmountable. Provided <note-67544 id=\"62\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">amateurs</note-67544> and professionals agree the terms on which they will work together beforehand, there is no reason why co-operation between the two groups should not flourish. Last year Dr S. Carlson, founder of the <note-11495 id=\"111\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Society for Amateur Scientists</note-11495> won an<note-81606 id=\"110\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> award worth $290,000</note-81606> for his work in promoting such co-operation. He says that one of the main benefits of the prize is the endorsement it has given to the <note-35193 id=\"112\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions of amateur</note-35193> scientists, <note-53036 id=\"113\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">which has done much to silence critics</note-53036> among those <note-95549 id=\"114\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals who believe science should remain their exclusiv</note-95549>e preserve.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">At the moment, says Dr Carlson, <note-22631 id=\"115\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">the society is involved in several schemes including an innovative rocket-design</note-22631> project and the setting up of a network of observers who will <note-13037 id=\"116\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">search for evidence of a link between low- frequency radiation</note-13037> and earthquakes. The  <note-2628 id=\"26\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals provide</note-2628> guidance for the amateurs ‘<note-66862 id=\"117\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--selected\" comment-active=\"false\" data-content=\"1\">so that anything they do discover will be taken seriously</note-66862>’. Having laid the foundations of science, amateurs will have much to contribute to its ever – <note-45171 id=\"68\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--highlighted\" comment-active=\"false\" data-content=\"1\">expanding edifice</note-45171></p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" ng-show=\"activeTab\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/heatmap-life.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/heatmap-life.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"\" ng-repeat=\"n in setDivs(47) track by $index\">\n" +
    "            <span class=\"relevantComments\" id=\"anchorRelevant{{$index}}\" relevant-anchor ></span>\n" +
    "            <span class=\"heatmap\" id=\"{{$index}}\" ng-click=\"setActiveLine( $index )\" heatmap ></span>\n" +
    "            <span class=\"teacherParticipation\" id=\"teacherParticipation{{$index}}\" ng-click=\"setActiveLine( $index )\" teacherParticipation></span>\n" +
    "        </div>\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"fasle\">\n" +
    "            <statusbar-contextual ng-show=\"true\"></statusbar-contextual>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Life and Death</h1>\n" +
    "            </header>\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p  id=\"paragraph1\" paragraph><span first></span>Until recently, the thought that there might ever be a cure for ageing seemed preposterous. Growing older and more decrepit appeared to be an inevitable and necessary part of being human. Over the last decade, however, scientists have begun to see ageing differently. Some now believe that the average life-expectancy may soon be pushed up to 160 years; others think that it may be extended to 200 or 300 years. A handful even wonder whether we might one day live for a millennium or more.</p>\n" +
    "\n" +
    "                <p  id=\"paragraph2\" paragraph>Behind this new excitement is the theory that the primary cause of ageing lies in highly reactive molecules called <note-35568 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">free radicals</note-35568>, left behind by the oxygen we breathe. Free radicals react with the molecules in our bodies, damaging DNA, proteins and other cell tissues, and are known to be implicated in <note-3256 id=\"16\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">diseases.</note-3256>  The body does its best to protect itself against free radicals by producing its own chemicals to prevent ageing, such as vitamins E and C, but it is always fighting a losing battle.</p>\n" +
    "\n" +
    "                <p   id=\"paragraph3\" paragraph>A year ago Gordon Lithgow of the University of Manchester discovered a way to help combat free radicals. Using one of these anti-ageing chemicals. he managed to increase the lifespan of one species of earthworm by 50 per cent. Despite cautionary words from the scientists, many welcomed this as the first step towards a drug which would extend life. Research involving the mutation of genes has also thrown up fascinating results, <note-95937 id=\"14\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">identifying two of the genes that appear to control how long the earthworm lives</note-95937>. When one considers the vast evolutionary distances that separate these species, it suggests that we may have discovered a key to how ageing is regulated throughout the entire animal kingdom.</p>\n" +
    "\n" +
    "                <p   id=\"paragraph4\" paragraph>In June last year a small American company called Eukarion sought permission to carry out the first trials of an anti-ageing drug, SCS, <note-98849 id=\"10\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">on human beings</note-98849>. Although it will initially be used to treat diseases associated with old age, Eukarion said, that 'if the effect of treating diseases of old age is to extend life, everyone's going to be happy.'</p>\n" +
    "\n" +
    "                <p   id=\"paragraph5\" paragraph>Some scientists, however, are quick to discourage extravagant speculation. 'There is no evidence whatsoever that swallowing any chemical would have an effect on mammals', says Rich Miller of the University of Michigan. 'And those people who claim it might need to go out and do some experimenting'. Some research, moreover, has produced alarming results. As well as controlling ageing, these, genes also partly control the hormones which regulate growth. The upshot of this is that although the lives of mutant mice can be extended by up to 80 per cent, they remain smaller than normal.</p>\n" +
    "\n" +
    "                <p   id=\"paragraph6\" paragraph>Quite apart <note-14999 id=\"8\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">from these sorts of horrors</note-14999>, the ethical implications of <note-51848 id=\"22\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">extending human lifespan </note-51848>are likely to worry many people. Even if the falling birth-rates reported in the world's developed nations were to be repeated throughout the world, would this be sufficient to compensate for massively extended life-expectancy, and would we be willing to see the demographic balance of our society change out of all recognition? David Gems, the head of the Centre for Research into Ageing at University College, London, is enthusiastic about the opportunities opened up by extended life, but even he observes, 'If people live much longer, the proportion of children would. of course, he very small. It strikes me that it might feel rather claustrophobic: all those middle-aged people and very few children or young people.'</p>\n" +
    "\n" +
    "                <p   id=\"paragraph7\" paragraph>The philosopher John Polkinghorne emphasises that any discussion of the merits of life-extending therapies must take into account the quality of the life that is lived: 'One would not wish to prolong life beyond the point it had ceased to be creative and fulfilling and meaningful,' he says. 'Presumably, there would have to come a point at which life ceased to be creative and<note-55180 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> became just repetition.</note-55180> Clearly, there are only so many rounds of golf one would want to play.'</p>\n" +
    "\n" +
    "                <p   id=\"paragraph8\" paragraph>But Polkinghorne, a member of the Human Genetics Commission, also observes that so far our experience of extended life-expectancy has not resulted in world-weariness. Throughout the last century, life-expectancy rose consistently, thanks to improved diet, better hygiene, continuous medical innovation and the provision of free or subsidised healthcare. In 1952 the Queen sent out 225 telegrams to people on their 100th birthday; in 1996 she sent out <note-24960 id=\"20\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">5218</note-24960>. 'Consider also, the lives of our Roman and Anglo-Saxon ancestors' he says. By and large, the doubling of human lifespan we have seen since then has not been a bad thing. Life has not become frustrating and boring. For example, we now live to see our children's children, and this is good.'</p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" ng-show=\"activeTab\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/heatmap-life_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/heatmap-life_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"\" ng-repeat=\"n in setDivs(47) track by $index\">\n" +
    "            <span class=\"relevantComments\" id=\"anchorRelevant{{$index}}\" relevant-anchor ></span>\n" +
    "            <span class=\"heatmap\" id=\"{{$index}}\" ng-click=\"setActiveLine( $index )\" heatmap ></span>\n" +
    "            <span class=\"teacherParticipation\" id=\"teacherParticipation{{$index}}\" ng-click=\"setActiveLine( $index )\" teacherParticipation></span>\n" +
    "        </div>\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"fasle\">\n" +
    "            <statusbar-contextual ng-show=\"true\"></statusbar-contextual>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Life and Death</h1>\n" +
    "            </header>\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p id=\"paragraph1\" paragraph=\"\" class=\"ng-scope\"><span first></span>Until recently, the thought that there <note-45259 id=\"120\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">might ever be a cure for ageing seemed preposterous</note-45259>. Growing older and more decrepit appeared to be an <note-94865 id=\"122\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">inevitable and necessary part of being human.</note-94865> Over the last decade, however, scientists have begun to see ageing differently. Some now believe that the average life-expectancy may <note-4724 id=\"124\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">soon be pushed up to 160 years</note-4724>; others think that it may be extended to <note-69171 id=\"126\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">200 or 300 years</note-69171>. A handful even wonder whether we might <note-39750 id=\"127\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">one day live for a millennium or more</note-39750>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph2\" paragraph=\"\" class=\"ng-scope\">Behind this new excitement is the theory that the primary cause of ageing lies in highly reactive molecules called <note-35568 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">free radicals</note-35568>, left behind by the oxygen we breathe. <note-71804 id=\"129\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">Free radicals react with the molecules in our bodies</note-71804>, damaging DNA, proteins and other cell tissues, and are known to be implicated in <note-3256 id=\"16\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">diseases.</note-3256>  The <note-11786 id=\"131\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">body does its best to protect itself against free radicals </note-11786>by producing its <note-41347 id=\"133\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">own chemicals to prevent ageing</note-41347>, such as vitamins E and C, but it is <note-69371 id=\"132\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">always fighting a losing battle</note-69371>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph3\" paragraph=\"\" class=\"ng-scope\">A year ago Gordon Lithgow of the University of Manchester discovered<note-78780 id=\"134\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> a way to help combat free radicals</note-78780>. Using one of these anti-ageing chemicals. <note-41978 id=\"136\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">he</note-41978> managed to increase the lifespan of one species of earthworm <note-96840 id=\"135\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">by 50 per cent</note-96840>. Despite cautionary words from the scientists, <note-64115 id=\"138\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">many welcomed</note-64115> this as the first step towards a <note-61967 id=\"141\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">drug which would extend life</note-61967>. Research involving the mutation of <note-98489 id=\"142\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">genes</note-98489> has also thrown up fascinating results, <note-95937 id=\"14\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">identifying two of the genes that appear to control how long the earthworm lives</note-95937>. When one considers the vast <note-24541 id=\"143\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">evolutionary distances</note-24541> that separate these species, it suggests that we may have discovered a key to how <note-44621 id=\"144\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">ageing is regulated throughout the entire animal kingdom</note-44621>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph4\" paragraph=\"\" class=\"ng-scope\">In June last year a small American company called Eukarion sought permission to carry out the first trials of an <note-90266 id=\"145\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">anti-ageing drug</note-90266>, SCS, <note-98849 id=\"10\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">on human beings</note-98849>. Although it will initially be used to treat <note-89405 id=\"146\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">diseases associated with old age</note-89405>, Eukarion said, that 'if the effect of treating diseases of old age is to extend life, everyone's going to be happy.'</p>\n" +
    "\n" +
    "                <p id=\"paragraph5\" paragraph=\"\" class=\"ng-scope\">Some scientists, however, are <note-10457 id=\"148\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">quick to discourage extravagant speculation.</note-10457> 'There is <note-17194 id=\"149\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">no evidence</note-17194> whatsoever that swallowing any chemical would have an <note-20194 id=\"150\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">effect on mammals</note-20194>', says Rich Miller of the University of Michigan. 'And those people who claim it might need to go out and<note-16260 id=\"151\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> do some experimenting</note-16260>'. Some research, moreover, has produced alarming results. As well as controlling ageing, these, <note-11867 id=\"152\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">genes also partly control the hormones which regulate growth</note-11867>. The upshot of this is that although the lives of mutant mice can be extended by up to <note-3825 id=\"153\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">80 per cent, they remain smaller than normal</note-3825>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph6\" paragraph=\"\" class=\"ng-scope\">Quite apart <note-14999 id=\"8\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">from these sorts of horrors</note-14999>, the ethical implications of <note-51848 id=\"22\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">extending human lifespan </note-51848>are likely to worry many people. Even if the <note-3195 id=\"154\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">falling birth-rates reported in the world's developed nation</note-3195>s were to be repeated throughout the world, would this be sufficient to compensate for massively extended life-expectancy, and would we be willing to see the demographic balance of our society change out of all recognition? David Gems, the head of the Centre for Research into Ageing at University College, London, is enthusiastic about the <note-58696 id=\"155\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">opportunities opened up by extended life</note-58696>, but even he observes, 'If people live much longer, the proportion of <note-88057 id=\"156\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">children would. of course, he very small</note-88057>. It strikes me that it might feel rather claustrophobic: all those middle-aged people and very few children or young people.'</p>\n" +
    "\n" +
    "                <p id=\"paragraph7\" paragraph=\"\" class=\"ng-scope\">The philosopher John Polkinghorne emphasises that any discussion of the merits of life-extending therapies must take into account the <note-31790 id=\"157\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">quality of the life that is lived:</note-31790> 'One would not wish to prolong life beyond the <note-98233 id=\"159\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">point it had ceased to be creative</note-98233> and fulfilling and meaningful,' he says. 'Presumably, there would have to come a point at which life ceased to be creative and<note-55180 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> became just repetition.</note-55180> Clearly, there are only so many rounds of golf one would want to play.'</p>\n" +
    "\n" +
    "                <p id=\"paragraph8\" paragraph=\"\" class=\"ng-scope\">But Polkinghorne, a member of the Human Genetics Commission, also observes that so far our experience of extended life-expectancy <note-88917 id=\"160\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">has not resulted in world-weariness</note-88917>. Throughout the last century, life-expectancy rose consistently, thanks to improved diet, <note-23732 id=\"161\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">better hygiene</note-23732>, continuous medical innovation and the provision of free or subsidised healthcare. In 1952 the Queen sent out <note-13668 id=\"162\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">225 telegrams</note-13668> to people on their 100th birthday; in 1996 she sent out <note-24960 id=\"20\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">5218</note-24960>. 'Consider also, the lives of our Roman and Anglo-Saxon ancestors' he says. By and large, <note-85446 id=\"164\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">the doubling of human lifespan</note-85446> we have seen since then has not been a bad thing. Life has not become frustrating and boring. For example,<note-86825 id=\"165\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> we now live to see our children's children</note-86825>, and this is good.'</p>\n" +
    "\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" ng-show=\"activeTab\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/heatmap-light.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/heatmap-light.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"\" ng-repeat=\"n in setDivs(51) track by $index\">\n" +
    "            <span class=\"relevantComments\" id=\"anchorRelevant{{$index}}\" relevant-anchor ></span>\n" +
    "            <span class=\"heatmap\" id=\"{{$index}}\" ng-click=\"setActiveLine( $index )\" heatmap ></span>\n" +
    "            <span class=\"teacherParticipation\" id=\"teacherParticipation{{$index}}\" ng-click=\"setActiveLine( $index )\" teacherParticipation></span>\n" +
    "        </div>\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"fasle\">\n" +
    "            <statusbar-contextual ng-show=\"true\"></statusbar-contextual>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Light Pollution</h1>\n" +
    "            </header>\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p><span first></span>After hours of driving south in the pitch-black darkness of the Nevada desert, a dome of hazy gold suddenly appears on the horizon. Soon, a road sign confirms the obvious: Las Vegas 30 miles. Looking skyward, you notice that<note-60493 id=\"17\" comment-anchor=\"\" class=\" document__anchor--highlighted\" comment-active=\"false\" data-content=\"1\"> the Big Dipper</note-60493> is harder to find than it was an hour ago.</p>\n" +
    "\n" +
    "                <p ><note-12872 id=\"10\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"3\">Light pollution</note-12872>—the artificial light that illuminates more than its intended target area—has become a problem of increasing concern <note-71961 id=\"13\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"4\">across the country</note-71961> over the past 15 years. In the suburbs, where over-lit shopping mall parking lots are the norm, only 200 of the Milky Way’s 2,500 stars are visible on a clear night. Even fewer can be seen from large cities. In almost every town, big and small, street lights beam just as much light up and out as they do down, illuminating much more than just the street. Almost 50 percent of the light emanating from street lamps misses its intended target, and billboards, shopping centres, private homes and skyscrapers are similarly over-illuminated.</p>\n" +
    "\n" +
    "                <p > America has become so bright that in a satellite image of the United States at night, the outline of the country is visible from its lights alone. The major cities are all there, in bright clusters: New York, Boston, Miami, Houston, Los Angeles, Seattle, Chicago, and, of course, Las Vegas. Mark Adams, superintendent of the McDonald Observatory in west Texas, says that the very fact that city lights are visible from on high is proof of their wastefulness. “When you’re up in an airplane, all that light you see on the ground from the city is wasted. It’s going up into the night sky. That’s why you can see it.”</p>\n" +
    "\n" +
    "                <p > But don’t we need all those lights to <note-13793 id=\"1\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"2\">ensure our safety</note-13793>? The answer from light engineers, light pollution control advocates and astronomers is an emphatic “<note-59913 id=\"6\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"4\">no</note-59913>.” Elizabeth Alvarez of the International Dark Sky Association (IDA), a non-profit organization in Tucson, Arizona, says that overly bright security lights can actually force neighbours to close the shutters, which means that if any criminal activity does occur on the street, no one will see it. And the old assumption that bright lights deter crime appears to have been a false one: A new Department of Justice report concludes that there is no documented correlation between the level of lighting and the level of crime in an area. And contrary to popular belief, more crimes occur in broad daylight than at night.</p>\n" +
    "\n" +
    "                <p > For drivers, light can actually create a safety hazard. Glaring lights can temporarily blind drivers,<note-97389 id=\"5\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\"> increasing the likelihood</note-97389> of an accident. New Hampshire law forbids the use of “any light along a highway so positioned as to blind or dazzle the vision of travellers on the adjacent highway.”</p>\n" +
    "\n" +
    "                <p > Badly designed lighting can pose a threat to wildlife as well as people. Newly hatched turtles in Florida move toward beach lights instead of the more muted silver shimmer of the ocean. Migrating birds, confused by lights on skyscrapers, broadcast towers and lighthouses, are injured, sometimes fatally, after colliding with high, lighted structures. And light pollution harms air quality as well: Because most of the country’s power plants are still powered by fossil fuels, more light means more air pollution.</p>\n" +
    "\n" +
    "                <p > So what can be done? Tucson, Arizona is taking back the night. The city has one of the best lighting ordinances in the country, and, not coincidentally, the highest concentration of observatories in the world. Kitt Peak National Optical Astronomy Observatory has 24 telescopes aimed skyward around the city’s perimeter, and its cadre of astronomers needs a dark sky to work with.</p>\n" +
    "\n" +
    "                <p > For a while, that darkness was threatened. “We were totally losing the night sky,” Jim Singleton of Tucson’s Lighting Committee told <note-67553 id=\"3\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\">Tulsa, Oklahoma’s.</note-67553>\n" +
    "                 The same thing is happening in a handful of other states, including Texas, which just passed a light pollution bill last summer. “Astronomers can get what they need at the same time that citizens get what they need: safety, security and good visibility at night,” says McDonald Observatory’s Mark Adams, who provided testimony at the hearings for the bill.\n" +
    "                </p>\n" +
    "\n" +
    "\n" +
    "                <p >And in the long run, everyone benefits from reduced energy costs. Wasted energy from inefficient lighting costs us between $1 and $2 billion a year, according to IDA. The city of San Diego, which installed new, high-efficiency street lights, now saves about $3 million a year in energy costs.</p>\n" +
    "\n" +
    "                <p >Legislation isn’t the only answer to light pollution problems. Brian Greer, Central Ohio representative for the Ohio Light Pollution Advisory Council, says that education is just as important, if not more so. “There are some special situations where regulation is the only fix,” he says. “But the vast majority of bad lighting is simply the <note-83529 id=\"4\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\">result of not knowing any better.</note-83529></p>\n" +
    "\n" +
    "                <p >*The Big Dipper: a group of seven bright stars visible in the Northern Hemisphere. </p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" ng-show=\"activeTab\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/heatmap-light_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/heatmap-light_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"\" ng-repeat=\"n in setDivs(51) track by $index\">\n" +
    "            <span class=\"relevantComments\" id=\"anchorRelevant{{$index}}\" relevant-anchor ></span>\n" +
    "            <span class=\"heatmap\" id=\"{{$index}}\" ng-click=\"setActiveLine( $index )\" heatmap ></span>\n" +
    "            <span class=\"teacherParticipation\" id=\"teacherParticipation{{$index}}\" ng-click=\"setActiveLine( $index )\" teacherParticipation></span>\n" +
    "        </div>\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"fasle\">\n" +
    "            <statusbar-contextual ng-show=\"true\"></statusbar-contextual>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Light Pollution</h1>\n" +
    "            </header>\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p class=\"ng-scope\"><span first></span>After hours of driving south in the<note-54688 id=\"122\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> pitch-black darkness of the Nevada desert</note-54688>, a <note-44437 id=\"120\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">dome of hazy gold</note-44437> suddenly appears on the horizon. Soon, a road sign confirms the obvious:<note-5157 id=\"121\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> Las Vegas 30 miles</note-5157>. Looking skyward, you notice that<note-60493 id=\"17\" comment-anchor=\"\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\" comment-active=\"false\" data-content=\"1\"> the Big Dipper</note-60493> is harder to find than it was an hour ago.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"><note-12872 id=\"10\" comment-anchor=\"\" comment-active=\"false\" data-content=\"3\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">Light pollution</note-12872>—the artificial light that illuminates more than its intended target area—has become a problem of increasing concern <note-71961 id=\"13\" comment-anchor=\"\" comment-active=\"false\" data-content=\"4\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">across the country</note-71961> over the past 15 years. In the suburbs, where over-lit shopping mall parking lots are the norm, only 200 of the <note-26760 id=\"123\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Milky Way’s 2,500 stars</note-26760> are visible on a <note-21502 id=\"124\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">clear night.</note-21502> Even fewer can be <note-24679 id=\"126\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">seen from large cities</note-24679>. In almost every town, big and small, street lights beam just as much light up and out as they do down, illuminating much more than just the street. Almost<note-50003 id=\"127\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> 50 percent of the light emanating from street lamps misses its intended target</note-50003>, and billboards, shopping centres, private homes and skyscrapers are similarly <note-9922 id=\"128\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">over-illuminated</note-9922>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> America has become so bright that in a <note-92530 id=\"129\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">satellite image of the United States </note-92530>at night, the outline of the country is visible from its lights alone. The <note-58109 id=\"130\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">major cities are all there,</note-58109> in bright clusters: New York, Boston, Miami, Houston, Los Angeles, Seattle, Chicago, and, of course, Las Vegas. Mark Adams, superintendent of the McDonald Observatory in west Texas, says that the very fact that city lights are visible from on high is<note-7255 id=\"131\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> proof of their wastefulness</note-7255>. “When you’re up in an airplane, all that light you see on the ground from the city is wasted. It’s going up into the night sky. That’s why you can see it.”</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> But don’t we need all those lights to <note-13793 id=\"1\" comment-anchor=\"\" comment-active=\"false\" data-content=\"2\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">ensure our safety</note-13793>? The answer from light engineers, light pollution control advocates and astronomers is an emphatic “<note-59913 id=\"6\" comment-anchor=\"\" comment-active=\"false\" data-content=\"4\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">no</note-59913>.” Elizabeth Alvarez of the International Dark Sky Association (IDA), a non-profit organization in Tucson, Arizona, says that overly bright security lights can actually <note-75740 id=\"132\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">force neighbours to close the shutters</note-75740>, which means that if any criminal activity does occur on the street, <note-55749 id=\"133\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">no one will see it</note-55749>. And the old assumption that bright lights deter crime appears to have been a false one: A new Department of Justice report concludes that there is no documented correlation between the level of lighting and the level of crime in an area. And contrary to popular belief, <note-85301 id=\"134\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">more crimes occur in broad daylight than at night</note-85301>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> For drivers, light can actually create a safety hazard. Glaring lights can temporarily blind drivers,<note-97389 id=\"5\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\"> increasing the likelihood</note-97389> of an accident. New Hampshire law forbids the use of “<note-76210 id=\"135\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">any light along a highway so positioned as to blind or dazzle</note-76210> the vision of travellers on the adjacent highway.”</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> Badly designed lighting can pose a threat to <note-91403 id=\"136\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">wildlife</note-91403> as well as people. <note-50014 id=\"137\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">Newly hatched turtles in Florida move toward beach lights</note-50014> instead of the more muted silver shimmer of the ocean. <note-8434 id=\"139\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Migrating birds, </note-8434>confused by lights on skyscrapers, broadcast towers and lighthouses, are injured, sometimes fatally, after colliding with high, lighted structures. And light pollution harms air quality as well: Because most of the country’s power plants are still <note-76925 id=\"140\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">powered by fossil fuels</note-76925>, more light means more air pollution.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> So what can be done?<note-12079 id=\"142\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> Tucson, Arizona is taking back the night. </note-12079>The city has one of the best lighting <note-50496 id=\"143\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">ordinances</note-50496> in the country, and, not coincidentally, the <note-54098 id=\"144\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">highest concentration of observatories in the world</note-54098>. Kitt Peak National Optical Astronomy Observatory has <note-50007 id=\"145\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">24 telescopes</note-50007> aimed skyward around the city’s perimeter, and its <note-49800 id=\"146\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">cadre</note-49800> of astronomers needs a dark sky to work with.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> For a while,<note-76315 id=\"147\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> that darkness was threatened.</note-76315> “We were totally losing the night sky,” Jim Singleton of Tucson’s Lighting Committee told <note-67553 id=\"3\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">Tulsa, Oklahoma’s.</note-67553>\n" +
    "                 The same thing is happening in a handful of other states, including Texas, which just passed a light <note-61913 id=\"149\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">pollution bill</note-61913> last summer. “<note-29921 id=\"148\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Astronomers can get what they need at the same time that citizens get what they need</note-29921>: safety, security and good visibility at night,” says McDonald Observatory’s Mark Adams, who provided testimony at the hearings for the bill.\n" +
    "                </p>\n" +
    "\n" +
    "\n" +
    "                <p class=\"ng-scope\">And in the long run, everyone benefits from <note-55133 id=\"150\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">reduced energy costs</note-55133>. <note-4930 id=\"151\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Wasted energy</note-4930> from inefficient lighting costs us between $1 and <note-49938 id=\"152\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">$2 billion a year</note-49938>, according to<note-10392 id=\"153\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\"> IDA</note-10392>. The city of San Diego, which installed <note-24091 id=\"155\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">new, high-efficiency street lights</note-24091>, now saves about $<note-63469 id=\"157\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">3 million a year in energy costs</note-63469>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"><note-72784 id=\"158\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Legislation isn’t the only answer to light pollution problems</note-72784>. Brian Greer, Central Ohio representative for the Ohio Light Pollution Advisory Council, says that <note-46168 id=\"159\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">education is just as important</note-46168>, if not more so. “There are some special situations where regulation is the only fix,” he says. “<note-61368 id=\"161\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">But the vast majority of bad lighting</note-61368> is simply the <note-83529 id=\"4\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">result of not knowing any better.</note-83529></p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">*The Big Dipper: a group of seven bright stars visible in the Northern Hemisphere. </p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" ng-show=\"activeTab\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/integrated-amateurs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/integrated-amateurs.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "            <statusbar-contextual ng-show=\"activeTab != false\"></statusbar-contextual>\n" +
    "            <statusbar-default ng-show=\"activeTab == false\"></statusbar-default>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">In Praise of Amateurs</h1>\n" +
    "                <h2>Despite the specialization of scientific research, amateurs still have an important role to play</h2>\n" +
    "            </header>\n" +
    "\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p class=\"ng-scope\">During the scientific revolution of the 17th century, scientists were largely men of private means who pursued their interest in natural philosophy for their own edification. Only in the past century or two has it become possible to make a living from investigating the workings of nature. Modern science was, in other words, built on the work of <note-11067 id=\"55\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"7\">amateurs</note-11067>. Today, science is an increasingly specialized and compartmentalized subject, the domain of experts who know more and more about less and less. Perhaps surprisingly, however, amateurs – even those without private means – are still important.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">A recent poll carried out at a meeting of the American Association for the Advancement of Science by astronomer Dr Richard Fienberg found that, in addition to his field of astronomy, amateurs are actively involved in such field as <note-99366 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">acoustics, horticulture, ornithology, meteorology, hydrology and palaeontology</note-99366>. Far from being crackpots, amateur scientists are often in close touch with professionals, some of whom rely heavily on their co-operation.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Admittedly, some fields are more open to amateurs than others. Anything that requires expensive equipment is clearly a no-go area. And some kinds of research can be dangerous; most amateur chemists, jokes Dr Fienberg, are either locked up or have blown themselves to bits. But amateurs can make valuable contributions in fields from rocketry to palaeontology and the rise of the internet has made it easier than before to collect data and distribute results.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Exactly which field of study has benefited most from the contributions of amateurs is a matter of some dispute. Dr Fienberg makes a strong case for <note-74433 id=\"47\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">astronomy</note-74433>. There is, he points out, a long tradition of collaboration between amateur and professional sky watchers. Today, in addition to <note-23656 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">asteroid spotting,</note-23656> amateurs continue to do valuable work observing the brightness of variable stars and detecting novae- ‘new’ stars in the Milky Way and supernovae in other galaxies. Amateur observers are helpful, says Dr Fienberg, because there are <note-18242 id=\"27\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">so many of them </note-18242>(they far outnumber professionals) and because they are <note-36635 id=\"50\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">distributed all over the world</note-36635>. </p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Another field in which amateurs have <note-18577 id=\"40\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">traditionally </note-18577>played an important role is <note-5432 id=\"29\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">palaeontology</note-5432>. Adrian Hunt, a palaeontologist at Mesa Technical College in New Mexico, insists that his is the field in which amateurs have made the biggest contribution. Despite the development of high-tech equipment, he says, the best sensors for finding fossils are human eyes – lots of them.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Finding volunteers to look for fossils is not difficult, he says, because of the near –universal interest in anything to do with dinosaurs. As well as helping with this research, volunteers <note-58596 id=\"42\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">learn about science</note-58596>, a process he calls ‘recreational education’.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Rick Bonney of the Cornell Laboratory of <note-81291 id=\"36\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">Ornithology</note-81291> in Ithaca, New York, contends that amateurs have contributed the most in his field. There are, he notes, thought to be as many as 60 million birdwatchers in America alone. Given their huge numbers and the wide geographical coverage they provide, Mr Bonney has enlisted thousands of amateurs in a number of <note-97048 id=\"28\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">research projects</note-97048>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Despite the successes and whatever the field of study, collaboration between amateurs and professionals is not without its difficulties. Not everyone, for example is happy with the term ‘amateur’. Mr Bonney has coined the term ‘citizen scientist’ because he felt that other words, such as ‘volunteer’ sounded disparaging. A more serious problem is the question of how professionals can best acknowledge the <note-44899 id=\"54\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions made by amateurs. </note-44899>Dr Fienberg says that some amateur astronomers are happy to provide their observations but grumble about not being reimbursed for out-of-pocket expenses. Others feel let down when their observations are used in scientific papers, but they are not listed as co-authors. Dr Hunt says some amateur palaeontologists are disappointed when told that they cannot take finds home with them.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">These are legitimate concerns but none seems insurmountable. Provided <note-67544 id=\"62\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">amateurs</note-67544> and professionals agree the terms on which they will work together beforehand, there is no reason why co-operation between the two groups should not flourish. Last year Dr S. Carlson, founder of the Society for Amateur Scientists won an award worth $290,000 for his work in promoting such co-operation. He says that one of the main benefits of the prize is the endorsement it has given to the contributions of amateur scientists, which has done much to silence critics among those professionals who believe science should remain their exclusive preserve.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">At the moment, says Dr Carlson, the society is involved in several schemes including an innovative rocket-design project and the setting up of a network of observers who will search for evidence of a link between low- frequency radiation and earthquakes. The  <note-2628 id=\"26\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals provide</note-2628> guidance for the amateurs ‘so that anything they do discover will be taken seriously’. Having laid the foundations of science, amateurs will have much to contribute to its ever – <note-45171 id=\"68\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--selected\" comment-active=\"false\" data-content=\"1\">expanding edifice</note-45171></p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/integrated-amateurs_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/integrated-amateurs_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "            <statusbar-contextual ng-show=\"activeTab != false\"></statusbar-contextual>\n" +
    "            <statusbar-default ng-show=\"activeTab == false\"></statusbar-default>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">In Praise of Amateurs</h1>\n" +
    "                <h2>Despite the specialization of scientific research, amateurs still have an important role to play</h2>\n" +
    "            </header>\n" +
    "\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p class=\"ng-scope\">During the scientific revolution of the <note-22991 id=\"80\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">17th century,</note-22991> scientists were largely men of <note-64913 id=\"81\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">private means who pursued</note-64913> their interest in natural philosophy for their own edification. Only in the past century or two has it become possible to make a living from investigating the workings of nature. Modern science was, in other words, built on the work of <note-11067 id=\"55\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"7\">amateurs</note-11067>. Today, science is an increasingly specialized and compartmentalized subject, the domain of experts who know <note-84084 id=\"82\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">more and more about less and less</note-84084>. Perhaps surprisingly, however, <note-79670 id=\"84\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">amateurs</note-79670> – even those without private means – are still important.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">A recent poll carried out at a meeting of the American Association for the Advancement of Science by astronomer Dr Richard Fienberg found that, in addition to his field of astronomy, amateurs are <note-86864 id=\"85\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">actively involved</note-86864> in such field as <note-99366 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">acoustics, horticulture, ornithology, meteorology, hydrology and palaeontology</note-99366>. Far from being <note-59071 id=\"86\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">crackpots</note-59071>, amateur scientists are often in close touch with professionals, some of whom rely <note-95873 id=\"87\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">heavily on their co-operation</note-95873>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Admittedly, <note-74709 id=\"88\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">some fields are more open to amateurs</note-74709> than others. Anything that <note-15904 id=\"89\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">requires expensive equipment</note-15904> is clearly a no-go area. And some kinds of research can be <note-67151 id=\"90\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">dangerous</note-67151>; most amateur chemists, jokes Dr Fienberg, are either locked up or have blown themselves to bits. But amateurs can make valuable contributions in fields from <note-44416 id=\"92\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">rocketry</note-44416> to palaeontology and the rise of the internet has made it easier than before to <note-63574 id=\"93\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">collect data and distribute results</note-63574>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Exactly which field of study has benefited most from the contributions of amateurs is a matter of some dispute. Dr Fienberg makes a strong case for <note-74433 id=\"47\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">astronomy</note-74433>. There is, he points out, a <note-73588 id=\"94\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">long tradition</note-73588> of collaboration between amateur and professional sky watchers. Today, in addition to <note-23656 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">asteroid spotting,</note-23656> amateurs continue to do valuable work observing the brightness of variable stars and detecting novae- ‘new’ stars in the Milky Way and supernovae in other galaxies. Amateur observers are helpful, says Dr Fienberg, because there are <note-18242 id=\"27\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">so many of them </note-18242>(they far outnumber professionals) and because they are <note-36635 id=\"50\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">distributed all over the world</note-36635>. </p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Another field in which amateurs have <note-18577 id=\"40\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">traditionally </note-18577>played an important role is <note-5432 id=\"29\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">palaeontology</note-5432>. Adrian Hunt, a palaeontologist at Mesa Technical College in New Mexico, insists that his is the field in which amateurs have made the biggest contribution. Despite the development of high-tech equipment, he says,<note-76636 id=\"95\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> the best sensors for finding fossils are human eye</note-76636>s – lots of them.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Finding volunteers to look for fossils is not difficult, he says, because of the near –universal interest in anything to do with dinosaurs. As well as helping with this research, volunteers <note-58596 id=\"42\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">learn about science</note-58596>, a process he calls ‘recreational education’.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Rick Bonney of the Cornell Laboratory of <note-81291 id=\"36\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">Ornithology</note-81291> in Ithaca, New York, contends that amateurs have contributed the most in his field. There are, he notes, thought to be as many as <note-42636 id=\"96\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">60 million birdwatchers </note-42636>in America alone. Given their <note-45833 id=\"97\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">huge numbers</note-45833> and the wide geographical coverage they provide, Mr Bonney has enlisted thousands of amateurs in a number of <note-97048 id=\"28\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">research projects</note-97048>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">Despite the successes and <note-55751 id=\"99\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">whatever the field of study</note-55751>, collaboration <note-77451 id=\"100\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">between amateurs and professionals </note-77451>is not without its difficulties. Not everyone,<note-10250 id=\"101\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\"> for example is happy with the term ‘amateur</note-10250>’. Mr Bonney has coined the term ‘<note-20068 id=\"103\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">citizen scientist</note-20068>’ because he felt that other words, such as ‘<note-56182 id=\"104\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">volunteer</note-56182>’ sounded disparaging. A more serious problem is the question of how professionals can best acknowledge the <note-44899 id=\"54\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions made by amateurs. </note-44899>Dr Fienberg says that some amateur astronomers are happy to provide their observations <note-25917 id=\"106\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">but grumble about not being reimbursed for out-of-pocket expenses</note-25917>. Others feel let down when their observations are used in scientific papers, but they are not listed as <note-91049 id=\"107\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">co-authors</note-91049>. Dr Hunt says some amateur palaeontologists are disappointed when told that they <note-33554 id=\"108\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">cannot take finds home with them</note-33554>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">These are legitimate concerns but none seems insurmountable. Provided <note-67544 id=\"62\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">amateurs</note-67544> and professionals agree the terms on which they will work together beforehand, there is no reason why co-operation between the two groups should not flourish. Last year Dr S. Carlson, founder of the <note-11495 id=\"111\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Society for Amateur Scientists</note-11495> won an<note-81606 id=\"110\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> award worth $290,000</note-81606> for his work in promoting such co-operation. He says that one of the main benefits of the prize is the endorsement it has given to the <note-35193 id=\"112\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions of amateur</note-35193> scientists, <note-53036 id=\"113\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">which has done much to silence critics</note-53036> among those <note-95549 id=\"114\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals who believe science should remain their exclusiv</note-95549>e preserve.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">At the moment, says Dr Carlson, <note-22631 id=\"115\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">the society is involved in several schemes including an innovative rocket-design</note-22631> project and the setting up of a network of observers who will <note-13037 id=\"116\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">search for evidence of a link between low- frequency radiation</note-13037> and earthquakes. The  <note-2628 id=\"26\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals provide</note-2628> guidance for the amateurs ‘<note-66862 id=\"117\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--selected\" comment-active=\"false\" data-content=\"1\">so that anything they do discover will be taken seriously</note-66862>’. Having laid the foundations of science, amateurs will have much to contribute to its ever – <note-45171 id=\"68\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--highlighted\" comment-active=\"false\" data-content=\"1\">expanding edifice</note-45171></p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/integrated-life.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/integrated-life.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "            <statusbar-contextual ng-show=\"activeTab != false\"></statusbar-contextual>\n" +
    "            <statusbar-default ng-show=\"activeTab == false\"></statusbar-default>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "            </header>\n" +
    "\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p  id=\"paragraph1\" paragraph>Until recently, the thought that there might ever be a cure for ageing seemed preposterous. Growing older and more decrepit appeared to be an inevitable and necessary part of being human. Over the last decade, however, scientists have begun to see ageing differently. Some now believe that the average life-expectancy may soon be pushed up to 160 years; others think that it may be extended to 200 or 300 years. A handful even wonder whether we might one day live for a millennium or more.</p>\n" +
    "\n" +
    "                <p  id=\"paragraph2\" paragraph>Behind this new excitement is the theory that the primary cause of ageing lies in highly reactive molecules called <note-35568 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">free radicals</note-35568>, left behind by the oxygen we breathe. Free radicals react with the molecules in our bodies, damaging DNA, proteins and other cell tissues, and are known to be implicated in <note-3256 id=\"16\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">diseases.</note-3256>  The body does its best to protect itself against free radicals by producing its own chemicals to prevent ageing, such as vitamins E and C, but it is always fighting a losing battle.</p>\n" +
    "\n" +
    "                <p   id=\"paragraph3\" paragraph>A year ago Gordon Lithgow of the University of Manchester discovered a way to help combat free radicals. Using one of these anti-ageing chemicals. he managed to increase the lifespan of one species of earthworm by 50 per cent. Despite cautionary words from the scientists, many welcomed this as the first step towards a drug which would extend life. Research involving the mutation of genes has also thrown up fascinating results, <note-95937 id=\"14\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">identifying two of the genes that appear to control how long the earthworm lives</note-95937>. When one considers the vast evolutionary distances that separate these species, it suggests that we may have discovered a key to how ageing is regulated throughout the entire animal kingdom.</p>\n" +
    "\n" +
    "                <p   id=\"paragraph4\" paragraph>In June last year a small American company called Eukarion sought permission to carry out the first trials of an anti-ageing drug, SCS, <note-98849 id=\"10\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">on human beings</note-98849>. Although it will initially be used to treat diseases associated with old age, Eukarion said, that 'if the effect of treating diseases of old age is to extend life, everyone's going to be happy.'</p>\n" +
    "\n" +
    "                <p   id=\"paragraph5\" paragraph>Some scientists, however, are quick to discourage extravagant speculation. 'There is no evidence whatsoever that swallowing any chemical would have an effect on mammals', says Rich Miller of the University of Michigan. 'And those people who claim it might need to go out and do some experimenting'. Some research, moreover, has produced alarming results. As well as controlling ageing, these, genes also partly control the hormones which regulate growth. The upshot of this is that although the lives of mutant mice can be extended by up to 80 per cent, they remain smaller than normal.</p>\n" +
    "\n" +
    "                <p   id=\"paragraph6\" paragraph>Quite apart <note-14999 id=\"8\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">from these sorts of horrors</note-14999>, the ethical implications of <note-51848 id=\"22\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">extending human lifespan </note-51848>are likely to worry many people. Even if the falling birth-rates reported in the world's developed nations were to be repeated throughout the world, would this be sufficient to compensate for massively extended life-expectancy, and would we be willing to see the demographic balance of our society change out of all recognition? David Gems, the head of the Centre for Research into Ageing at University College, London, is enthusiastic about the opportunities opened up by extended life, but even he observes, 'If people live much longer, the proportion of children would. of course, he very small. It strikes me that it might feel rather claustrophobic: all those middle-aged people and very few children or young people.'</p>\n" +
    "\n" +
    "                <p   id=\"paragraph7\" paragraph>The philosopher John Polkinghorne emphasises that any discussion of the merits of life-extending therapies must take into account the quality of the life that is lived: 'One would not wish to prolong life beyond the point it had ceased to be creative and fulfilling and meaningful,' he says. 'Presumably, there would have to come a point at which life ceased to be creative and<note-55180 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> became just repetition.</note-55180> Clearly, there are only so many rounds of golf one would want to play.'</p>\n" +
    "\n" +
    "                <p   id=\"paragraph8\" paragraph>But Polkinghorne, a member of the Human Genetics Commission, also observes that so far our experience of extended life-expectancy has not resulted in world-weariness. Throughout the last century, life-expectancy rose consistently, thanks to improved diet, better hygiene, continuous medical innovation and the provision of free or subsidised healthcare. In 1952 the Queen sent out 225 telegrams to people on their 100th birthday; in 1996 she sent out <note-24960 id=\"20\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">5218</note-24960>. 'Consider also, the lives of our Roman and Anglo-Saxon ancestors' he says. By and large, the doubling of human lifespan we have seen since then has not been a bad thing. Life has not become frustrating and boring. For example, we now live to see our children's children, and this is good.'</p>\n" +
    "\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/integrated-life_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/integrated-life_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "            <statusbar-contextual ng-show=\"activeTab != false\"></statusbar-contextual>\n" +
    "            <statusbar-default ng-show=\"activeTab == false\"></statusbar-default>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "            </header>\n" +
    "\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p id=\"paragraph1\" paragraph=\"\" class=\"ng-scope\">Until recently, the thought that there <note-45259 id=\"120\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">might ever be a cure for ageing seemed preposterous</note-45259>. Growing older and more decrepit appeared to be an <note-94865 id=\"122\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">inevitable and necessary part of being human.</note-94865> Over the last decade, however, scientists have begun to see ageing differently. Some now believe that the average life-expectancy may <note-4724 id=\"124\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">soon be pushed up to 160 years</note-4724>; others think that it may be extended to <note-69171 id=\"126\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">200 or 300 years</note-69171>. A handful even wonder whether we might <note-39750 id=\"127\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">one day live for a millennium or more</note-39750>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph2\" paragraph=\"\" class=\"ng-scope\">Behind this new excitement is the theory that the primary cause of ageing lies in highly reactive molecules called <note-35568 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">free radicals</note-35568>, left behind by the oxygen we breathe. <note-71804 id=\"129\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">Free radicals react with the molecules in our bodies</note-71804>, damaging DNA, proteins and other cell tissues, and are known to be implicated in <note-3256 id=\"16\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">diseases.</note-3256>  The <note-11786 id=\"131\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">body does its best to protect itself against free radicals </note-11786>by producing its <note-41347 id=\"133\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">own chemicals to prevent ageing</note-41347>, such as vitamins E and C, but it is <note-69371 id=\"132\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">always fighting a losing battle</note-69371>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph3\" paragraph=\"\" class=\"ng-scope\">A year ago Gordon Lithgow of the University of Manchester discovered<note-78780 id=\"134\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> a way to help combat free radicals</note-78780>. Using one of these anti-ageing chemicals. <note-41978 id=\"136\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">he</note-41978> managed to increase the lifespan of one species of earthworm <note-96840 id=\"135\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">by 50 per cent</note-96840>. Despite cautionary words from the scientists, <note-64115 id=\"138\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">many welcomed</note-64115> this as the first step towards a <note-61967 id=\"141\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">drug which would extend life</note-61967>. Research involving the mutation of <note-98489 id=\"142\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">genes</note-98489> has also thrown up fascinating results, <note-95937 id=\"14\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">identifying two of the genes that appear to control how long the earthworm lives</note-95937>. When one considers the vast <note-24541 id=\"143\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">evolutionary distances</note-24541> that separate these species, it suggests that we may have discovered a key to how <note-44621 id=\"144\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">ageing is regulated throughout the entire animal kingdom</note-44621>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph4\" paragraph=\"\" class=\"ng-scope\">In June last year a small American company called Eukarion sought permission to carry out the first trials of an <note-90266 id=\"145\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">anti-ageing drug</note-90266>, SCS, <note-98849 id=\"10\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">on human beings</note-98849>. Although it will initially be used to treat <note-89405 id=\"146\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">diseases associated with old age</note-89405>, Eukarion said, that 'if the effect of treating diseases of old age is to extend life, everyone's going to be happy.'</p>\n" +
    "\n" +
    "                <p id=\"paragraph5\" paragraph=\"\" class=\"ng-scope\">Some scientists, however, are <note-10457 id=\"148\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">quick to discourage extravagant speculation.</note-10457> 'There is <note-17194 id=\"149\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">no evidence</note-17194> whatsoever that swallowing any chemical would have an <note-20194 id=\"150\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">effect on mammals</note-20194>', says Rich Miller of the University of Michigan. 'And those people who claim it might need to go out and<note-16260 id=\"151\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> do some experimenting</note-16260>'. Some research, moreover, has produced alarming results. As well as controlling ageing, these, <note-11867 id=\"152\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">genes also partly control the hormones which regulate growth</note-11867>. The upshot of this is that although the lives of mutant mice can be extended by up to <note-3825 id=\"153\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">80 per cent, they remain smaller than normal</note-3825>.</p>\n" +
    "\n" +
    "                <p id=\"paragraph6\" paragraph=\"\" class=\"ng-scope\">Quite apart <note-14999 id=\"8\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">from these sorts of horrors</note-14999>, the ethical implications of <note-51848 id=\"22\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">extending human lifespan </note-51848>are likely to worry many people. Even if the <note-3195 id=\"154\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">falling birth-rates reported in the world's developed nation</note-3195>s were to be repeated throughout the world, would this be sufficient to compensate for massively extended life-expectancy, and would we be willing to see the demographic balance of our society change out of all recognition? David Gems, the head of the Centre for Research into Ageing at University College, London, is enthusiastic about the <note-58696 id=\"155\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">opportunities opened up by extended life</note-58696>, but even he observes, 'If people live much longer, the proportion of <note-88057 id=\"156\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">children would. of course, he very small</note-88057>. It strikes me that it might feel rather claustrophobic: all those middle-aged people and very few children or young people.'</p>\n" +
    "\n" +
    "                <p id=\"paragraph7\" paragraph=\"\" class=\"ng-scope\">The philosopher John Polkinghorne emphasises that any discussion of the merits of life-extending therapies must take into account the <note-31790 id=\"157\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">quality of the life that is lived:</note-31790> 'One would not wish to prolong life beyond the <note-98233 id=\"159\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">point it had ceased to be creative</note-98233> and fulfilling and meaningful,' he says. 'Presumably, there would have to come a point at which life ceased to be creative and<note-55180 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> became just repetition.</note-55180> Clearly, there are only so many rounds of golf one would want to play.'</p>\n" +
    "\n" +
    "                <p id=\"paragraph8\" paragraph=\"\" class=\"ng-scope\">But Polkinghorne, a member of the Human Genetics Commission, also observes that so far our experience of extended life-expectancy <note-88917 id=\"160\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">has not resulted in world-weariness</note-88917>. Throughout the last century, life-expectancy rose consistently, thanks to improved diet, <note-23732 id=\"161\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">better hygiene</note-23732>, continuous medical innovation and the provision of free or subsidised healthcare. In 1952 the Queen sent out <note-13668 id=\"162\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">225 telegrams</note-13668> to people on their 100th birthday; in 1996 she sent out <note-24960 id=\"20\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">5218</note-24960>. 'Consider also, the lives of our Roman and Anglo-Saxon ancestors' he says. By and large, <note-85446 id=\"164\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">the doubling of human lifespan</note-85446> we have seen since then has not been a bad thing. Life has not become frustrating and boring. For example,<note-86825 id=\"165\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> we now live to see our children's children</note-86825>, and this is good.'</p>\n" +
    "\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/integrated-light.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/integrated-light.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "            <statusbar-contextual ng-show=\"activeTab != false\"></statusbar-contextual>\n" +
    "            <statusbar-default ng-show=\"activeTab == false\"></statusbar-default>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Light Pollution</h1>\n" +
    "            </header>\n" +
    "\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p><span first></span>After hours of driving south in the pitch-black darkness of the Nevada desert, a dome of hazy gold suddenly appears on the horizon. Soon, a road sign confirms the obvious: Las Vegas 30 miles. Looking skyward, you notice that<note-60493 id=\"17\" comment-anchor=\"\" class=\" document__anchor--highlighted\" comment-active=\"false\" data-content=\"1\"> the Big Dipper</note-60493> is harder to find than it was an hour ago.</p>\n" +
    "\n" +
    "                <p ><note-12872 id=\"10\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"3\">Light pollution</note-12872>—the artificial light that illuminates more than its intended target area—has become a problem of increasing concern <note-71961 id=\"13\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"4\">across the country</note-71961> over the past 15 years. In the suburbs, where over-lit shopping mall parking lots are the norm, only 200 of the Milky Way’s 2,500 stars are visible on a clear night. Even fewer can be seen from large cities. In almost every town, big and small, street lights beam just as much light up and out as they do down, illuminating much more than just the street. Almost 50 percent of the light emanating from street lamps misses its intended target, and billboards, shopping centres, private homes and skyscrapers are similarly over-illuminated.</p>\n" +
    "\n" +
    "                <p > America has become so bright that in a satellite image of the United States at night, the outline of the country is visible from its lights alone. The major cities are all there, in bright clusters: New York, Boston, Miami, Houston, Los Angeles, Seattle, Chicago, and, of course, Las Vegas. Mark Adams, superintendent of the McDonald Observatory in west Texas, says that the very fact that city lights are visible from on high is proof of their wastefulness. “When you’re up in an airplane, all that light you see on the ground from the city is wasted. It’s going up into the night sky. That’s why you can see it.”</p>\n" +
    "\n" +
    "                <p > But don’t we need all those lights to <note-13793 id=\"1\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"2\">ensure our safety</note-13793>? The answer from light engineers, light pollution control advocates and astronomers is an emphatic “<note-59913 id=\"6\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"4\">no</note-59913>.” Elizabeth Alvarez of the International Dark Sky Association (IDA), a non-profit organization in Tucson, Arizona, says that overly bright security lights can actually force neighbours to close the shutters, which means that if any criminal activity does occur on the street, no one will see it. And the old assumption that bright lights deter crime appears to have been a false one: A new Department of Justice report concludes that there is no documented correlation between the level of lighting and the level of crime in an area. And contrary to popular belief, more crimes occur in broad daylight than at night.</p>\n" +
    "\n" +
    "                <p > For drivers, light can actually create a safety hazard. Glaring lights can temporarily blind drivers,<note-97389 id=\"5\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\"> increasing the likelihood</note-97389> of an accident. New Hampshire law forbids the use of “any light along a highway so positioned as to blind or dazzle the vision of travellers on the adjacent highway.”</p>\n" +
    "\n" +
    "                <p > Badly designed lighting can pose a threat to wildlife as well as people. Newly hatched turtles in Florida move toward beach lights instead of the more muted silver shimmer of the ocean. Migrating birds, confused by lights on skyscrapers, broadcast towers and lighthouses, are injured, sometimes fatally, after colliding with high, lighted structures. And light pollution harms air quality as well: Because most of the country’s power plants are still powered by fossil fuels, more light means more air pollution.</p>\n" +
    "\n" +
    "                <p > So what can be done? Tucson, Arizona is taking back the night. The city has one of the best lighting ordinances in the country, and, not coincidentally, the highest concentration of observatories in the world. Kitt Peak National Optical Astronomy Observatory has 24 telescopes aimed skyward around the city’s perimeter, and its cadre of astronomers needs a dark sky to work with.</p>\n" +
    "\n" +
    "                <p > For a while, that darkness was threatened. “We were totally losing the night sky,” Jim Singleton of Tucson’s Lighting Committee told <note-67553 id=\"3\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\">Tulsa, Oklahoma’s.</note-67553>\n" +
    "                 The same thing is happening in a handful of other states, including Texas, which just passed a light pollution bill last summer. “Astronomers can get what they need at the same time that citizens get what they need: safety, security and good visibility at night,” says McDonald Observatory’s Mark Adams, who provided testimony at the hearings for the bill.\n" +
    "                </p>\n" +
    "\n" +
    "\n" +
    "                <p >And in the long run, everyone benefits from reduced energy costs. Wasted energy from inefficient lighting costs us between $1 and $2 billion a year, according to IDA. The city of San Diego, which installed new, high-efficiency street lights, now saves about $3 million a year in energy costs.</p>\n" +
    "\n" +
    "                <p >Legislation isn’t the only answer to light pollution problems. Brian Greer, Central Ohio representative for the Ohio Light Pollution Advisory Council, says that education is just as important, if not more so. “There are some special situations where regulation is the only fix,” he says. “But the vast majority of bad lighting is simply the <note-83529 id=\"4\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\">result of not knowing any better.</note-83529></p>\n" +
    "\n" +
    "                <p >*The Big Dipper: a group of seven bright stars visible in the Northern Hemisphere. </p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" >\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/integrated-light_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/integrated-light_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "            <statusbar-contextual ng-show=\"activeTab != false\"></statusbar-contextual>\n" +
    "            <statusbar-default ng-show=\"activeTab == false\"></statusbar-default>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">Light Pollution</h1>\n" +
    "            </header>\n" +
    "\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                <p class=\"ng-scope\"><span first=\"\"></span>After hours of driving south in the<note-54688 id=\"122\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> pitch-black darkness of the Nevada desert</note-54688>, a <note-44437 id=\"120\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">dome of hazy gold</note-44437> suddenly appears on the horizon. Soon, a road sign confirms the obvious:<note-5157 id=\"121\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> Las Vegas 30 miles</note-5157>. Looking skyward, you notice that<note-60493 id=\"17\" comment-anchor=\"\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\" comment-active=\"false\" data-content=\"1\"> the Big Dipper</note-60493> is harder to find than it was an hour ago.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"><note-12872 id=\"10\" comment-anchor=\"\" comment-active=\"false\" data-content=\"3\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">Light pollution</note-12872>—the artificial light that illuminates more than its intended target area—has become a problem of increasing concern <note-71961 id=\"13\" comment-anchor=\"\" comment-active=\"false\" data-content=\"4\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">across the country</note-71961> over the past 15 years. In the suburbs, where over-lit shopping mall parking lots are the norm, only 200 of the <note-26760 id=\"123\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Milky Way’s 2,500 stars</note-26760> are visible on a <note-21502 id=\"124\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">clear night.</note-21502> Even fewer can be <note-24679 id=\"126\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">seen from large cities</note-24679>. In almost every town, big and small, street lights beam just as much light up and out as they do down, illuminating much more than just the street. Almost<note-50003 id=\"127\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> 50 percent of the light emanating from street lamps misses its intended target</note-50003>, and billboards, shopping centres, private homes and skyscrapers are similarly <note-9922 id=\"128\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">over-illuminated</note-9922>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> America has become so bright that in a <note-92530 id=\"129\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">satellite image of the United States </note-92530>at night, the outline of the country is visible from its lights alone. The <note-58109 id=\"130\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">major cities are all there,</note-58109> in bright clusters: New York, Boston, Miami, Houston, Los Angeles, Seattle, Chicago, and, of course, Las Vegas. Mark Adams, superintendent of the McDonald Observatory in west Texas, says that the very fact that city lights are visible from on high is<note-7255 id=\"131\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> proof of their wastefulness</note-7255>. “When you’re up in an airplane, all that light you see on the ground from the city is wasted. It’s going up into the night sky. That’s why you can see it.”</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> But don’t we need all those lights to <note-13793 id=\"1\" comment-anchor=\"\" comment-active=\"false\" data-content=\"2\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">ensure our safety</note-13793>? The answer from light engineers, light pollution control advocates and astronomers is an emphatic “<note-59913 id=\"6\" comment-anchor=\"\" comment-active=\"false\" data-content=\"4\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">no</note-59913>.” Elizabeth Alvarez of the International Dark Sky Association (IDA), a non-profit organization in Tucson, Arizona, says that overly bright security lights can actually <note-75740 id=\"132\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">force neighbours to close the shutters</note-75740>, which means that if any criminal activity does occur on the street, <note-55749 id=\"133\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">no one will see it</note-55749>. And the old assumption that bright lights deter crime appears to have been a false one: A new Department of Justice report concludes that there is no documented correlation between the level of lighting and the level of crime in an area. And contrary to popular belief, <note-85301 id=\"134\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">more crimes occur in broad daylight than at night</note-85301>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> For drivers, light can actually create a safety hazard. Glaring lights can temporarily blind drivers,<note-97389 id=\"5\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\"> increasing the likelihood</note-97389> of an accident. New Hampshire law forbids the use of “<note-76210 id=\"135\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">any light along a highway so positioned as to blind or dazzle</note-76210> the vision of travellers on the adjacent highway.”</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> Badly designed lighting can pose a threat to <note-91403 id=\"136\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">wildlife</note-91403> as well as people. <note-50014 id=\"137\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">Newly hatched turtles in Florida move toward beach lights</note-50014> instead of the more muted silver shimmer of the ocean. <note-8434 id=\"139\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Migrating birds, </note-8434>confused by lights on skyscrapers, broadcast towers and lighthouses, are injured, sometimes fatally, after colliding with high, lighted structures. And light pollution harms air quality as well: Because most of the country’s power plants are still <note-76925 id=\"140\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">powered by fossil fuels</note-76925>, more light means more air pollution.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> So what can be done?<note-12079 id=\"142\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> Tucson, Arizona is taking back the night. </note-12079>The city has one of the best lighting <note-50496 id=\"143\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">ordinances</note-50496> in the country, and, not coincidentally, the <note-54098 id=\"144\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">highest concentration of observatories in the world</note-54098>. Kitt Peak National Optical Astronomy Observatory has <note-50007 id=\"145\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">24 telescopes</note-50007> aimed skyward around the city’s perimeter, and its <note-49800 id=\"146\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">cadre</note-49800> of astronomers needs a dark sky to work with.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"> For a while,<note-76315 id=\"147\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> that darkness was threatened.</note-76315> “We were totally losing the night sky,” Jim Singleton of Tucson’s Lighting Committee told <note-67553 id=\"3\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">Tulsa, Oklahoma’s.</note-67553>\n" +
    "                 The same thing is happening in a handful of other states, including Texas, which just passed a light <note-61913 id=\"149\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">pollution bill</note-61913> last summer. “<note-29921 id=\"148\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Astronomers can get what they need at the same time that citizens get what they need</note-29921>: safety, security and good visibility at night,” says McDonald Observatory’s Mark Adams, who provided testimony at the hearings for the bill.\n" +
    "                </p>\n" +
    "\n" +
    "\n" +
    "                <p class=\"ng-scope\">And in the long run, everyone benefits from <note-55133 id=\"150\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">reduced energy costs</note-55133>. <note-4930 id=\"151\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Wasted energy</note-4930> from inefficient lighting costs us between $1 and <note-49938 id=\"152\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">$2 billion a year</note-49938>, according to<note-10392 id=\"153\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\"> IDA</note-10392>. The city of San Diego, which installed <note-24091 id=\"155\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">new, high-efficiency street lights</note-24091>, now saves about $<note-63469 id=\"157\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">3 million a year in energy costs</note-63469>.</p>\n" +
    "\n" +
    "                <p class=\"ng-scope\"><note-72784 id=\"158\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Legislation isn’t the only answer to light pollution problems</note-72784>. Brian Greer, Central Ohio representative for the Ohio Light Pollution Advisory Council, says that <note-46168 id=\"159\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">education is just as important</note-46168>, if not more so. “There are some special situations where regulation is the only fix,” he says. “<note-61368 id=\"161\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">But the vast majority of bad lighting</note-61368> is simply the <note-83529 id=\"4\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">result of not knowing any better.</note-83529></p>\n" +
    "\n" +
    "                <p class=\"ng-scope\">*The Big Dipper: a group of seven bright stars visible in the Northern Hemisphere. </p>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" >\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/interface.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/interface.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <heatmap ng-show=\"interfaceType === 'heatmap'\"></heatmap>\n" +
    "        <!-- <div class=\"\" ng-repeat=\"n in setDivs(47) track by $index\" ng-show=\"interfaceType === 'heatmap'\">\n" +
    "            <span class=\"relevantComments\" id=\"anchorRelevant{{$index}}\" relevant-anchor ></span>\n" +
    "            <span class=\"heatmap\" id=\"{{$index}}\" ng-click=\"setActiveLine( $index )\" heatmap ></span>\n" +
    "            <span class=\"teacherParticipation\" id=\"teacherParticipation{{$index}}\" ng-click=\"setActiveLine( $index )\" teacherParticipation></span>\n" +
    "        </div> -->\n" +
    "\n" +
    "        <!-- check how to re-initialize html so that it recognizes directives -->\n" +
    "        <div ng-html={content}>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\">\n" +
    "        <!-- TODO: rename to search -->\n" +
    "        <comment-tabs></comment-tabs>\n" +
    "        <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "        <div class=\"new-positioning-grid\">\n" +
    "            <div ng-repeat=\"comment in comments | filter:filterLine track by $index\">\n" +
    "                <contextual-comment comment=\"comment\"></contextual-comment>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/optionsPanel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/optionsPanel.html",
    "<!--<div class=\"options-toolbar\" ng-show=\"optionsPanel\" ng-class=\"{'options-toolbar--hidden': showOptions}\">\n" +
    "  <div class=\"l-block\">\n" +
    "    <div class=\"options-toolbar__title\" >Filtering Options</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <label class=\"l-block-small\">\n" +
    "    <input type=\"checkbox\" ng-model=\"onlyProf\" ng-change=\"toggleProf()\"> Only Show Comments with Prof\n" +
    "  </label>-->\n" +
    "\n" +
    "  <div class=\"l-block\">\n" +
    "    <search-bar></search-bar>\n" +
    "  </div>\n" +
    "<!--</div>-->");
}]);

angular.module("templates/paragraph-amateurs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/paragraph-amateurs.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "  <div class=\"grid__item three-quarters\">\n" +
    "    <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "      <statusbar-contextual ng-show=\"activeTab == 'contextual'\"></statusbar-contextual>\n" +
    "      <statusbar-paragraph></statusbar-paragraph>\n" +
    "      \n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <article class=\"document\">\n" +
    "      <header class='l-block-med'>\n" +
    "        <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"content-area\" select-anchor=\"\">\n" +
    "        <div class=\"container\">\n" +
    "          <button  ng-show=\"activeParagraph !='paragraph1'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph1'; activeTab ='paragraph1'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "            <button  ng-show=\"activeParagraph == 'paragraph1'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "              Hide\n" +
    "            </button>\n" +
    "        </div>             \n" +
    "        \n" +
    "        <p  id=\"paragraph1\" paragraph>During the scientific revolution of the 17th century, scientists were largely men of private means who pursued their interest in natural philosophy for their own edification. Only in the past century or two has it become possible to make a living from investigating the workings of nature. Modern science was, in other words, built on the work of <note-11067 id=\"55\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"7\">amateurs</note-11067>. Today, science is an increasingly specialized and compartmentalized subject, the domain of experts who know more and more about less and less. Perhaps surprisingly, however, amateurs – even those without private means – are still important.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph2'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph2'; activeTab ='paragraph2'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph2'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p  id=\"paragraph2\" paragraph>A recent poll carried out at a meeting of the American Association for the Advancement of Science by astronomer Dr Richard Fienberg found that, in addition to his field of astronomy, amateurs are actively involved in such field as <note-99366 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">acoustics, horticulture, ornithology, meteorology, hydrology and palaeontology</note-99366>. Far from being crackpots, amateur scientists are often in close touch with professionals, some of whom rely heavily on their co-operation.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph3'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph3'; activeTab ='paragraph3'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph3'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p   id=\"paragraph3\" paragraph>Admittedly, some fields are more open to amateurs than others. Anything that requires expensive equipment is clearly a no-go area. And some kinds of research can be dangerous; most amateur chemists, jokes Dr Fienberg, are either locked up or have blown themselves to bits. But amateurs can make valuable contributions in fields from rocketry to palaeontology and the rise of the internet has made it easier than before to collect data and distribute results.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph4'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph4'; activeTab ='paragraph4'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph4'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "     \n" +
    "        <p   id=\"paragraph4\" paragraph>Exactly which field of study has benefited most from the contributions of amateurs is a matter of some dispute. Dr Fienberg makes a strong case for <note-74433 id=\"47\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">astronomy</note-74433>. There is, he points out, a long tradition of collaboration between amateur and professional sky watchers. Today, in addition to <note-23656 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">asteroid spotting,</note-23656> amateurs continue to do valuable work observing the brightness of variable stars and detecting novae- ‘new’ stars in the Milky Way and supernovae in other galaxies. Amateur observers are helpful, says Dr Fienberg, because there are <note-18242 id=\"27\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">so many of them </note-18242>(they far outnumber professionals) and because they are <note-36635 id=\"50\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">distributed all over the world</note-36635>. </p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph5'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph5'; activeTab ='paragraph5'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph5'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>   \n" +
    "        </div>\n" +
    "       \n" +
    "        <p   id=\"paragraph5\" paragraph>Another field in which amateurs have <note-18577 id=\"40\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">traditionally </note-18577>played an important role is <note-5432 id=\"29\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">palaeontology</note-5432>. Adrian Hunt, a palaeontologist at Mesa Technical College in New Mexico, insists that his is the field in which amateurs have made the biggest contribution. Despite the development of high-tech equipment, he says, the best sensors for finding fossils are human eyes – lots of them.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph6'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph6'; activeTab ='paragraph6'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph6'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph6\" paragraph>Finding volunteers to look for fossils is not difficult, he says, because of the near –universal interest in anything to do with dinosaurs. As well as helping with this research, volunteers <note-58596 id=\"42\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">learn about science</note-58596>, a process he calls ‘recreational education’.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph7'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph7'; activeTab ='paragraph7'\">. . .\n" +
    "             <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph7'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph7\" paragraph>Rick Bonney of the Cornell Laboratory of <note-81291 id=\"36\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">Ornithology</note-81291> in Ithaca, New York, contends that amateurs have contributed the most in his field. There are, he notes, thought to be as many as 60 million birdwatchers in America alone. Given their huge numbers and the wide geographical coverage they provide, Mr Bonney has enlisted thousands of amateurs in a number of <note-97048 id=\"28\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">research projects</note-97048>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph8'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph8'; activeTab ='paragraph8'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph8'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph8\" paragraph>Despite the successes and whatever the field of study, collaboration between amateurs and professionals is not without its difficulties. Not everyone, for example is happy with the term ‘amateur’. Mr Bonney has coined the term ‘citizen scientist’ because he felt that other words, such as ‘volunteer’ sounded disparaging. A more serious problem is the question of how professionals can best acknowledge the <note-44899 id=\"54\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions made by amateurs. </note-44899>Dr Fienberg says that some amateur astronomers are happy to provide their observations but grumble about not being reimbursed for out-of-pocket expenses. Others feel let down when their observations are used in scientific papers, but they are not listed as co-authors. Dr Hunt says some amateur palaeontologists are disappointed when told that they cannot take finds home with them.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph9'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph9'; activeTab ='paragraph9'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph9'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph9\" paragraph>These are legitimate concerns but none seems insurmountable. Provided <note-67544 id=\"62\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">amateurs</note-67544> and professionals agree the terms on which they will work together beforehand, there is no reason why co-operation between the two groups should not flourish. Last year Dr S. Carlson, founder of the Society for Amateur Scientists won an award worth $290,000 for his work in promoting such co-operation. He says that one of the main benefits of the prize is the endorsement it has given to the contributions of amateur scientists, which has done much to silence critics among those professionals who believe science should remain their exclusive preserve.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph10'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph10'; activeTab ='paragraph10'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph10'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph10\" paragraph>At the moment, says Dr Carlson, the society is involved in several schemes including an innovative rocket-design project and the setting up of a network of observers who will search for evidence of a link between low- frequency radiation and earthquakes. The  <note-2628 id=\"26\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals provide</note-2628> guidance for the amateurs ‘so that anything they do discover will be taken seriously’. Having laid the foundations of science, amateurs will have much to contribute to its ever – <note-45171 id=\"68\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--selected\" comment-active=\"false\" data-content=\"1\">expanding edifice</note-45171></note-83529></p>\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </div><!--\n" +
    "\n" +
    "--><div class=\"grid__item one-quarter\">\n" +
    "    <comment-tabs></comment-tabs>      \n" +
    "    <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "    \n" +
    "    <div class=\"new-positioning-grid\">\n" +
    "      <div ng-if=\"activeParagaph != false\">\n" +
    "        <div ng-repeat=\"comment in contextualComments | filter:filterPara1 track by $index\">\n" +
    "          <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "          <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/paragraph-amateurs_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/paragraph-amateurs_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "  <div class=\"grid__item three-quarters\">\n" +
    "    <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "      <statusbar-contextual ng-show=\"activeTab == 'contextual'\"></statusbar-contextual>\n" +
    "      <statusbar-paragraph></statusbar-paragraph>\n" +
    "      \n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <article class=\"document\">\n" +
    "      <header class='l-block-med'>\n" +
    "        <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"content-area\" select-anchor=\"\">\n" +
    "        <div class=\"container\">\n" +
    "          <button  ng-show=\"activeParagraph !='paragraph1'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph1'; activeTab ='paragraph1'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "            <button  ng-show=\"activeParagraph == 'paragraph1'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "              Hide\n" +
    "            </button>\n" +
    "        </div>             \n" +
    "        \n" +
    "        <p  id=\"paragraph1\" paragraph>During the scientific revolution of the <note-22991 id=\"80\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">17th century,</note-22991> scientists were largely men of <note-64913 id=\"81\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">private means who pursued</note-64913> their interest in natural philosophy for their own edification. Only in the past century or two has it become possible to make a living from investigating the workings of nature. Modern science was, in other words, built on the work of <note-11067 id=\"55\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"7\">amateurs</note-11067>. Today, science is an increasingly specialized and compartmentalized subject, the domain of experts who know <note-84084 id=\"82\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">more and more about less and less</note-84084>. Perhaps surprisingly, however, <note-79670 id=\"84\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">amateurs</note-79670> – even those without private means – are still important.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph2'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph2'; activeTab ='paragraph2'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph2'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p  id=\"paragraph2\" paragraph>A recent poll carried out at a meeting of the American Association for the Advancement of Science by astronomer Dr Richard Fienberg found that, in addition to his field of astronomy, amateurs are <note-86864 id=\"85\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">actively involved</note-86864> in such field as <note-99366 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">acoustics, horticulture, ornithology, meteorology, hydrology and palaeontology</note-99366>. Far from being <note-59071 id=\"86\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">crackpots</note-59071>, amateur scientists are often in close touch with professionals, some of whom rely <note-95873 id=\"87\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">heavily on their co-operation</note-95873>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph3'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph3'; activeTab ='paragraph3'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph3'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p   id=\"paragraph3\" paragraph>Admittedly, <note-74709 id=\"88\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">some fields are more open to amateurs</note-74709> than others. Anything that <note-15904 id=\"89\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">requires expensive equipment</note-15904> is clearly a no-go area. And some kinds of research can be <note-67151 id=\"90\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">dangerous</note-67151>; most amateur chemists, jokes Dr Fienberg, are either locked up or have blown themselves to bits. But amateurs can make valuable contributions in fields from <note-44416 id=\"92\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">rocketry</note-44416> to palaeontology and the rise of the internet has made it easier than before to <note-63574 id=\"93\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">collect data and distribute results</note-63574>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph4'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph4'; activeTab ='paragraph4'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph4'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "     \n" +
    "        <p   id=\"paragraph4\" paragraph>Exactly which field of study has benefited most from the contributions of amateurs is a matter of some dispute. Dr Fienberg makes a strong case for <note-74433 id=\"47\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">astronomy</note-74433>. There is, he points out, a <note-73588 id=\"94\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">long tradition</note-73588> of collaboration between amateur and professional sky watchers. Today, in addition to <note-23656 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">asteroid spotting,</note-23656> amateurs continue to do valuable work observing the brightness of variable stars and detecting novae- ‘new’ stars in the Milky Way and supernovae in other galaxies. Amateur observers are helpful, says Dr Fienberg, because there are <note-18242 id=\"27\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">so many of them </note-18242>(they far outnumber professionals) and because they are <note-36635 id=\"50\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">distributed all over the world</note-36635>. </p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph5'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph5'; activeTab ='paragraph5'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph5'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>   \n" +
    "        </div>\n" +
    "       \n" +
    "        <p   id=\"paragraph5\" paragraph>Another field in which amateurs have <note-18577 id=\"40\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">traditionally </note-18577>played an important role is <note-5432 id=\"29\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">palaeontology</note-5432>. Adrian Hunt, a palaeontologist at Mesa Technical College in New Mexico, insists that his is the field in which amateurs have made the biggest contribution. Despite the development of high-tech equipment, he says,<note-76636 id=\"95\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> the best sensors for finding fossils are human eye</note-76636>s – lots of them.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph6'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph6'; activeTab ='paragraph6'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph6'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph6\" paragraph>Finding volunteers to look for fossils is not difficult, he says, because of the near –universal interest in anything to do with dinosaurs. As well as helping with this research, volunteers <note-58596 id=\"42\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">learn about science</note-58596>, a process he calls ‘recreational education’.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph7'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph7'; activeTab ='paragraph7'\">. . .\n" +
    "             <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph7'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph7\" paragraph>Rick Bonney of the Cornell Laboratory of <note-81291 id=\"36\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"4\">Ornithology</note-81291> in Ithaca, New York, contends that amateurs have contributed the most in his field. There are, he notes, thought to be as many as <note-42636 id=\"96\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">60 million birdwatchers </note-42636>in America alone. Given their <note-45833 id=\"97\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">huge numbers</note-45833> and the wide geographical coverage they provide, Mr Bonney has enlisted thousands of amateurs in a number of <note-97048 id=\"28\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">research projects</note-97048>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph8'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph8'; activeTab ='paragraph8'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph8'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph8\" paragraph>Despite the successes and <note-55751 id=\"99\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">whatever the field of study</note-55751>, collaboration <note-77451 id=\"100\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">between amateurs and professionals </note-77451>is not without its difficulties. Not everyone,<note-10250 id=\"101\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\"> for example is happy with the term ‘amateur</note-10250>’. Mr Bonney has coined the term ‘<note-20068 id=\"103\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">citizen scientist</note-20068>’ because he felt that other words, such as ‘<note-56182 id=\"104\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">volunteer</note-56182>’ sounded disparaging. A more serious problem is the question of how professionals can best acknowledge the <note-44899 id=\"54\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions made by amateurs. </note-44899>Dr Fienberg says that some amateur astronomers are happy to provide their observations <note-25917 id=\"106\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">but grumble about not being reimbursed for out-of-pocket expenses</note-25917>. Others feel let down when their observations are used in scientific papers, but they are not listed as <note-91049 id=\"107\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">co-authors</note-91049>. Dr Hunt says some amateur palaeontologists are disappointed when told that they <note-33554 id=\"108\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">cannot take finds home with them</note-33554>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph9'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph9'; activeTab ='paragraph9'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph9'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph9\" paragraph>These are legitimate concerns but none seems insurmountable. Provided <note-67544 id=\"62\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">amateurs</note-67544> and professionals agree the terms on which they will work together beforehand, there is no reason why co-operation between the two groups should not flourish. Last year Dr S. Carlson, founder of the <note-11495 id=\"111\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Society for Amateur Scientists</note-11495> won an<note-81606 id=\"110\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> award worth $290,000</note-81606> for his work in promoting such co-operation. He says that one of the main benefits of the prize is the endorsement it has given to the <note-35193 id=\"112\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">contributions of amateur</note-35193> scientists, <note-53036 id=\"113\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">which has done much to silence critics</note-53036> among those <note-95549 id=\"114\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals who believe science should remain their exclusiv</note-95549>e preserve.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph10'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph10'; activeTab ='paragraph10'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph10'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph10\" paragraph>At the moment, says Dr Carlson, <note-22631 id=\"115\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">the society is involved in several schemes including an innovative rocket-design</note-22631> project and the setting up of a network of observers who will <note-13037 id=\"116\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">search for evidence of a link between low- frequency radiation</note-13037> and earthquakes. The  <note-2628 id=\"26\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">professionals provide</note-2628> guidance for the amateurs ‘<note-66862 id=\"117\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--selected\" comment-active=\"false\" data-content=\"1\">so that anything they do discover will be taken seriously</note-66862>’. Having laid the foundations of science, amateurs will have much to contribute to its ever – <note-45171 id=\"68\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num document__anchor--highlighted\" comment-active=\"false\" data-content=\"1\">expanding edifice</note-45171></p>\n" +
    "\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </div><!--\n" +
    "\n" +
    "--><div class=\"grid__item one-quarter\">\n" +
    "    <comment-tabs></comment-tabs>      \n" +
    "    <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "    \n" +
    "    <div class=\"new-positioning-grid\">\n" +
    "      <div ng-if=\"activeParagaph != false\">\n" +
    "        <div ng-repeat=\"comment in contextualComments | filter:filterPara1 track by $index\">\n" +
    "          <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "          <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/paragraph-life.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/paragraph-life.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "  <div class=\"grid__item three-quarters\">\n" +
    "    <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "      <statusbar-contextual ng-show=\"activeTab == 'contextual'\"></statusbar-contextual>\n" +
    "      <statusbar-paragraph></statusbar-paragraph>\n" +
    "      \n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <article class=\"document\">\n" +
    "      <header class='l-block-med'>\n" +
    "        <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"content-area\" select-anchor=\"\">\n" +
    "        <div class=\"container\">\n" +
    "          <button  ng-show=\"activeParagraph !='paragraph1'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph1'; activeTab ='paragraph1'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "            <button  ng-show=\"activeParagraph == 'paragraph1'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "              Hide\n" +
    "            </button>\n" +
    "        </div>             \n" +
    "        \n" +
    "        <p  id=\"paragraph1\" paragraph>Until recently, the thought that there might ever be a cure for ageing seemed preposterous. Growing older and more decrepit appeared to be an inevitable and necessary part of being human. Over the last decade, however, scientists have begun to see ageing differently. Some now believe that the average life-expectancy may soon be pushed up to 160 years; others think that it may be extended to 200 or 300 years. A handful even wonder whether we might one day live for a millennium or more.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph2'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph2'; activeTab ='paragraph2'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph2'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p  id=\"paragraph2\" paragraph>Behind this new excitement is the theory that the primary cause of ageing lies in highly reactive molecules called <note-35568 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">free radicals</note-35568>, left behind by the oxygen we breathe. Free radicals react with the molecules in our bodies, damaging DNA, proteins and other cell tissues, and are known to be implicated in <note-3256 id=\"16\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">diseases.</note-3256>  The body does its best to protect itself against free radicals by producing its own chemicals to prevent ageing, such as vitamins E and C, but it is always fighting a losing battle.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph3'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph3'; activeTab ='paragraph3'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph3'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p   id=\"paragraph3\" paragraph>A year ago Gordon Lithgow of the University of Manchester discovered a way to help combat free radicals. Using one of these anti-ageing chemicals. he managed to increase the lifespan of one species of earthworm by 50 per cent. Despite cautionary words from the scientists, many welcomed this as the first step towards a drug which would extend life. Research involving the mutation of genes has also thrown up fascinating results, <note-95937 id=\"14\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">identifying two of the genes that appear to control how long the earthworm lives</note-95937>. When one considers the vast evolutionary distances that separate these species, it suggests that we may have discovered a key to how ageing is regulated throughout the entire animal kingdom.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph4'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph4'; activeTab ='paragraph4'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph4'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "     \n" +
    "        <p   id=\"paragraph4\" paragraph>In June last year a small American company called Eukarion sought permission to carry out the first trials of an anti-ageing drug, SCS, <note-98849 id=\"10\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">on human beings</note-98849>. Although it will initially be used to treat diseases associated with old age, Eukarion said, that 'if the effect of treating diseases of old age is to extend life, everyone's going to be happy.'</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph5'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph5'; activeTab ='paragraph5'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph5'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>   \n" +
    "        </div>\n" +
    "       \n" +
    "        <p   id=\"paragraph5\" paragraph>Some scientists, however, are quick to discourage extravagant speculation. 'There is no evidence whatsoever that swallowing any chemical would have an effect on mammals', says Rich Miller of the University of Michigan. 'And those people who claim it might need to go out and do some experimenting'. Some research, moreover, has produced alarming results. As well as controlling ageing, these, genes also partly control the hormones which regulate growth. The upshot of this is that although the lives of mutant mice can be extended by up to 80 per cent, they remain smaller than normal.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph6'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph6'; activeTab ='paragraph6'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph6'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph6\" paragraph>Quite apart <note-14999 id=\"8\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">from these sorts of horrors</note-14999>, the ethical implications of <note-51848 id=\"22\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">extending human lifespan </note-51848>are likely to worry many people. Even if the falling birth-rates reported in the world's developed nations were to be repeated throughout the world, would this be sufficient to compensate for massively extended life-expectancy, and would we be willing to see the demographic balance of our society change out of all recognition? David Gems, the head of the Centre for Research into Ageing at University College, London, is enthusiastic about the opportunities opened up by extended life, but even he observes, 'If people live much longer, the proportion of children would. of course, he very small. It strikes me that it might feel rather claustrophobic: all those middle-aged people and very few children or young people.'</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph7'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph7'; activeTab ='paragraph7'\">. . .\n" +
    "             <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph7'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph7\" paragraph>The philosopher John Polkinghorne emphasises that any discussion of the merits of life-extending therapies must take into account the quality of the life that is lived: 'One would not wish to prolong life beyond the point it had ceased to be creative and fulfilling and meaningful,' he says. 'Presumably, there would have to come a point at which life ceased to be creative and<note-55180 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> became just repetition.</note-55180> Clearly, there are only so many rounds of golf one would want to play.'</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph8'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph8'; activeTab ='paragraph8'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph8'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph8\" paragraph>But Polkinghorne, a member of the Human Genetics Commission, also observes that so far our experience of extended life-expectancy has not resulted in world-weariness. Throughout the last century, life-expectancy rose consistently, thanks to improved diet, better hygiene, continuous medical innovation and the provision of free or subsidised healthcare. In 1952 the Queen sent out 225 telegrams to people on their 100th birthday; in 1996 she sent out <note-24960 id=\"20\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">5218</note-24960>. 'Consider also, the lives of our Roman and Anglo-Saxon ancestors' he says. By and large, the doubling of human lifespan we have seen since then has not been a bad thing. Life has not become frustrating and boring. For example, we now live to see our children's children, and this is good.'</p>\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </div><!--\n" +
    "\n" +
    "--><div class=\"grid__item one-quarter\">\n" +
    "    <comment-tabs></comment-tabs>      \n" +
    "    <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "    \n" +
    "    <div class=\"new-positioning-grid\">\n" +
    "      <div ng-if=\"activeParagaph != false\">\n" +
    "        <div ng-repeat=\"comment in contextualComments | filter:filterPara1 track by $index\">\n" +
    "          <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "          <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/paragraph-life_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/paragraph-life_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "  <div class=\"grid__item three-quarters\">\n" +
    "    <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "      <statusbar-contextual ng-show=\"activeTab == 'contextual'\"></statusbar-contextual>\n" +
    "      <statusbar-paragraph></statusbar-paragraph>\n" +
    "      \n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <article class=\"document\">\n" +
    "      <header class='l-block-med'>\n" +
    "        <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"content-area\" select-anchor=\"\">\n" +
    "        <div class=\"container\">\n" +
    "          <button  ng-show=\"activeParagraph !='paragraph1'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph1'; activeTab ='paragraph1'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "            <button  ng-show=\"activeParagraph == 'paragraph1'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "              Hide\n" +
    "            </button>\n" +
    "        </div>             \n" +
    "        \n" +
    "        <p id=\"paragraph1\" paragraph=\"\" class=\"ng-scope\">Until recently, the thought that there <note-45259 id=\"120\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">might ever be a cure for ageing seemed preposterous</note-45259>. Growing older and more decrepit appeared to be an <note-94865 id=\"122\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">inevitable and necessary part of being human.</note-94865> Over the last decade, however, scientists have begun to see ageing differently. Some now believe that the average life-expectancy may <note-4724 id=\"124\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">soon be pushed up to 160 years</note-4724>; others think that it may be extended to <note-69171 id=\"126\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">200 or 300 years</note-69171>. A handful even wonder whether we might <note-39750 id=\"127\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">one day live for a millennium or more</note-39750>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph2'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph2'; activeTab ='paragraph2'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph2'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p id=\"paragraph2\" paragraph=\"\" class=\"ng-scope\">Behind this new excitement is the theory that the primary cause of ageing lies in highly reactive molecules called <note-35568 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">free radicals</note-35568>, left behind by the oxygen we breathe. <note-71804 id=\"129\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">Free radicals react with the molecules in our bodies</note-71804>, damaging DNA, proteins and other cell tissues, and are known to be implicated in <note-3256 id=\"16\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">diseases.</note-3256>  The <note-11786 id=\"131\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">body does its best to protect itself against free radicals </note-11786>by producing its <note-41347 id=\"133\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">own chemicals to prevent ageing</note-41347>, such as vitamins E and C, but it is <note-69371 id=\"132\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">always fighting a losing battle</note-69371>.</p>\n" +
    "\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph3'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph3'; activeTab ='paragraph3'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph3'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p id=\"paragraph3\" paragraph=\"\" class=\"ng-scope\">A year ago Gordon Lithgow of the University of Manchester discovered<note-78780 id=\"134\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> a way to help combat free radicals</note-78780>. Using one of these anti-ageing chemicals. <note-41978 id=\"136\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">he</note-41978> managed to increase the lifespan of one species of earthworm <note-96840 id=\"135\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">by 50 per cent</note-96840>. Despite cautionary words from the scientists, <note-64115 id=\"138\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"3\">many welcomed</note-64115> this as the first step towards a <note-61967 id=\"141\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">drug which would extend life</note-61967>. Research involving the mutation of <note-98489 id=\"142\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">genes</note-98489> has also thrown up fascinating results, <note-95937 id=\"14\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">identifying two of the genes that appear to control how long the earthworm lives</note-95937>. When one considers the vast <note-24541 id=\"143\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">evolutionary distances</note-24541> that separate these species, it suggests that we may have discovered a key to how <note-44621 id=\"144\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">ageing is regulated throughout the entire animal kingdom</note-44621>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph4'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph4'; activeTab ='paragraph4'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph4'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "     \n" +
    "        <p id=\"paragraph4\" paragraph=\"\" class=\"ng-scope\">In June last year a small American company called Eukarion sought permission to carry out the first trials of an <note-90266 id=\"145\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">anti-ageing drug</note-90266>, SCS, <note-98849 id=\"10\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">on human beings</note-98849>. Although it will initially be used to treat <note-89405 id=\"146\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">diseases associated with old age</note-89405>, Eukarion said, that 'if the effect of treating diseases of old age is to extend life, everyone's going to be happy.'</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph5'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph5'; activeTab ='paragraph5'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph5'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>   \n" +
    "        </div>\n" +
    "       \n" +
    "        <p id=\"paragraph5\" paragraph=\"\" class=\"ng-scope\">Some scientists, however, are <note-10457 id=\"148\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">quick to discourage extravagant speculation.</note-10457> 'There is <note-17194 id=\"149\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">no evidence</note-17194> whatsoever that swallowing any chemical would have an <note-20194 id=\"150\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">effect on mammals</note-20194>', says Rich Miller of the University of Michigan. 'And those people who claim it might need to go out and<note-16260 id=\"151\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> do some experimenting</note-16260>'. Some research, moreover, has produced alarming results. As well as controlling ageing, these, <note-11867 id=\"152\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">genes also partly control the hormones which regulate growth</note-11867>. The upshot of this is that although the lives of mutant mice can be extended by up to <note-3825 id=\"153\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">80 per cent, they remain smaller than normal</note-3825>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph6'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph6'; activeTab ='paragraph6'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph6'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p id=\"paragraph6\" paragraph=\"\" class=\"ng-scope\">Quite apart <note-14999 id=\"8\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">from these sorts of horrors</note-14999>, the ethical implications of <note-51848 id=\"22\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">extending human lifespan </note-51848>are likely to worry many people. Even if the <note-3195 id=\"154\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">falling birth-rates reported in the world's developed nation</note-3195>s were to be repeated throughout the world, would this be sufficient to compensate for massively extended life-expectancy, and would we be willing to see the demographic balance of our society change out of all recognition? David Gems, the head of the Centre for Research into Ageing at University College, London, is enthusiastic about the <note-58696 id=\"155\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">opportunities opened up by extended life</note-58696>, but even he observes, 'If people live much longer, the proportion of <note-88057 id=\"156\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">children would. of course, he very small</note-88057>. It strikes me that it might feel rather claustrophobic: all those middle-aged people and very few children or young people.'</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph7'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph7'; activeTab ='paragraph7'\">. . .\n" +
    "             <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph7'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p id=\"paragraph7\" paragraph=\"\" class=\"ng-scope\">The philosopher John Polkinghorne emphasises that any discussion of the merits of life-extending therapies must take into account the <note-31790 id=\"157\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">quality of the life that is lived:</note-31790> 'One would not wish to prolong life beyond the <note-98233 id=\"159\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">point it had ceased to be creative</note-98233> and fulfilling and meaningful,' he says. 'Presumably, there would have to come a point at which life ceased to be creative and<note-55180 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> became just repetition.</note-55180> Clearly, there are only so many rounds of golf one would want to play.'</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph8'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph8'; activeTab ='paragraph8'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph8'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p id=\"paragraph8\" paragraph=\"\" class=\"ng-scope\">But Polkinghorne, a member of the Human Genetics Commission, also observes that so far our experience of extended life-expectancy <note-88917 id=\"160\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">has not resulted in world-weariness</note-88917>. Throughout the last century, life-expectancy rose consistently, thanks to improved diet, <note-23732 id=\"161\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">better hygiene</note-23732>, continuous medical innovation and the provision of free or subsidised healthcare. In 1952 the Queen sent out <note-13668 id=\"162\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">225 telegrams</note-13668> to people on their 100th birthday; in 1996 she sent out <note-24960 id=\"20\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">5218</note-24960>. 'Consider also, the lives of our Roman and Anglo-Saxon ancestors' he says. By and large, <note-85446 id=\"164\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">the doubling of human lifespan</note-85446> we have seen since then has not been a bad thing. Life has not become frustrating and boring. For example,<note-86825 id=\"165\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> we now live to see our children's children</note-86825>, and this is good.'</p>\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </div><!--\n" +
    "\n" +
    "--><div class=\"grid__item one-quarter\">\n" +
    "    <comment-tabs></comment-tabs>      \n" +
    "    <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "    \n" +
    "    <div class=\"new-positioning-grid\">\n" +
    "      <div ng-if=\"activeParagaph != false\">\n" +
    "        <div ng-repeat=\"comment in contextualComments | filter:filterPara1 track by $index\">\n" +
    "          <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "          <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/paragraph-light.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/paragraph-light.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "  <div class=\"grid__item three-quarters\">\n" +
    "    <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "      <statusbar-contextual ng-show=\"activeTab == 'contextual'\"></statusbar-contextual>\n" +
    "      <statusbar-paragraph></statusbar-paragraph>\n" +
    "      \n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <article class=\"document\">\n" +
    "      <header class='l-block-med'>\n" +
    "        <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"content-area\" select-anchor=\"\">\n" +
    "        <div class=\"container\">\n" +
    "          <button  ng-show=\"activeParagraph !='paragraph1'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph1'; activeTab ='paragraph1'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "            <button  ng-show=\"activeParagraph == 'paragraph1'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "              Hide\n" +
    "            </button>\n" +
    "        </div>             \n" +
    "        \n" +
    "        <p  id=\"paragraph1\" paragraph>After hours of driving south in the pitch-black darkness of the Nevada desert, a dome of hazy gold suddenly appears on the horizon. Soon, a road sign confirms the obvious: Las Vegas 30 miles. Looking skyward, you notice that<note-60493 id=\"17\" comment-anchor=\"\" class=\" document__anchor--highlighted\" comment-active=\"false\" data-content=\"1\"> the Big Dipper</note-60493> is harder to find than it was an hour ago.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph2'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph2'; activeTab ='paragraph2'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph2'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p  id=\"paragraph2\" paragraph><note-12872 id=\"10\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"3\">Light pollution</note-12872>—the artificial light that illuminates more than its intended target area—has become a problem of increasing concern <note-71961 id=\"13\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"4\">across the country</note-71961> over the past 15 years. In the suburbs, where over-lit shopping mall parking lots are the norm, only 200 of the Milky Way’s 2,500 stars are visible on a clear night. Even fewer can be seen from large cities. In almost every town, big and small, street lights beam just as much light up and out as they do down, illuminating much more than just the street. Almost 50 percent of the light emanating from street lamps misses its intended target, and billboards, shopping centres, private homes and skyscrapers are similarly over-illuminated.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph3'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph3'; activeTab ='paragraph3'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph3'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p   id=\"paragraph3\" paragraph>America has become so bright that in a satellite image of the United States at night, the outline of the country is visible from its lights alone. The major cities are all there, in bright clusters: New York, Boston, Miami, Houston, Los Angeles, Seattle, Chicago, and, of course, Las Vegas. Mark Adams, superintendent of the McDonald Observatory in west Texas, says that the very fact that city lights are visible from on high is proof of their wastefulness. “When you’re up in an airplane, all that light you see on the ground from the city is wasted. It’s going up into the night sky. That’s why you can see it.”</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph4'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph4'; activeTab ='paragraph4'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph4'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "     \n" +
    "        <p   id=\"paragraph4\" paragraph>But don’t we need all those lights to <note-13793 id=\"1\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"2\">ensure our safety</note-13793>? The answer from light engineers, light pollution control advocates and astronomers is an emphatic “<note-59913 id=\"6\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"4\">no</note-59913>.” Elizabeth Alvarez of the International Dark Sky Association (IDA), a non-profit organization in Tucson, Arizona, says that overly bright security lights can actually force neighbours to close the shutters, which means that if any criminal activity does occur on the street, no one will see it. And the old assumption that bright lights deter crime appears to have been a false one: A new Department of Justice report concludes that there is no documented correlation between the level of lighting and the level of crime in an area. And contrary to popular belief, more crimes occur in broad daylight than at night.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph5'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph5'; activeTab ='paragraph5'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph5'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>   \n" +
    "        </div>\n" +
    "       \n" +
    "        <p   id=\"paragraph5\" paragraph>For drivers, light can actually create a safety hazard. Glaring lights can temporarily blind drivers,<note-97389 id=\"5\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\"> increasing the likelihood</note-97389> of an accident. New Hampshire law forbids the use of “any light along a highway so positioned as to blind or dazzle the vision of travellers on the adjacent highway.”</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph6'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph6'; activeTab ='paragraph6'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph6'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph6\" paragraph>Badly designed lighting can pose a threat to wildlife as well as people. Newly hatched turtles in Florida move toward beach lights instead of the more muted silver shimmer of the ocean. Migrating birds, confused by lights on skyscrapers, broadcast towers and lighthouses, are injured, sometimes fatally, after colliding with high, lighted structures. And light pollution harms air quality as well: Because most of the country’s power plants are still powered by fossil fuels, more light means more air pollution.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph7'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph7'; activeTab ='paragraph7'\">. . .\n" +
    "             <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph7'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph7\" paragraph>So what can be done? Tucson, Arizona is taking back the night. The city has one of the best lighting ordinances in the country, and, not coincidentally, the highest concentration of observatories in the world. Kitt Peak National Optical Astronomy Observatory has 24 telescopes aimed skyward around the city’s perimeter, and its cadre of astronomers needs a dark sky to work with.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph8'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph8'; activeTab ='paragraph8'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph8'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph8\" paragraph>For a while, that darkness was threatened. “We were totally losing the night sky,” Jim Singleton of Tucson’s Lighting Committee told <note-67553 id=\"3\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\">Tulsa, Oklahoma’s.</note-67553>\n" +
    "                 The same thing is happening in a handful of other states, including Texas, which just passed a light pollution bill last summer. “Astronomers can get what they need at the same time that citizens get what they need: safety, security and good visibility at night,” says McDonald Observatory’s Mark Adams, who provided testimony at the hearings for the bill.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph9'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph9'; activeTab ='paragraph9'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph9'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph9\" paragraph>And in the long run, everyone benefits from reduced energy costs. Wasted energy from inefficient lighting costs us between $1 and $2 billion a year, according to IDA. The city of San Diego, which installed new, high-efficiency street lights, now saves about $3 million a year in energy costs.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph10'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph10'; activeTab ='paragraph10'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph10'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph10\" paragraph>Legislation isn’t the only answer to light pollution problems. Brian Greer, Central Ohio representative for the Ohio Light Pollution Advisory Council, says that education is just as important, if not more so. “There are some special situations where regulation is the only fix,” he says. “But the vast majority of bad lighting is simply the <note-83529 id=\"4\" comment-anchor=\"\"  comment-active=\"false\" data-content=\"1\">result of not knowing any better.</note-83529></p>\n" +
    "\n" +
    "        <p >*The Big Dipper: a group of seven bright stars visible in the Northern Hemisphere. </p>\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </div><!--\n" +
    "\n" +
    "--><div class=\"grid__item one-quarter\">\n" +
    "    <comment-tabs></comment-tabs>      \n" +
    "    <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "    \n" +
    "    <div class=\"new-positioning-grid\">\n" +
    "      <div ng-if=\"activeParagaph != false\">\n" +
    "        <div ng-repeat=\"comment in contextualComments | filter:filterPara1 track by $index\">\n" +
    "          <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "          <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/paragraph-light_clutter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/paragraph-light_clutter.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "  <div class=\"grid__item three-quarters\">\n" +
    "    <div class=\"document-toolbar\" fix-width ng-show=\"false\">\n" +
    "      <statusbar-contextual ng-show=\"activeTab == 'contextual'\"></statusbar-contextual>\n" +
    "      <statusbar-paragraph></statusbar-paragraph>\n" +
    "      \n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <article class=\"document\">\n" +
    "      <header class='l-block-med'>\n" +
    "        <h1 class=\"document__title\">In Life and Death</h1>\n" +
    "      </header>\n" +
    "\n" +
    "      <div class=\"content-area\" select-anchor=\"\">\n" +
    "        <div class=\"container\">\n" +
    "          <button  ng-show=\"activeParagraph !='paragraph1'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph1'; activeTab ='paragraph1'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "            <button  ng-show=\"activeParagraph == 'paragraph1'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "              Hide\n" +
    "            </button>\n" +
    "        </div>             \n" +
    "        \n" +
    "        <p  id=\"paragraph1\" paragraph>After hours of driving south in the<note-54688 id=\"122\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> pitch-black darkness of the Nevada desert</note-54688>, a <note-44437 id=\"120\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">dome of hazy gold</note-44437> suddenly appears on the horizon. Soon, a road sign confirms the obvious:<note-5157 id=\"121\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> Las Vegas 30 miles</note-5157>. Looking skyward, you notice that<note-60493 id=\"17\" comment-anchor=\"\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\" comment-active=\"false\" data-content=\"1\"> the Big Dipper</note-60493> is harder to find than it was an hour ago.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph2'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph2'; activeTab ='paragraph2'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph2'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p  id=\"paragraph2\" paragraph><note-12872 id=\"10\" comment-anchor=\"\" comment-active=\"false\" data-content=\"3\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">Light pollution</note-12872>—the artificial light that illuminates more than its intended target area—has become a problem of increasing concern <note-71961 id=\"13\" comment-anchor=\"\" comment-active=\"false\" data-content=\"4\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">across the country</note-71961> over the past 15 years. In the suburbs, where over-lit shopping mall parking lots are the norm, only 200 of the <note-26760 id=\"123\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Milky Way’s 2,500 stars</note-26760> are visible on a <note-21502 id=\"124\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">clear night.</note-21502> Even fewer can be <note-24679 id=\"126\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">seen from large cities</note-24679>. In almost every town, big and small, street lights beam just as much light up and out as they do down, illuminating much more than just the street. Almost<note-50003 id=\"127\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> 50 percent of the light emanating from street lamps misses its intended target</note-50003>, and billboards, shopping centres, private homes and skyscrapers are similarly <note-9922 id=\"128\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">over-illuminated</note-9922>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph3'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph3'; activeTab ='paragraph3'\">. . .\n" +
    "            <span class=\"ct-item__counter\" comment-buttons>\n" +
    "            </span>\n" +
    "            <span teacher>                \n" +
    "            </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph3'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "\n" +
    "        <p   id=\"paragraph3\" paragraph>America has become so bright that in a <note-92530 id=\"129\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">satellite image of the United States </note-92530>at night, the outline of the country is visible from its lights alone. The <note-58109 id=\"130\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">major cities are all there,</note-58109> in bright clusters: New York, Boston, Miami, Houston, Los Angeles, Seattle, Chicago, and, of course, Las Vegas. Mark Adams, superintendent of the McDonald Observatory in west Texas, says that the very fact that city lights are visible from on high is<note-7255 id=\"131\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> proof of their wastefulness</note-7255>. “When you’re up in an airplane, all that light you see on the ground from the city is wasted. It’s going up into the night sky. That’s why you can see it.”</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph4'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph4'; activeTab ='paragraph4'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "          </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph4'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>\n" +
    "        </div>\n" +
    "     \n" +
    "        <p   id=\"paragraph4\" paragraph>But don’t we need all those lights to <note-13793 id=\"1\" comment-anchor=\"\" comment-active=\"false\" data-content=\"2\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">ensure our safety</note-13793>? The answer from light engineers, light pollution control advocates and astronomers is an emphatic “<note-59913 id=\"6\" comment-anchor=\"\" comment-active=\"false\" data-content=\"4\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">no</note-59913>.” Elizabeth Alvarez of the International Dark Sky Association (IDA), a non-profit organization in Tucson, Arizona, says that overly bright security lights can actually <note-75740 id=\"132\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">force neighbours to close the shutters</note-75740>, which means that if any criminal activity does occur on the street, <note-55749 id=\"133\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">no one will see it</note-55749>. And the old assumption that bright lights deter crime appears to have been a false one: A new Department of Justice report concludes that there is no documented correlation between the level of lighting and the level of crime in an area. And contrary to popular belief, <note-85301 id=\"134\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">more crimes occur in broad daylight than at night</note-85301>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph5'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph5'; activeTab ='paragraph5'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph5'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>   \n" +
    "        </div>\n" +
    "       \n" +
    "        <p   id=\"paragraph5\" paragraph>For drivers, light can actually create a safety hazard. Glaring lights can temporarily blind drivers,<note-97389 id=\"5\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\"> increasing the likelihood</note-97389> of an accident. New Hampshire law forbids the use of “<note-76210 id=\"135\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">any light along a highway so positioned as to blind or dazzle</note-76210> the vision of travellers on the adjacent highway.”</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph6'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph6'; activeTab ='paragraph6'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph6'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph6\" paragraph>Badly designed lighting can pose a threat to <note-91403 id=\"136\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">wildlife</note-91403> as well as people. <note-50014 id=\"137\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">Newly hatched turtles in Florida move toward beach lights</note-50014> instead of the more muted silver shimmer of the ocean. <note-8434 id=\"139\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Migrating birds, </note-8434>confused by lights on skyscrapers, broadcast towers and lighthouses, are injured, sometimes fatally, after colliding with high, lighted structures. And light pollution harms air quality as well: Because most of the country’s power plants are still <note-76925 id=\"140\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">powered by fossil fuels</note-76925>, more light means more air pollution.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph7'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph7'; activeTab ='paragraph7'\">. . .\n" +
    "             <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph7'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph7\" paragraph>So what can be done?<note-12079 id=\"142\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> Tucson, Arizona is taking back the night. </note-12079>The city has one of the best lighting <note-50496 id=\"143\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">ordinances</note-50496> in the country, and, not coincidentally, the <note-54098 id=\"144\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">highest concentration of observatories in the world</note-54098>. Kitt Peak National Optical Astronomy Observatory has <note-50007 id=\"145\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">24 telescopes</note-50007> aimed skyward around the city’s perimeter, and its <note-49800 id=\"146\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">cadre</note-49800> of astronomers needs a dark sky to work with.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph8'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph8'; activeTab ='paragraph8'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph8'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph8\" paragraph>For a while,<note-76315 id=\"147\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> that darkness was threatened.</note-76315> “We were totally losing the night sky,” Jim Singleton of Tucson’s Lighting Committee told <note-67553 id=\"3\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">Tulsa, Oklahoma’s.</note-67553> The same thing is happening in a handful of other states, including Texas, which just passed a light <note-61913 id=\"149\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">pollution bill</note-61913> last summer. “<note-29921 id=\"148\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Astronomers can get what they need at the same time that citizens get what they need</note-29921>: safety, security and good visibility at night,” says McDonald Observatory’s Mark Adams, who provided testimony at the hearings for the bill.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph9'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph9'; activeTab ='paragraph9'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph9'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph9\" paragraph>And in the long run, everyone benefits from <note-55133 id=\"150\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">reduced energy costs</note-55133>. <note-4930 id=\"151\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Wasted energy</note-4930> from inefficient lighting costs us between $1 and <note-49938 id=\"152\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">$2 billion a year</note-49938>, according to<note-10392 id=\"153\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\"> IDA</note-10392>. The city of San Diego, which installed <note-24091 id=\"155\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">new, high-efficiency street lights</note-24091>, now saves about $<note-63469 id=\"157\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">3 million a year in energy costs</note-63469>.</p>\n" +
    "\n" +
    "        <div class=\"container\">\n" +
    "          <button ng-show=\"activeParagraph !='paragraph10'\" class=\"bubble\"  ng-click=\"activeParagraph ='paragraph10'; activeTab ='paragraph10'\">. . .\n" +
    "              <span class=\"ct-item__counter\" comment-buttons>\n" +
    "              </span>\n" +
    "              <span teacher>                \n" +
    "              </span>\n" +
    "            </button>\n" +
    "          <button ng-show=\"activeParagraph == 'paragraph10'\" class=\"bubble\" style=\"\" ng-click=\"hidden = true; activeTab = false; activeParagraph = false\">\n" +
    "            Hide\n" +
    "          </button>  \n" +
    "        </div>\n" +
    "        \n" +
    "        <p   id=\"paragraph10\" paragraph><note-72784 id=\"158\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">Legislation isn’t the only answer to light pollution problems</note-72784>. Brian Greer, Central Ohio representative for the Ohio Light Pollution Advisory Council, says that <note-46168 id=\"159\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">education is just as important</note-46168>, if not more so. “There are some special situations where regulation is the only fix,” he says. “<note-61368 id=\"161\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">But the vast majority of bad lighting</note-61368> is simply the <note-83529 id=\"4\" comment-anchor=\"\" comment-active=\"false\" data-content=\"1\" class=\"ng-isolate-scope document__anchor document__anchor--teal document__anchor--num\">result of not knowing any better.</note-83529></p>\n" +
    "\n" +
    "        <p >*The Big Dipper: a group of seven bright stars visible in the Northern Hemisphere. </p>\n" +
    "      </div>\n" +
    "    </article>\n" +
    "  </div><!--\n" +
    "\n" +
    "--><div class=\"grid__item one-quarter\">\n" +
    "    <comment-tabs></comment-tabs>      \n" +
    "    <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "    \n" +
    "    <div class=\"new-positioning-grid\">\n" +
    "      <div ng-if=\"activeParagaph != false\">\n" +
    "        <div ng-repeat=\"comment in contextualComments | filter:filterPara1 track by $index\">\n" +
    "          <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "          <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("templates/searchBar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/searchBar.html",
    "<div class=\"search-bar\" >\n" +
    "  <div class=\"grid grid--narrow\">\n" +
    "  	<div class=\"grid__item one-whole\">\n" +
    "  		Search: <input ng-keyup=\"$event.keyCode == 13 ? search() : null\" ng-model=\"filterComments\" class=\"search-bar-item\" placeholder=\"Search by user, keyword\"></input>\n" +
    "         <button class=\"button button--small button--success\" style=\"margin-left: auto; margin-right: auto; display: inline-block;\" ng-click=\"search()\">\n" +
    "    	   	Find\n" +
    "        </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/startScreen.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/startScreen.html",
    "<p >{{test}}</p>");
}]);

angular.module("templates/statusbarContextual.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/statusbarContextual.html",
    "<div class=\"l-split\">\n" +
    "  <div class=\"l-split__right\">\n" +
    "    <div class=\"l-list-inline\" ng-hide=\"selectingContext\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"button button--small button--success\" ng-click=\"addContextualComment()\">new contextual comment</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"button button--small\" ng-click=\"activeTab = false\">hide comments</button>\n" +
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
    "    <button class=\"button button--small button--success\" ng-click=\"activeTab = 'contextual'\">show comments</button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-split__left\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <div class=\"document-toolbar__title\">Comments:</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "         {{contextualStats.commentsCount}} comments, {{contextualStats.repliesCount}} replies\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("templates/temp.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/temp.html",
    "<div class=\"grid grid--center grid--full\">\n" +
    "    <div class=\"grid__item three-quarters\">\n" +
    "        <div class=\"document-toolbar\" fix-width ng-show=\"true\">\n" +
    "            <statusbar-contextual ng-show=\"activeTab != false\"></statusbar-contextual>\n" +
    "            <statusbar-default ng-show=\"activeTab == false\"></statusbar-default>\n" +
    "        </div>\n" +
    "\n" +
    "        <article class=\"document\">    \n" +
    "            <header class='l-block-med'>\n" +
    "                <h1 class=\"document__title\">In Praise of Amateurs</h1>\n" +
    "                <h2>Despite the specialization of scientific research, amateurs still have an important role to play</h2>\n" +
    "            </header>\n" +
    "\n" +
    "            <div class=\"content-area\" select-anchor=\"\">\n" +
    "                        <p  id=\"paragraph1\" paragraph>Until recently, the thought that there might ever be a cure for ageing seemed preposterous. Growing older and more decrepit appeared to be an inevitable and necessary part of being human. Over the last decade, however, scientists have begun to see ageing differently. Some now believe that the average life-expectancy may soon be pushed up to 160 years; others think that it may be extended to 200 or 300 years. A handful even wonder whether we might one day live for a millennium or more.</p>\n" +
    "\n" +
    "            <p  id=\"paragraph2\" paragraph>Behind this new excitement is the theory that the primary cause of ageing lies in highly reactive molecules called <note-35568 id=\"21\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">free radicals</note-35568>, left behind by the oxygen we breathe. Free radicals react with the molecules in our bodies, damaging DNA, proteins and other cell tissues, and are known to be implicated in <note-3256 id=\"16\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">diseases.</note-3256>  The body does its best to protect itself against free radicals by producing its own chemicals to prevent ageing, such as vitamins E and C, but it is always fighting a losing battle.</p>\n" +
    "                   \n" +
    "            <p   id=\"paragraph3\" paragraph>A year ago Gordon Lithgow of the University of Manchester discovered a way to help combat free radicals. Using one of these anti-ageing chemicals. he managed to increase the lifespan of one species of earthworm by 50 per cent. Despite cautionary words from the scientists, many welcomed this as the first step towards a drug which would extend life. Research involving the mutation of genes has also thrown up fascinating results, <note-95937 id=\"14\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">identifying two of the genes that appear to control how long the earthworm lives</note-95937>. When one considers the vast evolutionary distances that separate these species, it suggests that we may have discovered a key to how ageing is regulated throughout the entire animal kingdom.</p>\n" +
    "\n" +
    "            <p   id=\"paragraph4\" paragraph>In June last year a small American company called Eukarion sought permission to carry out the first trials of an anti-ageing drug, SCS, <note-98849 id=\"10\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">on human beings</note-98849>. Although it will initially be used to treat diseases associated with old age, Eukarion said, that 'if the effect of treating diseases of old age is to extend life, everyone's going to be happy.'</p>\n" +
    "\n" +
    "        <p   id=\"paragraph5\" paragraph>Some scientists, however, are quick to discourage extravagant speculation. 'There is no evidence whatsoever that swallowing any chemical would have an effect on mammals', says Rich Miller of the University of Michigan. 'And those people who claim it might need to go out and do some experimenting'. Some research, moreover, has produced alarming results. As well as controlling ageing, these, genes also partly control the hormones which regulate growth. The upshot of this is that although the lives of mutant mice can be extended by up to 80 per cent, they remain smaller than normal.</p>\n" +
    "\n" +
    "        <p   id=\"paragraph6\" paragraph>Quite apart <note-14999 id=\"8\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"5\">from these sorts of horrors</note-14999>, the ethical implications of <note-51848 id=\"22\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"2\">extending human lifespan </note-51848>are likely to worry many people. Even if the falling birth-rates reported in the world's developed nations were to be repeated throughout the world, would this be sufficient to compensate for massively extended life-expectancy, and would we be willing to see the demographic balance of our society change out of all recognition? David Gems, the head of the Centre for Research into Ageing at University College, London, is enthusiastic about the opportunities opened up by extended life, but even he observes, 'If people live much longer, the proportion of children would. of course, he very small. It strikes me that it might feel rather claustrophobic: all those middle-aged people and very few children or young people.'</p>\n" +
    "        \n" +
    "        <p   id=\"paragraph7\" paragraph>The philosopher John Polkinghorne emphasises that any discussion of the merits of life-extending therapies must take into account the quality of the life that is lived: 'One would not wish to prolong life beyond the point it had ceased to be creative and fulfilling and meaningful,' he says. 'Presumably, there would have to come a point at which life ceased to be creative and<note-55180 id=\"25\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\"> became just repetition.</note-55180> Clearly, there are only so many rounds of golf one would want to play.'</p>\n" +
    "\n" +
    "        <p   id=\"paragraph8\" paragraph>But Polkinghorne, a member of the Human Genetics Commission, also observes that so far our experience of extended life-expectancy has not resulted in world-weariness. Throughout the last century, life-expectancy rose consistently, thanks to improved diet, better hygiene, continuous medical innovation and the provision of free or subsidised healthcare. In 1952 the Queen sent out 225 telegrams to people on their 100th birthday; in 1996 she sent out <note-24960 id=\"20\" comment-anchor=\"\" class=\"document__anchor document__anchor--teal ng-isolate-scope document__anchor--num\" comment-active=\"false\" data-content=\"1\">5218</note-24960>. 'Consider also, the lives of our Roman and Anglo-Saxon ancestors' he says. By and large, the doubling of human lifespan we have seen since then has not been a bad thing. Life has not become frustrating and boring. For example, we now live to see our children's children, and this is good.'</p>\n" +
    "\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </div><!--\n" +
    "    --><div class=\"grid__item one-quarter\" ng-show=\"activeTab\">\n" +
    "      <comment-tabs></comment-tabs>\n" +
    "      <!--<div class=\"container\"><options-panel></options-panel></div>-->\n" +
    "\n" +
    "      <div class=\"new-positioning-grid\">\n" +
    "          <div ng-repeat=\"comment in contextualComments | filter:filterLine track by $index\">\n" +
    "            <contextual-comment comment=\"comment\" ng-if=\"comment.text != undefined\"></contextual-comment>\n" +
    "            <contextual-comment-form comment=\"comment\" ng-if=\"comment.text == undefined\"></contextual-comment-form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
