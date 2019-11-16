class Card {
  constructor(name, link) {
    this.placeCard = this.create(name, link);

  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  remove(event) {
    event.target.closest('.place-card').remove()
  }
  create(name, link) {
    cardButton.setAttribute('disabled', true);

    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const placeCardDeleteIconButton = document.createElement('button');
    const placeCardDescription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardCreateIconButton = document.createElement('button');


    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.style.backgroundImage = "url(" + link + ")";
    placeCardDeleteIconButton.classList.add('place-card__delete-icon');
    placeCardDescription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = name;
    placeCardCreateIconButton.classList.add('place-card__like-icon');

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);
    placeCardImage.appendChild(placeCardDeleteIconButton);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardCreateIconButton);
    placesCardList.appendChild(placeCard);
    document.forms.new.reset();





    placeCard.addEventListener('click', (event) => {
      if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked');
      } else if (event.target.classList.contains('place-card__delete-icon')) {
        event.target.closest('.place-card').remove()
      }
    });


    placeCardImage.addEventListener('click', (event) => {
      if (event.target.classList.contains('place-card__image')) {
        imageContainer.classList.add('popup_is-opened');
        const imageUrl = event.target.style.backgroundImage;
        const imageUrlSplice = imageUrl.split('').slice(5, -2).join('');
        popupImage.src = imageUrlSplice;
      }
    });

    editUserInfoButton.addEventListener('click', this.refreshData);

  }

  refreshData() {
    const form = document.forms.edit;
    const editName = form.elements.userName;
    const editUserInfo = form.elements.info;
    userNameInfo.textContent = editName.value;
    userJobInfo.textContent = editUserInfo.value;
    api.correctProfile(userNameInfo.textContent, userJobInfo.textContent, group, auth);
    form.reset();
  }


}


class CardList {
  constructor(container, arr) {
    this.container = container;
    this.arr = arr;
    this.render();
  }


  render() {
    this.arr.forEach((item) => {
      const name = item.name;
      const link = item.link;
      this.container = new Card(name, link);

    })
  }
}


class Popup {
  constructor(container, button, button2) {

    this.container = container;
    this.button = button;
    this.button2 = button2;


    this.open = this.open.bind(this);
    this.close = this.close.bind(this);



    this.button
      .addEventListener('click', this.close);


    this.button2
      .addEventListener('click', this.open);
  }

  open() {
    this.container.classList.add('popup_is-opened');

  }
  close() {
    this.container.classList.remove('popup_is-opened');
  }
}





class Api {
  constructor() {
  }

  getUser() {
    this.loading(true);
    const name = document.querySelector('.user-info__name');
    const about = document.querySelector('.user-info__job');
    const avatar = document.querySelector('.user-info__photo');

    fetch(`http://95.216.175.5/${group}/users/me`, {
      headers: {
        authorization: `${auth}`
      }
    })

      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((result) => {
        return name.textContent = result.name, about.textContent = result.about, avatar.style.backgroundImage = 'url(' + result.avatar + ')';
      })
      .catch((err) => {
        console.log(err);
      });

    this.loading(false);


  };


  getArray() {
    fetch(`http://localhost:3000/cards`, {
      headers: {
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((result) => {
        new CardList(placesCardList, result);
      })
      .catch((err) => {
        console.log(err);
      });

  };


  correctProfile(nameProfile, aboutProfile, group, auth) {
    fetch(`http://95.216.175.5/${group}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameProfile,
        about: aboutProfile
      })
    })

      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loading(isLoading) {
    if (isLoading) {
      editButton.textContent = 'Загрузка...';
    } else {
      editButton.textContent = 'Сохранить';
    }
  }

}


class Validation {
  constructor() {
  }

  checkMinLength(firstInput, secondInput, button) {
    if (firstInput.value.length <= 1 || secondInput.value.length <= 1) {
      button.setAttribute('disabled', true);
      button.classList.add('input__btn_disabled');
    } else {
      button.removeAttribute('disabled', true);
      button.classList.remove('input__btn_disabled');
    }
  }


  checkValidity(cont, error) {
    if (!cont.validity.valid) {
      error.textContent = valid.notEmpty;
      error.classList.add('error-message-active');
    } else if (cont.validity.valid) {
      error.classList.remove('error-message-active');
    }
    if (cont.value.length == 1) {
      error.textContent = valid.validationLenght;
      error.classList.add('error-message-active');
    } else if (cont.validity.valid) {
      error.classList.remove('error-message-active');
    }
  }
}

const auth = 'b6c23b96-d9c2-4098-b25a-8bda36901348';
const group = 'cohort3';
const userNameInfo = document.querySelector('.user-info__name');
const userJobInfo = document.querySelector('.user-info__job');
const api = new Api();
const cardButton = document.querySelector('.popup__button');
const openForm = document.querySelector('.user-info__button');
const formContainer = document.querySelector('.popup');
const closeForm = document.querySelector('.popup__close');
const openEditForm = document.querySelector('.button-edit');
const editFormContainer = document.querySelector('.popup-edit');
const placesCardList = document.querySelector('.places-list');
const editUserInfoButton = editFormContainer.querySelector('.popup__button-edit');
const closeEditForm = editFormContainer.querySelector('.popup__close');
const imageContainer = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const closeImageForm = imageContainer.querySelector('.popup__close');
const popupInput = document.querySelector('.popup__input_type_name');
const popupInputLink = document.querySelector('.popup__input_type_link-url');
const editButton = document.querySelector('.popup__button-edit');
const formNew = document.forms.new;
const formEdit = document.forms.edit;
const userNameInput = formEdit.userName;
const infoInput = formEdit.info;
const errorMessage = document.querySelector('.error-message');
const errorInfo = document.querySelector('.info-error');
const formInputName = formNew.elements.name;
const formInputLink = formNew.elements.link;
const formInputEditName = formEdit.elements.userName;
const formInputInfo = formEdit.elements.info;
const popupForm = new Popup(formContainer, closeForm, openForm);
const popupFormAccept = new Popup(formContainer, cardButton, openForm);
const popupEdit = new Popup(editFormContainer, closeEditForm, openEditForm);
const popupEditAccept = new Popup(editFormContainer, editUserInfoButton, openEditForm);
const popupImg = new Popup(imageContainer, closeImageForm, popupImage);
const validation = new Validation();
const valid = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  notEmpty: 'Поле не должно быть пустым'
}
api.getUser(group, auth);
api.getArray();



//создание карточки
cardButton.addEventListener('click', function () {
  new Card(formInputName.value, formInputLink.value);
});

//Валидация
popupInput.addEventListener('click', function () {
  validation.checkValidity(formInputEditName, errorMessage);
});
popupInputLink.addEventListener('click', function () {
  validation.checkValidity(formInputInfo, errorInfo);
});

userNameInput.addEventListener('input', function () {
  validation.checkValidity(formInputEditName, errorMessage)
});
infoInput.addEventListener('input', function () {
  validation.checkValidity(formInputInfo, errorInfo)
});

formNew.addEventListener('input', function () {
  validation.checkMinLength(formInputName, formInputLink, cardButton);
});

formEdit.addEventListener('input', function () {
  validation.checkMinLength(formInputEditName, formInputInfo, editButton);
});




