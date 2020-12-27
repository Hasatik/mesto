const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup_profile');
const closeProfileButton = popup.querySelector('.popup__close-button_profile');

const popupCard = document.querySelector('.popup_card');
const cardCloseButton = popupCard.querySelector('.popup__close-button_card');
const cardName = popupCard.querySelector('.popup__input_type_card-name');
const cardUrl = popupCard.querySelector('.popup__input_type_url');
const saveButtonCard = popupCard.querySelector('.popup__save-button_card');
const template = document.querySelector('#template').content;
const cardConteiner= document.querySelector('.cards');

const popupImgContainer = document.querySelector('.popup_img');
const imgPopup = popupImgContainer.querySelector('.popup__image');
const imgPopupName = popupImgContainer.querySelector('.popup__image-name');
const imgCloseButton = popupImgContainer.querySelector('.popup__close-button_img');

const saveButton = popup.querySelector('.popup__save-button');
const addButton = document.querySelector('.profile__add-button');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const addCard = document.getElementById('add-card');
const profileEdit = document.getElementById('profile-edit');



function popupFill() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};


function popupProfileDisplay() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  } else {
    popupFill();
    popup.classList.add('popup_opened');
  }
};

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupProfileDisplay();
};
function popupOpen(popup){
  popup.classList.add('popup_opened');
};
function popupClose(popup){
  popup.classList.remove('popup_opened');
};
addButton.addEventListener('click', () => {
  popupOpen(addCard);
} );





const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
function creatCard(item){
  const newCard = template.cloneNode(true);
  const imgCard = newCard.querySelector('.card__img');
  imgCard.addEventListener('click', ()=>openImgPopup(item));
  const headerElement = newCard.querySelector('.card__name');
  headerElement.textContent = item.name;
  imgCard.src = item.link;
  imgCard.alt = item.name;
  const deleteButton = newCard.querySelector('.card__delete');
  deleteButton.addEventListener('click', removeCard);
  const likeButton = newCard.querySelector('.card__like');
  likeButton.addEventListener('click', showLike);
  return newCard;
}

function generateCardGrid () {
  let cardInfo = initialCards.map(creatCard);
  cardConteiner.prepend(...cardInfo);
}
generateCardGrid ();




function showLike(event){
  event.target.classList.add('card__like_active');
}

function removeCard(event){
  event.target.closest('.card').remove();
}

function openImgPopup(item){
  imgPopup.src = item.link;
  imgPopup.alt = item.name;
  imgPopupName.textContent = item.name;
  popupOpen(popupImgContainer);
}




function addCardSubmitHandler (evt) {
  evt.preventDefault(); 
  initialCards.unshift({name: cardName.value, link: cardUrl.value});
  const addNewCard = creatCard(initialCards[0]);
  cardConteiner.prepend(addNewCard);
  popupClose(addCard);
}

cardCloseButton.addEventListener('click', () => popupClose(addCard));
popupCard.addEventListener('submit',  addCardSubmitHandler)
closeProfileButton.addEventListener('click', popupProfileDisplay);
editButton.addEventListener('click',popupProfileDisplay);
formElement.addEventListener('submit', handleFormSubmit);
imgCloseButton.addEventListener('click', () => popupClose(popupImgContainer) );