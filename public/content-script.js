// THIS FILE CAN BE CLEANED TO IMPROVE CODE PERFORMANCE AND READABILITY
// BUT ITS WORKING SO I DONT CARE RIGHT NOW LOL

let vehicles = [];

const initHTML = () => {
  // Build a select html element and add it to the form
  const { container } = getHTMLElements();
  const { select, selectWrapped } = createSelectHTMLElement();
  container.prepend(selectWrapped);

  updateSelectOptions(select);
};
// Get inputs and containers to inject HTML
const getHTMLElements = () => {
  const container = document.querySelector(
    '#frmAdeudos > div:nth-child(7) > div.col-md-4.shadow.border.radius-5.mt-3.p-3 > div'
  );
  const select = document.querySelector('#vehicle-select');
  const iPlate = document.querySelector('#placa');
  const iSerialNumber = document.querySelector('#numeroSerie');
  const iOwnerName = document.querySelector('#nombrePropietario');
  const iMotorNumber = document.querySelector('#numeroMotor');

  return { container, select, iPlate, iSerialNumber, iOwnerName, iMotorNumber };
};

const clearSelectOptions = (select) => {
  while (select.options.length > 0) {
    select.remove(0);
  }
};

const updateSelectOptions = (select) => {
  clearSelectOptions(select);
  vehicles.forEach((vehicle) => {
    const option = new Option(vehicle.name, vehicle.plate);
    select.add(option, undefined);
  });
  setInputValues(vehicles[vehicles.length - 1]);
};

// Creates a div-type label for the select element
const createSelectWrapper = () => {
  const div = document.createElement('div');
  div.setAttribute('class', 'col-12 form-group');
  div.innerText = 'Vehículo';
  return div;
};

const setInputValues = (vehicle) => {
  const { select, iPlate, iSerialNumber, iOwnerName, iMotorNumber } =
    getHTMLElements();

  if (vehicle) {
    select.value = vehicle.plate;
    iPlate.value = vehicle.plate;
    iSerialNumber.value = vehicle.serialNumber;
    iOwnerName.value = vehicle.ownerName;
    iMotorNumber.value = vehicle.motorNumber;
  } else {
    select.value = '';
    iPlate.value = '';
    iSerialNumber.value = '';
    iOwnerName.value = '';
    iMotorNumber.value = '';
  }
};

// Creates a div wrapper of a select and a label
const createSelectHTMLElement = () => {
  const select = document.createElement('select');
  select.setAttribute('id', 'vehicle-select');
  select.setAttribute('class', 'form-control');

  select.addEventListener('change', (event) => {
    const { iPlate, iSerialNumber, iOwnerName, iMotorNumber } =
      getHTMLElements();

    const selectedPlate = event.target.value;
    const selectedVehicle = vehicles.find(
      ({ plate }) => plate === selectedPlate
    );

    setInputValues(selectedVehicle);
  });

  const selectWrapped = createSelectWrapper();
  selectWrapped.append(select);

  return { select, selectWrapped };
};

// Gets the storage
chrome.storage.sync.get(['avj-data'], (result) => {
  if (Object.keys(result).length === 0) {
    chrome.storage.sync.set({ 'avj-data': [] }, () => {});
  } else {
    vehicles = Object.values(result['avj-data']);
    initHTML();
  }
});

// Listen to changes in storage
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes['avj-data']?.newValue) {
    const newData = changes['avj-data']?.newValue;
    vehicles = Object.values(newData);
    const { select } = getHTMLElements();
    updateSelectOptions(select);
    console.log('update', vehicles);
  }
});
