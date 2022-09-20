import { messages } from "../consts/messages";

chrome.runtime.onMessage.addListener(function (request) {
  console.log("request", request);
  // listen for messages sent from background.js
  if (request.message === messages.URL_UPDATED) {
    console.log(request); // new url is now in content scripts!

    walkAndObserve(document);
  }
});

function walk(rootNode: any) {
  // Find all the text nodes in rootNode
  var walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      null
      //   false
    ),
    node;

  // Modify each text node's value
  while ((node = walker.nextNode())) {
    handleText(node);
  }
}

function handleText(textNode: any) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v: any) {
  // Fix some misspellings
  v = v.replaceAll("Merge", "Hoof");
  v = v.replaceAll("Merging", "Hoofing");
  v = v.replaceAll("merge", "hoof");
  v = v.replaceAll(
    "https://avatars.githubusercontent.com/in/123735?s=80&v=4",
    "#"
  );

  return v;
}

// Returns true if a node should *not* be altered in any way
function isForbiddenNode(node: any) {
  return (
    node.isContentEditable || // DraftJS and many others
    (node.parentNode &&
      node.parentNode.isContentEditable) || // Special case for Gmail
    (node.tagName &&
      (node.tagName.toLowerCase() == "textarea" || // Some catch-alls
        node.tagName.toLowerCase() == "input"))
  );
}

// The callback used for the document body and title observers
function observerCallback(mutations: any) {
  var i, node;

  mutations.forEach(function (mutation: any) {
    for (i = 0; i < mutation.addedNodes.length; i++) {
      node = mutation.addedNodes[i];
      if (isForbiddenNode(node)) {
        // Should never operate on user-editable content
        continue;
      } else if (node.nodeType === 3) {
        // Replace the text for text nodes
        handleText(node);
      } else {
        // Otherwise, find text nodes within the given node and replace text
        walk(node);
      }
    }
  });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc: any) {
  var docTitle = doc.getElementsByTagName("title")[0],
    observerConfig = {
      characterData: true,
      childList: true,
      subtree: true,
    },
    bodyObserver,
    titleObserver;

  // Do the initial text replacements in the document body and title
  walk(doc.body);
  doc.title = replaceText(doc.title);

  // Observe the body so that we replace text in any added/modified nodes
  bodyObserver = new MutationObserver(observerCallback);
  bodyObserver.observe(doc.body, observerConfig);

  // Observe the title so we can handle any modifications there
  if (docTitle) {
    titleObserver = new MutationObserver(observerCallback);
    titleObserver.observe(docTitle, observerConfig);
  }
}
walkAndObserve(document);

export {};
