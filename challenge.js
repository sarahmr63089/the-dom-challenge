let counter = document.querySelector("#counter")
let subtractButton = document.querySelector('#\\-')
let addButton = document.querySelector("#\\+")
let likeButton = document.querySelector("#\\<3")
let pauseButton = document.querySelector("#pause")
let likesList = document.querySelector(".likes")
let form = document.querySelector("#comment-form")
let commentDiv = document.querySelector("#list")

let paused = false
let currentTime = 0

setInterval(() => { 
  if (!paused) {
    // increment current time before setting to counter otherwise currentTime is 1 ahead
    counter.innerText = ++currentTime
  }
}, 1000)

let subtract = (evt) => { counter.innerText = --currentTime }

let add = (evt) => { counter.innerText = ++currentTime }


// never remove a form function!!! it resets the preventDefault
let formFunction = (evt) => {
  evt.preventDefault()

  if (!paused) {
    let userComment = document.createElement("p")
    userComment.innerText = evt.target.children[0].value

    commentDiv.append(userComment)

    evt.target.reset()
  }
}

let like = (evt) => {
  let liItem = likesList.querySelector(`#counter-${counter.innerText}`)

  if (liItem) {
    liItem.querySelector(".likes").innerText++
  }
  else {
    let numLiked = document.createElement("li")
    numLiked.innerHTML = `${counter.innerText} has been liked <span class='likes'>1</span> times!`
    numLiked.id = `counter-${counter.innerText}`
    likesList.append(numLiked)
  }

  // if likesList contains a child that starts with num
  // let didFindItem = false
  // for (let i = 0; i < likesList.children.length; i++) {
  //   // if a list item for num already exists
  //   if (likesList.children[i].innerText.startsWith(counter.innerText)) {
  //     likesList.children[i].querySelector(".likes").innerText++
  //     didFindItem = true
  //     break;
  //   }
  // }
  // if (!didFindItem) {
  //   let numLiked = document.createElement("li")
  //   numLiked.innerHTML = `${counter.innerText} has been liked <span class='likes'>1</span> times!`
  //   numLiked.id = counter.innerText
  //   likesList.append(numLiked)
  // }
}

subtractButton.addEventListener("click", subtract)

addButton.addEventListener("click", add)

likeButton.addEventListener("click", like )

form.addEventListener("submit", formFunction)




pauseButton.addEventListener("click", (evt) => {
  paused = true

  // 1. stop counter, currentTime holds the current time
  // 2. disable event listeners -- add form
  subtractButton.removeEventListener("click", subtract)
  
  addButton.removeEventListener("click", add)

  likeButton.removeEventListener("click", like)

  // 3. replace pause button with resume button
  evt.target.innerText = "resume"
  
  // 4. click resume button
  evt.target.addEventListener("click", (evt) => {
    paused = false
    subtractButton.addEventListener("click", subtract)
  
    addButton.addEventListener("click", add)

    likeButton.addEventListener("click", like)

    evt.target.innerText = "pause"
  })
  // 5. start counter and enable event listeners
})
