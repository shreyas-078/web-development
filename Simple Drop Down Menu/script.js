const dropDownButton = document.getElementById('trigger-menu-button');
const item1Button = document.querySelector('.item-1');
const item2Button = document.querySelector('.item-2');
const item3Button = document.querySelector('.item-3');
const itemNoneButton = document.querySelector('.item-none');
const selectedElement = document.querySelector('.selected-element h2');

const showDropdownItems = () => {
    const listItems = document.querySelectorAll('.dropdown-item-btn');
    for(const listItem of listItems) {
        listItem.classList.toggle('invisible');
    }
};

function itemClickHandler() {
    const textInSelectedItem = this.querySelector('h3').innerHTML;
    selectedElement.textContent = textInSelectedItem + " Selected";
};

dropDownButton.addEventListener('click', showDropdownItems);
item1Button.addEventListener('click', itemClickHandler);
item2Button.addEventListener('click', itemClickHandler);
item3Button.addEventListener('click', itemClickHandler);
itemNoneButton.addEventListener('click', itemClickHandler);
