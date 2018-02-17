document.addEventListener('DOMContentLoaded', onReady)

function onReady () {
  var database = firebase.database()

  var postsRef = database.ref('posts')

  postsRef.on('child_added', function (snapshot) {
    addPostElement(snapshot.val(), snapshot.key)
  })

  postsRef.on('child_removed', function (snapshot) {
    removePostElement(snapshot.key)
  })

  postsRef.on('child_changed', function (snapshot) {
    editPostElement(snapshot.val(), snapshot.key)
  })
}

function addPostElement (postObject, postId) {
  var posts = document.getElementById('posts')
  var post = document.createElement('article')

  post.className = 'post'
  post.id = postId
  
  post.innerHTML = `
    <h2 class="post__title"></h2>
    <p class="post__content"></p>
    <span class="post__creation-date"></span>
  `

  post.getElementsByClassName('post__title')[0].innerText = postObject.title
  post.getElementsByClassName('post__content')[0].innerText = postObject.content
  post.getElementsByClassName('post__creation-date')[0].innerText = postObject.creationDate

  posts.appendChild(post)
}

function removePostElement (postId) {
  document.getElementById('posts').removeChild(document.getElementById(postId))
}

function editPostElement (postObject, postId) {
  var post = document.getElementById(postId)
  post.getElementsByClassName('post__title')[0].innerText = postObject.title
  post.getElementsByClassName('post__content')[0].innerText = postObject.content
  post.getElementsByClassName('post__creation-date')[0].innerText = postObject.creationDate
}

// FIREBASE WARNING: Invalid query string segment:
// https://stackoverflow.com/questions/48832288/firebase-warning-invalid-query-string-segment-warning-when-deploying-simple-f
// https://github.com/firebase/firebase-js-sdk/issues/517