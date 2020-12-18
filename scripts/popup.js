const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__container');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function popupFill() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};


function popupDisplay() {
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
  saveButton.onclick = popupDisplay();
};

editButton.addEventListener('click', popupDisplay);
closeButton.addEventListener('click', popupDisplay);
formElement.addEventListener('submit', handleFormSubmit);

