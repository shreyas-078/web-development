//Using DayJS node module

dayjs.extend(window.dayjs_plugin_timezone);
dayjs.extend(window.dayjs_plugin_utc);

const timeElement = document.querySelector('.time');
const editButton = document.querySelector('.time-zone-change');
const modalElement = document.querySelector('.timezone-modal');
const dayElement = document.querySelector('.day-date');
const applyButton = document.querySelector('.apply-timezone');
const timezoneList = document.getElementById('pick-zone');
const zonePickHelperText = document.querySelector('.pick-zone-helper-text');
const timezoneText = document.querySelector('.time-zone');
let currentTimeZone = dayjs.tz.guess();
timezoneText.textContent = currentTimeZone;


const updateDateTime = () => {
  const fullDateTime = dayjs().format();
  const updatedDateTime = dayjs.utc(fullDateTime).tz(currentTimeZone).format();
  const date = updatedDateTime.slice(0, 10);
  const time = updatedDateTime.slice(11, 19);
  timeElement.textContent = time;
  dayElement.textContent = date;  
};

const showZonePickHelperText = () => {
  zonePickHelperText.classList.remove('invisible');
}

const hideZonePickHelperText = () => {
  zonePickHelperText.classList.add('invisible');
}


const closeChangeTimezoneModal = (event) => { 
  if(event.target.classList.contains('timezone-modal')) {
    modalElement.classList.add('invisible');
    hideZonePickHelperText();
  }
};

const updateTimeZone = (value) => {
  currentTimeZone = document.querySelector(`.${value}`).dataset.timezone;
  timezoneText.textContent = currentTimeZone;
};

const closeModal = () => {
  modalElement.classList.add('invisible');
  timezoneList.value = "pick-a-zone";
  hideZonePickHelperText();
};

const showChangeTimezoneModal = () => {
  modalElement.classList.remove('invisible');
};

const changeTimeZone = () => {
  const selectedValue = document.querySelector(`.${timezoneList.value}`).textContent;
  if(selectedValue !== "-- Pick a timezone --") {
    updateTimeZone(timezoneList.value);
    closeModal();
  } else {
    showZonePickHelperText();
  }
};

applyButton.addEventListener('click', changeTimeZone);
editButton.addEventListener('click', showChangeTimezoneModal);
modalElement.addEventListener('click', closeChangeTimezoneModal);
setInterval(updateDateTime, 1000);
