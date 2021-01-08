
const popupEdit = document.querySelector(".popup_profile");
const editButton = document.querySelector(".profile__edit-button");
const formProfile = popupEdit.querySelector(".popup__container_type_profile");
const closeProfileButton = popupEdit.querySelector(".popup__close-button_profile");

const popupCard = document.querySelector(".popup_card");
const formCard = popupCard.querySelector(".popup__container_type_card");
const cardCloseButton = popupCard.querySelector(".popup__close-button_card");
const cardName = popupCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupCard.querySelector(".popup__input_type_url");

const template = document.querySelector("#template").content;
const cardConteiner = document.querySelector(".cards");

const popupImgContainer = document.querySelector(".popup_img");
const imgPopup = popupImgContainer.querySelector(".popup__image");
const imgPopupName = popupImgContainer.querySelector(".popup__image-name");
const imgCloseButton = popupImgContainer.querySelector(".popup__close-button_img");

const addButton = document.querySelector(".profile__add-button");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addCard = document.querySelector("#add-card");
const profileEdit = document.querySelector("#profile-edit");

// function handleProfileFormSubmit(event) {
//   event.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
//   closePopup(profileEdit);
// }
function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown',closePopupByEsc);
  clearForm(popup, validationConfig);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown',closePopupByEsc);
}

const closePopupByEsc = (evt) =>{
  const popupHandler = document.querySelector('.popup_opened')
  if (evt.key === `Escape`){
      closePopup(popupHandler)
  }
}

const closePopupByOverlay = (evt) =>{
  const popupHandler = document.querySelector('.popup_opened')
  if(evt.target === popupHandler){
      closePopup(popupHandler)    
  }
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
  const submitButton = popupEdit.querySelector('.popup__save-button');
  setButtonState(submitButton, formProfile.checkValidity(), validationConfig); /*&*/
}

function openAddCardPopup() {
  openPopup(addCard);
  const submitButton = popupCard.querySelector('.popup__save-button');
  setButtonState(submitButton, formCard.checkValidity(), validationConfig);
}

function editUserProfilePopupSubmitHandler (event) {
  event.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEdit);
}

function resetForm(popup, config) {
  popup.querySelector(config.formSelector).reset();
}



function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const addNewCard = creatCard({name: cardName.value, link: cardUrl.value});
  cardConteiner.prepend(addNewCard);
  clearForm(addCard, validationConfig);
  closePopup(addCard);
}


function creatCard(item) {
  const newCard = template.cloneNode(true);
  const imgCard = newCard.querySelector(".card__img");
  imgCard.addEventListener("click", () => openImgPopup(item));
  const headerElement = newCard.querySelector(".card__name");
  headerElement.textContent = item.name;
  imgCard.src = item.link;
  imgCard.alt = item.name;
  const deleteButton = newCard.querySelector(".card__delete");
  deleteButton.addEventListener("click", removeCard);
  const likeButton = newCard.querySelector(".card__like");
  likeButton.addEventListener("click", showLike);
  return newCard;
}

function generateCardGrid() {
  const cardInfo = initialCards.map(creatCard);
  cardConteiner.prepend(...cardInfo);
}


function showLike(event) {
  event.target.classList.toggle("card__like_active");
}

function removeCard(event) {
  event.target.closest(".card").remove();
}

function openImgPopup(item) {
  imgPopup.src = item.link;
  imgPopup.alt = item.name;
  imgPopupName.textContent = item.name;
  openPopup(popupImgContainer);
}


closeProfileButton.addEventListener('click', ()=>closePopup(profileEdit));
cardCloseButton.addEventListener('click', ()=>closePopup(addCard));
addButton.addEventListener("click", openAddCardPopup);
cardCloseButton.addEventListener("click", () => closePopup(addCard));
formCard.addEventListener("submit", handleAddCardSubmit);
closeProfileButton.addEventListener("click", () => closePopup(popupEdit));
editButton.addEventListener("click", openEditProfilePopup);
formProfile.addEventListener("submit", editUserProfilePopupSubmitHandler);
imgCloseButton.addEventListener("click", () => closePopup(popupImgContainer));


generateCardGrid();
enableValidation(validationConfig);