// document.addEventListener('DOMContentLoaded', () => {
//   console.log('dom fully loaded')
//   const body = document.body

//   const container = document.querySelector('[data-app="selection-container"]')

//   const selection = document.querySelector('[data-app="selection"]')

//   const main = document.querySelector('main')

//   let initialPositionClickX = null
//   let initialPositionClickY = null

//   let selectionActive = false
//   let isClicked = false

//   // Selection Functions
//   function setInitialClickPositionSelection(e) {
//     initialPositionClickX = e.pageX
//     initialPositionClickY = e.pageY
//     selection.style.top = `${e.pageY}px`
//     selection.style.left = `${e.pageX}px`
//     selection.classList.add('active')
//     selectionActive = true
//   }
//   function resetSelection() {
//     selectionActive = false
//     selection.style.width = '0px'
//     selection.style.height = '0px'
//     selection.style.transform = `translate(0px,0px)`
//     selection.classList.remove('active')
//   }

//   function handleSelectionMove(e) {
//     let positionX = e.pageX
//     let positionY = e.pageY

//     let widthX = 0
//     let heightY = 0

//     if (positionX < initialPositionClickX) {
//       widthX = initialPositionClickX - positionX
//       selection.style.transform = `translateX(${-widthX}px)`
//     } else {
//       widthX = positionX - initialPositionClickX
//     }
//     if (positionY < initialPositionClickY) {
//       heightY = initialPositionClickY - positionY
//       selection.style.transform = `translateY(${-heightY}px)`
//     } else {
//       heightY = positionY - initialPositionClickY
//     }

//     if (positionX < initialPositionClickX && positionY < initialPositionClickY) {
//       selection.style.transform = `translate(${-widthX}px,${-heightY}px)`
//     }

//     selection.style.width = widthX + 'px'
//     selection.style.height = heightY + 'px'
//   }

//   body.addEventListener('mousedown', (e) => {
//     if (isClicked) resetSelection()

//     isClicked = true

//     let selectionSpaceAllowed = e.target == main || e.target == container

//     if (selectionSpaceAllowed) setInitialClickPositionSelection(e)
//   })

//   body.addEventListener('mouseup', () => {
//     resetSelection()
//     isClicked = false
//   })

//   body.addEventListener('mousemove', (e) => {
//     if (selectionActive) {
//       handleSelectionMove(e)
//     }
//   })
// })
