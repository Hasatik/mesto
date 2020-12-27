
const popup = document.querySelector('.popup');
const popupElement = document.querySelector(".popup_profile");
const editButton = document.querySelector(".profile__edit-button");
const formProfile = popupElement.querySelector(".popup__container_type_profile");
const closeProfileButton = popupElement.querySelector(".popup__close-button_profile");

const popupCard = document.querySelector(".popup_card");
const formCard = popupCard.querySelector(".popup__container_type_card");
const cardCloseButton = popupCard.querySelector(".popup__close-button_card");
const cardName = popupCard.querySelector(".popup__input_type_card-name");
const cardUrl = popupCard.querySelector(".popup__input_type_url");
const saveButtonCard = popupCard.querySelector(".popup__save-button_card");

const template = document.querySelector("#template").content;
const cardConteiner = document.querySelector(".cards");

const popupImgContainer = document.querySelector(".popup_img");
const imgPopup = popupImgContainer.querySelector(".popup__image");
const imgPopupName = popupImgContainer.querySelector(".popup__image-name");
const imgCloseButton = popupImgContainer.querySelector(".popup__close-button_img");

const saveButton = popup.querySelector(".popup__save-button");
const addButton = document.querySelector(".profile__add-button");
const nameInput = popup.querySelector(".popup__input_type_name");
const jobInput = popup.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const addCard = document.getElementById("add-card");
const profileEdit = document.getElementById("profile-edit");

function fillPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupElement);
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
generateCardGrid();

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

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const addNewCard = creatCard({name: cardName.value, link: cardUrl.value});
  cardConteiner.prepend(addNewCard);
  formCard.reset();
  closePopup(addCard);
}

addButton.addEventListener("click", () => openPopup(addCard));
cardCloseButton.addEventListener("click", () => closePopup(addCard));
formCard.addEventListener("submit", handleAddCardSubmit);
closeProfileButton.addEventListener("click", () => closePopup(popupElement));
editButton.addEventListener("click", () => { 
  openPopup(popupElement);
  fillPopup();
});
formProfile.addEventListener("submit", handleProfileFormSubmit);
imgCloseButton.addEventListener("click", () => closePopup(popupImgContainer));
